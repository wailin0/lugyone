import React, {useState} from 'react';
import {Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {color, input, lugyoneLogo} from '../styles/theme';
import auth from '@react-native-firebase/auth';

const SignIn = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);

    const handleSignIn = () => {

    };


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <View style={{alignItems: 'center', marginVertical: 20, justifyContent: 'center'}}>
                    <Image
                        source={lugyoneLogo}
                        style={{
                            width: '100%', height: 70,
                        }}
                        resizeMode='contain'
                    />
                </View>

                <View>
                    <Text style={{fontSize: 20, marginBottom: 10}}>
                        Sign in with your phone number
                    </Text>
                    <TextInput
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        style={{...input}}
                        placeholder='phone number'
                        keyboardType={'phone-pad'}
                    />

                    {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}
                    <Button title='Sign In'
                            color={color.button}
                            disabled={!(phone)}
                            onPress={() => handleSignIn()}
                    />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <Text>
                        Didn't have an account
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Sign Up')}
                    >
                        <Text style={{color: 'blue', marginLeft: 10}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;
