import React from 'react';
import {Image, Text, View} from 'react-native';
import moment from 'moment';
import {AirbnbRating} from 'react-native-ratings';

const Reviews = ({reviews, service}) => {

    return (
        <>
            <View style={{alignSelf: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                <Text style={{fontSize: 35, fontWeight: 'bold'}}>
                    {service.rating}
                </Text>
                <AirbnbRating
                    defaultRating={service.rating}
                    count={5}
                    showRating={false}
                    size={18}
                    isDisabled={true}
                />
                <Text style={{color: '#615959'}}>{service.reviewCount} reviews</Text>
            </View>


            {reviews.map(review =>
                <View
                    key={review.id}
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                    >
                        <Image
                            source={{uri: review.reviewerPhotoURL}}
                            style={{
                                width: 50, height: 50,
                                borderRadius: 50,
                                backgroundColor: 'red',
                            }}
                        />
                        <View style={{flex: 1, marginLeft: 10}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{review.reviewerName}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <AirbnbRating
                                    defaultRating={review.rating}
                                    count={5}
                                    showRating={false}
                                    size={12}
                                    isDisabled={true}
                                />
                                <Text style={{marginLeft: 10, fontWeight: 'bold'}}>{review.rating}</Text>
                            </View>
                        </View>
                        <Text>{moment(review.createdAt).fromNow()}</Text>
                    </View>
                    <Text style={{marginTop: 10}}>
                        {review.reviewText}
                    </Text>
                </View>,
            )}


        </>
    );
};

export default Reviews;
