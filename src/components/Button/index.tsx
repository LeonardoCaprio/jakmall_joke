import React, {useMemo} from 'react';
import {TouchableOpacity, Text, TouchableOpacityProps} from 'react-native';

import getStyles from './style';

interface IButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary';
  title: string;
}

const Button: React.FC<IButtonProps> = ({
  variant = 'primary',
  title,
  style,
  ...props
}) => {
  const styles = useMemo(() => getStyles(), []);

  const textColor = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
  }[variant];

  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      {...props}>
      <Text style={[styles.text, textColor]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
