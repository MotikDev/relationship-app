import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import AuthContext from "./authContext";
import * as ImagePicker from 'expo-image-picker';
import Constant from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Register2() {
  const [getFirst, setFirst] = useState(null);
  const [getLast, setLast] = useState(null);
  const [getEmail, setEmail] = useState(null);
  const [getPassword, setPassword] = useState(null);
  AsyncStorage.getItem('getFirstName', (err, getFirstN) => {
    setFirst(getFirstN);
  });
  AsyncStorage.getItem('getLastName', (err, getLast) => {
    setLast(getLast);
  });
  AsyncStorage.getItem('getEmail', (err, getEmail) => {
    setEmail(getEmail);
  });
  AsyncStorage.getItem('getPassword', (err, getPass) => {
    setPassword(getPass);
  });

  const {signUp} = React.useContext(AuthContext);

  const [getUri, setUri] = useState({image: null});
  let {image} = getUri;

  const [getWofbiUri, setWofbiUri] = useState({wofbiCert: null});
  let {wofbiCert} = getWofbiUri;

  const [getProfile, setProfile] = useState({profilePic: null});
  let {profilePic} = getProfile;

  getPermissions = async () => {
    if (Constant.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  pickImage = async () => {
    try {
      await getPermissions();
    } catch (error) {
      alert('Permission is needed to continue using this app.')
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setUri({ image: result.uri });
      }

      // console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


  pickCert = async () => {
    try {
      await getPermissions();
    } catch (error) {
      alert('Permission is needed to continue using this app.')
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setWofbiUri({ wofbiCert: result.uri });
      }
      // console.log(result);
    } catch (E) {
      console.log(E);
    }
  };



  pickProfile = async () => {
    try {
      await getPermissions();
    } catch (error) {
      alert('Permission is needed to continue using this app.')
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setProfile({ profilePic: result.uri });
      }
      // console.log(result);
    } catch (E) {
      console.log(E);
    }
  };






  const [getSex,setSex] = useState('Male');

  const [getRadio, setRadio] = useState([  
                                    true,
                                    <View style={styles.circle}><View style={styles.innerCircle}></View></View>,
                                    false,
                                    <View style={styles.circle}></View>,
                                ]);
  const changeView = () => {
    if (getRadio[0] == true){
      setRadio([
        false,
        <View style={styles.circle}></View>,
        true,
        <View style={styles.circle}><View style={styles.innerCircle}></View></View>,
      ]);
      setSex('Female');
    } else {
      setRadio([
        true,
        <View style={styles.circle}><View style={styles.innerCircle}></View></View>,
        false,
        <View style={styles.circle}></View>,
      ]);
      setSex('Male');
    }

  }


  // const [getDOB, setDOB] = useState(null);
// console.log(getDOB);


  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    // if (show == false) {
    //   setShow(true);
    // } else {
    //   setShow(false)
    // }
    let myShow = !show;
    setShow(myShow);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Register </Text>

      <Text style={styles.sex}> Sex </Text>

        <View style={styles.sexGrp}>
          <TouchableOpacity onPress={()=> changeView()}>
            <Text style={{fontSize: 10}}> {getRadio[1]} <Text style={styles.sexText}> Male </Text>  </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> changeView()}>
            <Text style={{fontSize: 10}}> {getRadio[3]} <Text style={styles.sexText}> Female </Text> </Text>
          </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.dobTitle}>Date of Birth</Text>
            </TouchableOpacity>
            {/* <TextInput style={styles.dob} placeholder='DD/MM/YYYY' onChangeText={setDOB} /> */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                // is24Hour={true}
                display="spinner"
                onChange={onDateChange}
              />
            )}
        </View>


        <View>
          <TouchableOpacity onPress={() => pickImage()}>
            <Text style={styles.sex}>Upload a valid ID</Text>
          </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={ styles.image } />}
        </View>
        <View>
          <TouchableOpacity onPress={() => pickCert()}>
            <Text style={styles.sex}>WOFBI Certificate</Text>
          </TouchableOpacity>
            {wofbiCert && <Image source={{ uri: wofbiCert }} style={ styles.image } />}
        </View>


        <View>
          <TouchableOpacity onPress={() => pickProfile()}>
            <Text style={styles.sex}>Choose a profile picture</Text>
          </TouchableOpacity>
            {profilePic && <Image source={{ uri: profilePic }} style={ styles.profileImage } />}
        </View>

        <TouchableOpacity style={styles.regBtn} onPress={()=> signUp({firstName: getFirst, lastName: getLast, email: getEmail, pass: getPassword, sex: getSex, dob: date, idCard: image, wofbi: wofbiCert, profileP: profilePic})}>
            <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center', padding: 5, fontWeight: 'bold' }}>Register</Text>
        </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    paddingTop: 40,
    fontWeight: "bold",
    fontSize: 20,
  },
  sex: {
    fontSize: 20,
    marginTop: 30,
    paddingLeft: 20,
    alignContent: "flex-start",
  },
  sexGrp: {
    marginTop: 3,
    marginLeft: 20,
    flexDirection: "row",
    alignSelf: 'flex-start'
  },
  sexText: {
    fontSize: 15,
  },
  image: {
    width: 200,
    height: 30,
    marginLeft: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginLeft: 60,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: '#FFF',
    marginLeft: 5,
  },
  innerCircle: {
    width: 75/10,
    height: 75/10,
    borderRadius: 100,
    margin: 1666666448115/1000000000000,
    backgroundColor: 'grey',
  },
  dobTitle: {
    fontSize: 20,
    marginTop: 20,
    paddingLeft: 20,
    alignContent: "flex-start",
  },
  dob: {
    marginTop: 5,
    marginLeft: 20,
    paddingLeft: 8,
    borderBottomColor: "#323232",
    borderWidth: 1,
    borderRadius: 100,
    width: 200
  },
  upload:{
    marginTop: 5,
    marginLeft: 20,
    paddingLeft: 8,
    borderBottomColor: "#323232",
    borderWidth: 1,
    width: 200
  },
  regBtn: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'black',
    width: 200,
    borderRadius: 10,
    alignSelf: "center",
    elevation: 5,
    position: 'absolute',
    bottom: 30,
  },
});
