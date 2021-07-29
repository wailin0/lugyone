import {FlatList, Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Loading from './Loading';

const CountriesPhoneCodeListModal = ({countriesListModal, setCountriesListModal, countriesPhoneCodeList, setSelectedPhoneCode, setSelectedCountry}) => {


    if (!countriesPhoneCodeList) {
        return <Loading/>;
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    marginBottom: 5,
                    backgroundColor: '#dccece',
                    borderRadius: 5,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }}
                onPress={() => {
                    setSelectedPhoneCode(item.code);
                    setSelectedCountry(item.name);
                    setCountriesListModal(false);
                }}
            >
                <Text>{item.name} {item.code}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            transparent={true}
            visible={countriesListModal}
            onRequestClose={() => {
                setCountriesListModal(!countriesListModal);
            }}
        >
            <Pressable
                onPress={() => setCountriesListModal(false)}
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}

            >
                <View
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                    <View
                        style={{
                            borderRadius: 5,
                            height: '60%',
                            padding: 5,
                            backgroundColor: 'white',
                        }}
                    >
                        <FlatList
                            data={countriesPhoneCodeList}
                            renderItem={renderItem}
                            keyExtractor={item => item.name}
                        />
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

export default CountriesPhoneCodeListModal;
