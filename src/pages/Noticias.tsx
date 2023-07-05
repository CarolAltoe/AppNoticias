import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, StyleSheet,ScrollView, Image} from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPencil, faMugSaucer, faHeart} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../styles';
import Like from '../Like';


const Noticias = ({navigation, route}:any) => {
    const [noticias, setNoticias] = useState<any[]>([]);
    const email = route.params.email;

    useEffect( () => {
        const NoticiasRef = collection(FIRESTORE_DB, "Noticias");
       // const q = query(NoticiasRef, orderBy('likes', "desc"));
        const subscriber = onSnapshot (NoticiasRef, {  
            next: (snapshot) => {
                const noticias: any[] = [];
                snapshot.docs.forEach( doc => {
                    noticias.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setNoticias(noticias);
            }
        })
        return () => subscriber();
    }, []);

    const ExcluirElemento = async (noticia: any) => {
        try{
            const colecao = collection(FIRESTORE_DB, "Noticias"); 
            const elemento = doc(colecao, noticia.id);
            await deleteDoc(elemento);
            alert ("Notícia Excluída com sucesso!");
        } catch (error){
            alert ("Falha ao excluir!" + error)
        }
    }


    const AlterarElemento = async (id: any) => {
        navigation.navigate('Alterar', {id: id, email: email});
    }

    const login = () => {
        navigation.navigate('Login');
    }

    const curtir = async (noticia: any) => {
        noticia.like++;
        const colecao = doc(FIRESTORE_DB, "Noticias", noticia.id);
        await updateDoc(colecao, noticia);
      }

    noticias.sort((a, b) => b.like - a.like);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => 
            <>
                {!email && 
                    <TouchableOpacity onPress={login}>
                    <Text style={styles.btnLog}>Fazer Login</Text>
                </TouchableOpacity>
                }   
            </>
        });
      });

    return (

        <ScrollView style={styles.scrollView}>
            <Text style={styles.h1}>Confira as principais notícias!</Text>

            {!email && 
                <View>
                    <Text style={styles.h2}>Faça login e aproveite mais funcionalidades!</Text>
                </View>    
            }

            <View style={styles.list}>
                {noticias.map((noticia) => (
                    <View style={styles.produtoItem}>
                        <Text key={noticia.id} style={styles.produtoTitle}>Título: {noticia.title}</Text>
                        <Text key={noticia.id} style={styles.h2}>{noticia.description}</Text>
                        <Text key={noticia.id} style={styles.produtoTitle}>Data de publicação: {noticia.data}</Text>
                        <Text key={noticia.id} style={styles.produtoTitle}>Foto: </Text>
                        <Image style={styles.img} source={{ uri: noticia.imagem }} resizeMode="cover" />
                       
                        {email && 
                            <View style={styles.btns}>
                                <View style={styles.btnAcoes}>
                                    
                                    {/*
                                     * <TouchableOpacity style={styles.like} onPress={() => curtir(noticia.id)}>
                                        <FontAwesomeIcon icon={faHeart} size={20}/>
                                        <Text style={styles.text}>{noticia.like} avaliação(ões)</Text> 
                                    </TouchableOpacity>
                                    */}

                                    <Like key={noticia.id} item={noticia} />
                                    
                                </View>

                                {noticia.autor == email &&

                                <> 
                                     <View style={styles.btnAcoes}>
                                     <TouchableOpacity 
                                         onPress={()=> ExcluirElemento(noticia)}
                                         style={styles.button}
                                         >
                                         <FontAwesomeIcon style={styles.buttonText} icon={ faTrash } />
                                     </TouchableOpacity>
                                 </View>
                                 <View style={styles.btnAcoes}>
                                     <TouchableOpacity
                                         onPress={()=> AlterarElemento(noticia.id)}
                                         style={styles.button}
                                         >
                                         <FontAwesomeIcon style={styles.buttonText} icon={ faPencil } />
                                     </TouchableOpacity>
                                 </View>
                                 </>
                                }
                               
                            </View>                            
                        }

                    </View>
                        
                ))} 
            </View>       
        </ScrollView>
    );
}


export default Noticias;

