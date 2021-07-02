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
    const [customCoords, setCustomCoords] = useState({
        latitude: null,
        longitude: null
    })
    const [customLocation, setCustomLocation] = useState(null)

    useEffect(() => {
        api.getLocation(customCoords.longitude, customCoords.latitude)
            .then(res => {
                setCustomLocation(res.features[0].place_name)
            })
    }, [customCoords])

    const {location} = useContext(Context);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 20, marginVertical: 20}}>
                <Header navigation={navigation} title='Choose Location'/>

                <View style={{top: 50}}>
                    <Text>Your current Location,</Text>
                    <Text style={{fontSize: 17, marginTop: 5}}>{location.address}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>

                    <TouchableOpacity
                        style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}
                        onPress={() => setSelect('current')}
                    >
                        <RadioButton selected={select === 'current'}/>
                        <Text>Near your current location</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}
                        onPress={() => {
                            setModal(true);
                            setSelect('custom');
                        }}
                    >
                        <RadioButton selected={select === 'custom'}/>
                        <View>
                            <Text>Choose a location from map</Text>
                            {customLocation && <Text style={{fontSize:18,color:'green'}}>{customLocation}</Text>}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center'}}
                        onPress={() => setSelect('any')}
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
                    <Map setCustomCoords={setCustomCoords} />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ChooseLocation;
