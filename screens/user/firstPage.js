import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function FirstPage({ navigation }) {
        return (
            <View style={styles.container}>
              <Text>Living Faith Church</Text>
        
              <Text style={styles.cta1}>Fast</Text>
              <Text style={styles.cta2}>track to relationship</Text>
              <Text style={styles.cta2}>connections</Text>
        
              <TouchableOpacity style={styles.regBtn} onPress={() => navigation.navigate('Register')}>
                <Text style={{ fontSize: 15, color: 'black' }}>Register</Text>
              </TouchableOpacity>
        
              <TouchableOpacity style={styles.logBtn} onPress={() => navigation.navigate('Login')}>
                <Text style={{ fontSize: 15, color: 'white' }}>Login</Text>
              </TouchableOpacity>
        
              <StatusBar style="auto" />
            </View>
        );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta1: {
    textAlign: "center",
    marginTop: 130,
    fontSize: 25,
    width: 200
  },
  cta2: {
    textAlign: "center",
    fontSize: 25,
    width: 300
  },
  regBtn: {
    backgroundColor: '#ffff',
    borderWidth: 2,
    borderColor: 'black',
    width: 150,
    marginTop: 80,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 3
  },
  logBtn: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'black',
    width: 150,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 3,
    shadowRadius: 30,
    shadowColor: 'black',
    shadowOpacity: 50,
    elevation: 5
  },
});
