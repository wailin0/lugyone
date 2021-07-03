import React, {useContext, useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {Context} from '../Context';
import ServiceList from '../components/ServiceList';

const YourService = ({navigation}) => {
    const [services, setServices] = useState([]);

    const {login, user} = useContext(Context);

    if (!user.worker) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, marginBottom: 20}}>
                    Track your works here
                </Text>
                <Text style={{marginBottom:10}}>
                    You haven't register your service yet
                </Text>
                <Button
                    title='Update your account'
                    onPress={() => {
                        login
                            ? navigation.navigate('Account')
                            : navigation.navigate('Profile');
                    }}
                />
            </View>
        );
    }

    if(services.length===0){
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, marginBottom: 20}}>
                    You are now registered as a {user.serviceCategory}
                </Text>
                <Text style={{marginBottom:10}}>
                    your can track accepted jobs here
                </Text>
            </View>
        );
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginVertical: 20}}>
                <ServiceList navigation={navigation} services={services}/>
            </View>
        </SafeAreaView>
    );
};

export default YourService;
