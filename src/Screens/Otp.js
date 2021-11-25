import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Otp = (props) => {
  const [otpValue, setOtpValue] = useState('');
  const [savedUserData, setSavedUserData] = useState({});
  useEffect(()=>{
    getData();
  },[])
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
  const onSubmit = () => {
    otpValue && savedUserData.otpInfo.otp === otpValue
      ? props.navigation.navigate('Dashboard')
      : Alert.alert('Enter OTP is incorrect. Please try again');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Welcome User Login</Text>
      <TextInput
        placeholder={'Enter OTP'}
        style={styles.textBox}
        defaultValue={otpValue}
        onChangeText={(text) => setOtpValue(text)}
      />
      <Button
        title={'Verify'}
        style={{ padding: 20 }}
        onPress={() => onSubmit()}
      />
    </View>
  );
};

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

export default Otp;
