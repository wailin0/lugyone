import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../Context';
import Loading from '../components/Loading';
import Header from '../components/Header';

const Message = ({navigation, route}) => {
    const [messages, setMessages] = useState(null);
    const [sending, setSending] = useState(false);
    const [text, setText] = useState('');
    const {chatRoomId} = route.params;
    const {login, user} = useContext(Context);

    useEffect(() => {
        firestore().collection(`chats/${chatRoomId}/messages`)
            .orderBy('createdAt', 'desc')
            .onSnapshot(onResult => {
                    const array = [];
                    onResult.forEach(documentSnapshot => {
                        array.push({
                            _id: documentSnapshot.id,
                            ...documentSnapshot.data(),
                        });
                    });
                    setMessages(array);
                },
            );
    }, []);

    const sendMessage = () => {
        setSending(true);
        const newMessage = {
            text,
            createdAt: Date.now(),
            user: {
                _id: login.uid,
                avatar: user.photoURL,
                name: user.name,
            },
        };
        firestore().collection(`chats/${chatRoomId}/messages`)
            .add(newMessage)
            .then(() => setSending(false));
    };

    if (!messages) {
        return <Loading/>;
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <Header navigation={navigation} title='Chat' />
                <View style={{flex: 1}}>
                    <GiftedChat
                        messages={messages}
                        user={{
                            _id: login.uid,
                        }}
                        disableComposer={sending}
                        onSend={() => sendMessage()}
                        onInputTextChanged={text => setText(text)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Message;
