import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import AppTextUi from '../../../components/common/ui/app-text/app-text.ui';
import {FONT_FAMILY, MARGIN} from '../../../constants/themes';
import AppContainerCommon from '../../../components/common/app-container/app-container.common';
import {API} from 'aws-amplify';
import {listCareTips} from '../../../graphql/queries';

interface IItemList {
  items: Array<any>;
  title: string;
  description: string;
}

const ItemList: React.FC<IItemList> = ({items = [], title, description}) => {
  const renderItem: ListRenderItem<any> = ({item, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <AppTextUi
          text={`${index + 1}. ${item.tip}`}
          size="lg"
          style={{fontFamily: FONT_FAMILY.medium}}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 50}}
      ListHeaderComponent={() => {
        return (
          <View style={{marginBottom: 20}}>
            <AppTextUi
              text={title}
              size="xl2"
              style={{
                fontFamily: FONT_FAMILY.bold,
                textAlign: 'center',
              }}
            />
            <AppTextUi
              text={description}
              size="lg"
              style={{
                marginTop: 10,
                fontFamily: FONT_FAMILY.medium,
                textAlign: 'center',
              }}
            />
          </View>
        );
      }}
      ItemSeparatorComponent={() => {
        return <View style={{marginVertical: 5}} />;
      }}
    />
  );
};

const ItemDetailsPage: React.FC<any> = ({route, navigation}) => {
  const {categoryId, categoryName, categoryDescription} = route.params;

  const [categoryItems, setCategoryItems] = useState<any[]>([]);

  const fetchCategoryItems = async (_categoryId: string) => {
    try {
      const resp = await API.graphql({
        query: listCareTips,
        variables: {
          filter: {
            careTipCategoryID: {eq: _categoryId},
          },
        },
      });

      setCategoryItems(resp.data.listCareTips.items);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    fetchCategoryItems(categoryId);
  }, [categoryId]);

  return (
    <AppContainerCommon>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginHorizontal: MARGIN.xl,
        }}>
        <ItemList
          items={categoryItems}
          title={categoryName}
          description={categoryDescription}
        />
      </View>
    </AppContainerCommon>
  );
};

export default ItemDetailsPage;
