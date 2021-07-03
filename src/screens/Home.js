import React, {useContext, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {categories} from '../dummy';
import {Context} from '../Context';

const Home = ({navigation}) => {
    const {location} = useContext(Context);

    const Header = () => {
        return (
            <View
                style={{flexDirection: 'row', alignItems: 'center'}}
            >
                <Icon name="map-marker-alt" size={15} color="black"/>
                <Text style={{fontSize: 15, marginLeft: 10}}>{location.address}</Text>
            </View>
        );
    };

    const Search = () => {
        return (
            <View style={{marginTop: 20}}>
                <TextInput
                    style={{
                        height: 35,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'grey',
                        paddingLeft: 10,
                        paddingRight: 30,
                    }}
                    placeholder='Search (e.g. english teacher, motor repair)'
                />
                <Icon name="search" size={15} color="black"
                      style={{
                          position: 'absolute',
                          right: 10,
                          top: 10,
                      }}
                />
            </View>
        );
    };

    const Services = () => {

        const renderItem = ({item}) => {
            return (
                <TouchableOpacity
                    style={{
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        borderColor: 'grey',
                        borderWidth: 1,
                        elevation: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '49%', height: 140,
                        marginBottom: 10,
                    }}
                    onPress={() => navigation.navigate('Choose Location', {
                        serviceCategory: item.name
                    })}
                >
                    <Image
                        source={{uri: item.photo}}
                        style={{
                            flex: 1,
                            width: '100%', height: '100%',
                            backgroundColor: 'lightgrey',
                        }}
                    />
                    <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{item.name}</Text>
                    </View>

                </TouchableOpacity>
            );
        };

        return (
            <View style={{flex: 1, marginTop: 15}}>
                <FlatList
                    data={categories}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.name}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                {Header()}
                {Search()}
                {Services()}
            </View>
        </SafeAreaView>
    );
};

export default Home;
