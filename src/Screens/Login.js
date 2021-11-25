import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as styles from './assets/styles';

export default function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [savedUserData, setSavedUserData] = useState({});

  const onSubmit = () => {
    if (userName && password) {
      loginAPI({ userName, password });
    } else {
      Alert.alert('Please enter credentials');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@userData', value);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      if (value !== null) {
        setSavedUserData(JSON.parse(value));
      }
    } catch (e) {
      console.log('Error fetching saved data');
    }
  };

  const loginAPI = async (reqObj) => {
    console.log(JSON.stringify(reqObj));
    try {
      const api = await fetch('http://healthinhands.in/devdoctor/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      });
      if (api.status === 200) {
        const response = await api.json();
        storeData(JSON.stringify(response.result));
        Alert.alert('User logged in Successfully');
        props.navigation.navigate('Dashboard');
      } else {
        Alert.alert('You Have entered wrong Credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Welcome User Login</Text>
      <TextInput
        placeholder={'UserName'}
        style={styles.textBox}
        defaultValue={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        placeholder={'Password'}
        style={styles.textBox}
        defaultValue={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title={'Login'}
        style={{ padding: 20 }}
        onPress={() => onSubmit()}
      />
      <Text>New User?</Text>
      <Button title="Register" onPress={()=>props.navigation.navigate('Register')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  headerText: { fontSize: 30, fontWeight: 'bold', fontFamily: 'calibri' },
  textBox: {
    borderColor: '#FFF',
    borderBottomColor: '#CCCC',
    borderWidth: 1,
    minWidth: '90%',
    height: 50,
    marginBottom: 20,
  },
});
