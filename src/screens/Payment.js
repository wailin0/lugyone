import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';

const Payment = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <Header navigation={navigation} title='Payment'/>
                <View
                    style={{
                        marginTop: 20,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{fontSize: 16}}>
                        Payment services such as wavemoney and kbzpay will be available when fully released
                    </Text>

                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginBottom: 20,
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderColor: 'grey',
    },
});

export default Payment;
