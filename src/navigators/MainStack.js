import React from 'react';
import  LoginScreen  from '../pages/Login';
import  HomeScreen  from '../pages/Home';
import  Noticias  from '../pages/Noticias';
import { createStackNavigator } from '@react-navigation/stack';
import {styles} from '../../styles';
import Cadastro from '../pages/Cadastro';
import Alterar from '../pages/Alterar';

const MainStack = createStackNavigator();

export default () => {
  return(
    <MainStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: "#D898E3",
          height: 100,
        },
        headerTitleStyle:{
            color: "#fff",
            fontWeight: 'bold',
        },
      }}
    >

      <MainStack.Screen name="Login" component={LoginScreen}/>
      <MainStack.Screen name="Home" component={HomeScreen}/>
      <MainStack.Screen name="Cadastro" component={Cadastro}/>
      <MainStack.Screen name="Noticias" component={Noticias}/>
      <MainStack.Screen name="Alterar" component={Alterar}/>

    </MainStack.Navigator>
  );
};