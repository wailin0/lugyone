import React from 'react';
import {Button, Text, View} from 'react-native';

const TrackService = ({navigation}) => {

    const registerService = () => {

    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize:18, marginBottom:20}}>
                You haven't acquired any service yet!
            </Text>
            <Button
                title='hire a new service'
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

export default TrackService;
