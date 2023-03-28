import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import {ImageMessage, Text} from '_components';
import {strings} from '_data/strings';
import {useDoubleBackTapToExit} from '_hooks/useDoubleBackTapToExit';
import AlgorithmsGrid from './components/AlgorithmsGrid';
import {useHexColor} from '../../hooks/useHexColor';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createMaterialTopTabNavigator();

const _twoByTwoMethods = [
  {
    name: 'Ortega',
    puzzle: 'twoByTwo',
    data: [
      {
        name: 'OLL',
        category: 'oll',
        downloadInfo: strings.oll2,
      },
      {
        name: 'PBL',
        category: 'pbl',
        downloadInfo: strings.pbl,
      },
    ],
  },
  {
    name: 'EG',
    puzzle: 'twoByTwo',
    data: [
      {
        name: 'CLL',
        category: 'cll',
        downloadInfo: strings.cll,
      },
      {
        name: 'EG-1',
        category: 'eg1',
        downloadInfo: strings.eg1,
      },
      {
        name: 'EG-2',
        category: 'eg2',
        downloadInfo: strings.eg2,
      },
    ],
  },
];

const _threeByThreeMethods = [
  {
    name: 'CFOP',
    puzzle: 'threeByThree',
    data: [
      {
        name: 'F2L',
        category: 'f2l',
        downloadInfo: strings.f2l,
      },
      {
        name: 'OLL',
        category: 'oll',
        downloadInfo: strings.oll,
      },
      {
        name: 'PLL',
        category: 'pll',
        downloadInfo: strings.pll,
      },
    ],
  },
  {
    name: 'Advanced',
    puzzle: 'threeByThree',
    data: [
      {
        name: 'COLL',
        category: 'coll',
        downloadInfo: strings.coll,
      },
      {
        name: 'ZBLL',
        category: 'zbll',
        downloadInfo: strings.zbll,
      },
      {
        name: 'OLLCP',
        category: 'ollcp',
        downloadInfo: strings.ollcp,
      },
      {
        name: '1LLL',
        category: 'olll',
        downloadInfo: strings.olll,
      },
      {
        name: 'Anti PLL',
        category: 'antiPll',
        downloadInfo: strings.antiPll,
      },
      {
        name: 'ELL',
        category: 'ell',
        downloadInfo: strings.ell,
      },
    ],
  },
  {
    name: 'Roux',
    puzzle: 'threeByThree',
    data: [
      {
        name: 'SBLS',
        category: 'sbls',
        downloadInfo: strings.sbls,
      },
      {
        name: 'CMLL',
        category: 'cmll',
        downloadInfo: strings.cmll,
      },
      {
        name: 'EO',
        category: 'eo',
        downloadInfo: strings.eo,
      },
    ],
  },
  {
    name: 'LSLL',
    puzzle: 'threeByThree',
    data: [
      {
        name: 'CLS',
        category: 'cls',
        downloadInfo: strings.cls,
      },
      {
        name: 'WV',
        category: 'wv',
        downloadInfo: strings.wv,
      },
      {
        name: 'VLS',
        category: 'vls',
        downloadInfo: strings.vls,
      },
      {
        name: 'SV',
        category: 'sv',
        downloadInfo: strings.sv,
      },
    ],
  },
];

const _fourByFourMethods = [
  {
    name: 'OLL Parity',
    puzzle: 'fourByFour',
    data: [
      {
        name: 'OLL Parity',
        category: 'ollParity',
        downloadInfo: strings.ollParity,
      },
    ],
  },
  {
    name: 'PLL Parity',
    puzzle: 'fourByFour',
    data: [
      {
        name: 'PLL Parity',
        category: 'pllParity',
        downloadInfo: strings.pllParity,
      },
    ],
  },
];

const Algorithms = () => {
  const puzzle = useSelector(state => state.home.puzzle);

  useDoubleBackTapToExit();

  const _topBarLabel = (focused, label) => (
    <Text
      className={`text-lg ${focused ? 'text-indigo-500' : 'text-neutral-50'}`}>
      {label}
    </Text>
  );

  const _bottomTabScreen = (key, puzzle, name, category, downloadInfo) => (
    <BottomTab.Screen
      key={key}
      name={name}
      options={{
        tabBarIndicatorStyle: {top: 0},
        tabBarStyle: {backgroundColor: useHexColor('bg-neutral-800')},
        tabBarLabel: ({focused}) => _topBarLabel(focused, name),
      }}>
      {() => (
        <AlgorithmsGrid
          puzzle={puzzle}
          category={category}
          downloadInfo={downloadInfo}
        />
      )}
    </BottomTab.Screen>
  );

  const _bottomTabNavigator = (key, puzzle, data) => (
    <BottomTab.Navigator
      key={key}
      initialRouteName={data[0].name}
      screenOptions={{
        headerShown: false,
        tabBarScrollEnabled: data.length > 4,
      }}
      tabBarStyle={{backgroundColor: useHexColor('bg-neutral-800')}}
      tabBarPosition="bottom">
      {data.map((item, idx) =>
        _bottomTabScreen(
          idx,
          puzzle,
          item.name,
          item.category,
          item.downloadInfo,
        ),
      )}
    </BottomTab.Navigator>
  );

  const _topTabScreen = (key, name, puzzle, data) => (
    <TopTab.Screen
      key={key}
      name={name}
      options={{
        tabBarIndicatorStyle: {top: 0},
        tabBarStyle: {backgroundColor: useHexColor('bg-neutral-800')},
        tabBarLabel: ({focused}) => _topBarLabel(focused, name),
        tabBarBounces: false,
      }}>
      {() => {
        if (data.length === 1) {
          return (
            <AlgorithmsGrid
              puzzle={puzzle}
              category={data[0].category}
              downloadInfo={data[0].downloadInfo}
            />
          );
        }
        return _bottomTabNavigator(key, puzzle, data);
      }}
    </TopTab.Screen>
  );

  const _topTabNavigator = (key, data) => (
    <TopTab.Navigator
      key={key}
      initialRouteName={data[0].name}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}>
      {data.map((item, idx) =>
        _topTabScreen(idx, item.name, item.puzzle, item.data),
      )}
    </TopTab.Navigator>
  );

  const _topTabNavigators = [
    _topTabNavigator(0, _twoByTwoMethods),
    _topTabNavigator(1, _threeByThreeMethods),
    _topTabNavigator(2, _fourByFourMethods),
    <ImageMessage message={strings.comingSoon} key={3} />,
    <ImageMessage message={strings.comingSoon} key={4} />,
    <ImageMessage message={strings.comingSoon} key={5} />,
    <ImageMessage message={strings.comingSoon} key={6} />,
    <ImageMessage message={strings.comingSoon} key={7} />,
    <ImageMessage message={strings.comingSoon} key={8} />,
    <ImageMessage message={strings.comingSoon} key={9} />,
    <ImageMessage message={strings.comingSoon} key={10} />,
  ];

  return (
    <SafeAreaProvider>
      <NavigationContainer independent>
        <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
          {_topTabNavigators[puzzle]}
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default memo(Algorithms);
