import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import { green } from 'ansi-colors';

export default function App() {

  const [name, setName] = useState('Sem usuário');
  const [email, setEmail] = useState('Sem usuário');
  const [photoUrl, setPhotoUrl] = useState('Sem usuário');
  const [accessToken, setAccessToken] = useState('Sem usuário');
  const [type, setType] = useState('Sem usuário');

  const config = {
      androidClientId: '149127590121-22lgkuovb1an7qjvcij1vtkeec3aj4c9.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync(config);
  
      if (result.type === 'success') {

        setName(result.user.name);
        setEmail(result.user.email);
        setPhotoUrl(result.user.photoUrl);
        setAccessToken(result.accessToken);
        setType(result.type);

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  async function logOutAsync (){
    if(type === 'success'){
      await Google.logOutAsync({ accessToken, ...config });

      setEmail('Sem usuário');
      setName('Sem usuário');
      setPhotoUrl('Sem usuário');
      setType('Sem usuário');
      setType('Sem usuário');
    }
    else{
      alert('Sem usuário logado');
    }
  }

  return (
    
    <View style={styles.container}>
      
      <View style={styles.userContainer}>

        <Image style={styles.userPhoto} source={{ uri: photoUrl }}/>

        <View style={styles.textInformationContainer}>
          <Text style={{flex: 1, fontWeight: "bold", fontSize: 16}}>Name:</Text>
          <Text style={{flex: 2}}>{name}</Text>
        </View>

        <View style={styles.textInformationContainer}>
          <Text style={{flex: 1, fontWeight: "bold", fontSize: 16}}>Email:</Text>
          <Text style={{flex: 2}}>{email}</Text>
        </View>

        <View style={styles.textInformationContainer}>
          <Text style={{flex: 1, fontWeight: "bold", fontSize: 16}}>Photo URL:</Text>
          <Text style={{flex: 2}}>{photoUrl}</Text>
        </View>        
        
      </View>

      <View style={styles.buttonGroupContainer}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={signInWithGoogleAsync}>
            <AntDesign name="google" size={32} color="white" />
            <Text style={styles.buttonText}>Sign-in</Text>
          </TouchableOpacity>
        </View>

        
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={logOutAsync}>
              <AntDesign name="google" size={32} color="white" />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  userContainer:{
    flex: 4,
    width: '100%',
    marginVertical: 10,
    padding: 10,
  },
  buttonGroupContainer:{
    flex: 1,
    width: '100%',
    flexDirection: "row",
    padding: 10,
  },
  buttonContainer:{
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  button:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10
  },
  buttonText:{
    marginLeft: 10,
    color: 'white'
  },
  userPhoto:{
    flex: 2,
    resizeMode: "center",
    borderRadius: 200
  },
  textInformationContainer:{
    flex: 1,
    flexDirection: "row",
  }
});
