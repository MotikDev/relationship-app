import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

export default function Loading() {
        return (
            <View style={styles.container}>
              <Image style={styles.logo} source={require('../images/14517350_599474773571206_5010744294604347547_n-removebg-preview.png')} />
            </View>
        );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 6,
    resizeMode: 'stretch',
  },
});
