import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import RadioButton from '../components/RadioButton';
import Map from './Map';
import {Context} from '../Context';
import api from '../services/api';

const ChooseLocation = ({navigation}) => {
    const [modal, setModal] = useState(false);
    const [select, setSelect] = useState('current');
    const [yourLocation, setYourLocation] = useState('')
    const [customCoords, setCustomCoords] = useState({
        latitude: null,
        longitude: null,
    });

    const {location} = useContext(Context);

    useEffect(() => {
        setCustomCoords({latitude: location.latitude, longitude: location.longitude})
    }, [location.address])

    useEffect(() => {
        api.getLocation(customCoords.longitude, customCoords.latitude)
            .then(res => {
                setYourLocation(res.features[0].place_name);
            })
            .catch(e => {
                console.log(e);
            });
    }, [customCoords])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginVertical: 20}}>
                <Header navigation={navigation} title='Choose Location'/>

                <View style={{top: 50}}>
                    <Text>Location,</Text>
                    <Text style={{fontSize: 17, marginTop: 5}}>{location && yourLocation}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>

                    <TouchableOpacity
                        style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}
                        onPress={() => {
                            setSelect('current')
                            setYourLocation(location.address)
                        }}
                    >
                        <RadioButton selected={select === 'current'}/>
                        <Text>Near your current location</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}
                        onPress={() => setSelect('custom')}
                    >
                        <RadioButton selected={select === 'custom'}/>
                        <View>
                            <Text>Choose a location from map</Text>
                            {select === 'custom' &&
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'lightgreen',
                                        width: 80,
                                        height: 30,
                                        marginTop: 10,
                                        marginLeft: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                    }}
                                    onPress={() => setModal(true)}
                                >
                                    <Text>open map</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}
                        onPress={() => {
                            setSelect('any')
                            setYourLocation('Anywhere')
                        }}
                    >
                        <RadioButton selected={select === 'any'}/>
                        <Text>Anywhere</Text>
                    </TouchableOpacity>

                </View>

                <Button
                    title='Continue'
                    onPress={() => navigation.navigate('Services', {
                        latitude: select === 'current' ? location.latitude : select === 'any' ? 'anylat' : customCoords.latitude,
                        longitude: select === 'current' ? location.longitude : select === 'any' ? 'anylong' : customCoords.longitude,
                    })}
                />
            </View>


            <Modal
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(!modal)}
            >
                <View style={{flex: 1}}>
                    <Map setCoords={setCustomCoords} setModal={setModal}/>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ChooseLocation;
