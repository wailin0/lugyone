import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Context} from '../Context';
import api from '../services/api';
import Loading from '../components/Loading';

const Home = ({navigation}) => {
    const [categories, setCategories] = useState(null);
    const {location} = useContext(Context);

    useEffect(() => {
        api.getCategories()
            .then(data => setCategories(data));
    }, []);

    if(!categories){
        return <Loading />
    }

    const Header = () => {
        return (
            <View
                style={{flexDirection: 'row', alignItems: 'center'}}
            >
                <Icon name="map-marker-alt" size={15} color="black"/>
                <Text style={{
                    fontSize: 15,
                    marginLeft: 10,
                }}>{location ? location.address : 'no access to your gps'}</Text>
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
                        serviceCategory: item.name,
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
                {Services()}
            </View>
        </SafeAreaView>
    );
};

export default Home;
