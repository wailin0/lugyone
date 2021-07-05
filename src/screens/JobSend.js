import React, {useContext, useEffect, useState} from 'react';
import Loading from '../components/Loading';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../Context';
import ContactList from '../components/ContactList';

const JobSend = ({navigation}) => {
    const [chats, setChats] = useState(null);

    const {login} = useContext(Context);

    useEffect(() => {
        firestore()
            .collection('chats')
            .where('sender.id', '==', login.uid)
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



    return (
        <ContactList chats={chats} navigation={navigation} />
    );
};

export default JobSend;
