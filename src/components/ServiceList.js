import React, {useState} from 'react';
import {Alert, Button, FlatList, Image, Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ServiceList = ({navigation, services}) => {

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
                    userId: item.id,
                })}
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
                    <Text>{item.serviceDetail}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />

    );
};

export default ServiceList;
