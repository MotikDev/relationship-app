import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Dimensions } from 'react-native';

export default function MyModal({ number, question, visibility = false, action, onPress, pressOption }) {

    const [getDisabled, setDisabled] = useState(false);
    const [getDisabledColor, setDisabledColor] = useState('#4CB050')
        return (
            <Modal animationType="slide" transparent={true} visible={visibility} >
                <View style={{ ...styles.centeredView }}>
                    <View style={{ ...styles.modalView, backgroundColor: '#3B4255' }}>
                        <View style={{alignSelf:'flex-start', marginBottom:10}}>
                            <Text style={{color:"white", fontSize: 12}}>
                                {number == 0? "": number+" of 35"}
                            </Text>
                        </View>
                        <Text style={{ ...styles.modalTitle, color: 'white', fontSize: 20 }}>
                             {question} 
                        </Text>


                        <View>
                            {number == 0? 
                                <View><Text></Text></View>  
                                : 
                                <View style={{ width: Dimensions.get('window').width * (3/5) }} >
                                    <View  style={styles.cancelSave} >
                                        <TouchableHighlight
                                            onPress={() => {
                                                pressOption('Yes');
                                                setDisabled(false);
                                                setDisabledColor("#4CB050")
                                            }}
                                            style={{ ...styles.openButton, marginTop: 20, backgroundColor: "#404B5F" }}
                                        >
                                            <Text style={{ ...styles.dismissText }}> Yes </Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View  style={styles.cancelSave} >
                                        <TouchableHighlight
                                            onPress={() => {
                                                pressOption('No');
                                                setDisabled(false);
                                                setDisabledColor("#4CB050")
                                            }}
                                            style={{ ...styles.openButton, marginTop: 10, backgroundColor: "#404B5F" }}
                                        >
                                            <Text style={{ ...styles.dismissText }}> NO </Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            }
                        </View>

                        <View style={styles.cancelSave}>
                            <TouchableHighlight
                                disabled={getDisabled}
                                onPress={() => {
                                    onPress();
                                    setDisabled(true);
                                    setDisabledColor("#404B5F")
                                }}
                                style={{ ...styles.openButton, marginTop: 30, backgroundColor: getDisabledColor }}
                            >
                                <Text style={{ ...styles.dismissText }}> {action} </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    // };
}//END OF EXPORT



// MyModal.propTypes = {
//     number: React.propTypes.any, 
//     question: React.propTypes.string, 
//     visibility: React.propTypes.bool, 
//     action: React.propTypes.string,
//     onPress: React.propTypes.func.isRequired,
// }


const styles = StyleSheet.create({

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
        // backgroundColor: '#92F696', //FOR ACTIVE OPTION
        // backgroundColor: getDisabledColor,
        paddingVertical: 6,
        flex: 1,
        elevation: 2,
        marginHorizontal: 5,
    },
    activeOption: {
        backgroundColor: '#92F696', //FOR ACTIVE OPTION
        // backgroundColor: '#4CB050',
        paddingVertical: 6,
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


});