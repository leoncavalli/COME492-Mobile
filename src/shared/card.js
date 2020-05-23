import * as React from 'react';
import {View , Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';

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
        marginLeft:20,
        marginRight:20,
        
    },
    cardContent:{
       marginHorizontal:20,
       marginVertical:10,
    }

})