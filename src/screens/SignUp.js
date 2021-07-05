import React, {useState} from 'react';
import {Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {input, lugyoneLogo} from '../styles/theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            return setError('password is not the same');
        }
        try {
            const createdUser = await auth().createUserWithEmailAndPassword(email, password)
            const newUser = {
                name,
                photoURL: 'http://',
                email
            }
            await firestore().collection('users').doc(createdUser.user.uid).set(newUser)
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                setError('email address is invalid');
            }
            if (error.code === 'auth/weak-password') {
                setError('password should be at least 6 characters');
            }
        }
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
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{...input}}
                        autoCapitalize='none'
                        placeholder='email address'
                        keyboardType='email-address'
                    />

                    <TextInput
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={{...input}}
                        placeholder='password'
                    />

                    <TextInput
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        style={{...input}}
                        placeholder='confirm password'
                    />
                    {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}
                    <Button title='Sign Up'
                            disabled={!(name && email && password && confirmPassword)}
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
                        <Text style={{color: 'blue', marginLeft: 10}}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
