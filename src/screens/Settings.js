import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';

const settings = [
    {
        'name': 'hide your phone number',
    },
    {
        'name': 'turn off push notification',
    }
];

const Settings = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <Header navigation={navigation} title='Settings'/>
                <View
                    style={{
                        marginTop: 20,
                    }}
                >
                    {/*{settings.map(setting =>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        key={setting.name}*/}
                    {/*        style={{flexDirection: 'row', marginBottom: 30, alignItems: 'center'}}*/}
                    {/*    >*/}
                    {/*        <Text style={{alignSelf: 'baseline', fontSize: 20}}>*/}
                    {/*            {setting.name}*/}
                    {/*        </Text>*/}
                    {/*        <Icon name='angle-right' style={{marginLeft: 'auto'}} size={24} color="black"/>*/}
                    {/*    </TouchableOpacity>,*/}
                    {/*)}*/}
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

export default Settings;
