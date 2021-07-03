import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';

const reviews = [
    {

    }
]

const Reviews = () => {

    const renderItem = ({item}) => {
        return (
            <View
                style={{
                    marginBottom: 10,
                }}
            >
                <View
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                >
                    <Image
                        source={{uri: 'httt'}}
                        style={{
                            width: 50, height: 50,
                            borderRadius: 50,
                        }}
                    />
                    <View>
                        <Text>Joan Perkins</Text>
                        <Text>XXXXXX</Text>
                    </View>
                    <Text>1 day ago</Text>
                </View>
            </View>
        );
    };

    return (
        <View>
            <View style={{alignSelf: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                    4.0
                </Text>
                <Text style={{fontSize: 20, color: 'gold'}}>XXXXX</Text>
                <Text>23 reviews</Text>
            </View>

            <View>
                <FlatList
                    data={reviews}
                    renderItem={renderItem}

                />
            </View>

        </View>
    );
};

export default Reviews;
