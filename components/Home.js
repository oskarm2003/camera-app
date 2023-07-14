import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Alert, FlatList, Image, Dimensions, Platform } from "react-native"
import * as MediaLibrary from 'expo-media-library';
import { ToastAndroid } from "react-native";


const Home = ({ navigation }) => {

    const [layout, setLayout] = useState('flat')
    // const [photos, setPhotos] = useState([])

    const get_photos = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })
        return obj.assets
    }

    const change_layout = () => {
        if (layout == 'flat') {
            setLayout('grid')
        } else {
            setLayout('flat')
        }
    }

    const camera_mode = () => {
        navigation.navigate('camera')
    }

    const delete_photos = () => {
        //TODO
    }

    return (
        <>
            <Buttons changeLayout={change_layout} cameraMode={camera_mode} deletePhotos={delete_photos} />
            <Gallery layout={layout} get_photos={get_photos} />
        </>
    )
}

const get_permision = async (setPermission) => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    setPermission(status)
    if (status == 'granted') {
        if (Platform == 'Androind') {
            ToastAndroid.showWithGravity(
                'permission granted',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }
}

const Gallery = ({ layout, get_photos }) => {

    const [permission, setPermission] = useState(null)
    const [photos, setPhotos] = useState([])

    if (permission == null) {
        get_permision(setPermission)
    }

    if (permission == 'granted') {
        const f = async () => {
            let new_photos = await get_photos()
            console.log(photos.length);
            if (photos.length == 0) {
                setPhotos(new_photos)
            }
            else if (!(photos[0].creationTime == new_photos[0].creationTime)) {
                setPhotos(new_photos)
            }
        }
        f()
    }

    useEffect(() => {
        console.log('hejka');
    }, [])

    let width
    let height
    let numColumns

    if (layout == 'grid') {
        width = Dimensions.get("window").width / 3 - 3
        height = Dimensions.get("window").width / 3 - 3
        numColumns = 3, 1
    }
    else if (layout == 'flat') {
        width = Dimensions.get("window").width - 5
        height = Dimensions.get("window").width / 2
        numColumns = 1, 5

    }

    return (

        <View style={{ flex: 7, flexDirection: 'row' }}>
            <FlatList numColumns={numColumns} key={numColumns} data={photos} renderItem={({ item }) => { return <Photo uri={item.uri} width={width} height={height} /> }} />
        </View>
    )

}

const Photo = ({ uri, id, width, height }) => {

    return (
        <TouchableOpacity>
            <Image style={{ width: width, height: height, margin: 2, borderRadius: 10 }} source={{ uri: uri }}></Image>
        </TouchableOpacity>
    )

}

const Buttons = ({ changeLayout, cameraMode, deletePhotos }) => {

    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Presser text='Layout' action={changeLayout} />
            <Presser text='Camera' action={cameraMode} />
            <Presser text='Delete' action={deletePhotos} />
        </View>
    )
}

const Presser = ({ text, action }) => {
    return (
        <TouchableOpacity onPress={() => { action() }}>
            <View style={{ padding: 15, backgroundColor: '#dd77cc', borderRadius: 10 }}>
                <Text style={{ color: '#ffffff', fontFamily: 'Georgia', fontSize: 20 }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Home