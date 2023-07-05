import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { FIRESTORE_DB } from "../firebaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import {styles} from '../styles';

const Like = ({ item }) => {
    const [likedItems, setLikedItems] = useState<any>({});

    const handleLike = async (itemId: any) => {
        console.log("item" + item);
        try {
            const colecao = collection(FIRESTORE_DB, "Noticias")
            const noticia = doc(colecao, itemId);
            let updatedData = null;
            if (likedItems[itemId]) {
                updatedData = {
                    likes: --item.likes,
                };
                console.log("deslike" + updatedData.likes)
            } else {
                updatedData = {
                    likes: ++item.likes,
                };
                console.log("like" + updatedData.likes)
            }

            await updateDoc(noticia, updatedData);

            setLikedItems((prevLikedItems: any) => {
                const updatedLikedItems = {
                    ...prevLikedItems,
                    [itemId]: !prevLikedItems[itemId],
                };
                return updatedLikedItems;
            });



        } catch (error) {
            alert("Não foi possivel dar like! " + error);
        }


       
    };

    const isLiked = likedItems[item.id] || false;
    const iconColor = isLiked ? '#eb1c24' : '#9D9D9D';

    return (
            <TouchableOpacity style={{...sty.like, ...styles.button}} onPress={() => handleLike(item.id)}>
                <FontAwesomeIcon icon={faStar} size={20} color={iconColor} />
                <Text style={sty.text}>{item.likes} avaliação(ões)</Text> 
            </TouchableOpacity>
    );
};

const sty = StyleSheet.create({
    like: {
        flexGrow: 1,
        flexDirection: "row",
        gap: 8
    },
    text: {
        color: "#9D9D9D",
        fontWeight: "bold"
    }
})



export default Like;