import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Context} from '../Context';
import firestore from '@react-native-firebase/firestore';
import {input} from '../styles/theme';
import Map from './Map';
import api from '../services/api';
import {Picker} from '@react-native-picker/picker';
import Loading from '../components/Loading';

const Account = ({navigation}) => {
    const [modal, setModal] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [name, setName] = useState('');
    const [serviceCategory, setServiceCategory] = useState('');
    const [location, setLocation] = useState(null);
    const [coords, setCoords] = useState(null);
    const [serviceDetail, setServiceDetail] = useState('');
    const [categories, setCategories] = useState(null);

    const {user, login} = useContext(Context);

    useEffect(() => {
        setName(user.name);
        setServiceCategory(user.serviceCategory);
        setServiceDetail(user.serviceDetail);
        setCoords(user.gps);
    }, [user]);

    useEffect(() => {
        api.getCategories()
            .then(data => setCategories(data));
    }, []);

    useEffect(() => {
        if (coords) {
            api.getLocation(coords.longitude, coords.latitude)
                .then(res => {
                    setLocation(res.features[0].place_name);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [coords]);

    const updateUser = () => {
            firestore()
                .collection('users')
                .doc(login.uid)
                .update({
                    name,
                    serviceCategory,
                    location,
                    rating: 0,
                    reviewCount: 0,
                    gps: coords,
                    serviceDetail,
                    userConfirmed: true,
                })
                .then(() => {
                    setModal(true);
                });
        }



    if(!categories){
        return <Loading />
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
                <Header navigation={navigation} title='Account'/>
                <View style={{flex: 1, marginBottom: 10, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Text>Full Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={text => setName(text)}
                            style={{...input}}
                        />

                        <Text style={{
                            marginVertical: 20,
                            paddingBottom: 10,
                            fontSize: 16,
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                        }}>
                            Update your account to register your service
                        </Text>
                        <Text>Choose a category for your service</Text>
                        <Picker
                            style={{width: 200}}
                            selectedValue={serviceCategory}
                            onValueChange={(itemValue, itemIndex) =>
                                setServiceCategory(itemValue)
                            }>
                            {categories.map(category =>
                                <Picker.Item key={category.name} label={category.name} value={category.name}/>,
                            )}
                        </Picker>

                        <Text>Location</Text>
                        {location && <Text>{location}</Text>}
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'lightgreen',
                                width: 80,
                                height: 30,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                                marginBottom: 10,
                            }}
                            onPress={() => setOpenMap(true)}
                        >
                            <Text>open map</Text>
                        </TouchableOpacity>

                        <Text>Service Detail</Text>
                        <TextInput
                            value={serviceDetail}
                            onChangeText={text => setServiceDetail(text)}
                            multiline={true}
                            numberOfLines={30}
                            placeholder='brief detail about your service and your experience'
                            style={{...input, height: 100, textAlignVertical: 'top'}}
                        />

                    </ScrollView>

                    <Button
                        disabled={!(name && serviceCategory && serviceDetail && location && coords)}
                        title='Update'
                        onPress={() => updateUser()}
                    />
                </View>

            </View>

            <Modal
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                    navigation.goBack();
                }}
            >
                <Pressable
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                        setModal(false);
                        navigation.goBack();
                    }}
                >
                    <View
                        style={{
                            padding: 20,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}
                    >
                        <Icon name="check-circle" size={30} color="green"/>
                        <Text style={{marginTop: 20}}>Updated Successfully</Text>
                    </View>
                </Pressable>
            </Modal>
            <Modal
                transparent={true}
                visible={openMap}
                onRequestClose={() => setOpenMap(!openMap)}
            >
                <View style={{flex: 1}}>
                    <Map setCoords={setCoords} setModal={setOpenMap}/>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Account;
