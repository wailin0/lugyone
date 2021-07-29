import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ServiceList from '../components/ServiceList';
import Loading from '../components/Loading';
import Header from '../components/Header';

const Services = ({navigation, route}) => {
    const [services, setServices] = useState(null);
    const {city, township} = route.params;

    useEffect(() => {
        firestore()
            .collection('users')
            .where('userConfirmed', '==', true)
            .get()
            .then(querySnapshot => {
                const array = [];
                querySnapshot.forEach(documentSnapshot => {
                    array.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                });
                setServices(array);
            });
    }, [city, township]);

    if (!services) {
        return <Loading/>;
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <Header navigation={navigation} title='Choose a Worker'/>

                {services.length === 0 &&
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Sorry we cant find anyone</Text>
                </View>
                }

                <View style={{marginTop: 20, marginBottom: 40}}>
                    <ServiceList navigation={navigation} services={services}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Services;
