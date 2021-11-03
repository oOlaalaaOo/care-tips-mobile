import React, {FC} from 'react';
import {GestureResponderEvent, StyleProp, Text, TextStyle} from 'react-native';
import {COLORS, FONT_FAMILY, FONT_SIZE, MARGIN} from '../../../../constants/themes';

interface IProps {
  text: string;
  style?: StyleProp<TextStyle>;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xl2'
    | 'xl3'
    | 'xl4'
    | 'xl5'
    | 'xl6'
    | 'xl7'
    | 'xl8'
    | 'xl9';
  onPress?: (event: GestureResponderEvent) => void;
}

const AppTextUi: FC<IProps> = ({text, size = 'md', style, onPress}) => {
  const setSize = (size: string) => {
    switch (size) {
      case 'xs':
        return {
          fontSize: FONT_SIZE.xs,
        };
      case 'sm':
        return {
          fontSize: FONT_SIZE.sm,
        };
      case 'md':
        return {
          fontSize: FONT_SIZE.md,
        };
      case 'lg':
        return {
          fontSize: FONT_SIZE.lg,
        };
      case 'xl':
        return {
          fontSize: FONT_SIZE.xl,
        };
      case 'xl2':
        return {
          fontSize: FONT_SIZE.xl2,
        };
      case 'xl3':
        return {
          fontSize: FONT_SIZE.xl3,
        };
      case 'xl4':
        return {
          fontSize: FONT_SIZE.xl4,
        };
      case 'xl5':
        return {
          fontSize: FONT_SIZE.xl5,
        };
      case 'xl6':
        return {
          fontSize: FONT_SIZE.xl6,
        };
      case 'xl7':
        return {
          fontSize: FONT_SIZE.xl7,
        };
      case 'xl8':
        return {
          fontSize: FONT_SIZE.xl8,
        };
      case 'xl9':
        return {
          fontSize: FONT_SIZE.xl9,
        };
      default:
        return {
          fontSize: FONT_SIZE.xs,
        };
    }
  };

  return (
    <Text
      style={[
        {fontFamily: FONT_FAMILY.regular, marginVertical: MARGIN.md, color: COLORS.dark},
        setSize(size),
        style,
      ]}
      onPress={onPress}>
      {text}
    </Text>
  );
};

export default AppTextUi;
