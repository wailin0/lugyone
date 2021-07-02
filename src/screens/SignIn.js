import React, {useState} from 'react';
import {Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {input} from '../styles/theme';
import auth from '@react-native-firebase/auth';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

    const handleSignIn = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => navigation.goBack())
            .catch(e => setError("invalid email or password"))
    };


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 20, marginTop: 20}}>
                <View style={{alignItems: 'center', marginVertical: 20, justifyContent: 'center'}}>
                    <Image
                        source={{uri: 'http:logo'}}
                        style={{
                            width: 70, height: 70,
                            backgroundColor: 'red',
                        }}
                    />
                </View>

                <View>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Create your account</Text>
                    <TextInput
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{...input}}
                        placeholder='email address'
                        autoCapitalize='none'
                    />
                    <TextInput
                        value={password}
                        onChangeText={text => setPassword(text)}s
                        style={{...input}}
                        placeholder='password'
                    />

                    {error && <Text style={{color:'red',marginBottom:10}}>{error}</Text>}

                    <Button title='Sign In'
                            onPress={handleSignIn}
                            color='red'
                    />
                </View>

                <View style={{flexDirection:'row', alignItems:'center',marginTop:20}}>
                    <Text>
                        Didn't have an account
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Sign Up")}
                    >
                        <Text style={{color:'blue',marginLeft:10}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;