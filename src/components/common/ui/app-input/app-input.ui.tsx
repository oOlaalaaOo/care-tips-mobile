import React, {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {FONT_FAMILY, FONT_SIZE} from '../../../../constants/themes';

interface IProps extends TextInputProps {}

const AppInputUi: FC<IProps> = ({...rest}) => (
  <TextInput style={styles.inputTxt} autoCapitalize="none" {...rest} />
);

const styles = StyleSheet.create({
  inputTxt: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.lg,
  },
});

export default AppInputUi;
