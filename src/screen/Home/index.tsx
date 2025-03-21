import React, {useMemo, useRef, useCallback, useEffect} from 'react';
import {
  Alert,
  Animated,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import TitleHeader from '@components/TitleHeader';
import useJokes from '@hooks/useJokes';

import style from './style';
import CategoryItem from '@components/CategoryItem';
import If from '@components/If';

const MAX_JOKES_COUNT = 2;

const Home = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const styles = useMemo(() => style(), []);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const {
    categories,
    isLoadingInitialData,
    isLoadingGetMoreData,
    moveCategoryToTop,
    addMoreJokes,
    onRefreshData,
  } = useJokes();

  const handleAddMoreJokes = useCallback(
    (categoryId: number) => {
      const categoryIndex = categories.findIndex(cat => cat.id === categoryId);

      if (categoryIndex === -1) {
        Alert.alert('Error', 'Category not found');
        return;
      }

      const category = categories[categoryIndex];

      if (category.addedJokesCount >= MAX_JOKES_COUNT) {
        Alert.alert(
          'Limit Reached',
          `You've reached the joke limit for ${category.categoryName} category`,
        );
        return;
      }

      addMoreJokes(category, categoryIndex);
    },
    [categories, addMoreJokes],
  );

  const handleMoveCategoryToTop = useCallback(
    (categoryId: number) => {
      const categoryIndex = categories.findIndex(cat => cat.id === categoryId);

      if (categoryIndex === -1) {
        return;
      }

      if (categoryIndex === 0) {
        const category = categories[categoryIndex];
        Alert.alert(
          'Already at Top',
          `${category.categoryName} category is already at the top`,
        );
        return;
      }

      moveCategoryToTop(categoryIndex);
    },
    [categories, moveCategoryToTop],
  );

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingInitialData}
            onRefresh={onRefreshData}
          />
        }>
        <TitleHeader
          title={'JokeHub😂🔥'}
          description={
            'Temukan jokes random, pun cerdas, dan dad jokes yang bikin ngakak. Nikmati tawa setiap hari!'
          }
        />

        <View style={styles.bodySection}>
          <Text style={styles.bodyTitle}>Joke Categories</Text>

          <If condition={isLoadingInitialData}>
            <View style={styles.loadingContainer}>
              <Animated.Image
                source={require('@assets/icon/loading.png')}
                style={[styles.loadingImage, {transform: [{scale: scaleAnim}]}]}
              />
              <View style={styles.loadingText}>
                <Text style={styles.loadingTextTitle}>Loading...</Text>
                <Text>If it crashes, it's a feature, not a bug!</Text>
              </View>
            </View>
          </If>
          <If condition={!isLoadingInitialData}>
            <FlatList
              data={categories}
              renderItem={({item, index}) => (
                <CategoryItem
                  category={item}
                  numberList={index}
                  handleGoTop={handleMoveCategoryToTop}
                  addMoreData={handleAddMoreJokes}
                  isLoadingGetMoreData={isLoadingGetMoreData}
                />
              )}
              keyExtractor={category =>
                `${category.id}-${category.categoryName}`
              }
              scrollEnabled={false}
              initialNumToRender={10}
              removeClippedSubviews={true}
            />
          </If>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
