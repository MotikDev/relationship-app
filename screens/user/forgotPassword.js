import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';

export default function ForgotPassword({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.marital} >
        <Text style={styles.marb} >Marital</Text>
        <Text style={styles.marb} >Breakthrough</Text>
      </View>
      <View style={styles.background}>
        <Text style={{fontWeight: 'bold', fontSize: 23, marginLeft: 20, marginTop: 13}}> Reset your password </Text>
        
        <View style={styles.details}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput style={styles.input} placeholder='Email' placeholderTextColor='#a9a9a9' />
        </View>

        <TouchableOpacity style={styles.loginBtn}>
            <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center', padding: 5 }}>Reset my password</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marital: {
    marginLeft: 20,
    marginTop: 30,
  },
  marb: {
    fontSize: 23,
  },
  background: {
    // marginTop: 190,
    width: Dimensions.get('window').width,
    height: 355,
    borderRadius: 60,
    backgroundColor: '#C4C4C4',
    position: 'absolute',
    bottom: -50,
  },
  details: {
    bottom: 200,
    position: 'absolute',
    // alignItems: 'center'
  },
  inputTitle: {
    marginLeft: 25,
    marginTop: 10,
    fontSize: 18,
    marginBottom: 3
  },
  input: {
    marginTop: 5,
    marginHorizontal: 20,
    // marginLeft: 20,
    // marginRight: 20,
    paddingLeft: 8,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 100,
    width: Dimensions.get('window').width - 40,
  },
  loginBtn: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'black',
    position: 'absolute',
    bottom: 100,
    borderRadius: 100,
    alignSelf: "center",
    elevation: 5
  },
});
