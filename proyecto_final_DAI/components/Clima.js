import {react, useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
//const axios = require('axios');


const Styles = {

  contenedor:{
    flex:1,
    width:"100%",
    height:"100%",
    justifyContent: "center",
    alignItems: "center"
  },

  data:{
    backgroundColor: 'rgba(0, 0, 0,  .5)',
    border:"1px",
    padding:10,
    borderRadius:10,

  },
  separator:{
    margin:5
  },
  textoSinPretexto:{
    color:"white",
    fontSize:20
  }
}

export default function Clima(){

    const [currentDate, setCurrentDate] = useState('');

    const [location, setLocation] = useState(null);
    const [error, setErrorMsg] = useState("")
    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);

    const [data, setData]= useState();

    useEffect(() => {

        setInterval(()=>{
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = String(new Date().getMinutes() ).padStart(2, '0');; //Current Minutes 
            var sec = String(new Date().getSeconds() ).padStart(2, '0'); //Current Seconds 
            setCurrentDate(
            date + '/' + month + '/' + year 
            + ' ' + hours + ':' + min + ':' + sec
            );
        }, 1000
        )
      }, []);

      useEffect(() => {
        (async () => {
          // Pedir permiso de ubicacion al celular
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          // Traer la ubicacion actual
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          JSON.stringify(location);
          //console.log(location.coords.latitude)
          //console.log(location.coords.longitude)
          setLatitud(location.coords.latitude);
          setLongitud(location.coords.longitude);
        })();
      }, []);


      useEffect(()=>{

        axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+latitud+'&lon='+longitud+'&appid=fe7f2a8e6caf606f366e8d6d4c696019')
        .then(function (response) {
          // handle success

          //aca ahora hay que guardar la data y ponerla
          setData(response.data)
 
        })
        .catch(function (error) {
          // handle error
          console.log('https://api.openweathermap.org/data/2.5/weather?lat='+latitud+'&lon='+longitud+'&appid=fe7f2a8e6caf606f366e8d6d4c696019')
          console.log(error);
        })




      },[latitud,longitud])

    return(
        <>
            <View style={Styles.contenedor}>
                <View style={Styles.data}>

                  <View style={Styles.separator}>

                    <Text style={Styles.textoSinPretexto}>
                        Hora actual:
                    </Text>
                    <Text style={Styles.textoSinPretexto}>
                        {currentDate}
                    </Text>

                  </View>

                  <View style={Styles.separator}>

                    <Text style={Styles.textoSinPretexto}>
                      Latitud: {latitud.toFixed(2)}
                    </Text>
                    <Text style={Styles.textoSinPretexto}>
                      Longitud: {longitud.toFixed(2)}
                    </Text>
                  
                  </View>

                  <View style={Styles.separator}>
                    <Text style={Styles.textoSinPretexto}> 
                    Temperatura: {data ? (data.main.temp -273.15).toFixed(1) + ' \u00b0' + "C": ""} 
                    </Text>
                  </View>

                </View>
            </View>
        
        </>
    )
}