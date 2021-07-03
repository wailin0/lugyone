import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';

const settings = [
    {
        'name': 'FAQ',
    },
    {
        'name': 'Customer Support',
    },
    {
        'name': 'Terms & Conditions',
    },
    {
        'name': 'Privacy Policies',
    },
    {
        'name': 'Legal Notices',
    },
    {
        'name': 'About The App',
    },
];

const Support = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <Header navigation={navigation} title='Support'/>
                <View
                    style={{
                        marginTop: 20,
                    }}
                >
                    {settings.map(setting =>
                        <TouchableOpacity
                            key={setting.name}
                            style={{flexDirection: 'row', marginBottom: 30, alignItems: 'center'}}
                        >
                            <Text style={{alignSelf: 'baseline', fontSize: 20}}>
                                {setting.name}
                            </Text>
                            <Icon name='angle-right' style={{marginLeft: 'auto'}} size={24} color="black"/>
                        </TouchableOpacity>,
                    )}
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginBottom: 20,
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderColor: 'grey',
    },
});

export default Support;
