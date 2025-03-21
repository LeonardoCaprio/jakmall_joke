import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Joke} from '@model/types';
import CustomModal from '@components/Modal';
import Button from '@components/Button';
import style from './style';

interface IJokeItemProps {
  joke: Joke;
}

const JokeItem: React.FC<IJokeItemProps> = ({joke}) => {
    const styles = useMemo(() => style(), []);
  const [modalVisible, setModalVisible] = useState(false);

  const onItemPress = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const footerContent = (
    <>
      <Button title="Cancel" onPress={hideModal} />
    </>
  );
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={onItemPress}
        activeOpacity={0.7}>
        <View style={styles.content}>
          <Text style={styles.jokeText}>{joke.joke}</Text>
        </View>
      </TouchableOpacity>
      <CustomModal
        isVisible={modalVisible}
        onClose={hideModal}
        title={'Explore Fun Jokes! 😂'}
        footer={footerContent}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isShowXbutton={false}>
        <Text style={styles.modalText}>{joke.joke}</Text>
      </CustomModal>
    </View>
  );
};

export default JokeItem;
