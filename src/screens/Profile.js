import React, {useContext, useState} from 'react';
import {Button, Image, Modal, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {Context} from '../Context';
import Loading from '../components/Loading';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

const settings = [
    {
        name: 'Account',
    },
    {
        name: 'Settings',
    },
    {
        name: 'Support',
    },
];

const Profile = ({navigation}) => {

    const {user, login} = useContext(Context);
    const [photo, setPhoto] = useState(null);
    const [modal, setModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    const signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    };

    const selectPhoto = () => {
        const options = {};

        launchImageLibrary(options, (response) => {
            setPhoto(response.assets[0]);
        });
    };


    const uploadImage = async () => {
        setModal(true);
        const reference = storage().ref(`user/${login.uid}.png`);
        const task = reference.putFile(photo.uri);
        task.on('state_changed', snapshot => {
            setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        });

        const photoURL = await reference.getDownloadURL()
        task.then(() => {
            firestore().collection('users').doc(login.uid)
                .update({
                    photoURL
                })
                .then(() => setPhoto(null))
        });
    };

    if (!user) {
        return <Loading/>;
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingHorizontal: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => selectPhoto()}
                        >
                            <Image
                                source={{uri: user.photoURL}}
                                style={{
                                    width: 100, height: 100,
                                    borderRadius: 50,
                                    borderColor: 'lightgrey',
                                    borderWidth: 1,
                                    backgroundColor: 'lightgrey',
                                }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'lightgrey',
                                    bottom: 0,
                                    right: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50,
                                    width: 30, height: 30,
                                }}
                            >
                                <Icon name='camera' size={18} color="black"/>
                            </View>
                        </TouchableOpacity>
                        {photo &&
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                backgroundColor: 'red',
                                borderRadius: 30,
                                alignItems: 'center', justifyContent: 'center',
                            }}
                            onPress={() => uploadImage()}
                        >
                            <Text style={{marginTop: 5}}>upload image</Text>
                        </TouchableOpacity>
                        }
                    </View>
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
                        </TouchableOpacity>,
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


            <Modal
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(!modal)}
            >
                <View
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                    <View
                        style={{
                            padding: 20,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}
                    >
                        {uploadProgress !== 100 &&
                        <Text>Uploading {Math.floor(uploadProgress)}%</Text>
                        }
                        {uploadProgress === 100 &&
                        <>
                            <Icon name="check-circle" size={30} color="green"/>
                            <Text style={{marginVertical: 20}}>Uploaded Successfully</Text>
                            <Button title='Close' color='green' onPress={() => setModal(false)} />
                        </>
                        }
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Profile;
