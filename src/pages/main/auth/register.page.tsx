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
  name: string;
}

const RegisterPage: React.FC<any> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormProps>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormProps) => {
    setIsLoading(true);

    try {
      const newData = {
        username: data.username,
        password: data.password,
        attributes: {
          name: data.name,
          'custom:isAdmin': '0',
        },
      };

      await Auth.signUp(newData);

      Alert.alert('Registered Successfully!');

      navigation.goBack();
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
            name="name"
            defaultValue=""
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppInputUi
                placeholder="Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.name && <AppTextUi text="Name is required." />}
        </View>

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
              minLength: 8,
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

          {errors.password && errors.password.type === 'required' && (
            <AppTextUi text="Password is required." />
          )}

          {errors.password && errors.password.type === 'minLength' && (
            <AppTextUi text="Password must be atleast 8 characters long." />
          )}
        </View>
        <View style={styles.formFieldSpacer}>
          <AppButtonUi
            text="Sign Up"
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

export default RegisterPage;
