import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Header = ({navigation, title}) => {
    return (
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Icon name='angle-left' size={24} color="black"/>
            </TouchableOpacity>
            <Text style={{fontWeight:'bold', fontSize:20, marginLeft:20}}>{title}</Text>
        </View>
    )
}

export default Header
