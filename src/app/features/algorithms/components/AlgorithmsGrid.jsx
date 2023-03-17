import React, {memo, useEffect} from 'react';
import {Button, Divider} from 'react-native-elements';
import {Image, Pressable, View} from 'react-native';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
import {colors} from '_features/theme';
import {loadFromLocalStorage, saveToLocalStorage} from '_libs';
import AlgorithmsModal from '../modals/AlgorithmsModal';
import {
  addToCompletedAlgorithms,
  removeFromCompletedAlgorithms,
  setCompletedAlgorithms,
  setAlgorithmsData,
  setSelectedAlgorithm,
  toggleAlgorithmsModalVisibility,
} from '../redux/algorithmsGridSlice';
import {toggleAlgorithmsModalVisibilityFromModal} from '../redux/algorithmsModalSlice';
import styles from '../styles/algorithmsGridStyle';

const AlgorithmsGrid = props => {
  const algorithmsData = useSelector(
    state => state.algorithmsGrid.algorithmsData,
  );
  const completedAlgorithms = useSelector(
    state => state.algorithmsGrid.completedAlgorithms,
  );
  const isAlgorithmsModalVisible = useSelector(
    state => state.algorithmsGrid.isAlgorithmsModalVisible,
  );
  const puzzle = useSelector(state => state.home.puzzle);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadDataFromStorage = async () => {
      const completedAlgorithmsFromStorage = await loadFromLocalStorage(
        'completedAlgorithms',
      );
      const algorithmsDataFromStorage = await loadFromLocalStorage(
        'algorithmsData',
      );

      if (completedAlgorithmsFromStorage !== null) {
        dispatch(setCompletedAlgorithms(completedAlgorithmsFromStorage));
      }

      if (algorithmsDataFromStorage !== null) {
        dispatch(setAlgorithmsData(algorithmsDataFromStorage));
      }
    };

    loadDataFromStorage();
  }, []);

  useEffect(() => {
    const saveCompletedAlgorithms = async () => {
      if (completedAlgorithms.length !== 0) {
        await saveToLocalStorage('completedAlgorithms', completedAlgorithms);
      }
    };

    saveCompletedAlgorithms();
  }, [completedAlgorithms]);

  const _download = () => {
    fetch(`https://cubing-data.netlify.app/algorithms/${props.puzzle}.json`)
      .then(response => response.json())
      .then(data => {
        const algorithmsDataCopy = {};
        Object.assign(algorithmsDataCopy, algorithmsData);
        algorithmsDataCopy[props.puzzle][props.category] = data[props.category];
        dispatch(setAlgorithmsData(algorithmsDataCopy));
        saveToLocalStorage('algorithmsData', algorithmsDataCopy);
      });
  };

  const _renderItem = ({item, index}) => (
    <Pressable
      delayLongPress={200}
      onPress={() => {
        dispatch(setSelectedAlgorithm(item));
        dispatch(toggleAlgorithmsModalVisibility());
        dispatch(toggleAlgorithmsModalVisibilityFromModal());
      }}
      onLongPress={() => {
        completedAlgorithms[props.puzzle][props.category].includes(index)
          ? dispatch(
              removeFromCompletedAlgorithms({
                puzzle: props.puzzle,
                category: props.category,
                index: index,
              }),
            )
          : dispatch(
              addToCompletedAlgorithms({
                puzzle: props.puzzle,
                category: props.category,
                index: index,
              }),
            );
      }}>
      <View
        style={[
          {
            backgroundColor: completedAlgorithms[props.puzzle][
              props.category
            ].includes(index)
              ? colors.green
              : colors.primary,
          },
          styles.itemView,
        ]}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Divider color={colors.white} />
        <Image
          source={{
            uri: `http://cube.rider.biz/visualcube.php?fmt=png&size=150&pzl=${
              puzzle + 2
            }&alg=${item.scrambles[0]}&stage=${props.category}&view=${
              props.category !== 'f2l' && 'plan'
            }&arw=${item.arrow !== null ? item.arrow : ''}&bg=t`,
          }}
          style={styles.image}
        />
      </View>
    </Pressable>
  );

  const _renderSectionHeader = section => (
    <Text style={styles.sectionTitle}>{section.title}</Text>
  );

  const _getSections = sections => {
    const data = algorithmsData[props.puzzle][props.category].algorithms;
    const sectionData = [];

    sections.forEach(section => {
      if ('list' in section.data) {
        sectionData.push({
          title: section.title,
          data: section.data.list.map(idx => data[idx]),
        });
      } else {
        sectionData.push({
          title: section.title,
          data: data.slice(section.data.start, section.data.end),
        });
      }
    });

    return sectionData;
  };

  const _downloadInfo = () => (
    <View style={styles.downloadView}>
      <Button title="Download" onPress={_download} />
      <View style={styles.downloadInfoView}>
        <Text style={styles.downloadInfoText}>{props.downloadInfo}</Text>
      </View>
    </View>
  );

  const _flatGrid = () => (
    <FlatGrid
      itemDimension={100}
      itemContainerStyle={styles.itemContainer}
      stickySectionHeadersEnabled={true}
      data={algorithmsData[props.puzzle][props.category].algorithms}
      renderItem={_renderItem}
      removeClippedSubviews={true}
      getItemLayout={(_, index) => ({
        length: 100,
        offset: 100 * index,
        index,
      })}
      showsVerticalScrollIndicator={false}
    />
  );

  const _sectionGrid = () => (
    <SectionGrid
      itemDimension={100}
      itemContainerStyle={styles.itemContainer}
      stickySectionHeadersEnabled={true}
      sections={_getSections(
        algorithmsData[props.puzzle][props.category].sections,
      )}
      data={algorithmsData[props.puzzle][props.category].algorithms}
      renderItem={_renderItem}
      renderSectionHeader={_renderSectionHeader}
      removeClippedSubviews={true}
      getItemLayout={(_, index) => ({
        length: 100,
        offset: 100 * index,
        index,
      })}
      showsVerticalScrollIndicator={false}
    />
  );

  return (
    <View style={styles.mainContainer}>
      {isAlgorithmsModalVisible && (
        <AlgorithmsModal
          puzzle={props.puzzle}
          category={props.category}
          mask={algorithmsData[props.puzzle][props.category].mask}
        />
      )}
      {algorithmsData[props.puzzle][props.category].algorithms.length === 0
        ? _downloadInfo()
        : algorithmsData[props.puzzle][props.category].sections.length === 0
        ? _flatGrid()
        : _sectionGrid()}
    </View>
  );
};

export default memo(AlgorithmsGrid);
