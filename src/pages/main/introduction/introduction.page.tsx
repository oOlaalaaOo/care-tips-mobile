import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import AppContainerCommon from '../../../components/common/app-container/app-container.common';
import AppButtonUi from '../../../components/common/ui/app-button/app-button.ui';
import AppTextUi from '../../../components/common/ui/app-text/app-text.ui';
import {FONT_FAMILY, MARGIN} from '../../../constants/themes';

const IntroductionPage: React.FC<any> = ({navigation}) => {
  return (
    <AppContainerCommon>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/undraw_blooming.png')}
          resizeMode="cover"
          style={styles.image}
        />
        <AppTextUi text="Care Tips" size="xl4" style={styles.titleText} />
        <AppTextUi
          text="Get your child a good advice on how to grow him/her very well"
          style={styles.messageText}
          size="lg"
        />
        <View style={styles.buttonContainer}>
          <AppButtonUi
            text="Sign In"
            theme="primary"
            loading={false}
            onPress={() => navigation.navigate('LoginPage')}
          />

          <AppButtonUi
            text="Sign Up"
            theme="secondary"
            loading={false}
            onPress={() => navigation.navigate('RegisterPage')}
          />
        </View>
      </View>
    </AppContainerCommon>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: MARGIN.xl,
  },
  titleText: {
    fontFamily: FONT_FAMILY.bold,
  },
  messageText: {
    marginTop: MARGIN.xl,
    fontFamily: FONT_FAMILY.light,
    marginHorizontal: 100,
    textAlign: 'center',
    lineHeight: 25,
  },
  buttonContainer: {
    width: '90%',
    marginTop: MARGIN.xl,
    position: 'absolute',
    bottom: 40,
  },
});

export default IntroductionPage;
