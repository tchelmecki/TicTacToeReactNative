import React from "react";
import {View, Text, StyleSheet} from "react-native";

const Topbar = () =>{
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Tic-tac-toe</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 100,
        width: '100%',
        backgroundColor: "#000",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#fff",
    }
})

export default Topbar;