import React, {FC} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  MARGIN,
  PADDING,
} from '../../../../constants/themes';

interface IProps {
  text: string;
  loading?: boolean;
  loadingText?: string;
  theme?: 'primary' | 'secondary' | 'dark' | 'light';
  // size?: 'sm' | 'md' | 'lg' | 'xl';
  // full?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const AppButtonUi: FC<IProps> = ({
  onPress,
  text,
  theme = 'primary',
  loading,
  loadingText,
  style,
  disabled,
}) => {
  const setContainerTheme = (_theme: string, _disabled: boolean) => {
    switch (_theme) {
      case 'primary':
        return {
          backgroundColor: COLORS.primary,
          opacity: _disabled ? 0.7 : 1,
        };
      case 'secondary':
        return {
          backgroundColor: COLORS.light,
          borderColor: '#ccc',
          borderWidth: 1,
          opacity: _disabled ? 0.7 : 1,
        };
      default:
        return {
          backgroundColor: COLORS.primary,
          opacity: _disabled ? 0.7 : 1,
        };
    }
  };

  const setTextTheme = (_theme: string) => {
    switch (_theme) {
      case 'primary':
        return {
          color: COLORS.light,
        };
      case 'secondary':
        return {
          color: COLORS.dark,
        };
      default:
        return {
          color: COLORS.light,
        };
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.buttonContainer,
          setContainerTheme(theme, disabled),
          style,
        ]}>
        {loading ? (
          <Text style={[styles.buttonTxt, setTextTheme(theme)]}>
            {loadingText}
          </Text>
        ) : (
          <Text style={[styles.buttonTxt, setTextTheme(theme)]}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

AppButtonUi.defaultProps = {
  text: 'button text',
  loading: false,
  loadingText: 'Loading...',
  theme: 'primary',
  disabled: false,
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: MARGIN.sm,
    paddingVertical: PADDING.lg,
    paddingHorizontal: PADDING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonTxt: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
  },
});

export default AppButtonUi;
