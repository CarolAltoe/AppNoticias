import React, { useState, useLayoutEffect, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, FlatList, TextInput} from 'react-native';
import {styles} from '../../styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
//import BotaoDireito from '../components/btDireito';
//import Logo from '../components/Logo';

function HomeScreen () {
  const navigation = useNavigation();
  const route = useRoute();
  const name = route.params?.name ?? 'visitante';
  const email = route.params.email;
  const [item, setItem] = useState();
  const [list, setList] = useState([]);

  const inserirItem = () => {
    list.push(item);
    setList([...list]);
    setItem ('');
  };

  const logout = () => {
    signOut(auth).then(() => {
      navigation.navigate('Login');
      console.log("saiu com sucesso");
    }).catch((error) => {
      console.log("erro ao sair" + error);
    });
  }

  const cadastrar = () => {
    navigation.navigate('Cadastro', {email: email});
  }
  const listar = () => {
    navigation.navigate('Noticias', {email: email});
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        <TouchableOpacity onPress={logout}>
          <Text style={styles.btnLog}>Sair</Text>
        </TouchableOpacity>
    });
  });

  return(
     <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.h1}> Seja bem-vindo {name}</Text>

        <Text style={styles.h2}>
          Aqui você fica por dentro das principais notícias!
        </Text>

{/*
        <TextInput
          style={styles.inputField}
          value={item}
          onChangeText={(t) => setItem(t)}
        />
*/}
        
        <TouchableOpacity style={styles.button} onPress={cadastrar}>
          <Text style={styles.buttonText}>Cadastar Notícia</Text>        
        </TouchableOpacity> 

        <Text> </Text>

        <TouchableOpacity style={styles.button} onPress={listar}>
          <Text style={styles.buttonText}>Exibir notícias</Text>        
        </TouchableOpacity>

        <FlatList
          style={styles.list}
          data={list}
          renderItem = {({item}) => (
            <View style={styles.produtoItem}>
              <Text style={styles.produtoTitle}> {item}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
