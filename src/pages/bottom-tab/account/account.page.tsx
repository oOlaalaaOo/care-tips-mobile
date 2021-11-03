import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppContainerCommon from '../../../components/common/app-container/app-container.common';
import AppButtonUi from '../../../components/common/ui/app-button/app-button.ui';
import {MARGIN} from '../../../constants/themes';
import {Auth} from 'aws-amplify';
import AppInputUi from '../../../components/common/ui/app-input/app-input.ui';
import {useForm, Controller} from 'react-hook-form';
import AppTextUi from '../../../components/common/ui/app-text/app-text.ui';

interface FormProps {
  name: string;
}

const AccountPage: React.FC<any> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<FormProps>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserAttribs = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user', user.attributes);

      setValue('name', user.attributes.name);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserAttribs();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const onSubmit = async (data: FormProps) => {
    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();

      const result = await Auth.updateUserAttributes(user, {
        name: data.name,
      });

      console.log(result); // SUCCESS
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContainerCommon>
      <View style={styles.container}>
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
          <AppButtonUi
            text="Update Details"
            theme="primary"
            loading={isLoading}
            disabled={isLoading}
            loadingText="Processing..."
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={styles.formFieldSpacer}>
          <AppButtonUi
            text="Sign Out"
            theme="secondary"
            loading={isLoading}
            disabled={isLoading}
            loadingText="Processing..."
            onPress={async () => {
              await Auth.signOut();

              navigation.reset({
                reset: 2,
                routes: [{name: 'IntroductionPage'}],
              });
            }}
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

export default AccountPage;
