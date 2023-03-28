import React, {memo} from 'react';
import {WebView} from 'react-native-webview';

const _puzzleMap = puzzle => {
  switch (puzzle) {
    case 0:
      return '2x2x2';
    case 1:
      return '3x3x3';
    case 2:
      return '4x4x4';
    case 3:
      return '5x5x5';
    case 4:
      return '6x6x6';
    case 5:
      return '7x7x7';
    case 6:
      return 'skewb';
    case 7:
      return 'megaminx';
    case 8:
      return 'pyraminx';
    case 9:
      return 'square1';
    case 10:
      return 'clock';
  }
};

/**
 * PuzzlePlayer component.
 * @param {number} puzzle the puzzle index.
 * @param {string} alg the algorithm to show on a puzzle.
 * @param {string} setupAlg the setup algorithm before showing the puzzle.
 * @param {string} mask the stage of the puzzle.
 * @returns the PuzzlePlayer component.
 */
const PuzzlePlayer = ({puzzle, alg, setupAlg, mask, ...props}) => (
  <WebView
    javaScriptEnabled
    className="bg-gray-300 dark:bg-slate-500"
    startInLoadingState
    source={{
      html:
        '<meta name="viewport" content="initial-scale=1.0">' +
        '<script src="https://cdn.cubing.net/js/cubing/twisty" type="module" defer></script>' +
        `<body style="margin: 0;"><twisty-player puzzle="${_puzzleMap(
          puzzle,
        )}" alg="${alg}"` +
        `experimental-setup-alg="(${setupAlg})'" experimental-stickering="${
          mask !== undefined ? mask.toUpperCase() : 'full'
        }"` +
        'hint-facelets="none" viewer-link="none" visualization="PG3D" experimental-drag-input="none"' +
        'background="none" experimental-setup-anchor="end" style="height: 100%; width: 100%;"/></body>',
    }}
    pullToRefreshEnabled={false}
    setDisplayZoomControls={false}
    {...props}
  />
);

export default memo(PuzzlePlayer);
