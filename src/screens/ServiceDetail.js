import React, {useContext, useEffect, useState} from 'react';
import {Image, Linking, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Context} from '../Context';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import Reviews from '../components/Reviews';
import WriteReview from '../components/WriteReview';

const ServiceDetail = ({navigation, route}) => {
    const {serviceId, serviceCategory} = route.params;
    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [modal, setModal] = useState(false);
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    const {login} = useContext(Context);
    useEffect(() => {
        firestore().collection('users').doc(serviceId)
            .get()
            .then(response => {
                setService({
                    id: response.id,
                    ...response.data(),
                });
            })
            .catch(e => console.log(e));

        firestore().collection(`users/${serviceId}/reviews`)
            .orderBy('createdAt', 'desc')
            .get()
            .then(querySnapshot => {
                const array = [];
                querySnapshot.forEach(documentSnapshot => {
                    array.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    });
                });
                setReviews(array);
            });
    }, [serviceId]);

    useEffect(() => {
        if (login) {
            firestore().collection(`users/${serviceId}/reviews`)
                .where('reviewerId', '==', login.uid)
                .get()
                .then(response => {
                    if (response.empty) {
                        setAlreadyReviewed(false);
                    } else {
                        setAlreadyReviewed(true);
                    }
                });
        }
    }, []);

    const updateUserRating = (initialReview) => {
        const sumRating = reviews.reduce((a, b) => a + b.rating, 0);
        const avgRating = ((sumRating * 5) / (reviews.length * 5)).toFixed(1);
        firestore().collection('users').doc(service.id)
            .update({
                rating: reviews.length === 0 ? initialReview : avgRating,
                reviewCount: service.reviewCount + 1,
            })
            .then(() => setAlreadyReviewed(true));
    };

    const addReview = (createdReview) => {
        const updatedState = [createdReview, ...reviews];
        setReviews(updatedState);
    };

    if (!service || !reviews) {
        return <Loading/>;
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='angle-left' size={24} color="black"/>
                        </TouchableOpacity>
                        <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 20, flex: 1}}>Service
                            Detail</Text>
                        {(login && (service.id !== login.uid && !alreadyReviewed)) &&
                        <TouchableOpacity
                            style={{
                                borderColor: 'lightgreen',
                                borderWidth: 1,
                                padding: 5,
                                borderRadius: 5,
                            }}
                            onPress={() => setModal(true)}
                        >
                            <Text style={{color: '#9761ec', fontWeight: 'bold'}}>
                                Write a Review
                            </Text>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        marginTop: 20,
                    }}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <Image
                                source={{uri: service.photoURL}}
                                style={{
                                    width: 100, height: 100,
                                    backgroundColor: 'lightgrey',
                                    borderRadius: 5,
                                    marginRight: 10,
                                }}
                            />
                            <View>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{service.name}</Text>
                                <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
                                    <Icon name="map-marker-alt" size={15} style={{marginRight: 10}}/>
                                    <Text>{service.location}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{marginTop: 10}}>
                            <Text>{service.serviceDetail}</Text>
                        </View>
                    </View>

                    <Reviews reviews={reviews} service={service}/>

                </ScrollView>

                {(login && login.uid !== service.id) &&
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'green',
                            flexDirection: 'row',
                        }}
                        onPress={() => Linking.openURL(`tel:${service.phone}`)}
                    >
                        <Icon name="phone" size={20} color="white" style={{marginRight: 10}}/>
                        <Text style={{color: 'white'}}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ca7adf',
                            flexDirection: 'row',
                        }}
                        onPress={() => navigation.push('Chat')}
                    >
                        <Icon name="rocketchat" size={20} color="white" style={{marginRight: 10}}/>
                        <Text style={{color: 'white'}}>Message</Text>
                    </TouchableOpacity>
                </View>
                }

            </View>


            <Modal
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(!modal)}
            >
                <WriteReview
                    setModal={setModal}
                    serviceId={service.id}
                    updateUserRating={updateUserRating}
                    addReview={addReview}
                />
            </Modal>
        </SafeAreaView>
    );
};

export default ServiceDetail;
