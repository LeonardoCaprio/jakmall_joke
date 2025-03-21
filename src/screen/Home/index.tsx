import React, {useMemo, useRef, useCallback, useEffect, useState} from 'react';
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
import {Category} from '@model/types';
import CustomModal from '@components/Modal';
import Button from '@components/Button';

type AnimationRef = Animated.CompositeAnimation | null;

const MAX_JOKES_COUNT = 2;

const Home: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const styles = useMemo(() => style(), []);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<AnimationRef>(null);
  const [modalState, setModalState] = useState<{
    isVisible: boolean;
    title: string;
    description: string;
  }>({isVisible: false, title: '', description: ''});

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
        setModalState({
          isVisible: true,
          title: 'Uh-oh! Limit Reached 😅',
          description: `Looks like you've hit the joke limit for the "${category.categoryName}" category. Try exploring another category for more fun! 🎉`,
        });
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
        setModalState({
          isVisible: true,
          title: "You're Already on Top! 🚀",
          description: `The "${category.categoryName}" category is already at the top. No need to move it further! 😉`,
        });
        return;
      }

      moveCategoryToTop(categoryIndex);
    },
    [categories, moveCategoryToTop],
  );

  const handleClose = () => {
    setModalState({
      ...modalState,
      isVisible: false,
    });
  };

  const startAnimation = useCallback((): Animated.CompositeAnimation => {
    scaleAnim.setValue(1);

    if (animationRef.current) {
      animationRef.current.stop();
    }

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
    animationRef.current = pulse;

    return pulse;
  }, [scaleAnim]);

  useEffect(() => {
    if (isLoadingInitialData) {
      startAnimation();
    } else if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [isLoadingInitialData, startAnimation]);

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader
        title={'JokeHub😂🔥'}
        description={
          'Looking for some laughs? Discover random jokes, clever puns, and hilarious dad jokes that will crack you up! Make your day brighter with a dose of humor! 😄🎉'
        }
      />

      <View style={styles.bodySection}>
        <Text style={styles.bodyTitle}>Joke Categories</Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingInitialData}
              onRefresh={onRefreshData}
            />
          }>
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
              keyExtractor={(category: Category) =>
                `${category.id}-${category.categoryName}`
              }
              scrollEnabled={false}
              initialNumToRender={10}
              removeClippedSubviews={true}
            />
          </If>
        </ScrollView>
      </View>
      <CustomModal
        isVisible={modalState.isVisible}
        onClose={handleClose}
        isShowXbutton={false}
        title={modalState.title}
        animationIn="fadeIn"
        animationOut="fadeOut"
        footer={<Button title="Cancel" onPress={handleClose} />}>
        <Text>{modalState.description}</Text>
      </CustomModal>
    </SafeAreaView>
  );
};

export default Home;
