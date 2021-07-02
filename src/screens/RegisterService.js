import React, {useContext, useState} from 'react';
import {Button, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import {input} from '../styles/theme';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../Context';

const RegisterService = ({navigation}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [photoURL, setPhotoURL] = useState('')
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [township, setTownship] = useState('');
    const [description, setDescription] = useState('')

    const {login} = useContext(Context)

    const registerService = () => {
        const newService = {
            name,
            photoURL,
            phone,
            category,
            city,
            township,
            description,
            userId: login.uid
        }
        firestore().collection('services').add(newService)
            .then(res => {
                console.log(res)
                navigation.navigate("Service Detail", {
                    serviceId: res.id
                })            })
            .catch(err => console.log(err))
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 20, marginVertical: 20}}>
                <Header navigation={navigation} title='Register Your Service'/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, marginTop: 20}}
                >
                    <View style={{alignItems: 'center', marginBottom: 20}}>
                        <Image
                            source={{uri: 'http'}}
                            style={{
                                width: 90, height: 90,
                                backgroundColor: 'red',
                                borderRadius: 50,
                                marginBottom: 10,
                            }}
                        />
                        <TouchableOpacity>
                            <Text>Upload Photo</Text>
                        </TouchableOpacity>
                    </View>

                    <Text>Choose a category for your service</Text>
                    <TextInput
                        value={category}
                        onChangeText={text => setCategory(text)}
                        placeholder='category name'
                        style={{...input}}
                    />

                    <Text>Service Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder='your name or company name'
                        style={{...input}}
                    />

                    <Text>Phone Number</Text>
                    <TextInput
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        placeholder='enter your phone number'
                        style={{...input}}
                    />

                    <Text>Location</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            value={city}
                            onChangeText={text => setCity(text)}
                            style={{...input, width: 100, marginRight: 10}}
                            placeholder='City'
                        />
                        <TextInput
                            value={township}
                            onChangeText={text => setTownship(text)}
                            style={{...input, width: 150}}
                            placeholder='Township'
                        />
                    </View>

                    <Text>Service Detail</Text>
                    <TextInput
                        value={description}
                        onChangeText={text => setDescription(text)}
                        multiline={true}
                        numberOfLines={30}
                        placeholder='brief detail about your service and your experience'
                        style={{...input, height:100, textAlignVertical:'top'}}
                    />

                </ScrollView>
                <Button
                    title='Register'
                    onPress={() => registerService()}
                />

            </View>
        </SafeAreaView>
    );
};

export default RegisterService;
