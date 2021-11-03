import React, {useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import AppContainerCommon from '../../../components/common/app-container/app-container.common';
import AppButtonUi from '../../../components/common/ui/app-button/app-button.ui';
import {MARGIN} from '../../../constants/themes';
import {Auth} from 'aws-amplify';
import AppInputUi from '../../../components/common/ui/app-input/app-input.ui';
import {useForm, Controller} from 'react-hook-form';
import AppTextUi from '../../../components/common/ui/app-text/app-text.ui';

interface FormProps {
  username: string;
  password: string;
}

const LoginPage: React.FC<any> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormProps>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormProps) => {
    setIsLoading(true);

    try {
      const resp = await Auth.signIn(data.username, data.password);

      if (resp.challengeName === 'NEW_PASSWORD_REQUIRED') {
        Auth.completeNewPassword(resp, data.password)
          .then(user => {
            console.log('user', user);
            navigation.navigate('BottomTabNavigation', {screen: 'HomePage'});
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        if (resp.attributes['custom:isAdmin'] === '0') {
          navigation.navigate('BottomTabNavigation', {screen: 'HomePage'});
        } else {
          await Auth.signOut();

          Alert.alert('Not a valid user');
        }
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContainerCommon>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/undraw_blooming.png')}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.formFieldSpacer}>
          <Controller
            name="username"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppInputUi
                placeholder="Username"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.username && <AppTextUi text="Username is required." />}
        </View>

        <View style={styles.formFieldSpacer}>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppInputUi
                secureTextEntry
                placeholder="Password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.password && <AppTextUi text="Password is required." />}
        </View>
        <View style={styles.formFieldSpacer}>
          <AppButtonUi
            text="Sign In"
            theme="primary"
            loading={isLoading}
            disabled={isLoading}
            loadingText="Processing..."
            onPress={handleSubmit(onSubmit)}
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
    marginBottom: MARGIN.xl4,
  },
  formFieldSpacer: {
    marginVertical: 5,
    width: '90%',
  },
});

export default LoginPage;
