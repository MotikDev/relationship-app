import { StatusBar } from 'expo-status-bar';
import React, {useMemo, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

export default function Register({navigation}) {
  const [getFirstName, setFirstName] = useState(''); 
  const [getLastName, setLastName] = useState(''); 
  const [getEmail, setEmail] = useState(''); 
  const [getPassword, setPassword] = useState(''); 
  const [getConfirmPass, setConfirmPass] = useState(''); 

  const nextPage = () => {
    AsyncStorage.setItem('getFirstName', getFirstName);
    AsyncStorage.setItem('getLastName', getLastName);
    AsyncStorage.setItem('getEmail', getEmail);
    AsyncStorage.setItem('getPassword', getPassword);

    // console.log(AsyncStorage.getItem('getFirstName'));
    return navigation.navigate('Register ');
  }

  const [getDisable, setDisable] = useState(true);
  const [getColor, setColor] = useState();

  useMemo(()=> {
    if (getFirstName == '' || (getFirstName.includes(' ')) || getLastName == '' || getLastName.includes(' ') || getEmail == '' || getEmail.includes(' ') || getPassword == '') {
      setDisable(true);
      setColor(styles.disabledText);
    } else {
      if (getPassword == getConfirmPass) {
        setDisable(false);
        setColor(styles.nextText);
      }
      else {
        setDisable(true);
        setColor(styles.disabledText);
      }
    }
  }, [getFirstName, getLastName, getEmail, getPassword, getConfirmPass]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Register </Text>

      <Text style={styles.subTitle}>  First Name </Text>
      <TextInput onChangeText={setFirstName} style={styles.inputs} placeholder='First Name' />

      <Text style={styles.subTitle}>  Last Name </Text>
      <TextInput onChangeText={setLastName} style={styles.inputs} placeholder='Last Name' />

      <Text style={styles.subTitle}>  Email </Text>
      <TextInput onChangeText={setEmail} style={styles.inputs} placeholder='Email' />

      <Text style={styles.subTitle}>  Password </Text>
      <TextInput onChangeText={setPassword} style={styles.inputs} secureTextEntry placeholder='Password' />

      <Text style={styles.subTitle}>  Confirm Password </Text>
      <TextInput onChangeText={setConfirmPass} style={styles.inputs} secureTextEntry placeholder='Confirm Password' />

      <TouchableOpacity disabled={getDisable} style={styles.nextBtn} onPress={()=>nextPage()}>
        <Text style={getColor}> Next </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    paddingTop: 40,
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  subTitle: {
    marginTop: 20,
    paddingLeft: 20,
    alignContent: "flex-start",
  },
  inputs: {
    marginTop: 5,
    marginLeft: 20,
    paddingLeft: 8,
    // marginRight: 50,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 100,
    width: 200
  },
  nextBtn: {
    position: 'absolute',
    bottom: 40,
    right: 5,
    marginRight: 25,
    alignSelf: "flex-end",
  },
  nextText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  disabledText: {
    fontWeight: "bold",
    fontSize: 20,
    color: 'grey',
  }
});
