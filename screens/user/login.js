import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import AuthContext from "./authContext";

export default function Login({navigation, route}) {
  // console.log(AuthContext);
  // const {signIn} = React.useContext(route.params.context);
  const {signIn} = React.useContext(AuthContext);
  const [getUsername, setUsername] = React.useState('');
  const [getPassword, setPassword] = React.useState('');


  return (
    <View style={styles.container}>
      <View style={styles.marital} >
        <Text style={styles.marb} >Marital</Text>
        <Text style={styles.marb} >Breakthrough</Text>
      </View>
      <View style={styles.background}>
        <Text style={{fontWeight: 'bold', fontSize: 23, marginLeft: 20, marginTop: 13}}> Please sign in </Text>
        
        <View style={styles.details}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput onChangeText={setUsername} style={styles.input} placeholder='Email' placeholderTextColor='#a9a9a9' />

          <Text style={styles.inputTitle}>Password</Text>
          <TextInput onChangeText={setPassword} style={styles.input} secureTextEntry placeholder='Password' placeholderTextColor='#a9a9a9' />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={()=> signIn({getUsername, getPassword})}>
            <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center', padding: 5, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgot}> Forgot Password </Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
            <Text style={styles.signUp}> Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    // fontWeight: 'bold',
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
    marginTop: 7
  },
  inputTitle: {
    marginLeft: 25,
    marginTop: 10,
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
    marginTop: 20,
    borderRadius: 100,
    alignSelf: "center",
    elevation: 5
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingLeft: 20
  },
  forgot: {
    marginLeft: 10,
    textDecorationLine: 'underline',
    fontSize: 10,
  },
  signUp: {
    textDecorationLine: 'underline',
    fontSize: 10,
    marginRight: 40,
  }
});
