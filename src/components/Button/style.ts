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
        backgroundColor: '#007AFF',
      },
      secondary: {
        backgroundColor: '#E0E0E0',
      },
      icon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E0E0E0',
      },
      text: {
        fontSize: 14,
        fontWeight: '600',
      },
      primaryText: {
        color: 'white',
      },
      secondaryText: {
        color: '#000',
      },
  });
