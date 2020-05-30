import * as React from 'react';
import {View , Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function Card(props){
    return(
        <View style={styles.card}>
          <View style={styles.cardContent}> 
                 { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius:6,
        elevation:3,
        shadowOffset:{width:5,height:5},
        shadowColor:'#8cf1f5',
        shadowOpacity:0.2,
        width: wp('100%'),
        height: hp('65%'),
        backgroundColor:"#383737",
        opacity:0.8
        
    },


})
