import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import {styles} from '../../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPencil, faMugSaucer, faTachometerFast } from '@fortawesome/free-solid-svg-icons';


const Alterar = ({ navigation, route }: any) => {

    const  id  = route.params.id;
    const email = route.params.email;
    const [noticia, setNoticia] = useState<any>({});
    const [imagem, setImagem] = useState<any>({});

    const fetchNoticia = async () => {
        const colecao = doc(FIRESTORE_DB, 'Noticias', id);
        const colecaoSnapshot = await getDoc(colecao);
        if (colecaoSnapshot.exists()) {
            setNoticia({
                id: colecaoSnapshot.id,
                ...colecaoSnapshot.data()
            });
        }

    }

    useEffect(() => { fetchNoticia() }, []);

    const handleAtualizaTexto = (key: string, t: string) => {
        setNoticia({
            ...noticia,
            [key]: t
        });
    };

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

    const handleUpdateNoticia = async () => {
    
        const storageRef = ref(FIRESTORE_STORAGE, 'images/' + new Date().getTime());
        const response = await fetch(imagem);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);

        handleAtualizaTexto("imagem", url);
    
        const colecao = doc(FIRESTORE_DB, 'Noticias', id);
        await updateDoc(colecao, noticia);
        navigation.navigate('Noticias', {email: email});
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.list}>
                <View style={styles.produtoItem}>
                    <Text style={styles.h2}>Informe o novo título da noticia:</Text> 
                    <TextInput
                            value={noticia.title}
                            onChangeText={(t) => handleAtualizaTexto('title', t)}
                            style={styles.inputField}
                    />

                    <Text style={styles.h2}>Descreva a noticia: </Text>
                    <TextInput
                            onChangeText={(t: string) => handleAtualizaTexto('description', t)}
                            value={noticia.description}
                            style={styles.inputField}
                            multiline={true}
                            numberOfLines={5}
                    />
                    <Text style={styles.h2}>Informe a nova data de publicação/alteração: </Text>
                    <TextInput
                            onChangeText={(t: string) => handleAtualizaTexto('data', t)}
                            value={noticia.data}
                            style={styles.inputField}
                    />

                    <Text key={noticia.id} style={styles.produtoTitle}>Foto atual:  </Text>
                    <Image style={{width: 50, height: 50}} source={{uri:noticia.imagem}} />
                       
                    <Text style={styles.h2}>Insira a nova imagem: </Text>
                       {/* <TextInput
                            onChangeText={(t: string) => selectImage()}
                            value={noticia.imagem}
                            style={styles.inputField}
    />*/}

                        {  imagem != null &&
                            <Image style={{width: 50, height: 50}} source={{uri:imagem}} />
                        }
                
                        <TouchableOpacity onPress={selectImage} style={styles.button} >
                            <Text style={styles.buttonText}> Selecionar arquivo :) </Text>
                        </TouchableOpacity>
                        
                        
                    </View>
                       
                    
            </View> 

            <Text> </Text>
            <Text> </Text>

            <TouchableOpacity style={styles.button}  onPress={handleUpdateNoticia} >
                <Text style={styles.buttonText}> 
                    <FontAwesomeIcon style={styles.buttonText} icon={faPencil} /> Alterar
                </Text>
            </TouchableOpacity>

            <Text> </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Noticias', {email: email})}
                style={styles.button}
            >
                <Text style={styles.buttonText}> Ir para Lista :) </Text>
            </TouchableOpacity>

            <Text> </Text>

        </ScrollView>
    );
}

export default Alterar;

