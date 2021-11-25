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

export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [savedUserData, setSavedUserData] = useState({});

  const onSubmit = () => {
    if (name && password && mobile && password) {
      RegisterAPI({ name, password, email, mobile, userName:'', userType:'doctor' });
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

  const RegisterAPI = async (reqObj) => {
    console.log(JSON.stringify(reqObj));
    try {
      const api = await fetch('http://healthinhands.in/devdoctor/save', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      });
      if (api.status === 200) {
        const response = await api.json();
        storeData(JSON.stringify(response.result));
        console.log('response', response.result);
        Alert.alert('User Registerd in Successfully');
        props.navigation.navigate('Otp');
      } else {
        Alert.alert('You Have entered wrong Credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register</Text>
      <TextInput
        placeholder={'Name'}
        style={styles.textBox}
        defaultValue={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder={'Email'}
        style={styles.textBox}
        defaultValue={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder={'Mobile'}
        style={styles.textBox}
        defaultValue={mobile}
        onChangeText={(text) => setMobile(text)}
      />
      <TextInput
        placeholder={'Password'}
        style={styles.textBox}
        defaultValue={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title={'Register'}
        style={{ padding: 20 }}
        onPress={() => onSubmit()}
      />
      <Text>have an Account?</Text>
      <Button title="Login" onPress={()=>props.navigation.navigate('Login')}/>
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
