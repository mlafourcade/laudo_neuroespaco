import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

// Tipagem para a navegação
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Laudos'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const ReportScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

