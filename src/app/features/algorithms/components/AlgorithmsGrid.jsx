import React, {memo, useEffect} from 'react';
import {Button, Divider} from 'react-native-elements';
import {Image, Pressable, View} from 'react-native';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from '_components';
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
import {useHexColor} from '../../../hooks/useHexColor';

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
  }, [dispatch]);

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
        className={`rounded-md ${
          completedAlgorithms[props.puzzle][props.category].includes(index)
            ? 'bg-green-700'
            : 'bg-neutral-800'
        }`}>
        <Text className="m-2 text-center">{item.name}</Text>
        <Divider color={useHexColor('bg-neutral-50')} />
        <View className="items-center justify-center">
          <View className="absolute h-12 w-12 rounded-full [elevation:50] [shadow-color:#FFFFFF] [shadow-offset:{width:0;height:0}]" />
          <Image
            source={{
              uri: `http://cube.rider.biz/visualcube.php?fmt=png&size=150&pzl=${
                puzzle + 2
              }&alg=${item.scrambles[0]}&stage=${props.category}&view=${
                props.category !== 'f2l' && 'plan'
              }&arw=${item.arrow !== null ? item.arrow : ''}&bg=t`,
            }}
            className="h-24 w-24 m-2 self-center"
          />
        </View>
      </View>
    </Pressable>
  );

  const _renderSectionHeader = section => (
    <Text className="p-2 text-lg bg-neutral-200 dark:bg-neutral-700">
      {section.title}
    </Text>
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
    <View className="flex-1 items-center justify-center">
      <Button title="Download" onPress={_download} />
      <View className="m-5">
        <Text>{props.downloadInfo}</Text>
      </View>
    </View>
  );

  const _flatGrid = () => (
    <FlatGrid
      itemDimension={100}
      stickySectionHeadersEnabled
      data={algorithmsData[props.puzzle][props.category].algorithms}
      renderItem={_renderItem}
      removeClippedSubviews
      getItemLayout={(_, index) => ({
        length: 96,
        offset: 96 * index,
        index,
      })}
      showsVerticalScrollIndicator={false}
    />
  );

  const _sectionGrid = () => (
    <SectionGrid
      itemDimension={100}
      stickySectionHeadersEnabled
      sections={_getSections(
        algorithmsData[props.puzzle][props.category].sections,
      )}
      data={algorithmsData[props.puzzle][props.category].algorithms}
      renderItem={_renderItem}
      renderSectionHeader={_renderSectionHeader}
      removeClippedSubviews
      getItemLayout={(_, index) => ({
        length: 96,
        offset: 96 * index,
        index,
      })}
      showsVerticalScrollIndicator={false}
    />
  );

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
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
