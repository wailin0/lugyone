import React, {useContext, useEffect, useState} from 'react';
import {Button, Pressable, TextInput, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../Context';
import {AirbnbRating} from 'react-native-ratings';

const WriteReview = ({setModal, serviceId, updateUserRating, addReview}) => {

    const [reviewerName, setReviewerName] = useState('')
    const [reviewerPhotoURL, setReviewerPhotoURL] = useState('')
    const [reviewText, setReviewText] = useState(null)
    const [rating, setRating] = useState(0)

    const {login, user} = useContext(Context)


    useEffect(() => {
        setReviewerName(user.name)
        setReviewerPhotoURL(user.photoURL)
    }, [user])

    const submitReview = () => {
        const newReview = {
            reviewerId: login.uid,
            reviewerName,
            reviewerPhotoURL,
            reviewText,
            rating,
            createdAt: Date.now()
        }

        firestore().collection(`users/${serviceId}/reviews`)
            .add(newReview)
            .then(response => {
                addReview({id: response.id, ...newReview})
                setModal(false)
                updateUserRating(rating)
            })
    }

    return (
        <>
            <Pressable
                style={{flex: 1}}
                onPress={() => setModal(false)}
            >
            </Pressable>
            <View
                style={{
                    position: 'absolute',
                    padding: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    bottom: 0,
                    width: '100%',
                }}
            >
                <AirbnbRating
                    defaultRating={0}
                    count={5}
                    size={20}
                    onFinishRating={value => setRating(value)}
                />
                <TextInput
                    value={reviewText}
                    onChangeText={text => setReviewText(text)}
                    placeholder='write your review about this service'
                    multiline={true}
                    style={{
                        borderRadius: 5,
                        borderColor: 'grey',
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        textAlignVertical: 'top',
                        height: 150,
                        marginVertical: 20,
                    }}
                />
                <Button title='Submit Review'
                        disabled={!(rating && reviewText)}
                        onPress={() => submitReview()}/>
            </View>
        </>
    );
};

export default WriteReview;
