import {useColorScheme} from 'nativewind';
import colors from 'tailwindcss/colors';

export const useHexColor = color => {
  const {colorScheme} = useColorScheme();
  const [first, second] = color.split(' ');
  const [firstColorScheme, firstColorName, firstColorValue] = first.split('-');

  if (second !== undefined) {
    const [secondColorScheme, secondColorName, secondColorValue] =
      second.split('-');

    const [colorName, colorValue] =
      colorScheme === 'dark'
        ? firstColorScheme === 'dark:bg'
          ? [firstColorName, firstColorValue]
          : [secondColorName, secondColorValue]
        : secondColorScheme === 'bg'
        ? [secondColorName, secondColorValue]
        : [firstColorName, firstColorValue];

    return colors[colorName][colorValue];
  }

  return colors[firstColorName][firstColorValue];
};
