import colors from '@design/colors';
import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      primary: {
        backgroundColor: colors.button.primaryButton,
      },
      secondary: {
        backgroundColor: colors.button.secondaryButton,
      },
      icon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.button.secondaryButton,
      },
      text: {
        fontSize: 14,
        fontWeight: '600',
      },
      primaryText: {
        color: colors.white,
      },
      secondaryText: {
        color: colors.black,
      },
  });
