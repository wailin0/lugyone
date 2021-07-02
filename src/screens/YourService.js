import React, {useContext, useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../Context';
import ServiceList from '../components/ServiceList';
import Loading from '../components/Loading';

const YourService = ({navigation}) => {
    const [services, setServices] = useState(null);

    const {login} = useContext(Context);

    useEffect(() => {
        firestore()
            .collection('services')
            .where('userId', '==', login && login.uid)
            .onSnapshot(
                onResult => {
                    const array = [];
                    onResult.forEach(documentSnapshot => {
                        array.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data(),
                        });
                    });
                    setServices(array);
                },
            );

    }, [login]);

    if (!services) {
        return <Loading/>;
    }

    if (services.length === 0) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, marginBottom: 20}}>
                    You dont have any service yet!
                </Text>
                <Button
                    title='Register a new service'
                    onPress={() => {
                        login
                            ? navigation.navigate('Register Service')
                            : navigation.navigate('Profile');
                    }}
                />
            </View>
        );
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 20, marginVertical: 20}}>
                <ServiceList navigation={navigation} services={services}/>
            </View>
        </SafeAreaView>
    );
};

export default YourService;
