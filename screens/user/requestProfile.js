import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from "./authContext";


export default function RequestProfile({navigation, route}) {

  const {connectMe} = useContext(AuthContext);
  const showProfile = route.params.result.Profile;

  const [getToken, setToken] = useState('');
  AsyncStorage.getItem('userToken', (err, token) => {
    setToken(token);
  });

  const rejectRequest = async () => {
    // alert('Rejected');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+getToken);
    var formdata = new FormData();
    formdata.append("rejectRequest", showProfile.id);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    await fetch( constantUrlNgrok + "/api/myapi/rejectrequest", requestOptions)
    .then(response => response.json())
    .then(result => {
      // alert(result);
      navigation.navigate('SearchProfile', {
        id: JSON.stringify(result.default.id),
        name: result.default.name,
        pic: result.default.profile_Pic,
        myMaritalStatus: result.default.myMaritalStatus,
        myQualification: result.default.myQualification,
        myEmploymentStatus: result.default.myEmploymentStatus,
        myLocation: result.default.myLocation,
        myAge: result.default.myAge,
        mateAge: result.default.mateAge,
        mateLocation: result.default.mateLocation,
        mateStateOfOrigin: result.default.mateStateOfOrigin,
        mateQualification: result.default.mateQualification,
      });
      // alert(result);
      // navigation.navigate("RequestProfile", {
      //   result
      // });
    });

  }

  // const acceptRequest = () => {
  //   alert('Accepted');
  // }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image source={{uri: constantUrlNgrok + "/storage/" + showProfile.profile_Pic }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height/3, position: 'absolute', borderBottomLeftRadius:30,  borderBottomRightRadius:30 }}/>
          <View style={{flexDirection: 'row',  marginTop: 25, marginLeft: 15,  justifyContent: 'space-between'}}>
              <AntDesign name="arrowleft" size={32} color="black"  style={{backgroundColor: 'white', paddingHorizontal: 10, alignSelf: 'center',}}/>
              <TouchableOpacity>
                <Text style={{marginRight: 15, borderWidth: 2, borderColor: 'white', paddingHorizontal: 11, color: 'white', backgroundColor: '#464A5F', textAlign: 'center', textAlignVertical: 'center'}}>
                  <Ionicons name="ios-more" size={24} color="white" />
                </Text>
              </TouchableOpacity>
          </View>
          <View style={{marginTop: (Dimensions.get('window').height/3) - 50, position: 'absolute', alignSelf: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.connectBtn} onPress={() => connectMe([showProfile.id, getToken])}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectBtn} onPress={() => rejectRequest()}>
              <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>


        <Text style={styles.name} > {showProfile.name} </Text>
        <View>
          <View style={styles.mainDetails}>
              <Text style={styles.email}>Marital Status</Text>
            <Text style={styles.age}> {JSON.stringify(showProfile.myMaritalStatus)} </Text>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>Education Level</Text>
            <Text style={styles.age}> {JSON.stringify(showProfile.myQualification)} </Text>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>Employment Status</Text>
            <Text style={styles.age}> {JSON.stringify(showProfile.myEmploymentStatus)} </Text>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>Location</Text>
            <Text style={styles.age}>
              <EvilIcons name="location" size={15} color="black" />
              {JSON.stringify(showProfile.myLocation)} State, Nigeria
            </Text>
          </View>
          <View style={styles.mainDetails}>
              <Text style={styles.email}>Age</Text>
              <Text style={styles.age}>25</Text>
          </View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>State of Origin</Text>
            <Text style={styles.age}> {JSON.stringify(showProfile.myStatOfOrigin)}  State, Nigeria</Text>
          </View>
        </View>
          



        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Spouse Traits</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Age</Text>
              <Text style={styles.cardRowVal}> {JSON.stringify(showProfile.mateAge)} </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Location</Text>
              <Text style={styles.cardRowVal}> {JSON.stringify(showProfile.mateLocation)} </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Nationality</Text>
              <Text style={styles.cardRowVal}>Nigeria</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>State of Origin</Text>
              <Text style={styles.cardRowVal}> {JSON.stringify(showProfile.mateStatOfOrigin)} </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Qualification</Text>
              <Text style={styles.cardRowVal}> {JSON.stringify(showProfile.mateQualification)} </Text>
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
  acceptText: {
    color: 'white',
    fontWeight: 'bold'
  },
  rejectBtn: {
    backgroundColor: '#d4d0cf',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 30,
    marginLeft: 20
  },
  rejectText: {
    color: 'black',
    fontWeight: 'bold',
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
