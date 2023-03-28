import React, {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styled} from 'nativewind';
import {useHexColor} from '_hooks/useHexColor';

const StyledIcon = styled(FontAwesomeIcon, {
  props: {
    color: true,
  },
});

/**
 * Icon component.
 * @param {string} color the color of the icon.
 * @returns the Icon component.
 */
const Icon = ({color, ...props}) => (
  <StyledIcon color={useHexColor(color)} {...props} />
);

export default memo(Icon);
