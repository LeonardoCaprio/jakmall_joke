import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import style from './style';

interface ITitleHeaderProps {
  title: string;
  description: string;
}

const TitleHeader: React.FC<ITitleHeaderProps> = ({title, description}) => {
  const styles = useMemo(() => style(), []);
  return (
    <View style={styles.sections}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default TitleHeader;
