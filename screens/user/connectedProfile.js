import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ConnectedProfile({navigation}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image source={require('../images/MattQueérée_Alida2.jpg')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height/3, position: 'absolute', borderBottomLeftRadius:30,  borderBottomRightRadius:30 }}/>
          <View style={{flexDirection: 'row',  marginTop: 25, marginLeft: 15,  justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <AntDesign name="arrowleft" size={32} color="black"  style={{backgroundColor: 'white', paddingHorizontal: 10, alignSelf: 'center',}}/>
            </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{marginRight: 15, borderWidth: 2, borderColor: 'white', paddingHorizontal: 11, color: 'white', backgroundColor: '#464A5F', textAlign: 'center', textAlignVertical: 'center'}}>
                  <Ionicons name="ios-more" size={24} color="white" />
                </Text>
              </TouchableOpacity>
          </View>
          <View style={{marginTop: (Dimensions.get('window').height/3) - 50, position: 'absolute', alignSelf: 'center'}}>
            <TouchableOpacity style={styles.connectBtn}>
              <Text style={styles.connectText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        </View>


        <Text style={styles.name} >Adebisi Adebayo</Text>
        <View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>Single</Text>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>BSc</Text>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>Employed</Text>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>
              <EvilIcons name="location" size={15} color="black" />
              Lagos, Nigeria
            </Text>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>Age</Text>
              <Text style={styles.age}>25</Text>
          </View>
        </View>

        <Text style={styles.email}>Ogun State, Nigeria</Text>
        <Text style={styles.email}>AA</Text>


        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Spouse Traits</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Age</Text>
              <Text style={styles.cardRowVal}>Over 25</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Location</Text>
              <Text style={styles.cardRowVal}>Nigeria</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Nationality</Text>
              <Text style={styles.cardRowVal}>Nigeria</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>State of Origin</Text>
              <Text style={styles.cardRowVal}>Null</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Qualification</Text>
              <Text style={styles.cardRowVal}>BSc</Text>
            </View>
          </View>
        </View>



        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectBtn: {
    backgroundColor: '#2A9EF5',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 30,
  },
  connectText: {
    color: 'white',
    fontWeight: 'bold'
  },
  name: {
    marginTop: (Dimensions.get('window').height/4),
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  mainDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  email: {
    marginLeft: 10,
    marginVertical: 5,
  },
  age: {
    marginRight: 25,
    marginVertical: 5,
  },
  card: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').height / 3,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginVertical: 30,
    alignSelf: 'center'
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  cardHeaderText: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 20,
    color: 'grey'
  },
  cardBody: {
    paddingVertical: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // margin: 3,
  },
  cardRowProp: {
    marginLeft: 15,
    marginVertical: 3
  },
  cardRowVal: {
    marginRight: 15,
    marginVertical: 3,
    fontSize: 10,
    alignSelf: 'center'
  },
});
