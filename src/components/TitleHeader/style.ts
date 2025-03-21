import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    sections: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    title: {
      fontSize: 23,
      fontWeight: 'bold',
      paddingVertical: 10,
    },
    description: {
      textAlign: 'center',
      lineHeight: 20,
    },
  });
