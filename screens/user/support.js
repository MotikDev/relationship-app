import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Support() {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={styles.topImg}>
          <AntDesign name="arrowleft" size={32} color="#706e68" />
          {/* <Image source={require('../images/images.jpg')} borderRadius={20} style={{height:40, width:40}} /> */}
        </View>
        <Text style={styles.title}> Support </Text>
      </View>

      <View style={styles.hint}>
        <Text>Please leave a message below to get in touch with us.</Text>
      </View>

      <View>
        <Text style={styles.message}>Message</Text>
        <TextInput style={styles.input} />
        <TouchableOpacity style={styles.sendBtn}>
            <Text style={{ fontSize: 18, color: 'white', alignSelf: 'center', padding: 5, }}>Send</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  circle: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 15,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    // width:Dimensions.get('window').width
  },
  topImg: {
    flex: 1,
  },
  title: {
    flex: 10,
    textAlign: 'center',
    fontSize: 25,
    marginLeft: -70,
  },
  hint:{
    marginVertical: 20,
    marginHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center'
  },
  message: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  sendBtn: {
    backgroundColor: '#3e60ab',
    // borderWidth: 2,
    // borderColor: 'black',
    width: 150,
    height: 50,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    elevation: 5
  }
});
