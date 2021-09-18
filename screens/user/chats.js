import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import "./automatedURL";
// import myGlobalToken from './DatabaseChats';
import { YellowBox } from "react-native";
import _ from "lodash";

export default function Chats({ navigation }) {
  // console.log("myGlobalToken");
  // console.log(myGlobalToken);
  var variableToken;

  YellowBox.ignoreWarnings(["Setting a timer"]);
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
      _console.warn(message);
    }
  };


  // console.log(myGlobalToken);
  const [getToken, setToken] = useState('');
  AsyncStorage.getItem('userToken', (err, token) => {
    setToken(token);
    variableToken = token;
  });
  // global.thisGlobalToken = getToken;
  const [getChatID, setChatID] = useState('');
  AsyncStorage.getItem('chatID', (err, chatid) => {
    setChatID(chatid);
  });
  const [getMate_name, setMate_name] = useState('');
  AsyncStorage.getItem('partner_name', (err, name) => {
    let theName = JSON.parse(name);
    setMate_name(theName);
  });
  const [getMate_pic, setMate_pic] = useState('');
  AsyncStorage.getItem('partner_pic', (err, text) => {
    let thePic = JSON.parse(text);
    setMate_pic(thePic);
  });
  const [getUser_name, setUser_name] = useState('');
  AsyncStorage.getItem('userName', (err, name) => {
    setUser_name(name);
  });
  const [getUser_pic, setUser_pic] = useState('');
  AsyncStorage.getItem('myPicture', (err, id) => {
    setUser_pic(id);
  });

  const [getChats, setChats] = useState([
    // {name: 'Julian Rohn', picture: 'photo-1561406636-b80293969660.jpg', message: 'Hello', key: '1'},
    // {name: 'Kuye Omotayo', picture: 'MattQueérée_Alida2.jpg', message: 'Hi, thanks for accepting my connection and I hope we get more from it.', key: '2'},
    // {name: 'Julian Rohn', picture: 'photo-1561406636-b80293969660.jpg', message: 'I hope so too as I am optimistic about this connection.', key: '3'},
    // {name: 'Julian Rohn', picture: 'photo-1561406636-b80293969660.jpg', message: 'Very optimistic', key: '4'},
    // {name: 'Kuye Omotayo', picture: 'MattQueérée_Alida2.jpg', message: 'Great the feeling is mutual.', key: '5'},
    // {name: 'Julian Rohn', picture: 'photo-1561406636-b80293969660.jpg', message: 'So, what do you do?', key: '6'},
    // {name: 'Kuye Omotayo', picture: 'MattQueérée_Alida2.jpg', message: "I'm a software developer.", key: '7'},
    // {name: 'Kuye Omotayo', picture: 'MattQueérée_Alida2.jpg', message: "This is about knowing each other right? So, what do you do?", key: '8'},
  ]);


  useEffect(() => {
    const serverChats = async () => {
      setChats([]);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + getToken);
      // console.log('The token');
      // console.log(getToken);
      myHeaders.append("Accept", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      if (getToken) {
        await fetch(constantUrlNgrok + "/api/myapi/allchats", requestOptions)
          .then(response => response.json())
          .then(result => {
            // console.log('Memo result is ')
            // console.log(result);
            let chatResults = [];
            result.currentChats == undefined ? '' : chatResults = result.currentChats;
            if (chatResults.length !== 0) {
              chatResults.forEach((element, index) => {
                setChats((prev) => ([
                  ...prev,
                  { name: element.senderName, picture: element.SenderPicture, message: element.Message, key: (index + 1).toString() },
                ]));
              });
            }
          });
      }
    };

    serverChats();

    return () => { setChats([]) };
  }, [getToken]);


  useEffect(() => {
    // Pusher.logToConsole = true;
    if (getChatID) {
      var pusher = new Pusher('be03397f8946d0c23105', {
        cluster: 'eu',
        authEndpoint: constantUrlNgrok + '/broadcasting/auth',
        auth: {
          headers: {
            'Authorization': 'Bearer ' + getToken,
          }
        }
      });
  
      let echo = new Echo({
        broadcaster: 'pusher',
        key: "be03397f8946d0c23105",
        client: pusher,
        cluster: "eu",
        forceTLS: true,
        disableStats: true,
        logToConsole: true,
      });
  
  
      echo.private('privatechat' + getChatID)
        .listen('Chatting', (event) => {
          // console.log(event.currentChat.Message);
          getMate_name == event.currentChat.senderName ?
            setChats((prev) => ([
              ...prev,
              { name: getMate_name, picture: getMate_pic, message: event.currentChat.Message, key: (prev.length + 1).toString() },
            ]))
            :
            "";
        });
        return () => echo.connector.pusher.disconnect();
    }

  }, [getChatID, constantUrlNgrok]);






  const [getChatMessage, setChatMessage] = useState('');

  const sendChat = async () => {
    if (typeof getChatMessage == 'string' && getChatMessage !== null && getChatMessage !== 'undefined') {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + getToken);
      myHeaders.append("Accept", "application/json");
      var formdata = new FormData();
      formdata.append("chatMessage", getChatMessage);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      await fetch(constantUrlNgrok + "/api/myapi/sendchatmessage", requestOptions)
        .then(response => response.json())
        .then(result => {
          setChats((prev) => ([
            ...prev,
            { name: getUser_name, picture: getUser_pic, message: result.savedChat.Message, key: (prev.length + 1.5).toString() },
          ]));
        });
    }//FOR THE IF STATEMENT
  }//FOR THE SEND FUNCTION












  const Item = ({ item }) => (
    item.name == getMate_name ?
      <View style={styles.mateMessage}>
        <Image source={{ uri: constantUrlNgrok + "/storage/" + getMate_pic }} borderRadius={20} style={styles.matePic} />
        <Text style={styles.mateText}>
          {item.message}
        </Text>
      </View> :
      <View style={styles.myMessage}>
        <Text style={styles.myText}>
          {item.message}
        </Text>
      </View>
  );


  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };















  const flatList = useRef(null);


  return (
    <View style={styles.container}>
      <View style={styles.curveBg}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
          <Image source={{ uri: constantUrlNgrok + "/storage/" + getUser_pic }} borderRadius={20} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ConnectedProfile')}>
          <Image source={{ uri: constantUrlNgrok + "/storage/" + getMate_pic }} style={styles.mate} />
        </TouchableOpacity>
        <Text style={styles.mateName}>{getMate_name}</Text>
      </View>

      <View style={styles.bothChats}>
        <FlatList
          data={getChats}
          renderItem={renderItem}
          ref={flatList}
          onContentSizeChange={() => flatList.current.scrollToEnd({ animation: false })}
        />
      </View>


      <View style={styles.type}>
        <AntDesign name="picture" style={styles.picIcon} size={30} color="#89d6d3" />
        <TextInput style={styles.input} value={getChatMessage} onChangeText={setChatMessage} placeholder='Type a message here' placeholderTextColor='#a9a9a9' />
        <TouchableOpacity onPress={() => { sendChat(); setChatMessage(''); }}>
          <Feather name="send" style={styles.sendIcon} size={30} color="#89d6d3" />
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
  curveBg: {
    height: 230,
    width: Dimensions.get('window').width,
    backgroundColor: '#b3b3b3',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 30,
    paddingLeft: 10,
  },
  mate: {
    height: 100,
    width: 100,
    alignSelf: 'center'
  },
  mateName: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  lastSeen: {
    alignSelf: 'center'
  },
  bothChats: {
    flex: 1,
    marginBottom: 15,
  },
  matePic: {
    height: 40,
    width: 40,
    alignSelf: 'flex-end',
  },
  mateMessage: {
    marginTop: 10,
    marginHorizontal: 10,
    maxWidth: Dimensions.get('window').width * 6 / 10,
    flexDirection: 'row',
  },
  mateText: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#b3b3b3',
    paddingHorizontal: 10,
    paddingVertical: 3,
    textAlignVertical: 'center',
    marginHorizontal: 10
  },
  myMessage: {
    marginTop: 10,
    maxWidth: Dimensions.get('window').width * 7 / 10,
    alignSelf: 'flex-end',
  },
  myText: {
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#0e8da1',
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlignVertical: 'center',
    marginHorizontal: 10,
    color: 'white'
  },
  type: {
    height: 50,
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
    // position: 'absolute',
    bottom: 10,
    borderWidth: 2,
    borderColor: '#b6b6cf',
    flexDirection: 'row',
    zIndex: 10,
  },
  picIcon: {
    marginLeft: 20,
    alignSelf: 'center'
  },
  input: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b6b6cf',
    width: Dimensions.get('window').width - 150,
    marginLeft: 10,
    paddingLeft: 10,
  },
  sendIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    transform: [{ rotateZ: '45deg' }]
  }
});
