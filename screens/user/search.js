import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal, Alert, TouchableHighlight } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons';
import MyModal from "./MyModal";

export default function Search({ navigation }) {
  // const constantUrlNgrok = "https://ec10bebaf288.eu.ngrok.io";

  const [getSuggestions, setSuggestions] = useState({
    match1ID: '',
    match1Pic: '',
    match1Name: '',
    match2ID: '',
    match2Pic: '',
    match2Name: '',
    match3ID: '',
    match3Pic: '',
    match3Name: '',
    myPic: '',
    userToken: '',
    attachmentStyle: '',
  });


  AsyncStorage.multiGet([
    'match_1_id',
    'match_1_pic',
    'match_1_name',
    'match_2_id',
    'match_2_pic',
    'match_2_name',
    'match_3_id',
    'match_3_pic',
    'match_3_name',
    'myPicture',
    'userToken',
    'attachmentStyle',
  ], (err, results) => {
    // console.log(results);
    setSuggestions({
      match1ID: JSON.parse(results[0][1]),
      match1Pic: JSON.parse(results[1][1]),
      match1Name: JSON.parse(results[2][1]),
      match2ID: JSON.parse(results[3][1]),
      match2Pic: JSON.parse(results[4][1]),
      match2Name: JSON.parse(results[5][1]),
      match3ID: JSON.parse(results[6][1]),
      match3Pic: JSON.parse(results[7][1]),
      match3Name: JSON.parse(results[8][1]),
      myPic: results[9][1],
      userToken: results[10][1],
      attachmentStyle: results[11][1],
    });
  });


  const getDetailsFor1 = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getSuggestions.userToken);

    var formdata = new FormData();
    formdata.append("result", getSuggestions.match1ID);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    await fetch(constantUrlNgrok + "/api/myapi/checkprofile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.count > 0) {
          navigation.navigate('Requested', {
            id: getSuggestions.match1ID,
            name: result.result.name,
            pic: getSuggestions.match1Pic,
            myMaritalStatus: result.result.myMaritalStatus,
            myQualification: result.result.myQualification,
            myEmploymentStatus: result.result.myEmploymentStatus,
            myLocation: result.result.myLocation,
            myAge: result.result.myAge,
            mateAge: result.result.mateAge,
            mateLocation: result.result.mateLocation,
            mateStateOfOrigin: result.result.mateStateOfOrigin,
            mateQualification: result.result.mateQualification,
          });
        } else {
          navigation.navigate("SearchProfile", {
            id: getSuggestions.match1ID,
            name: result.result.name,
            pic: getSuggestions.match1Pic,
            myMaritalStatus: result.result.myMaritalStatus,
            myQualification: result.result.myQualification,
            myEmploymentStatus: result.result.myEmploymentStatus,
            myLocation: result.result.myLocation,
            myAge: result.result.myAge,
            mateAge: result.result.mateAge,
            mateLocation: result.result.mateLocation,
            mateStateOfOrigin: result.result.mateStateOfOrigin,
            mateQualification: result.result.mateQualification,
          });
        }


      });
  };

  const getDetailsFor2 = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getSuggestions.userToken);

    var formdata = new FormData();
    formdata.append("result", getSuggestions.match2ID);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    await fetch(constantUrlNgrok + "/api/myapi/checkprofile", requestOptions)
      .then(response => response.json())
      .then(result => {

        if (result.count > 0) {
          navigation.navigate('Requested', {
            id: getSuggestions.match2ID,
            name: result.result.name,
            pic: getSuggestions.match2Pic,
            myMaritalStatus: result.result.myMaritalStatus,
            myQualification: result.result.myQualification,
            myEmploymentStatus: result.result.myEmploymentStatus,
            myLocation: result.result.myLocation,
            myAge: result.result.myAge,
            mateAge: result.result.mateAge,
            mateLocation: result.result.mateLocation,
            mateStateOfOrigin: result.result.mateStateOfOrigin,
            mateQualification: result.result.mateQualification,
          });
        } else {
          navigation.navigate("SearchProfile", {
            id: getSuggestions.match2ID,
            name: result.result.name,
            pic: getSuggestions.match2Pic,
            myMaritalStatus: result.result.myMaritalStatus,
            myQualification: result.result.myQualification,
            myEmploymentStatus: result.result.myEmploymentStatus,
            myLocation: result.result.myLocation,
            myAge: result.result.myAge,
            mateAge: result.result.mateAge,
            mateLocation: result.result.mateLocation,
            mateStateOfOrigin: result.result.mateStateOfOrigin,
            mateQualification: result.result.mateQualification,
          });
        }

      });
  };

  const getDetailsFor3 = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getSuggestions.userToken);

    var formdata = new FormData();
    formdata.append("result", getSuggestions.match3ID);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    await fetch(constantUrlNgrok + "/api/myapi/checkprofile", requestOptions)
      .then(response => response.json())
      .then(result => {

        if (result.count > 0) {
          navigation.navigate('Requested', {
            id: getSuggestions.match3ID,
            name: result.result.name,
            pic: getSuggestions.match3Pic,
            myMaritalStatus: result.result.myMaritalStatus,
            myQualification: result.result.myQualification,
            myEmploymentStatus: result.result.myEmploymentStatus,
            myLocation: result.result.myLocation,
            myAge: result.result.myAge,
            mateAge: result.result.mateAge,
            mateLocation: result.result.mateLocation,
            mateStateOfOrigin: result.result.mateStateOfOrigin,
            mateQualification: result.result.mateQualification,
          });
        } else {
          navigation.navigate("SearchProfile", {
            id: getSuggestions.match3ID,
            name: result.result.name,
            pic: getSuggestions.match3Pic,
            myMaritalStatus: result.result.myMaritalStatus,
            myQualification: result.result.myQualification,
            myEmploymentStatus: result.result.myEmploymentStatus,
            myLocation: result.result.myLocation,
            myAge: result.result.myAge,
            mateAge: result.result.mateAge,
            mateLocation: result.result.mateLocation,
            mateStateOfOrigin: result.result.mateStateOfOrigin,
            mateQualification: result.result.mateQualification,
          });
        }

      });
  };




  const goToRequest = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getSuggestions.userToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    await fetch(constantUrlNgrok + "/api/myapi/requests", requestOptions)
      .then(response => response.json())
      .then(result => {
        navigation.navigate("Requests", {
          result
        });
      });
  }



  const [getModal, setModal] = useState(false);
  useMemo(() => {
    const emptyAttachment = () => {
      if (getSuggestions.attachmentStyle == null) {
        // alert(getSuggestions.attachmentStyle);
        setModal(true);
      } else {
        setModal(false)
      }
    }
    emptyAttachment();
  }, [getSuggestions.attachmentStyle]);

  const questions = [
    "Please carefully choose the answers to all the questions as it will determine your compatibility with other users.",
    "After anxiously awaiting my partner's arrival, I end up picking fights.",
    "I tend to prefer relationships with things or animals instead of people.",
    "When I reach a certain level of intimacy with my partner, I sometimes experience inexplicable fear.",
    "Protection often feels out of reach.",
    "I struggle to feel safe with my partner.",
    "I prefer to think things through than to express myself emotionally.",
    "I look at my partner with kindness and caring and look forward to our time together.",
    "I can keep secrets, protect my partner’s privacy, and respect boundaries.",
    "I am always yearning for something or someone that I feel I cannot have.",
    "I feel comfortable expressing my own needs.",
    "I want to be close with my partner but feel angry at my partner at the same time.",
    "I feel relaxed with my partner most of the time.",
    "It is difficult for me to be alone. If alone, I feel stressed, abandoned, hurt, and/or angry.",
    "It is often difficult to receive love from my partner when they express it.",
    "If my partner and I hit a glitch, it’s relatively easy for me to apologize, brainstorm a win-win solution, and/or repair the disharmony.",
    "At the same time as I feel a deep wish to be close with my partner, I also have a paralyzing fear of losing the relationship.",
    "I rarely feel satisfied with the relationships/ connection I have with partners.",
    "When I give more than I get, I often become resentful and/ or harbor a grudge.",
    "When presented with problems, I often feel stumped and feel they are irresolvable.",
    "I feel inexplicably stressed when my partner arrives home or approaches me – especially when he or she wants to connect.",
    "I find it easy to flow between being close and connected with my partner to being on my own.",
    "I chronically second-guess myself and sometimes wish I had said something differently.",
    "I want closeness but I am also afraid of the one I desire to be close with. I get stuck in approach-avoidance patterns with my partner.",
    "It is difficult for me to say NO or to set realistic boundaries.",
    "When I lose a relationship, at first I tend to experience separation elation and then become depressed.",
    "I sometimes feel superior in not needing others and I wish others were more self-sufficient.",
    "It is important for my partner to keep arrangements simple and clear because I am easily confused or disoriented, especially when stressed.",
    "I insist on self-reliance; I do many of life’s tasks or my hobbies, alone and I have difficulty reaching out when I need help.",
    "I feel like my partner is always there but I would often prefer to have my own space unless I invite the connection.",
    "Sometimes I prefer casual sex over a committed relationship.",
    "My partner often comments or complains that I am controlling",
    "I often tend to “merge” or lose myself in my partner and feel what they feel, or want what they want.",
    "I feel that people are essentially good at heart.",
    "I attempt to discover and meet the needs of my partner whenever possible.",
    "I am comfortable being affectionate with my partner.",
  ];

  const [getSecureCount, setSecureCount] = useState(0);
  const [getAvoidantCount, setAvoidantCount] = useState(0);
  const [getAnxiousCount, setAnxiousCount] = useState(0);
  const [getFearfulCount, setFearfulCount] = useState(0);

  const [getQuestionNumb, setQuestionNumb] = useState(0);
  var currentQuestion = questions[getQuestionNumb];

  const [getAction, setAction] = useState('Start');
  const nextQuestion = () => {
    if (getQuestionNumb < 34) {
      setQuestionNumb(getQuestionNumb + 1);
      if (getQuestionNumb < 2) {
        setAction('Next');
      }
    } else if (getQuestionNumb == 34) {
      setQuestionNumb(getQuestionNumb + 1);
      setAction('End');
    }
    else {
      let arrayData = [];

      for (let i = 1; i < 36; i++) {
        AsyncStorage.getItem('answer'+i, (err, data)=>{
          arrayData.push(data);
        });//ASYNCSTORAGE SETTING COUNT
      }//FOR CLOSING TAG

      AsyncStorage.getItem('userToken', async (err, token)=>{
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer " + token);
          myHeaders.append("Accept", "application/json");
          var formdata = new FormData();
          formdata.append("answers", JSON.stringify(arrayData));
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
          await fetch(constantUrlNgrok + "/api/myapi/attachmentanswers", requestOptions)
            .then(response => response.json())
            .then(result => {
              // console.log(result);
              AsyncStorage.setItem('attachmentStyle', result.result.attachment_style);
            });        
      });

    }
  };

  const pressOption = (response) => {
    AsyncStorage.setItem('answer' + getQuestionNumb, response);
    // console.log('answer'+getQuestionNumb+" = "+response);
    // AsyncStorage.getItem('answer'+(getQuestionNumb), (err, res) => {
    //   console.log('answer'+getQuestionNumb+" = "+res);
    // });
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topImg}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: constantUrlNgrok + "/storage/" + getSuggestions.myPic }} borderRadius={20} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}> Search </Text>

        <View style={styles.topImg}>
          <TouchableOpacity onPress={() => goToRequest()}>
            {/* <TouchableOpacity onPress={()=> navigation.navigate("Requests")}> */}
            <Ionicons name="md-notifications" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>


      <MyModal visibility={getModal} action={getAction} number={getQuestionNumb} question={currentQuestion} onPress={nextQuestion} pressOption={pressOption} />







      <ViewPager style={{ flex: 1 }} initialPage={0} transitionStyle="curl" orientation="horizontal">
        <View style={styles.mainView} key={1} transitionStyle="curl" orientation="horizontal">
          <TouchableOpacity onPress={() => getDetailsFor1()}>
            <Text style={{ fontSize: 20 }}>1 of 3</Text>
            <Image source={{ uri: constantUrlNgrok + "/storage/" + getSuggestions.match1Pic }} style={{ height: Dimensions.get('window').height * 3 / 5, width: Dimensions.get('window').width - 60, marginTop: 20, marginBottom: 10, }} />
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              {getSuggestions.match1Name ? getSuggestions.match1Name : "No Name"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainView} key={2} transitionStyle="curl" orientation="horizontal">
          <TouchableOpacity onPress={() => getDetailsFor2()}>
            <Text style={{ fontSize: 20 }}>2 of 3</Text>
            <Image source={{ uri: constantUrlNgrok + "/storage/" + getSuggestions.match2Pic }} style={{ height: Dimensions.get('window').height * 3 / 5, width: Dimensions.get('window').width - 60, marginTop: 20, marginBottom: 10, }} />
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              {getSuggestions.match2Name ? getSuggestions.match2Name : "No Name"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainView} key={3} transitionStyle="curl" orientation="horizontal">
          <TouchableOpacity onPress={() => getDetailsFor3()}>
            <Text style={{ fontSize: 20 }}>3 of 3</Text>
            <Image source={{ uri: constantUrlNgrok + "/storage/" + getSuggestions.match3Pic }} style={{ height: Dimensions.get('window').height * 3 / 5, width: Dimensions.get('window').width - 60, marginTop: 20, marginBottom: 10, }} />
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              {getSuggestions.match3Name ? getSuggestions.match3Name : "No Name"}
            </Text>
          </TouchableOpacity>
        </View>
      </ViewPager>

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
    // marginLeft: -70,
  },
  image: {
    height: Dimensions.get('window').height * 3 / 5,
    width: Dimensions.get('window').width - 60,
    marginTop: 20,
    marginBottom: 10,
  },
  mainView: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },




  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#4CB050',
    paddingVertical: 10,
    flex: 1,
    elevation: 2,
    marginHorizontal: 5,
  },
  dismissText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitle: {
    // marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 'normal',
  },


  cancelSave: {
    flexDirection: 'row'
  },



  //END OF STYLE
});
