import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONT_FAMILY, MARGIN} from '../../../../constants/themes';
import AppListSeparatorCommon from '../../../../components/common/app-list-separator/app-list-separator.common';
import {Storage} from 'aws-amplify';
import AppTextUi from '../../../../components/common/ui/app-text/app-text.ui';

interface IProps {
  categories: any[];
  onItemPress?: (item: any) => void;
}

const ItemImage = ({image}: {image: string}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fetchImage = async (_image: string) => {
    const resp = await Storage.get(_image);

    setImageUrl(resp);
  };

  useEffect(() => {
    fetchImage(image);
  }, [image]);

  return (
    <>
      {imageUrl !== null && (
        <Image
          source={{uri: imageUrl}}
          style={styles.itemImage}
          resizeMode="cover"
        />
      )}
    </>
  );
};

const CategoryList: React.FC<IProps> = ({categories = [], onItemPress}) => {
  const renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (typeof onItemPress !== 'undefined') {
            onItemPress(item);
          }
        }}>
        <View>
          <AppTextUi text={item.name} size="xl2" style={styles.titleText} />
        </View>
        <View style={styles.itemContainer}>
          <ItemImage image={item.image} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <AppListSeparatorCommon />}
      ListHeaderComponentStyle={styles.listHeader}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 200,
    marginHorizontal: MARGIN.xl,
  },
  itemImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  titleText: {
    marginTop: MARGIN.xl3,
    marginHorizontal: MARGIN.xl,
    fontFamily: FONT_FAMILY.bold,
  },
  listHeader: {
    marginBottom: 5,
  },
  listContentContainer: {
    paddingBottom: 340,
  },
});
export default CategoryList;
