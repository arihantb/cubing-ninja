import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {colors} from '_features/theme';
import {WebView} from 'react-native-webview';

const puzzleMap = puzzle => {
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
 * @param {PropTypes} props the properties for PuzzlePlayer component.
 * @returns the PuzzlePlayer component.
 */
const PuzzlePlayer = props => (
  <WebView
    javaScriptEnabled={true}
    style={{backgroundColor: colors.gray}}
    source={{
      html:
        '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">' +
        '<script src="https://cdn.cubing.net/js/cubing/twisty" type="module" defer></script>' +
        `<twisty-player puzzle="${puzzleMap(props.puzzle)}" alg="${
          props.alg
        }"` +
        `experimental-setup-alg="(${
          props.setupAlg
        })'" experimental-stickering="${
          props.mask !== undefined ? props.mask.toUpperCase() : 'full'
        }"` +
        'hint-facelets="none" viewer-link="none" visualization="PG3D" experimental-drag-input="none"' +
        'background="none" experimental-setup-anchor="end" style="height: 100%; width: 100%;"/>',
    }}
    pullToRefreshEnabled={false}
    setDisplayZoomControls={() => false}
  />
);

PuzzlePlayer.propTypes = {
  alg: PropTypes.string.isRequired,
  mask: PropTypes.string,
  puzzle: PropTypes.string.isRequired,
  setupAlg: PropTypes.string,
};

export default memo(PuzzlePlayer);
