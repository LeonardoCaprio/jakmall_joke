import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    sections: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 23,
      fontWeight: 'bold',
      paddingVertical: 10,
    },
    description: {
      textAlign: 'center',
    },
  });
