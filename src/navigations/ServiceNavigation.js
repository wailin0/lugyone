import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import YourService from '../screens/YourService';
import TrackService from '../screens/TrackService';

const Tab = createMaterialTopTabNavigator();

const ServiceNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
                activeTintColor: '#e91e63',
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: 'powderblue' },
            }}
        >
            <Tab.Screen
                name="Your Service"
                component={YourService}
                options={{ tabBarLabel: 'Your Service' }}
            />
            <Tab.Screen
                name="Track Service"
                component={TrackService}
                options={{ tabBarLabel: 'Track Service' }}
            />
        </Tab.Navigator>
    );
}

export default ServiceNavigation
