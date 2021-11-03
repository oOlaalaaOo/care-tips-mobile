import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../constants/themes';

const AppContainerCommon: React.FC<any> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    // marginTop: StatusBar.currentHeight || 0,
    minHeight: '100%',
    width: '100%',
  },
  subContainer: {
    flex: 1,
    // marginHorizontal: MARGIN.xl,
    width: '100%',
  },
});

export default AppContainerCommon;
