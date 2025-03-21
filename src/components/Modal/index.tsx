import If from '@components/If';
import React, {ReactNode} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Modal from 'react-native-modal';

type Animation =
| 'bounce'
| 'flash'
| 'jello'
| 'pulse'
| 'rotate'
| 'rubberBand'
| 'shake'
| 'swing'
| 'tada'
| 'wobble'
| 'bounceIn'
| 'bounceInDown'
| 'bounceInUp'
| 'bounceInLeft'
| 'bounceInRight'
| 'bounceOut'
| 'bounceOutDown'
| 'bounceOutUp'
| 'bounceOutLeft'
| 'bounceOutRight'
| 'fadeIn'
| 'fadeInDown'
| 'fadeInDownBig'
| 'fadeInUp'
| 'fadeInUpBig'
| 'fadeInLeft'
| 'fadeInLeftBig'
| 'fadeInRight'
| 'fadeInRightBig'
| 'fadeOut'
| 'fadeOutDown'
| 'fadeOutDownBig'
| 'fadeOutUp'
| 'fadeOutUpBig'
| 'fadeOutLeft'
| 'fadeOutLeftBig'
| 'fadeOutRight'
| 'fadeOutRightBig'
| 'flipInX'
| 'flipInY'
| 'flipOutX'
| 'flipOutY'
| 'lightSpeedIn'
| 'lightSpeedOut'
| 'slideInDown'
| 'slideInUp'
| 'slideInLeft'
| 'slideInRight'
| 'slideOutDown'
| 'slideOutUp'
| 'slideOutLeft'
| 'slideOutRight'
| 'zoomIn'
| 'zoomInDown'
| 'zoomInUp'
| 'zoomInLeft'
| 'zoomInRight'
| 'zoomOut'
| 'zoomOutDown'
| 'zoomOutUp'
| 'zoomOutLeft'
| 'zoomOutRight';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  animationIn?: Animation;
  animationOut?: Animation;
  backdropOpacity?: number;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  bodyStyle?: ViewStyle;
  footerStyle?: ViewStyle;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  isShowXbutton: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
  backdropOpacity = 0.5,
  containerStyle,
  headerStyle,
  titleStyle,
  bodyStyle,
  footerStyle,
  footer,
  isShowXbutton,
  closeOnBackdrop = true,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeOnBackdrop ? onClose : undefined}
      onBackButtonPress={onClose}
      backdropOpacity={backdropOpacity}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver
      style={styles.modal}>
      <View style={[styles.container, containerStyle]}>
        <If condition={Boolean(title)}>
          <View style={[styles.header, headerStyle]}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <If condition={isShowXbutton}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </If>
          </View>
        </If>

        <View style={[styles.body, bodyStyle]}>{children}</View>

        <If condition={Boolean(footer)}>
          <View style={[styles.footer, footerStyle]}>{footer}</View>
        </If>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '85%',
    maxWidth: 500,
    overflow: 'hidden',
    shadowColor: '#000',
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
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  body: {
    padding: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CustomModal;
