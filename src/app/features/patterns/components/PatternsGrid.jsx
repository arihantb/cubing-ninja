import React, {memo, useEffect} from 'react';
import {Image, Pressable, View} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import {useSelector, useDispatch} from 'react-redux';

import {Text} from '_components';
import {colors} from '_features/theme';
import {loadFromLocalStorage, saveToLocalStorage} from '_libs';
import PatternsModal from '../modals/PatternsModal';
import {
  addToCompletedPatterns,
  removeFromCompletedPatterns,
  setCompletedPatterns,
  setPatternsData,
  setSelectedPattern,
  togglePatternsModalVisibility,
} from '../redux/patternsGridSlice';
import {togglePatternsModalVisibilityFromModal} from '../redux/patternsModalSlice';
import styles from '../styles/patternsGridStyle';

const PatternsGrid = props => {
  const patternsData = useSelector(state => state.patternsGrid.patternsData);
  const completedPatterns = useSelector(
    state => state.patternsGrid.completedPatterns,
  );
  const isPatternsModalVisible = useSelector(
    state => state.patternsGrid.isPatternsModalVisible,
  );
  const puzzle = useSelector(state => state.home.puzzle);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadDataFromStorage = async () => {
      const completedPatternsFromStorage = await loadFromLocalStorage(
        'completedPatterns',
      );
      const patternsDataFromStorage = await loadFromLocalStorage(
        'patternsData',
      );

      if (completedPatternsFromStorage !== null) {
        dispatch(setCompletedPatterns(completedPatternsFromStorage));
      }

      if (patternsDataFromStorage !== null) {
        dispatch(setPatternsData(patternsDataFromStorage));
      }
    };

    loadDataFromStorage();
  }, []);

  useEffect(() => {
    const saveCompletedPatterns = async () => {
      if (completedPatterns.length !== 0) {
        await saveToLocalStorage('completedPatterns', completedPatterns);
      }
    };

    saveCompletedPatterns();
  }, [completedPatterns]);

  const _download = () => {
    fetch(`https://cubing-data.netlify.app/patterns/${props.puzzle}.json`)
      .then(response => response.json())
      .then(data => {
        const patternsDataCopy = {};
        Object.assign(patternsDataCopy, patternsData);
        patternsDataCopy[props.puzzle] = data;
        dispatch(setPatternsData(patternsDataCopy));
        saveToLocalStorage('patternsData', patternsDataCopy);
      });
  };

  const _renderItem = ({item, index}) => (
    <Pressable
      delayLongPress={200}
      onPress={() => {
        dispatch(setSelectedPattern(item));
        dispatch(togglePatternsModalVisibility());
        dispatch(togglePatternsModalVisibilityFromModal());
      }}
      onLongPress={() => {
        completedPatterns[props.puzzle].includes(index)
          ? dispatch(
              removeFromCompletedPatterns({
                puzzle: props.puzzle,
                category: props.category,
                index: index,
              }),
            )
          : dispatch(
              addToCompletedPatterns({
                puzzle: props.puzzle,
                category: props.category,
                index: index,
              }),
            );
      }}>
      <View
        style={[
          {
            backgroundColor: completedPatterns[props.puzzle].includes(index)
              ? colors.green
              : colors.primary,
          },
          styles.itemView,
        ]}>
        <Text style={styles.itemText}>
          {item.name.length > 12
            ? item.name.slice(0, 12) + '...'
            : item.name.length}
        </Text>
        <Divider color={colors.white} />
        <Image
          source={{
            uri: `http://cube.rider.biz/visualcube.php?fmt=png&size=150&pzl=${
              puzzle + 2
            }&alg=${item.algorithms[0]}&bg=t`,
          }}
          style={styles.image}
        />
      </View>
    </Pressable>
  );

  const _renderSectionHeader = ({section}) => (
    <Text style={styles.sectionTitle}>{section.title}</Text>
  );

  const _getSections = sections => {
    const data = patternsData[props.puzzle].patterns;
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
      data={patternsData[props.puzzle].patterns}
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
      sections={_getSections(patternsData[props.puzzle].sections)}
      data={patternsData[props.puzzle].patterns}
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
      {isPatternsModalVisible && <PatternsModal puzzle={props.puzzle} />}
      {patternsData[props.puzzle].patterns.length === 0
        ? _downloadInfo()
        : patternsData[props.puzzle].sections.length === 0
        ? _flatGrid()
        : _sectionGrid()}
    </View>
  );
};

export default memo(PatternsGrid);
