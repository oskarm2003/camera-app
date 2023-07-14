import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import { useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { ToastAndroid } from "react-native";




const set_permission = async (setPermission) => {

    let { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status)

}

const CameraView = ({ navigation }) => {

    const [permission, setPermission] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)

    const change_camera_type = () => {
        if (cameraType == Camera.Constants.Type.back) {
            setCameraType(Camera.Constants.Type.front)
        } else {
            setCameraType(Camera.Constants.Type.back)
        }
    }

    const take_a_photo = async () => {
        if (camera) {
            let foto = await camera.takePictureAsync();

            if (Platform == 'Android') {
                ToastAndroid.showWithGravity(
                    'photo taken',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
            navigation.navigate('home', {})
        }
    }

    let camera

    set_permission(setPermission)

    if (permission === 'granted') {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => { camera = ref }}
                    style={{ flex: 1 }}
                    type={cameraType}>
                    <TouchableOpacity onPress={change_camera_type}>
                        <View style={{ margin: 10, width: 40, height: 40, borderRadius: 50, borderWidth: 5, borderColor: '#bb77cc', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }} >
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'column-reverse', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', display: 'flex' }}>

                            <TouchableOpacity onPress={take_a_photo}>
                                <View style={{ margin: 50, width: 70, height: 70, borderRadius: 50, borderWidth: 10, borderColor: '#dd77cc', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }} >
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>
            </View>
        )
    }
    else if (permission === false) {
        return (<Text>Camera Access Denied</Text>)
    }
    else {
        return (<View></View>)
    }
}

export default CameraView