import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Requests({ navigation, route }) {
// console.log(route.params.id);
  const connectionRequests = route.params.result.requests;

  const [getToken, setToken] = useState('');
  AsyncStorage.getItem('userToken', (err, token) => {
    setToken(token);
  });

  const interestedProfile = async data => {
    // console.log(data);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+getToken);
    var formdata = new FormData();
    formdata.append("profileId", data);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    await fetch( constantUrlNgrok + "/api/myapi/moreprofiledetails", requestOptions)
    .then(response => response.json())
    .then(result => {
      // alert(result);
      navigation.navigate("RequestProfile", {
        result
      });
    });
  }


  const Item = ({item, onPress}) => (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.pender}>
            <View style={styles.pendingImg}>
              <Image source={{uri: constantUrlNgrok + "/storage/" + item.senderPic }} style={{ height: 100, width: 100 }} />
            </View>
            <View style={styles.pendings}>
              <Text style={styles.pendingName}> {item.senderName} </Text>
              <Text style={styles.pendingText}> {JSON.stringify(item.senderMarital)}, {JSON.stringify(item.senderEdu)}, {JSON.stringify(item.senderJob)}, and currently in  {JSON.stringify(item.senderLocation)} State. </Text>
            </View>
          {/* <Text style={styles.pendingDuration}>3</Text> */}
          <Text style={styles.pendingDuration}> {JSON.stringify(item.remaindays)} </Text>
        </View>
      </TouchableOpacity>
  );


  const renderItem = ({item}) => {
    return (
      <Item 
        item={item}
        onPress={()=> interestedProfile(item.connectionSender)}
      />
    );
  };



  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.topImg}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../images/images.jpg')} borderRadius={20} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}> Requests </Text>
      </View>

      <View style={styles.requestsTitle}>
        <Text style={styles.pendingTitle}>Pending Requests</Text>
        <Text style={styles.daysTitle}>Days left for request to expire</Text>
      </View>



      <FlatList 
        data={connectionRequests}
        renderItem={renderItem}
        keyExtractor={(item) => JSON.stringify(item.id)}
        // extraData={selectedId}
      />





      {/* <ScrollView>

        <View style={styles.pender}>
          <View style={styles.pendingImg}>
            <Image source={require('../images/pexels-photo-1130626.jpeg')} style={{ height: 100, width: 100 }} />
          </View>
          <View style={styles.pendings}>
            <Text style={styles.pendingName}>Name</Text>
            <Text style={styles.pendingText}>Lorem lorem lorem lorem lorem lorem lorem lorem lorem</Text>
          </View>
          <Text style={styles.pendingDuration}>3</Text>
        </View>

        <View style={styles.pender}>
          <View style={styles.pendingImg}>
            <Image source={require('../images/photo-1561406636-b80293969660.jpg')} style={{ height: 100, width: 100 }} />
          </View>
          <View style={styles.pendings}>
            <Text style={styles.pendingName}>Name</Text>
            <Text style={styles.pendingText}>Lorem lorem lorem lorem lorem lorem lorem lorem lorem</Text>
          </View>
          <Text style={styles.pendingDuration}>3</Text>
        </View>

        <View style={styles.pender}>
          <View style={styles.pendingImg}>
            <Image source={require('../images/photo-1579591919791-0e3737ae3808.jpg')} style={{ height: 100, width: 100 }} />
          </View>
          <View style={styles.pendings}>
            <Text style={styles.pendingName}>Name</Text>
            <Text style={styles.pendingText}>Lorem lorem lorem lorem lorem lorem lorem lorem lorem</Text>
          </View>
          <Text style={styles.pendingDuration}>3</Text>
        </View>

        <View style={styles.pender}>
          <View style={styles.pendingImg}>
            <Image source={require('../images/fbd2409f23bd24aa257897d1df889ded.jpg')} style={{ height: 100, width: 100 }} />
          </View>
          <View style={styles.pendings}>
            <Text style={styles.pendingName}>Name</Text>
            <Text style={styles.pendingText}>Lorem lorem lorem lorem lorem lorem lorem lorem lorem</Text>
          </View>
          <Text style={styles.pendingDuration}>3</Text>
        </View>
      </ScrollView> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
    flex: 6,
    textAlign: 'center',
    fontSize: 25,
    marginLeft: -30,
  },
  requestsTitle: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  pendingTitle: {
    flex: 3,
    fontSize: 15
  },
  daysTitle: {
    flex: 1,
    fontSize: 12
  },
  pender: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 10,
  },
  pendingImg: {
    flex: 3,
  },
  pendings: {
    flex: 3,
    alignSelf: 'center',
    // marginLeft: 20,
    // flexDirection: 'row',
  },
  pendingDuration: {
    flex: 2,
    alignSelf: 'center',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 40,
  },
  pendingName: {
    // fontSize: 10
  },
  pendingText: {
    fontSize: 12,
    color: '#94908f',
  }
});
