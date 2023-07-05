import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollView:{
    flex: 1,
    backgroundColor: "#E4FFC4",
    paddingVertical: 50, 
    paddingHorizontal: 30,
  },

  container:{
    //alignItems: "left",
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center" 
  },

  h1:{
    color: "#8B4796",
    fontSize: 20,
    paddingVertical: 10,
    alignSelf:"center",
    fontWeight: 'bold'
  },

  h2:{
    color: "#789656",
    fontSize: 15,
    paddingVertical: 10
  },

  text: {
    textAlign: "center",
    fontStyle: "italic"
  },

  inputField:{
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#789656",
    padding: 10,
    fontSize: 15,
    marginVertical: 10
  },

  btns:{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: "row",
  },

  btnAcoes:{
    margin: 10,
    alignItems: 'center',
  },

  button:{
    width: "100%",
    backgroundColor: "#8B4796",
    padding: 10,
    borderRadius: 5,
  },

  buttonText:{
    color: "#FFF",
    fontSize: 16,
    alignSelf:"center",
  },

  btnLog:{
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    color: "#8B4796",
  },

  produtoItem:{
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },

  produtoTitle:{
    color: "#8B4796",
  },

  list:{
    backgroundColor: "#C1E498"
  },

  img: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginTop: 16,
  },

  like: {
    flexGrow: 1,
    flexDirection: "row",
    gap: 8
  },
  textIcon: {
    color: "#9D9D9D",
    fontWeight: "bold"
  }
});