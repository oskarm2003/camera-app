import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"
import { useState } from "react"
import * as Font from "expo-font"

const styles = StyleSheet.create({
    title: {
        fontSize: 75,
        color: 'white',
        fontFamily: 'DancingScript',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Georgia',
        textDecorationLine: 'italic',
        textAlign: 'center'
    }
})


const Title = ({ navigation }) => {

    return (<TouchableOpacity style={{ flex: 1 }} onPress={() => { navigation.navigate('home') }}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 10, backgroundColor: '#dd77cc' }}>
            <Text style={styles.title}>Camera App</Text>
            <Text style={styles.subtitle}>Show gallery pictures and take them!</Text>
        </View>
    </TouchableOpacity>)

}

export default Title