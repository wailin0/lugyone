import React, {useState} from 'react';
import {Button, Image, Modal, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {color, input, lugyoneLogo} from '../styles/theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SignUp = ({navigation}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [modal, setModal] = useState(true);

    const handleSignUp = async () => {
        try {
            setError(null);
            const confirmation = await auth().signInWithPhoneNumber(`+95 ${phone}`);
            setConfirm(confirmation);
            setModal(true);
        } catch (e) {
            console.log(e)
            if (e.code === 'auth/invalid-phone-number') {
                setError('Invalid phone number');
            }
            else if(e.code === 'auth/too-many-requests'){
                setError('Too many requests, try again later')
            }
        }
    };

    async function confirmCode() {
        try {
            await confirm.confirm(code);
            const newUser = {
                name,
                phone,
                photoURL: 'http://',
            };
            await firestore().collection('users').doc(createdUser.user.uid).set(newUser);
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-verification-code') {
                setError('Invalid code');
            }
            else if(error.code === 'auth/session-expired')
                setError('Code Expired')
        }
    }

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
                        Create your account
                    </Text>
                    <TextInput
                        value={name}
                        onChangeText={text => setName(text)}
                        style={{...input}}
                        placeholder='full name'
                        autoCapitalize='words'
                    />
                    <TextInput
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        style={{...input}}
                        placeholder='phone number'
                        keyboardType={'phone-pad'}
                    />

                    {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}
                    <Button title='Sign Up'
                            color={color.button}
                            disabled={!(name && phone)}
                            onPress={() => handleSignUp()}
                    />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <Text>
                        Already have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Sign In')}
                    >
                        <Text style={{color: 'blue', marginLeft: 10}}>
                            Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        borderRadius: 5,
                        flex: 1,
                        padding: 20,
                    }}
                >
                    <Text style={{fontSize: 17, marginBottom: 20}}>Verify your phone number</Text>
                    <TextInput
                        value={code}
                        keyboardType={'number-pad'}
                        placeholder='Enter 6 digits code from sms'
                        onChangeText={text => setCode(text)}
                        style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: 'grey',
                            width: '100%',
                            paddingLeft: 10,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => confirmCode()}
                        style={{
                            backgroundColor: color.button,
                            width: '100%',
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            marginTop: 10,
                        }}
                    >
                        {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}
                        <Text
                            style={{color: 'white'}}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default SignUp;
