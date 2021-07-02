import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from '../components/Header';

const Payment = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1, paddingHorizontal:20, marginTop:20}}>
                <Header navigation={navigation} title='Payment' />
                <View
                    style={{
                        marginTop:20
                    }}
                >
                    <Text>Full Name</Text>
                    <TextInput
                        style={styles.input}
                    />

                    <Text>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                    />

                    <Text>Location</Text>
                    <TextInput
                        style={styles.input}
                    />

                    <Text>Biography</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={100}
                        placeholder='about who you are and your experiences'
                        style={{...styles.input,paddingTop:10, height:100,textAlignVertical: "top" }}
                    />

                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop:10,
        marginBottom:20,
        height:35,
        borderRadius:5,
        borderWidth:1,
        paddingHorizontal:10,
        borderColor:'grey'
    }
})

export default Payment
