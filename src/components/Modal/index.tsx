import If from '@components/If';
import React, {ReactNode, useMemo} from 'react';
import {View, Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import Modal from 'react-native-modal';
import style from './style';

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
  const styles = useMemo(() => style(), []);

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

export default CustomModal;
