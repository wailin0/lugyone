import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
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
                    serviceId: item.id,
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
                        <Icon name="star" size={15} color="gold" style={{marginHorizontal: 10}}/>
                        <Text style={{marginRight: 10}}>{item.rating}</Text>
                        <Text>({item.reviewCount} reviews)</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
                        <Icon name="map-marker-alt" size={15} style={{marginHorizontal: 13}}/>
                        <Text>{item.location}</Text>
                    </View>
                    <Text numberOfLines={2}>{item.serviceDetail}</Text>
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
