import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView, Modal, Alert, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import AuthContext from "./authContext";
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';

export default function Profile({navigation}) {
  // const constantUrlNgrok = "https://ec10bebaf288.eu.ngrok.io";

  const {signOut} = React.useContext(AuthContext);
  const [getProfile, setProfile] = useState({
    'userName': '',
    'email': '',
    'myPicture': '',
    'myAge': '',
    'userToken': '',
    'myMaritalStatus': '',
    'myQualification': '',
    'myEmploymentStatus': '',
    'myLocation': '',
    'myStateOfOrigin': '',
    'myGenotype': '',
    'mateAge': '',
    'mateLocation': '',
    'mateEmploymentStatus': '',
    'mateMaritalStatus': '',
    'mateQualification': '',
    'mateStateOfOrigin': '',
  });

  AsyncStorage.multiGet([
    'userName', 
    'email', 
    'myPicture', 
    'myAge', 
    'userToken', 
    'myMaritalStatus', 
    'myQualification',
    'myEmploymentStatus',
    'myLocation',
    'myStateOfOrigin',
    'myGenotype',
    'mateAge',
    'mateLocation',
    'mateEmploymentStatus',
    'mateMaritalStatus',
    'mateQualification',
    'mateStateOfOrigin',
  ], (err, results) => {
    // let today = new Date();
    // let theYear = today.getFullYear() - results[3][1].substring(1, 5);
    // let theMonth = today.getMonth()+1 - results[3][1].substring(7, 8);
    // let theDay = today.getDate() - results[3][1].substring(9, 11);
    // if (theMonth < 0){
    //     theYear = theYear - 1;
    // } else if (theMonth == 0) {
    //   if (theDay < 0) {
    //     theYear = theYear - 1;
    //   }
    // }
    setProfile({
      userName: results[0][1], 
      email: results[1][1], 
      myPicture: results[2][1], 
      // myAge: theYear,
      userToken: results[4][1],
      myMaritalStatus: results[5][1],
      myQualification: results[6][1],
      myEmploymentStatus: results[7][1],
      myLocation: results[8][1],
      myStateOfOrigin: results[9][1],
      myGenotype: results[10][1],
      mateAge: results[11][1],
      mateLocation: results[12][1],
      mateEmploymentStatus: results[13][1],
      mateMaritalStatus: results[14][1],
      mateQualification: results[15][1],
      mateStateOfOrigin: results[16][1],
    });
  });


  const [getModal, setModal] = useState({
    maritalStatus: false,
    education: false,
    employment: false,
    location: false,
    origin: false,
    genotype : false,

    mateModal: false,
  });


  let editMarital = [
    { label: 'Single', value: 'Single'},
    { label: 'Divorced', value: 'Divorced'},
    { label: 'Widow', value: 'Widow'},
    { label: 'Widower', value: 'Widower'},
  ];

  let editEdu = [
    { label: "O'Level",  value: "O_Level" },
    { label: 'OND', value: 'OND'},
    { label: 'HND', value: 'HND' },
    { label: 'BSc.', value: 'BSc.' },
    { label: 'MSc', value: 'MSc' },
    { label: 'PhD', value: 'PhD.' },
    { label: "No Qualification",  value: "None" },
    { label: 'Others', value: 'Others' },
  ];

  let editJob = [
    { label: 'Student', value: "Student" },
    { value: 'Unemployed'},
    { value: 'Employed' },
    { label: 'Business Owner', value: 'Business_Owner' },
  ];
  
  let editLocation = [
    { value: 'Abuja' },
    { value: "Abia" },
    { value: 'Adamawa'},
    { label: 'Akwa Ibom', value: 'Akwa_Ibom' },
    { value: 'Anambra' },
    { value: 'Bauchi' },
    { value: 'Bayelsa' },
    { value: 'Benue' },
    { value: 'Borno' },
    { label: 'Cross River', value: 'Cross_River' },
    { value: 'Delta' },
    { value: 'Ebonyi' },
    { value: 'Edo' },
    { value: 'Ekiti' },
    { value: 'Enugu' },
    { value: 'Gombe' },
    { value: 'Imo' },
    { value: 'Jigawa' },
    { value: 'Kaduna' },
    { value: 'Kano' },
    { value: 'Katsina' },
    { value: 'Kebbi' },
    { value: 'Kogi' },
    { value: 'Kwara' },
    { value: 'Lagos' },
    { value: 'Nassarawa' },
    { value: 'Niger' },
    { value: 'Ogun' },
    { value: 'Ondo' },
    { value: 'Osun' },
    { value: 'Oyo' },
    { value: 'Plateau' },
    { value: 'Rivers' },
    { value: 'Sokoto' },
    { value: 'Taraba' },
    { value: 'Yobe' },
    { value: 'Zamfara' },
  ];

  let editOrigin = [
    { value: 'Abuja' },
    { value: "Abia" },
    { value: 'Adamawa'},
    { label: 'Akwa Ibom', value: 'Akwa_Ibom' },
    { value: 'Anambra' },
    { value: 'Bauchi' },
    { value: 'Bayelsa' },
    { value: 'Benue' },
    { value: 'Borno' },
    { label: 'Cross River', value: 'Cross_River' },
    { value: 'Delta' },
    { value: 'Ebonyi' },
    { value: 'Edo' },
    { value: 'Ekiti' },
    { value: 'Enugu' },
    { value: 'Gombe' },
    { value: 'Imo' },
    { value: 'Jigawa' },
    { value: 'Kaduna' },
    { value: 'Kano' },
    { value: 'Katsina' },
    { value: 'Kebbi' },
    { value: 'Kogi' },
    { value: 'Kwara' },
    { value: 'Lagos' },
    { value: 'Nassarawa' },
    { value: 'Niger' },
    { value: 'Ogun' },
    { value: 'Ondo' },
    { value: 'Osun' },
    { value: 'Oyo' },
    { value: 'Plateau' },
    { value: 'Rivers' },
    { value: 'Sokoto' },
    { value: 'Taraba' },
    { value: 'Yobe' },
    { value: 'Zamfara' },
  ];

  let editGenotype = [
    { value: "AA" },
    { value: 'AS'},
    { value: 'SS' },
  ];




  // SPOUSE DROPDOWN
  let editMateAge = [
    { label: '23 and Above', value: '23' },
    { label: '24 and Above', value: '24'},
    { label: '25 and Above', value: '25' },
    { label: '26 and Above', value: '26' },
    { label: '27 and Above', value: '27' },
    { label: '28 and Above', value: '28' },
    { label: '29 and Above', value: '29' },
    { label: '30 and Above', value: '30' },
    { label: '31 and Above', value: '31' },
    { label: '32 and Above', value: '32' },
    { label: '33 and Above', value: '33' },
    { label: '34 and Above', value: '34' },
    { label: '35 and Above', value: '35' },
  ];

  let editMateMarital = [
    { value: 'All'},
    { value: 'Single'},
    {value: 'Divorced'},
    {value: 'Widow'},
    {value: 'Widower'},
  ];

  let editMateJob = [
    { value: "All" },
    { value: "Student" },
    { value: 'Unemployed'},
    { value: 'Employed' },
    { label: 'Business Owner', value: 'Business_Owner' },
  ];

  let editMateLocation = [
    { value: 'All' },
    { label: 'South West', value: 'South_West' },
    { label: 'South South', value: 'South_South' },
    { label: 'South East', value: 'South_East' },
    { label: 'North West', value: 'North_West' },
    { label: 'North North', value: 'North_North' },
    { label: 'North East', value: 'North_East' },
    { value: 'Abuja' },
    { value: "Abia" },
    { value: 'Adamawa'},
    { label: 'Akwa Ibom', value: 'Akwa_Ibom' },
    { value: 'Anambra' },
    { value: 'Bauchi' },
    { value: 'Bayelsa' },
    { value: 'Benue' },
    { value: 'Borno' },
    { label: 'Cross River', value: 'Cross_River' },
    { value: 'Delta' },
    { value: 'Ebonyi' },
    { value: 'Edo' },
    { value: 'Ekiti' },
    { value: 'Enugu' },
    { value: 'Gombe' },
    { value: 'Imo' },
    { value: 'Jigawa' },
    { value: 'Kaduna' },
    { value: 'Kano' },
    { value: 'Katsina' },
    { value: 'Kebbi' },
    { value: 'Kogi' },
    { value: 'Kwara' },
    { value: 'Lagos' },
    { value: 'Nassarawa' },
    { value: 'Niger' },
    { value: 'Ogun' },
    { value: 'Ondo' },
    { value: 'Osun' },
    { value: 'Oyo' },
    { value: 'Plateau' },
    { value: 'Rivers' },
    { value: 'Sokoto' },
    { value: 'Taraba' },
    { value: 'Yobe' },
    { value: 'Zamfara' },
  ];

  let editMateOrigin = [
    { value: 'All' },
    { label: 'South West', value: 'South_West' },
    { label: 'South South', value: 'South_South' },
    { label: 'South East', value: 'South_East' },
    { label: 'North West', value: 'North_West' },
    { label: 'North North', value: 'North_North' },
    { label: 'North East', value: 'North_East' },
    { value: 'Abuja' },
    { value: "Abia" },
    { value: 'Adamawa'},
    { label: 'Akwa Ibom', value: 'Akwa_Ibom' },
    { value: 'Anambra' },
    { value: 'Bauchi' },
    { value: 'Bayelsa' },
    { value: 'Benue' },
    { value: 'Borno' },
    { label: 'Cross River', value: 'Cross_River' },
    { value: 'Delta' },
    { value: 'Ebonyi' },
    { value: 'Edo' },
    { value: 'Ekiti' },
    { value: 'Enugu' },
    { value: 'Gombe' },
    { value: 'Imo' },
    { value: 'Jigawa' },
    { value: 'Kaduna' },
    { value: 'Kano' },
    { value: 'Katsina' },
    { value: 'Kebbi' },
    { value: 'Kogi' },
    { value: 'Kwara' },
    { value: 'Lagos' },
    { value: 'Nassarawa' },
    { value: 'Niger' },
    { value: 'Ogun' },
    { value: 'Ondo' },
    { value: 'Osun' },
    { value: 'Oyo' },
    { value: 'Plateau' },
    { value: 'Rivers' },
    { value: 'Sokoto' },
    { value: 'Taraba' },
    { value: 'Yobe' },
    { value: 'Zamfara' },
  ];

  let editMateEdu = [
    { value: "All" },
    { value: "Uneducated" },
    { value: "O'Level" },
    { value: 'OND'},
    { value: 'HND' },
    { value: 'BSc.' },
    { value: 'MSc' },
    { value: 'PhD.' },
    { value: 'Others' },
  ];


  const [getUpdate, setUpdate] = useState({
    'myMaritalStatus': '',
    'myQualification': '',
    'myEmploymentStatus': '',
    'myLocation': '',
    'myStateOfOrigin': '',
    'myGenotype': '',
    // 'mateAge': '',
    // 'mateMaritalStatus': '',
    // 'mateEmploymentStatus': '',
    // 'mateLocation': '',
    // 'mateStateOfOrigin': '',
    // 'mateQualification': '',
  });

  const [getMateDet1, setMateDet1] = useState({
    'mateAge': '',
  });
  const [getMateDet2, setMateDet2] = useState({
    'mateMaritalStatus': '',
  });
  const [getMateDet3, setMateDet3] = useState({
    'mateEmploymentStatus': '',
  });
  const [getMateDet4, setMateDet4] = useState({
    'mateLocation': '',
  });
  const [getMateDet5, setMateDet5] = useState({
    'mateStateOfOrigin': '',
  });
  const [getMateDet6, setMateDet6] = useState({
    'mateQualification': '',
  });
  

  const saveUpdate = async (details) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+getProfile.userToken);

    var formdata = new FormData();
    if ((getUpdate.hasOwnProperty('myMaritalStatus')) && (typeof details !== 'object' ) ) {
      formdata.append("userMaritalStatus", details);
    }
    if (getUpdate.hasOwnProperty('myQualification') && (typeof details !== 'object' ) ) {
      formdata.append("myQualification", details);
    }
    if (getUpdate.hasOwnProperty('myEmploymentStatus') && (typeof details !== 'object' ) ) {
      formdata.append("myEmploymentStatus", details);
    }
    if (getUpdate.hasOwnProperty('myLocation') && (typeof details !== 'object' ) ) {
      formdata.append("myLocation", details);
    }
    if (getUpdate.hasOwnProperty('myStateOfOrigin') && (typeof details !== 'object' ) ) {
      formdata.append("myStateOfOrigin", details);
    }
    if (getUpdate.hasOwnProperty('myGenotype') && (typeof details !== 'object' ) ) {
      formdata.append("myGenotype", details);
    }
    
    //TYPEOF CAN ALSO WORK WITH OBJECTS LIKE BELOW
    // if (typeof getUpdate.myGenotype == 'object') {
    //   formdata.append("myGenotype", details);
    // }


    //SPOUSE DATA IS IN ARRAY UNLIKE USER DATA WHICH WAS AN OBJECT
    if ((typeof getMateDet1 !== 'undefined') && (typeof details == 'object' )){
      // formdata.append('spouse', 'testing');
      // console.log(details);

      formdata.append('spouseAge', details[0]);
      formdata.append('spouseMaritalStatus', details[1]);
      formdata.append('spouseJobStatus', details[2]);
      formdata.append('spouseLocation', details[3]);
      formdata.append('spouseSOR', details[4]);//SOR - State of Origin
      formdata.append('spouseQualification', details[5]);
    }

    console.log(formdata);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    await fetch( constantUrlNgrok + "/api/myapi/updateprofile", requestOptions)
    .then(response => response.json())
    .then(result => {
      result.mate?
        AsyncStorage.multiSet([    
          ['mateAge', result.mate[0]],
          ['mateLocation', result.mate[4]],
          ['mateEmploymentStatus', result.mate[3]],
          ['mateMaritalStatus', result.mate[1]],
          ['mateQualification', result.mate[2]],
          ['mateStateOfOrigin', result.mate[5]],
        ])  :   result.Status?
        AsyncStorage.setItem('myMaritalStatus', result.Status) :   result.Cert?
        AsyncStorage.setItem('myQualification', result.Cert) : result.Job?
        AsyncStorage.setItem('myEmploymentStatus', result.Job) :  result.Location?
        AsyncStorage.setItem('myLocation', result.Location)  :   result.Origin?
        AsyncStorage.setItem('myStateOfOrigin', result.Origin) : result.Genotype?
        AsyncStorage.setItem('myGenotype', result.Genotype)  :   console.log("An error occured.");
      // console.log(result);
    });
    //YOU MUST CATCH THE ERROR HERE
  };




  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image source={{ uri: constantUrlNgrok+"/storage/"+getProfile.myPicture }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height/3, position: 'absolute', borderBottomLeftRadius:30,  borderBottomRightRadius:30 }}/>
          <View style={{flexDirection: 'row',  marginTop: 25, marginLeft: 15,  justifyContent: 'space-between'}}>
              <AntDesign onPress={()=> navigation.goBack()} name="arrowleft" size={32} color="black"  style={{backgroundColor: 'white', paddingHorizontal: 10, alignSelf: 'center',}}/>
              {/* <AntDesign name="arrowleft" size={32} color="black"  style={{backgroundColor: 'white', paddingHorizontal: 10,}}/> */}
              <TouchableOpacity onPress={() => signOut()}>
                <Text style={{marginRight: 15, borderWidth: 2, borderColor: 'white', paddingVertical: 5, paddingHorizontal: 11, color: 'white', backgroundColor: '#464A5F'}}>Logout</Text>
              </TouchableOpacity>
          </View>
        </View>


        <Text style={styles.name}>
          {getProfile.userName}
        </Text>

        <View>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>
              {getProfile.email}
            </Text>
          </View>


          <View style={styles.mainDetails}>
            <Text style={styles.email}>Age</Text>
            <Text style={styles.age}> {getProfile.myAge} </Text>
          </View>



          <Modal animationType="slide" transparent={true} visible={getModal.maritalStatus} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Choose Marital Status </Text>
                <Dropdown onChangeText={value=> setUpdate({myMaritalStatus: value})} useNativeDriver={true} label='Marital Status' data={editMarital} containerStyle={{width:120, marginBottom:30}} />
                <View style={styles.cancelSave}>
                  <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#fc6f03" }} onPress={() => { setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,}); }}>
                    <Text style={styles.dismissText}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
                    onPress={() => {
                      saveUpdate(getUpdate.myMaritalStatus);
                      setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,});
                    }} 
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  >
                    <Text style={styles.dismissText}>Save</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.mainDetails}>
            <Text style={styles.email}> {getProfile.myMaritalStatus ? getProfile.myMaritalStatus : "Marital Status"}</Text>
            <TouchableOpacity style={styles.editBtn} onPress={()=> setModal({maritalStatus: true, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,})}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          </View>



          <Modal animationType="slide" transparent={true} visible={getModal.education} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Choose Education Level </Text>
                <Dropdown onChangeText={value=> setUpdate({myQualification: value})} useNativeDriver={true} label='Education Level' data={editEdu} containerStyle={{width:120, marginBottom:30}} />
                <View style={styles.cancelSave}>
                  <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#fc6f03" }} onPress={() => { setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,}); }}>
                    <Text style={styles.dismissText}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
                    onPress={() => {
                      saveUpdate(getUpdate.myQualification);
                      setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,});
                    }} 
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  >
                    <Text style={styles.dismissText}>Save</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.mainDetails}>
            <Text style={styles.email}> {getProfile.myQualification? getProfile.myQualification : "Qualification"} </Text>
            <TouchableOpacity style={styles.editBtn} onPress={()=> setModal({maritalStatus: false, education: true, employment: false, location: false, origin: false, genotype: false, mateModal: false,})}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          </View>





          <Modal animationType="slide" transparent={true} visible={getModal.employment} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Choose Employment Status </Text>
                <Dropdown onChangeText={value=> setUpdate({myEmploymentStatus: value})} useNativeDriver={true} label='Employment Status' data={editJob} containerStyle={{width:150, marginBottom:30}} />
                <View style={styles.cancelSave}>
                  <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#fc6f03" }} onPress={() => { setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,}); }}>
                    <Text style={styles.dismissText}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
                    onPress={() => {
                      saveUpdate(getUpdate.myEmploymentStatus);
                      setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,});
                    }} 
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  >
                    <Text style={styles.dismissText}>Save</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.mainDetails}>
            <Text style={styles.email}> {getProfile.myEmploymentStatus ? getProfile.myEmploymentStatus : "Employment Status"}</Text>
            <TouchableOpacity style={styles.editBtn} onPress={()=> setModal({maritalStatus: false, education: false, employment: true, location: false, origin: false, genotype: false, mateModal: false,})}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          </View>


          <Modal animationType="slide" transparent={true} visible={getModal.location} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Choose Your Current Residence </Text>
                <Dropdown onChangeText={value=> setUpdate({myLocation: value})} useNativeDriver={true} label='Current Residence' data={editLocation} containerStyle={{width:120, marginBottom:30}} />
                <View style={styles.cancelSave}>
                  <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#fc6f03" }} onPress={() => { setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,}); }}>
                    <Text style={styles.dismissText}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
                    onPress={() => {
                      saveUpdate(getUpdate.myLocation);
                      setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,});
                    }} 
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  >
                    <Text style={styles.dismissText}>Save</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.mainDetails}>
            <Text style={styles.email}>
              <EvilIcons name="location" size={15} color="black" />
              {getProfile.myLocation ? "  " + getProfile.myLocation + " State, Nigeria" : "Current Location"}
            </Text>
            <TouchableOpacity style={styles.editBtn} onPress={()=> setModal({maritalStatus: false, education: false, employment: false, location: true, origin: false, genotype: false, mateModal: false,})}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          </View>


          <Modal animationType="slide" transparent={true} visible={getModal.origin} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Choose Your State of Origin </Text>
                <Dropdown onChangeText={value=> setUpdate({myStateOfOrigin: value})} useNativeDriver={true} label='State of Origin' data={editOrigin} containerStyle={{width:120, marginBottom:30}} />
                <View style={styles.cancelSave}>
                  <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#fc6f03" }} onPress={() => { setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,}); }}>
                    <Text style={styles.dismissText}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
                    onPress={() => {
                      saveUpdate(getUpdate.myStateOfOrigin);
                      setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,});
                    }} 
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  >
                    <Text style={styles.dismissText}>Save</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.mainDetails}>
            <Text style={styles.email}> {getProfile.myStateOfOrigin? getProfile.myStateOfOrigin + ' State, Nigeria' : "State of Origin"} </Text>
            <TouchableOpacity style={styles.editBtn} onPress={()=> setModal({maritalStatus: false, education: false, employment: false, location: false, origin: true, genotype: false, mateModal: false,})} >
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          </View>


          <Modal animationType="slide" transparent={true} visible={getModal.genotype} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}> Select Your Genotype </Text>
                <Dropdown onChangeText={value=> setUpdate({myGenotype: value})} useNativeDriver={true} label='Genotype' data={editGenotype} containerStyle={{width:120, marginBottom:30}} />
                <View style={styles.cancelSave}>
                  <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#fc6f03" }} onPress={() => { setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,}); }}>
                    <Text style={styles.dismissText}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
                    onPress={() => {
                      saveUpdate(getUpdate.myGenotype);
                      setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,});
                    }} 
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  >
                    <Text style={styles.dismissText}>Save</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.mainDetails}>
            <Text style={styles.email}> {getProfile.myGenotype? getProfile.myGenotype: "Genotype"} </Text>
            <TouchableOpacity style={styles.editBtn} onPress={()=> setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: true, mateModal: false,})} >
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          </View>

        </View>












        {/* SPOUSE SECTION */}


        <Modal animationType="slide" transparent={true} visible={getModal.mateModal} onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}> Update Preferred Spouse Details </Text>
                <Dropdown onChangeText={value=> setMateDet1({mateAge: value})} useNativeDriver={true} label='Age' data={editMateAge} containerStyle={{width:120}} />
                <Dropdown onChangeText={value=> setMateDet2({mateMaritalStatus: value})} useNativeDriver={true} label='Marital Status' data={editMateMarital} containerStyle={{width:120}} />
                <Dropdown onChangeText={value=> setMateDet3({mateEmploymentStatus: value})} useNativeDriver={true} label='Employment Status' data={editMateJob} containerStyle={{width:120}} />
                <Dropdown onChangeText={value=> setMateDet4({mateLocation: value})} useNativeDriver={true} label='Location' data={editMateLocation} containerStyle={{width:120}} />
                <Dropdown onChangeText={value=> setMateDet5({mateStateOfOrigin: value})} useNativeDriver={true} label='State of Origin' data={editMateOrigin} containerStyle={{width:120}} />
                <Dropdown onChangeText={value=> setMateDet6({mateQualification: value})} useNativeDriver={true} label='Qualification' data={editMateEdu} containerStyle={{width:120, marginBottom: 10,}} />
                <View style={styles.cancelSave}>
                  <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#fc6f03" }} onPress={() => { setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,}); }}>
                    <Text style={styles.dismissText}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
                    onPress={() => {
                      let spouse = [getMateDet1.mateAge, getMateDet2.mateMaritalStatus, getMateDet3.mateEmploymentStatus, getMateDet4.mateLocation, getMateDet5.mateStateOfOrigin, getMateDet6.mateQualification];
                      saveUpdate(spouse);
                      setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: false,});
                    }} 
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  >
                    <Text style={styles.dismissText}>Update </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>

          
        <View style={styles.card}>

          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Spouse Traits</Text>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Age</Text>
              <Text style={styles.cardRowVal}> {getProfile.mateAge ? getProfile.mateAge: 'Null'} </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Marital Status</Text>
              <Text style={styles.cardRowVal}> {getProfile.mateMaritalStatus ? getProfile.mateMaritalStatus: "Null" }</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Employment Status</Text>
              <Text style={styles.cardRowVal}> {getProfile.mateEmploymentStatus ? getProfile.mateEmploymentStatus : "Business Owner"}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Location</Text>
              <Text style={styles.cardRowVal}> {getProfile.mateLocation ? getProfile.mateLocation : "Null" }</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>State of Origin</Text>
              <Text style={styles.cardRowVal}> {getProfile.mateStateOfOrigin ? getProfile.mateStateOfOrigin: "Null" }</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowProp}>Qualification</Text>
              <Text style={styles.cardRowVal}> {getProfile.mateQualification ? getProfile.mateQualification : "Null" }</Text>
            </View>

            <View style={{marginTop: 3}}>
              <TouchableOpacity style={{ alignItems: 'center' }}  onPress={()=> setModal({maritalStatus: false, education: false, employment: false, location: false, origin: false, genotype: false, mateModal: true,})} >
                <Text style={{backgroundColor: 'grey', paddingHorizontal: 15, paddingVertical: 3}}>Edit</Text>
              </TouchableOpacity>            
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
  edit: {
    color: 'black'
  },
  editBtn: {
    marginRight: 10,
    marginVertical: 5,
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 1
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    fontWeight: 'bold',
  },


  cancelSave: {
    flexDirection: 'row'
  },



});
