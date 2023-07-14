import * as React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"
import { useState } from "react"
import * as Font from "expo-font"
import Title from './components/Title'
import Home from './components/Home'
import Camera from './components/Camera';

const Stack = createNativeStackNavigator()


const opts = {
    headerStyle: {
        backgroundColor: '#bb55aa',
    },
    headerTitleStyle: {
        fontFamily: 'Georgia'
    },
    headerTintColor: '#ffffff'
}

const App = () => {

    const [loaded, setLoaded] = useState(false)
    let content

    //asynchronous font loading and then updating component
    const fontLoader = async () => {

        await Font.loadAsync({
            'DancingScript': require('./assets/fonts/DancingScript.ttf')
        })
        setLoaded(true)
    }
    fontLoader()
    if (loaded) {
        content = <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='title' component={Title} options={opts} />
                <Stack.Screen name='home' component={Home} options={opts} />
                <Stack.Screen name='camera' component={Camera} options={opts} />
            </Stack.Navigator>
        </NavigationContainer>
    }

    return (
        content
    )

}

export default App