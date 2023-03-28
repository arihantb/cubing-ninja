import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';
import {styled} from 'nativewind';
import {useHexColor} from '_hooks/useHexColor';

const StyledActivityIndicator = styled(ActivityIndicator, {
  props: {
    color: true,
  },
});

/**
 * Loading component.
 * @param {string} color the color of the activity indicator.
 * @returns the Loading component.
 */
const Loading = ({color, ...props}) => (
  <StyledActivityIndicator color={useHexColor(color)} {...props} />
);

export default memo(Loading);
