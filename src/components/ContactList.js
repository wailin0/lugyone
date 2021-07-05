import React, {useContext} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Context} from '../Context';

const ContactList = ({chats,navigation}) => {

    const {login} = useContext(Context)

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                }}
                onPress={() => navigation.navigate('Message', {
                    chatRoomId: item.id,
                })}
            >
                <Image source={{uri: login.uid===item.sender.id ? item.receiver.photoURL : item.sender.photoURL}}
                       style={{
                           borderRadius: 50,
                           width: 50,
                           height: 50,
                           backgroundColor: 'red',
                       }}
                />
                <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={{color: '#4a41e7', fontSize: 18}}>{login.uid===item.sender.id ? item.receiver.name : item.sender.name}</Text>
                    <Text style={{color: 'grey'}}>{item.lastMessage}</Text>
                </View>
                <Text style={{color: 'grey'}}>{item.sentTime}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    marginTop: 20,
                }}
            >
                <FlatList
                    keyExtractor={item => item.id}
                    data={chats}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    )
}

export default ContactList
