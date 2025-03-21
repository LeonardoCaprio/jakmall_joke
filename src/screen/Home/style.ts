import colors from '@design/colors';
import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightGrey,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    bodySection: {
      flex: 1,
      height: 'auto',
      paddingTop: 20,
      marginHorizontal: 12,
      paddingHorizontal: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -70,
    },
    loadingText: {
      alignItems: 'center',
      marginTop: 10,
    },
    loadingTextTitle: {
      fontWeight: '700',
      fontSize: 16,
      marginBottom: 7,
    },
    loadingImage: {
      width: 100,
      height: 100,
    },
    bodyTitle: {
      fontSize: 20,
      fontWeight: '500',
      paddingBottom: 10,
    },
  });
