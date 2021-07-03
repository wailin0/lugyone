import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Context} from '../Context';
import firestore from '@react-native-firebase/firestore';
import {input} from '../styles/theme';
import Map from './Map';
import api from '../services/api';

const Account = ({navigation}) => {
    const [modal, setModal] = useState(false)
    const [openMap, setOpenMap] = useState(false)
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [serviceCategory, setServiceCategory] = useState('')
    const [location, setLocation] = useState(null);
    const [coords, setCoords] = useState(null);
    const [serviceDetail, setServiceDetail] = useState('');

    const {user,login} = useContext(Context)

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setServiceCategory(user.serviceCategory)
        setServiceDetail(user.serviceDetail)
        setPhone(user.phone)
        setCoords(user.location)
    }, [user])

    useEffect(() => {
        if (coords) {
            api.getLocation(coords.longitude, coords.latitude)
                .then(res => {
                    setLocation(res.features[0].place_name);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [coords]);

    const updateUser = () => {
        firestore()
            .collection('users')
            .doc(login.uid)
            .update({
                name,
                email,
                serviceCategory,
                phone,
                location: coords,
                serviceDetail,
                worker: true
            })
            .then(() => {
                setModal(true)
            });
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <Header navigation={navigation} title='Account'/>
                <View style={{flex: 1, marginBottom: 10, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            marginTop: 20
                        }}
                    >
                        <Text>Full Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={text => setName(text)}
                            style={{...input}}
                        />

                        <Text>Email Address</Text>
                        <TextInput
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={{...input}}
                        />

                        <Text>Choose a category for your service</Text>
                        <TextInput
                            value={serviceCategory}
                            onChangeText={text => setServiceCategory(text)}
                            placeholder='category name'
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
                        {location && <Text>{location}</Text>}
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'green',
                                width: 80,
                                height: 30,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                marginBottom:10
                            }}
                            onPress={() => setOpenMap(true)}
                        >
                            <Text>open map</Text>
                        </TouchableOpacity>

                        <Text>Service Detail</Text>
                        <TextInput
                            value={serviceDetail}
                            onChangeText={text => setServiceDetail(text)}
                            multiline={true}
                            numberOfLines={30}
                            placeholder='brief detail about your service and your experience'
                            style={{...input, height: 100, textAlignVertical: 'top'}}
                        />

                    </ScrollView>

                    <Button
                        title='Update'
                        onPress={() => updateUser()}
                        color='red'
                    />
                </View>

            </View>

            <Modal
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(!modal)}
            >
                <Pressable
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => setModal(false)}
                >
                    <View
                        style={{
                            padding:20,
                            backgroundColor:'white',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:5
                        }}
                    >
                        <Icon name="check-circle" size={30} color="green" />
                        <Text style={{marginTop:20}}>Updated Successfully</Text>
                    </View>
                </Pressable>
            </Modal>
            <Modal
                transparent={true}
                visible={openMap}
                onRequestClose={() => setOpenMap(!openMap)}
            >
                <View style={{flex: 1}}>
                    <Map setCoords={setCoords} setModal={setOpenMap}/>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Account
