import colors from '@design/colors';
import {StyleSheet} from 'react-native';

export default () =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      marginVertical: 8,
      backgroundColor: colors.white,
      borderRadius: 16,
      shadowColor: colors.black,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
      zIndex: 10,
    },
    textContainer: {
      flex: 1,
    },
    idText: {
      fontSize: 14,
      color: colors.blue,
      fontWeight: '600',
    },
    categoryName: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.darkGrey2,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    primaryButton: {
      backgroundColor: colors.button.primaryButton,
    },
    secondaryButton: {
      backgroundColor: colors.button.secondaryButton,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.white,
    },
    secondaryText: {
      color: colors.darkGrey2,
    },
    expandedContainer: {
      backgroundColor: colors.lightGrey2,
      borderRadius: 8,
      marginTop: -24,
      marginBottom: 16,
      padding: 12,
      paddingTop: 35,
      zIndex: 0,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 25,
      paddingBottom: 15,
    },
    emptyText: {
      marginTop: 10,
      color: colors.black,
      fontSize: 13,
      fontWeight: '600',
      textAlign: 'center',
    },
    emptyImage: {
      width: 80,
      height: 80,
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.darkGrey2,
      marginBottom: 7,
      marginTop: 10,
    },
    emptySubtitle: {
      fontSize: 13,
      color: colors.darkGrey,
      textAlign: 'center',
      lineHeight: 18,
    },
    loadingFooter: {
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addMoreButton: {
      marginTop: 12,
      alignSelf: 'center',
      paddingHorizontal: 16,
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    loadingText: {
      marginTop: 8,
      color: colors.black,
      fontSize: 14,
    },
    footerLoading: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      flexDirection: 'row',
    },
  });
