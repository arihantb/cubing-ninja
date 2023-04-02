import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import {TextInput, View} from 'react-native';
import Text from './Text';
import Icon from './Icon';
import {useHexColor} from '../hooks/useHexColor';
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {View as MotiView} from 'moti';

/**
 * Input component.
 * @param {string} errorMessage the error message to display on invalid input.
 * @param {props} inputStyle the input style props.
 * @param {boolean} isInvalid the action button is disabled if this is true.
 * @param {import('@fortawesome/free-solid-svg-icons').IconDefinition} leftIcon the icon to display on the left of the input.
 * @param {JSX.Element} rightIcon the component to display on the right of the input.
 * @returns the Input component.
 */
export const Input = forwardRef(
  (
    {errorMessage, inputStyle, isInvalid, leftIcon, rightIcon, ...props},
    ref,
  ) => {
    const anim = useSharedValue(0);
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current.focus();
      },
      shake() {
        anim.value = withRepeat(
          withSequence(
            withTiming(-4, {duration: 20}),
            withTiming(4, {duration: 20}),
            withTiming(0, {duration: 20}),
          ),
          2,
        );
      },
    }));
    console.log(anim);

    return (
      <View className={`flex justify-center ${inputStyle}`}>
        <MotiView
          className="flex-row items-center justify-center"
          style={{translateX: anim}}>
          {leftIcon && (
            <View className="absolute left-3">
              <Icon icon={leftIcon} color="bg-neutral-500" size={14} />
            </View>
          )}
          <TextInput
            ref={inputRef}
            className={`flex-1 pl-9 ${
              rightIcon ? 'pr-9' : 'pr-3'
            } rounded-md border-2 text-neutral-800 dark:text-neutral-50 ${
              errorMessage === undefined || errorMessage === ''
                ? 'border-neutral-500'
                : 'border-red-500'
            }`}
            placeholderTextColor={useHexColor('text-neutral-500')}
            fontFamily="GoogleSans-Bold"
            {...props}
          />
          <View className="absolute right-3">{rightIcon}</View>
        </MotiView>
        {errorMessage !== undefined && errorMessage !== '' && (
          <View className="pt-1 flex-row gap-1 items-center">
            <Icon icon={faCircleExclamation} color="bg-red-500" size={12} />
            <Text className="text-red-500">{errorMessage}</Text>
          </View>
        )}
      </View>
    );
  },
);

export default memo(Input);
