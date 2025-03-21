import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  Image,
} from 'react-native';
import {Category, Joke} from '@model/types';
import style from './style';
import Button from '@components/Button';
import If from '@components/If';
import JokeItem from '@components/JokeItem';

interface ICategoryItemProps {
  category: Category;
  handleGoTop: (categoryId: number) => void;
  numberList: number;
  addMoreData: (categoryId: number) => void;
  isLoadingGetMoreData: boolean;
}

const CategoryItem: React.FC<ICategoryItemProps> = ({
  category,
  handleGoTop,
  numberList,
  addMoreData,
  isLoadingGetMoreData,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<boolean>(false);
  const [saveCategoryId, setSaveCategoryId] = useState<number | null>(null);
  const styles = useMemo(() => style(), []);

  const toggleExpand = () => {
    setExpandedCategories(!expandedCategories);
  };

  const renderFooterComponent = () => {
    if (
      isLoadingGetMoreData &&
      category.jokes.length >= 2 &&
      saveCategoryId === category.id
    ) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator />
          <Text style={styles.emptyText}>Getting more jokes...</Text>
          <Text>Because laughter is endless!</Text>
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if (!isLoadingGetMoreData) {
      setSaveCategoryId(null);
    }
  }, [isLoadingGetMoreData]);

  const renderItem: ListRenderItem<Joke> = ({item}: {item: Joke}) => {
    return <JokeItem joke={item} />;
  };

  const handleAddMoreJokes = () => {
    setSaveCategoryId(category.id);
    addMoreData(category.id);
  };

  const showButtonAddMore = () => {
    if (category.jokes.length === 0) {
      return false;
    } else if (category.addedJokesCount >= 2) {
      return false;
    } else if (isLoadingGetMoreData) {
      return false;
    }
    return true;
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require('@assets/icon/emptyJoke.png')}
          style={styles.emptyImage}
        />
        <Text
          style={
            styles.emptyText
          }>{`No jokes were found that match for ${category.categoryName} Category`}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.idText}>#{numberList + 1}</Text>
          <Text style={styles.categoryName}>{category.categoryName}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={[styles.button, styles.primaryButton]}
            title={numberList === 0 ? 'Top' : 'Go Top'}
            variant={'primary'}
            onPress={() => handleGoTop(category.id)}
          />
          <Button
            style={[styles.button, styles.secondaryButton]}
            title={expandedCategories ? 'Hide' : 'Show'}
            variant={'secondary'}
            onPress={toggleExpand}
          />
        </View>
      </View>

      <If condition={expandedCategories}>
        <View style={styles.expandedContainer}>
          <FlatList
            data={category.jokes}
            renderItem={renderItem}
            keyExtractor={(item, index) => `joke-${index}`}
            ListFooterComponent={renderFooterComponent}
            ListEmptyComponent={renderEmptyComponent}
            initialNumToRender={10}
            removeClippedSubviews={true}
          />
          <If condition={showButtonAddMore()}>
            <Button
              style={[styles.button, styles.primaryButton]}
              title={'Add More Data'}
              variant={'primary'}
              onPress={handleAddMoreJokes}
            />
          </If>
        </View>
      </If>
    </>
  );
};

export default CategoryItem;
