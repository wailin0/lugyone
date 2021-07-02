import React, {useContext} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {Context} from '../Context';
import Loading from '../components/Loading';

const settings = [
    {
        name: 'Account'
    },
    {
        name: 'Payment'
    },
    {
        name: 'Settings'
    },
    {
        name: 'Support'
    },
]

const Profile = ({navigation}) => {

    const {user} = useContext(Context)

    const signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    if(!user){
        return <Loading />
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingHorizontal: 20
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity>
                        <Image
                            source={{uri: user.photoURL}}
                            style={{
                                width: 100, height: 100,
                                borderRadius: 50,
                                borderColor: 'lightgrey',
                                borderWidth: 1,
                                backgroundColor:'lightgrey'
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                backgroundColor: 'lightgrey',
                                bottom: 0,
                                right:0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                width: 30, height: 30
                            }}
                        >
                            <Icon name='camera' size={18} color="black"/>
                        </View>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, marginLeft: 20, fontWeight: 'bold'}}>{user.name}</Text>
                </View>
                <View>
                    {settings.map(setting =>
                        <TouchableOpacity
                            key={setting.name}
                            style={{flexDirection: 'row', marginBottom: 30, alignItems: 'center'}}
                            onPress={() => navigation.navigate(setting.name)}
                        >
                            <Text style={{alignSelf: 'baseline', fontSize: 20}}>
                                {setting.name}
                            </Text>
                            <Icon name='angle-right' style={{marginLeft: 'auto'}} size={24} color="black"/>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={{flexDirection: 'row', marginBottom: 20}}
                    onPress={signOut}
                >
                    <Icon name="power-off" size={24} color="red"/>
                    <Text style={{marginLeft: 20, fontSize: 20, color: 'red', fontWeight: 'bold'}}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile
