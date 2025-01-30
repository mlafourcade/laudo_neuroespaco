import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importação das páginas
import { ReportScreen } from './src/pages/ReportScreen';
import { PacientesScreen } from './src/pages/PacientesScreen';
import { TopicosScreen } from './src/pages/TopicosScreen';
import { RespostasScreen } from './src/pages/RespostasScreen';
import { TextosScreen } from './src/pages/TextosScreen';
import { ModelosScreen } from './src/pages/ModelosScreen';

// Exporte o tipo para que ele possa ser importado em outras telas
export type RootStackParamList = {
  Laudos: undefined;
  Details: undefined;
  Pacientes: undefined;
  Topicos: undefined;
  Respostas: undefined;
  Textos: undefined;
  Modelos: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

// Definindo as telas do Drawer
const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Laudos" component={ReportScreen} />
      <Drawer.Screen name="Pacientes" component={PacientesScreen} />
      <Drawer.Screen name="Topicos" component={TopicosScreen} />
      <Drawer.Screen name="Respostas" component={RespostasScreen} />
      <Drawer.Screen name="Textos" component={TextosScreen} />
      <Drawer.Screen name="Modelos" component={ModelosScreen} />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;

