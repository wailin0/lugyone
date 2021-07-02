import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal, Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Context} from '../Context';
import firestore from '@react-native-firebase/firestore';
import {input} from '../styles/theme';

const Account = ({navigation}) => {
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const {user,login} = useContext(Context)

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
    }, [user])

    const updateUser = () => {
        firestore()
            .collection('users')
            .doc(login.uid)
            .update({
                name,
                email
            })
            .then(() => {
                setModal(true)
            });
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 20, marginTop: 20}}>
                <Header navigation={navigation} title='Account'/>
                <View style={{flex: 1, marginBottom: 10, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View
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

                    </View>

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
        </SafeAreaView>
    )
}

export default Account
