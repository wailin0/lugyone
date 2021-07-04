import BottomTabNavigation from './BottomTabNavigation';
import Services from '../screens/Services';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Account from '../screens/Account';
import Payment from '../screens/Payment';
import Settings from '../screens/Settings';
import Support from '../screens/Support';
import ServiceDetail from '../screens/ServiceDetail';
import Message from '../screens/Message';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ChooseLocation from '../screens/ChooseLocation';


const Stack = createStackNavigator()

const RootNavigation = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Home'
        >
            <Stack.Screen name='Home' component={BottomTabNavigation}/>
            <Stack.Screen name='Services' component={Services}/>
            <Stack.Screen name='Account' component={Account}/>
            <Stack.Screen name='Payment' component={Payment}/>
            <Stack.Screen name='Settings' component={Settings}/>
            <Stack.Screen name='Support' component={Support}/>
            <Stack.Screen name='Service Detail' component={ServiceDetail}/>
            <Stack.Screen name='Chat' component={Message}/>
            <Stack.Screen name='Sign In' component={SignIn}/>
            <Stack.Screen name='Sign Up' component={SignUp}/>
            <Stack.Screen name='Choose Location' component={ChooseLocation}/>

        </Stack.Navigator>
    );
};

export default RootNavigation;
