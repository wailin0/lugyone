import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../Context';

const Message = ({navigation, route}) => {
    const [messages, setMessages] = useState(null);
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false)
    const {chatRoomId} = route.params
    const {login, user} = useContext(Context)

    useEffect(() => {
        firestore().collection(`chats/${chatRoomId}/messages`)
            .onSnapshot(onResult => {
                    const array = [];
                    onResult.forEach(documentSnapshot => {
                        array.push({
                            _id: documentSnapshot.id,
                            ...documentSnapshot.data(),
                        });
                    });
                    setMessages(array)
                }
            )
    }, []);

    const sendMessage = () => {
        setSending(true)
        const newMessage = {
            text,
            createdAt: Date.now(),
            user: {
                _id: login.uid,
                avatar: user.photoURL,
                name: user.name
            }
        }
        console.log(newMessage)
        firestore().collection(`chats/${chatRoomId}/messages`)
            .add(newMessage)
            .then(() => setSending(false))
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginVertical: 20}}>
                <View style={{flex: 1}}>
                    <GiftedChat
                        messages={messages}
                        onSend={() => sendMessage()}
                        onInputTextChanged={text => setText(text)}
                        user={{
                            _id: login.uid,
                        }}
                        disableComposer={sending}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Message;
