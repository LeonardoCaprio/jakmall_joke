import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Joke} from '@model/types';
import CustomModal from '@components/Modal';
import Button from '@components/Button';

interface IJokeItemProps {
  joke: Joke;
}

const JokeItem: React.FC<IJokeItemProps> = ({joke}) => {
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
        title={`Detail Joke for ${joke.category} Category`}
        footer={footerContent}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isShowXbutton={false}>
        <Text style={styles.modalText}>{joke.joke}</Text>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  jokeText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
});

export default JokeItem;
