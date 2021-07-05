import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import ServiceList from '../components/ServiceList';
import Loading from '../components/Loading';

const Services = ({navigation, route}) => {
    const [services, setServices] = useState(null)
    const {city, township} = route.params;

    useEffect(() => {
        firestore()
            .collection('users')
            .where('userConfirmed','==',true)
            .get()
            .then(querySnapshot => {
                const array = [];
                querySnapshot.forEach(documentSnapshot => {
                    array.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    });
                });
                setServices(array);
            });
    }, [city, township]);

    if(!services) {
        return <Loading />
    }

    const Header = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="angle-left" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={{marginLeft: 20, fontSize: 20, fontWeight: 'bold'}}>
                    Choose a Worker
                </Text>
            </View>
        );
    };


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                {Header()}
                <View style={{marginTop: 20, marginBottom:40}}>
                    <ServiceList navigation={navigation} services={services}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Services;
