import React from 'react';
import {StyleSheet, View} from 'react-native';

const AppListSeparatorCommon: React.FC<any> = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default AppListSeparatorCommon;
