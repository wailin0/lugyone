import React from 'react';
import {Text, View} from 'react-native';

const ChatMessage = ({message}) => {

    const {text, userId, photo} = message

    return (
        <View>
            <Text>{text}</Text>
        </View>
    )
}

export default ChatMessage
