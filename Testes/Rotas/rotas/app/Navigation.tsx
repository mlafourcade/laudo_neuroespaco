import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Link } from 'expo-router';

// Tipagem para a navegação
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Laudos'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const Navigation: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Navigation</Text>
      <Link href="/teste">
        <Button title="Ir para Teste" />
      </Link>
    </View>
  );
};

