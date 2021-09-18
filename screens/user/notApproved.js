import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AuthContext from "./authContext";

export default function NotYetApproved() {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.mainText}>NOT</Text>
        <Text style={styles.mainText} >YET</Text>
        <Text style={styles.mainText} >APPROVED</Text>

        <TouchableOpacity style={{backgroundColor: 'grey', paddingHorizontal: 5, paddingVertical: 2, borderColor: 'black', borderWidth: 1}} onPress={() => signOut()}>
          <Text style={{color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noteGrp}>
        <Text > Note: </Text>
        <Text > We will send you a notification when your account has been approved.</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  noteGrp: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 60,
    marginBottom: 20
  }
});
