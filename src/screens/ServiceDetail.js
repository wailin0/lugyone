import React, {useContext, useEffect, useState} from 'react';
import {Image, Linking, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import {services, user} from '../dummy';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Context} from '../Context';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';

const ServiceDetail = ({navigation, route}) => {
    const {serviceId} = route.params;
    const [service, setService] = useState(null);

    useEffect(() => {
        firestore().collection('services').doc(serviceId).get()
            .then(response => setService(response.data()))
            .catch(e => console.log(e));
    }, [serviceId]);

    if (!service) {
        return <Loading/>;
    }

    const {login} = useContext(Context);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 20, marginVertical: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Header navigation={navigation} title='Service Detail'/>
                </View>
                <View style={{
                    flex: 1,
                    marginTop: 20,
                    marginBottom: 10,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <Image
                                source={{uri: service.photoURL}}
                                style={{
                                    width: 100, height: 100,
                                    backgroundColor: 'lightgrey',
                                    borderRadius: 5,
                                    marginRight: 10,
                                }}
                            />
                            <View>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{service.name}</Text>
                                <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
                                    <Icon name="check-circle" size={15} color="green"
                                          style={{marginRight: 10}}/>
                                    <Text>Total 4 jobs finished</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{marginTop: 20}}>
                            <Text>{service.description}</Text>
                        </View>
                    </View>

                </View>

                {login.uid !== service.userId &&
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'green',
                            flexDirection: 'row',
                        }}
                        onPress={() => Linking.openURL(`tel:${user.phone}`)}
                    >
                        <Icon name="phone" size={20} color="white" style={{marginRight: 10}}/>
                        <Text style={{color: 'white'}}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ca7adf',
                            flexDirection: 'row',
                        }}
                        onPress={() => navigation.push('Chat')}
                    >
                        <Icon name="rocketchat" size={20} color="white" style={{marginRight: 10}}/>
                        <Text style={{color: 'white'}}>Message</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>

        </SafeAreaView>
    );
};

export default ServiceDetail;
