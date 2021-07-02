import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Chat = ({navigation}) => {

    const [text, setText] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        // const { userId, photoURL } = auth.currentUser;


        setText('');
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 20, marginVertical: 20}}>
                <View style={{flex: 1}}>
                    {/*<GiftedChat*/}
                    {/*    messages={messages}*/}
                    {/*    onSend={messages => sendMessage(messages)}*/}
                    {/*    user={{*/}
                    {/*        _id: 1,*/}
                    {/*    }}*/}
                    {/*/>*/}
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <Icon name="phone" size={24}/>
                    </TouchableOpacity>
                    <TextInput
                        style={{
                            borderColor: 'grey',
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingHorizontal: 5,
                            height: 30,
                            marginHorizontal: 20,
                            flex: 1
                        }}
                        placeholder='type a message'
                    />
                    <TouchableOpacity>
                        <Text style={{color: 'green'}}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Chat
