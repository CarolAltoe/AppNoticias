import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import {styles} from '../../styles';


const Cadastro = ({ navigation, route }: any) => {
    const email = route.params.email;
    const [noticia, setNoticia] = useState('');
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [imagem, setImagem] = useState('');
    const [autor, setAutor] = useState('');



    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if(!result.cancelled){
            setImagem(result.uri);
        }  
    }    

    const addNoticia = async () => {
        try{
            const storageRef = ref(FIRESTORE_STORAGE, 'images/' + new Date().getTime()); 
            const response = await fetch(imagem);
            const blob = await response.blob();
                
            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);
    
            const doc = await addDoc(collection(FIRESTORE_DB, 'Noticias'), 
            { title: titulo, description: noticia,
              data: data, imagem: imageUrl, autor: email, likes: 0 });

            setNoticia('');
            setTitulo('');
            setData('');
            setImagem('');

            alert("Notícia cadastrada com sucesso!")
        }
        catch (error){
            alert("Erro ao cadastrar: " + error);
        }
       
    }

    return (
        <ScrollView style={styles.scrollView}>

            <Text style={styles.h2}>Informe o título da noticia:</Text> 
            <TextInput
                onChangeText={(t: string) => setTitulo(t)}
                value={titulo}
                style={styles.inputField}
            />

            <Text style={styles.h2}>Informe a descrição da noticia: </Text>
            <TextInput
                onChangeText={(t: string) => setNoticia(t)}
                value={noticia}
                style={styles.inputField}
                multiline={true}
                numberOfLines={5}
            />

            <Text style={styles.h2}>Informe a data do acontecimento: </Text>
            <TextInput
                onChangeText={(t: string) => setData(t)}
                value={data}
                style={styles.inputField}
            />

            <Text style={styles.h2}>Comprove a vericidade da notícia com uma imagem: </Text>
         {/*   <TextInput
                onChangeText={(t: string) => setImagem(t)}
                value={imagem}
                style={styles.inputField}
            /> */}

            {  imagem != null &&
                <Image style={{width: 50, height: 50}} source={{uri:imagem}} resizeMode="cover" />
            }
    
            <TouchableOpacity
                onPress={selectImage}
                style={styles.button}
            >
                <Text style={styles.buttonText}> Selecionar arquivo :) </Text>
            </TouchableOpacity>

            <Text> </Text>
            <Text> </Text>

            <TouchableOpacity
                onPress={() => addNoticia()}
                disabled={noticia === '' || titulo === '' || data === '' || imagem === '' }
                style={styles.button}
            >
                <Text style={styles.buttonText}>Adicionar Noticia :) </Text>
            </TouchableOpacity>

            <Text> </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Noticias', {email: email, autor: autor})}
                style={styles.button}
            >
                <Text style={styles.buttonText}> Ir para Lista :) </Text>
            </TouchableOpacity>

            <Text> </Text>

        </ScrollView>
    );
}

export default Cadastro;



