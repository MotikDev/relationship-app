import AsyncStorage from '@react-native-community/async-storage';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import "./automatedURL";
import { YellowBox } from "react-native";
import _ from "lodash";




    // const [getToken, setToken] = useState('');
    var setToken;
    AsyncStorage.getItem('userToken', (err, token) => {
    setToken = token;
    });

    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = _.clone(console);
    console.warn = (message) => {
        if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
        }
    };

  Pusher.logToConsole = true;
  const pusher = new Pusher('be03397f8946d0c23105', {
    cluster: 'eu',
    authEndpoint: constantUrlNgrok+'/broadcasting/auth',
    auth: {
      headers: {
        'Authorization': 'Bearer '+setToken
      }
    }
  });
  
  const MyEcho = new Echo({
      broadcaster: 'pusher',
      key: "be03397f8946d0c23105",
      client: pusher,
      cluster: "eu",
      forceTLS: true,
      disableStats: true,
      logToConsole: true,
      authEndpoint: '/broadcasting/auth',
      auth: {
        headers: {
          'Authorization': 'Bearer '+setToken
        }
      }
  });




// const AuthContext = createContext();

export default MyEcho;
