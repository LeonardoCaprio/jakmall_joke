import colors from '@design/colors';
import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      padding: 16,
      borderRadius: 10,
      marginBottom: 12,
      marginHorizontal: 8,
      borderLeftWidth: 4,
      borderLeftColor: colors.blue,
      shadowColor: colors.black,
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
      color: colors.darkGrey2,
      lineHeight: 22,
    },
    modalText: {
      fontSize: 16,
      lineHeight: 22,
      marginBottom: 12,
    },
  });
