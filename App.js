import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-community/async-storage";
import Loading from "./screens/user/loading";
import FirstPage from "./screens/user/firstPage";
import Register from "./screens/user/register";
import Register2 from "./screens/user/register2";
import Login from "./screens/user/login";
import Approved from "./screens/user/notApproved";
import Requests from "./screens/user/requests";
import Chats from "./screens/user/chats";
import Support from "./screens/user/support";
import Search from "./screens/user/search";
import Profile from "./screens/user/profile";
import SearchProfile from "./screens/user/searchProfile";
import RequestProfile from "./screens/user/requestProfile";
import Requested from "./screens/user/requested";
import ConnectedProfile from "./screens/user/connectedProfile";
import ForgotPassword from "./screens/user/forgotPassword";
import AuthContext from "./screens/user/authContext";
import "./screens/user/automatedURL";

const Stack = createStackNavigator();

export default function App() {

  // const constantUrlNgrok = "https://ec10bebaf288.eu.ngrok.io";

  const [getStatus, setStatus] = React.useState('');
  const [getMateId, setMateId] = React.useState('');
  const [getChatId, setChatId] = React.useState('');

  AsyncStorage.getItem('connectionStatus', (err, status) => {
    setStatus(status);
    // console.log(status);
  });
  AsyncStorage.getItem('connectionID', (err, id) => {
    setMateId(id);
  });
  AsyncStorage.getItem('chatID', (err, id) => {
    setChatId(id);
  });
  const [getToken, setToken] = React.useState('');
  AsyncStorage.getItem('userToken', (err, token) => {
    setToken(token);
  });

  const [getState, dispatch] = React.useReducer(
    (previousState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...previousState,
            userToken: action.token,
            connectionStatus: action.connectionStatus,
            isLoading: false,
          };
        case 'SIGN_IN':
          // action.connectionStatus.then(result => console.log(result));
          return {
            ...previousState,
            isSignedOut: false,
            userToken: action.token,
            connectionStatus: getStatus,
            isLoading: false,
          };
          case 'CONNECTED':
            // action.connectionStatus.then(result => console.log(result));
            return {
              ...previousState,
              isSignedOut: false,
              userToken: action.token,
              connectionStatus: 'connected',
              connectedUserId: getMateId,
              isLoading: false,
            };
        case 'SIGN_OUT':
          AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
          .then(() => alert('You have successfully logged out'));
          // // AsyncStorage.removeItem('myAge');
          return {
            ...previousState,
            isSignedOut: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignedOut: false,
      userToken: null,
    }
    );


    React.useEffect(()=> {
      const bootStrapAsync = async () => {
        let userToken;
        let userStatus;

        try {
          userToken = await AsyncStorage.getItem('userToken');
          userStatus = await AsyncStorage.getItem('connectionStatus');
        } catch (error) {
          console.log(error);         
        }

        dispatch({type: 'RESTORE_TOKEN', token: userToken, connectionStatus: userStatus});
      };

      if (AsyncStorage.getItem('userToken'))
      bootStrapAsync();
    }, []);


    const authContext = React.useMemo(
      ()=> ({
        signIn: async data => {

            try {
              let myHeaders = new Headers();
              myHeaders.append("Accept", "application/json");
    
              let formdata = new FormData();
              formdata.append("email", data.getUsername);
              formdata.append("password", data.getPassword);
    
              let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
              };
    
              await fetch(constantUrlNgrok+"/api/myapi/login", requestOptions)
                .then(response => response.json())
                .then(result => {
// console.log(result);
                  setStatus(result.user.connection_status);
                  // alert(result.user.connection_status);
                  AsyncStorage.setItem('userToken', result.access_token);
                  AsyncStorage.setItem('connectionStatus', result.user.connection_status);
                  // AsyncStorage.setItem('connectionStatus', result.status);
                  AsyncStorage.setItem('userName', result.user.name);
                  AsyncStorage.setItem('email', result.user.email);
                  AsyncStorage.setItem('myAge', result.user.DOB);
                  AsyncStorage.setItem('myPicture', result.user.profile_Pic);
                  result.user.attachment_style != null?  AsyncStorage.setItem('attachmentStyle', JSON.stringify(result.user.attachment_style)): '' ;
                  result.user.connection_chat_id != null?  AsyncStorage.setItem('chatID', JSON.stringify(result.user.connection_chat_id)): '' ;
                  result.user.myMaritalStatus != null?  AsyncStorage.setItem('myMaritalStatus', result.user.myMaritalStatus): '' ;
                  result.user.myQualification != null? AsyncStorage.setItem('myQualification', result.user.myQualification): '';
                  result.user.myEmploymentStatus != null? AsyncStorage.setItem('myEmploymentStatus', result.user.myEmploymentStatus): '';
                  result.user.myLocation != null? AsyncStorage.setItem('myLocation', result.user.myLocation): '';
                  result.user.myStateOfOrigin != null? AsyncStorage.setItem('myStateOfOrigin', result.user.myStateOfOrigin): '';
                  result.user.myGenotype != null? AsyncStorage.setItem('myGenotype', result.user.myGenotype): '';
                  result.user.mateAge != null? AsyncStorage.setItem('mateAge', result.user.mateAge): '';
                  result.user.mateLocation != null? AsyncStorage.setItem('mateLocation', result.user.mateLocation): '';
                  result.user.mateEmploymentStatus != null? AsyncStorage.setItem('mateEmploymentStatus', result.user.mateEmploymentStatus): '';
                  result.user.mateMaritalStatus != null? AsyncStorage.setItem('mateMaritalStatus', result.user.mateMaritalStatus): '';
                  result.user.mateQualification != null? AsyncStorage.setItem('mateQualification', result.user.mateQualification): '';
                  result.user.mateStateOfOrigin != null? AsyncStorage.setItem('mateStateOfOrigin', result.user.mateStateOfOrigin): '';

                  //IF USER IS NOT YET CONNECTED SAVE THE MATCH RESULTS
                  // result.mate_result != null? console.log(result.mate_result) : '';
                  // result.mate_result != null? console.log(result.mate_result[0].id) : '';
                  
                  result.mate_result != null? AsyncStorage.multiSet([
                    ['match_1_id', JSON.stringify(result.mate_result[0].id)], 
                    ['match_1_name', JSON.stringify(result.mate_result[0].name)], 
                    ['match_1_pic', JSON.stringify(result.mate_result[0].profile_Pic)],
                    ['match_2_id', JSON.stringify(result.mate_result[1].id)],
                    ['match_2_name', JSON.stringify(result.mate_result[1].name)],
                    ['match_2_pic', JSON.stringify(result.mate_result[1].profile_Pic)],
                    ['match_3_id', JSON.stringify(result.mate_result[2].id)], 
                    ['match_3_name', JSON.stringify(result.mate_result[2].name)],
                    ['match_3_pic', JSON.stringify(result.mate_result[2].profile_Pic)] 
                  ]) : '';

                  result.partner != null? AsyncStorage.multiSet([
                    ['partner_id', JSON.stringify(result.partner.id)], 
                    ['partner_name', JSON.stringify(result.partner.name)], 
                    ['partner_pic', JSON.stringify(result.partner.profile_Pic)],
                  ]) : '';

                });
                // AsyncStorage.getItem('connectionStatus').then(result => console.log(result));
                // .then(result => AsyncStorage.setItem('userToken', result.access_token));//console.log(result));
                // AsyncStorage.getItem('connectionStatus').then(result => { setStatus(result); let testing = getStatus; console.log(testing);});
                dispatch({type: 'SIGN_IN', token: AsyncStorage.getItem('userToken'), connectionStatus: AsyncStorage.getItem('connectionStatus')});
          } catch(error) {
            console.error(error);
          }
          //END OF SIGNIN
        },
        signOut: async () => dispatch({type: 'SIGN_OUT'}),
        signUp: async data => {
          // console.log(data);
          try {

              // var myHeaders = new Headers();
              // myHeaders.append("Accept", "application/json");
              // myHeaders.append("Content-type", "multipart/form-data");
              // myHeaders.append("Content-type", "application/json");

              var formdata = new FormData();
              formdata.append("idCard", {uri: data.idCard, type: 'image/jpeg', name: 'photo.jpeg'});
              formdata.append("wofbiCert", {uri: data.wofbi, type: 'image/jpeg', name: 'photo.jpeg'});
              formdata.append("profilePic", {uri: data.profileP, type: 'image/jpeg', name: 'photo.jpeg'});
              formdata.append("email", data.email);
              formdata.append("password", data.pass);
              formdata.append("firstName", data.firstName);
              formdata.append("lastName", data.lastName);
              formdata.append("sex", data.sex);
              formdata.append("dob", JSON.stringify(data.dob));

              var requestOptions = {
                method: 'POST',
                // headers: myHeaders,
                body: formdata,
                redirect: 'follow'
              };

              await fetch(constantUrlNgrok+"/api/myapi/register", requestOptions)
                .then(response => response.json())
                .then(result => {
                  // console.log(result);y
                  setStatus(result.status);
                  AsyncStorage.setItem('userToken', result.access_token);
                  AsyncStorage.setItem('connectionStatus', result.status);
                });
                //YOU MUST CATCH THE ERROR HERE
                dispatch({type: 'SIGN_IN', token: AsyncStorage.getItem('userToken'), connectionStatus: AsyncStorage.getItem('connectionStatus')});

          } catch (error) { 
            console.error(error);
          }
        },
        //END OF SIGNUP

        connectMe: async (data) => {
          try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+data[1]);
            var formdata = new FormData();
            formdata.append("connectMe", data[0]);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };
            await fetch(constantUrlNgrok+"/api/myapi/connectme", requestOptions)
            .then(response => response.json())
            .then(result => {
              // alert(result);
              setStatus(result.status);
              setMateId(result.mateId);
              setChatId(result.connection_chat_id);
              AsyncStorage.setItem('connectionStatus', result.status);
              AsyncStorage.setItem('connectionID', result.mateId);
              AsyncStorage.setItem('chatID', result.connection_chat_id);
            });
            // alert(getStatus);
            // await AsyncStorage.getItem('connectionStatus', (err, status) => {
            //   alert(status);
            // });
            AsyncStorage.getItem('connectionStatus', (err, status) => {
              setStatus(status);
              // console.log(status);
            });
            AsyncStorage.getItem('connectionID', (err, id) => {
              setMateId(id);
            });
            AsyncStorage.getItem('chatID', (err, id) => {
              setChatId(id);
            });
            // alert(getStatus);
            dispatch({type: 'CONNECTED', token: data[1], connectionStatus: AsyncStorage.getItem('connectionStatus')});
          } catch (error) {
            
          }
        },


        
      }), 
      []
    );


  if(getState.isLoading){
    return (<Loading/>);
  }


    return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {getState.userToken == null ? (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='FirstPage'>
              <Stack.Screen name="FirstPage" component={FirstPage} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Register " component={Register2}/>
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />          
            </Stack.Navigator>
        ) : (
          getState.connectionStatus == 'pending' ? (
          // getState.isPending == true ? (
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Approved">
                  <Stack.Screen name="Approved" component={Approved} />
                  <Stack.Screen name="Support" component={Support} />
                </Stack.Navigator>
          ) : (
            getState.connectionStatus == 'unconnected' ? (
            // getState.isNotConnected == true ? (
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Search">
                  <Stack.Screen name="Search" component={Search} />
                  <Stack.Screen name="SearchProfile" component={SearchProfile} />
                  <Stack.Screen name="Requests" component={Requests} />
                  <Stack.Screen name="RequestProfile" component={RequestProfile} />
                  <Stack.Screen name="Requested" component={Requested} />
                  <Stack.Screen name="Profile" component={Profile} />
                  <Stack.Screen name="Support" component={Support} />
                </Stack.Navigator>              
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Chats">
                  <Stack.Screen name="Chats" component={Chats} />
                  <Stack.Screen name="Support" component={Support} />
                  <Stack.Screen name="Profile" component={Profile}/>
                  <Stack.Screen name="ConnectedProfile" component={ConnectedProfile} />
                </Stack.Navigator>
            )
            )
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );

}
