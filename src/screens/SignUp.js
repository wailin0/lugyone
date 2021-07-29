import React, {useEffect, useState} from 'react';
import {Button, Image, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {color, input, lugyoneLogo} from '../styles/theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import api from '../services/api';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CountriesPhoneCodeListModal from '../components/CountriesPhoneCodeListModal';

const SignUp = ({navigation}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [modal, setModal] = useState(false);
    const [countriesPhoneCodeList, setCountriesPhoneCodeList] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('Myanmar');
    const [selectedPhoneCode, setSelectedPhoneCode] = useState('+95');
    const [countriesListModal, setCountriesListModal] = useState(false);

    const handleSignUp = async () => {
        try {
            setError(null);
            const confirmation = await auth().signInWithPhoneNumber(selectedPhoneCode +' '+ phone);
            setConfirm(confirmation);
            setModal(true);
        } catch (e) {
            console.log(e);
            if (e.code === 'auth/invalid-phone-number') {
                setError('Invalid phone number');
            } else if (e.code === 'auth/too-many-requests') {
                setError('Too many requests, try again later');
            }
        }
    };


    useEffect(() => {
        api.getCountries()
            .then(res => {
                setCountriesPhoneCodeList(res);
            });
    }, []);

    async function confirmCode() {
        try {
            const createdUser = await confirm.confirm(code);
            const newUser = {
                name,
                phone,
                photoURL: 'http://',
            };
            await firestore().collection('users').doc(createdUser.user.uid).set(newUser);
            setModal(false);
            navigation.goBack();
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-verification-code') {
                setError('Invalid code');
            } else if (error.code === 'auth/session-expired') {
                setError('Code Expired');
            }
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => setCountriesListModal(true)}
                            style={{
                                flexDirection: 'row', alignItems: 'center', padding: 5, marginRight: 10,
                            }}>
                            <Text style={{marginRight: 10}}>
                                {selectedCountry}
                            </Text>
                            <Icon name='caret-down' size={15} color="black"/>
                        </TouchableOpacity>
                        <TextInput
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            style={{...input, flex: 1}}
                            placeholder='phone number'
                            keyboardType={'phone-pad'}
                        />
                    </View>

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
                    {error && <Text style={{color: 'red', marginTop: 10}}>{error}</Text>}
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
                        <Text
                            style={{color: 'white'}}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>


            <CountriesPhoneCodeListModal
                countriesListModal={countriesListModal}
                setCountriesListModal={setCountriesListModal}
                countriesPhoneCodeList={countriesPhoneCodeList}
                setSelectedCountry={setSelectedCountry}
                setSelectedPhoneCode={setSelectedPhoneCode}
            />

        </SafeAreaView>
    );
};

export default SignUp;
