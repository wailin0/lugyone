import React from 'react';
import {SafeAreaView} from 'react-native';
import Map from './Map';

const Message = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <Map />
        </SafeAreaView>
    )
}

export default Message
