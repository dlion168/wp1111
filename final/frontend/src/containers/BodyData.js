import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OverviewScreen from '../components/body_data/OverviewScreen';
import SleepScreen from '../components/body_data/SleepScreen';
import WaterScreen from '../components/body_data/WaterScreen';
import SymptomScreen from '../components/body_data/SymptomScreen';
import { NavBar } from '../components/NavBar';

const Tab = createMaterialTopTabNavigator();

const BodyData = () => {
    const [displayWeek, setDisplayWeek] = useState(0);

    return (
        <>
            <NavBar
                centerText='w0'
                weekOnChange={(week) => {
                    useEffect(() => { setDisplayWeek(week) })
                }}
            />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#F87171',
                    tabBarInactiveTintColor: '#9CA3AF',
                    tabBarIndicatorStyle: { backgroundColor: '#F87171' }
                }}>
                <Tab.Screen name="Overview" component={() => <OverviewScreen displayWeek={displayWeek} />} />
                <Tab.Screen name="Sleep" component={() => <SleepScreen displayWeek={displayWeek} />} />
                <Tab.Screen name="Water" component={() => <WaterScreen displayWeek={displayWeek} />} />
                <Tab.Screen name="Symptom" component={() => <SymptomScreen displayWeek={displayWeek} />} />
            </Tab.Navigator>
        </>
    );
}

export default BodyData;