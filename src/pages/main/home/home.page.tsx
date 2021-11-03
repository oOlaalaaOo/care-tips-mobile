/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AppTextUi from '../../../components/common/ui/app-text/app-text.ui';
import {FONT_FAMILY, PADDING} from '../../../constants/themes';
import AppContainerCommon from '../../../components/common/app-container/app-container.common';
import CategoryList from './components/category-list.component';
import {API} from 'aws-amplify';
import {listCareTipCategorys} from '../../../graphql/queries';

const HomePage: React.FC<any> = ({navigation}) => {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const resp = await API.graphql({query: listCareTipCategorys});

      setCategories(resp.data.listCareTipCategorys.items);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AppContainerCommon>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <AppTextUi
          text="Care Tips"
          size="xl4"
          style={{fontFamily: FONT_FAMILY.bold, paddingHorizontal: PADDING.xl}}
          onPress={() => navigation.navigate('ItemDetailsPage')}
        />

        <View>
          <CategoryList
            categories={categories}
            onItemPress={(item: any) => {
              navigation.navigate('ItemDetailsPage', {
                categoryId: item.id,
                categoryName: item.name,
                categoryDescription: item.description,
              });
            }}
          />
        </View>
      </View>
    </AppContainerCommon>
  );
};

export default HomePage;
