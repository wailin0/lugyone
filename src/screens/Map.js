import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Context} from '../Context';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Map = ({setCoords}) => {
    const {location} = useContext(Context);
    const [state, setState] = useState(null);

    useEffect(() => {
        setState({
            markerData: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
            mapData: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.010,
                longitudeDelta: 0.010,
            },
        });
    }, [location]);


    const handleRegionChange = coords => {
        setState({
            markerData: {...coords},
            mapData: {
                ...coords,
                latitudeDelta: 0.010,
                longitudeDelta: 0.010,
            },
        });
    };

    if (!state) {
        return <Loading/>;
    }

    console.log(state);

    return (
        <View style={{flex: 1}}>
            <MapView
                style={{
                    flex: 1,
                }}
                onPress={e => handleRegionChange(e.nativeEvent.coordinate)}
                initialRegion={state.mapData}
            >
                <Marker
                    coordinate={state.markerData}
                />
            </MapView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',

                }}
                onPress={() => setCoords(state.markerData)}
            >
                <View
                    style={{
                        backgroundColor: 'red',
                        borderRadius: 20,
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{color: 'white',fontWeight:'bold', marginRight: 10}}>
                        Choose this location
                    </Text>
                    <Icon name='check' color='white' size={20}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Map;
