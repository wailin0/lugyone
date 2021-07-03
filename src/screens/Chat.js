import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Loading from '../components/Loading';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../Context';

const Chat = ({navigation}) => {
    const [chats, setChats] = useState(null);

    const {login} = useContext(Context);

    useEffect(() => {
        firestore()
            .collection('chats')
            .onSnapshot(
                querySnapshot => {
                    const array = [];
                    querySnapshot.forEach(documentSnapshot => {
                        array.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data(),
                        });
                    });
                    setChats(array);
                });
    }, [login]);

    if (!chats) {
        return <Loading/>;
    }


    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                }}
                onPress={() => navigation.navigate('Chat', {
                    chatRoomId: item.id,
                })}
            >
                <Image source={{uri: item.sender.photoURL}}
                       style={{
                           borderRadius: 50,
                           width: 50,
                           height: 50,
                           backgroundColor: 'red',
                       }}
                />
                <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={{color: '#4a41e7', fontSize: 18}}>{item.sender.name}</Text>
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
    );
};

export default Chat;
