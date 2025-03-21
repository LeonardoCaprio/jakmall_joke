import colors from '@design/colors';
import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: colors.white,
      borderRadius: 10,
      width: '85%',
      maxWidth: 500,
      overflow: 'hidden',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.button.secondaryButton,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.darkGrey2,
      flex: 1,
    },
    closeButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    closeButtonText: {
      fontSize: 20,
      color: colors.blue,
      lineHeight: 24,
      textAlign: 'center',
    },
    body: {
      padding: 16,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.button.secondaryButton,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });
