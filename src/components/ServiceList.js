import React, {useState} from 'react';
import {Alert, Button, FlatList, Image, Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ServiceList = ({navigation, services}) => {
    const [modal, setModal] = useState(false);

    const updateService = () => {
        navigation.navigate("Register Service", {
            services
        })
    }

    const deleteService = () => {
        Alert.alert(
            "Service Deletion",
            "Your service will be disabled and reviewed for deletion",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    borderRadius: 10,
                    backgroundColor: '#ffffff',
                    padding: 20,
                    marginBottom: 10,
                    elevation: 2,
                    flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Service Detail', {
                    serviceId: item.id,
                })}
                delayLongPress={1}
                onLongPress={() => setModal(true)}
            >
                <View style={{width: 50, flexDirection: 'column', alignItems: 'center'}}>
                    <Image
                        source={{uri: item.photoURL}}
                        style={{
                            borderRadius: 10,
                            width: 70, height: 70,
                            backgroundColor: 'lightgrey',
                        }}
                    />
                    <Text style={{fontSize: 18, marginTop: 20}}>4/hr</Text>
                </View>
                <View style={{
                    marginLeft: 20,
                    flex: 1,
                }}>
                    <Text>{item.name}</Text>
                    <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
                        <Text>{item.rating}</Text>
                        <Icon name="star" size={15} color="gold" style={{marginHorizontal: 10}}/>
                        <Text>(43 reviews)</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
                        <Icon name="check-circle" size={15} color="green" style={{marginRight: 10}}/>
                        <Text>Total 4 jobs finished</Text>
                    </View>
                    <Text>{item.description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
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
                            height:130,
                            backgroundColor:'#ede4e4',
                            justifyContent:'space-between',
                            alignItems:'center',
                            borderRadius:5
                        }}
                    >
                        <Button title='Update Service' onPress={() => updateService()} />
                        <Button title='Delete Service' color='red' onPress={() => deleteService()} />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

export default ServiceList;
