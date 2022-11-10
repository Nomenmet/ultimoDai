import react from "react";
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Fondo(){
// preguntar a galo tema de libreria de camara
    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    return(
        <>
            <View>
                <Text>Fondo</Text>
                <View >
                    <Text>Try permissions</Text>
                    <Button title="request permissions" onPress={requestCameraPermission} />
                </View>
            </View>
        
        </>
    )
}