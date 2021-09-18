// // import React, { useState, useEffect, useRef, useMemo } from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
// // import "./automatedURL";


// // const [getToken, setToken] = useState('');
// // AsyncStorage.getItem('userToken', (err, token) => {
// //   setToken(token);
// // });

// // const [DatabaseChats, setChats] = useState([

// // ]);


// // var myHeaders = new Headers();
// // myHeaders.append("Authorization", "Bearer " + getToken);
// // myHeaders.append("Accept", "application/json");

// // var requestOptions = {
// //   method: 'GET',
// //   headers: myHeaders,
// //   redirect: 'follow'
// // };
// // await fetch(constantUrlNgrok + "/api/myapi/allchats", requestOptions)
// // .then(response => response.json())
// // .then(result => {
// // let chatResults = [];
// // result.currentChats == undefined ? '' : chatResults = result.currentChats;
// // if (chatResults.length !== 0) {
// //   chatResults.forEach((element, index) => {
// //     setChats((prev) => ([
// //       ...prev,
// //       { name: element.senderName, picture: element.SenderPicture, message: element.Message, key: (index + 1).toString() },
// //     ]));
// //   });
// // }
// // });

// // export default DatabaseChats;



// let globalToken = '';
// AsyncStorage.getItem('userToken', (err, token) => {
//   globalToken = token;
// });
// // console.log(globalToken);
// const myGlobalToken = globalToken;
// export default myGlobalToken;