import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import JobRequest from '../screens/JobRequest';
import JobSend from '../screens/JobSend';

const Tab = createMaterialTopTabNavigator();


const TopTabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Job Request" component={JobRequest} />
            <Tab.Screen name="Your Request" component={JobSend} />
        </Tab.Navigator>
    );
}

export default TopTabNavigation
