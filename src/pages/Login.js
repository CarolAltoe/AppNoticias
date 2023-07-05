import React, {useState, useLayoutEffect} from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import {styles} from '../../styles';
//import Constants from 'expo-constants';
import {useNavigation} from '@react-navigation/native';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import {auth } from "../../firebaseConfig";

function LoginScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const entrar = () => {
    navigation.navigate('Noticias', {name: name});
    setName('');
  }

  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider).then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        navigation.navigate('Home', {name: user.displayName, email: user.email});
        console.log("log com sucesso");       
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("erro ao logar");
    });
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

      <Image
        style={styles.logo}
        source={require('../../assets/news.png')}
      />
      
      <Text style={styles.h1}>App Noticias</Text>
      <Text style={styles.h2}>Informe seu nome: </Text>
      <TextInput
        style={styles.inputField}
        value={name}
        onChangeText={(t) => setName(t)}
      />

      <TouchableOpacity style={styles.button} onPress={entrar}>
          <Text style={styles.buttonText}>Entrar sem realizar Login</Text>        
        </TouchableOpacity> 

        <Text> </Text>

      <TouchableOpacity style={styles.button} onPress={loginGoogle}>
          <Text style={styles.buttonText}>Autenticar com Google</Text>        
        </TouchableOpacity>   
      </View>
    </ScrollView>
  );
}

export default LoginScreen;


{/**

 const userInfo = () => {
          onAuthStateChanged (auth, user) = {
            if (user){
              const userId = user.providerId;
              const username = user.displayName;
              const userEmail = user.emailVerified;
              const token = user.refreshToken;
            }
          }
        }
        navigation.navigate('Home', {userInfo: user});*/}

