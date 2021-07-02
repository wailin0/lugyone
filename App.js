import React, {useEffect, useState} from 'react';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';
import RootNavigation from './src/navigations/RootNavigation';
import {Context} from './src/Context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
import api from './src/services/api';

export default function App() {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [login, setLogin] = useState();
    const [location, setLocation] = useState({
        address: null,
        latitude: null,
        longitude: null,
    });

    // Handle user state changes
    function onAuthStateChanged(login) {
        setLogin(login);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                api.getLocation(position.coords.longitude, position.coords.latitude)
                    .then(r => {
                        setLocation({
                            address: r.features[0].place_name,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        })
                    })
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    useEffect(() => {
        if (login) {
            firestore().collection('users').doc(login.uid).onSnapshot(
                onResult => {
                    setUser(onResult.data());
                },
                onError => {
                    console.log(onError.message);
                },
            );
        }
    }, [login]);

    if (initializing) {
        return null;
    }


    return (
        <Context.Provider value={{login, user, location}}>
            <NavigationContainer>
                <RootNavigation/>
            </NavigationContainer>
        </Context.Provider>
    );
}
