import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
// import { FAB } from 'react-native-elements';
import SleepSummary from './SleepSummary';
import WaterSummary from './WaterSummary';
import SymptomSummary from './SymptomSummary';
import AddScreen from './AddScreen';
import useWater from './hooks/useWater';
import useSleep from './hooks/useSleep';
import useSymptoms from './hooks/useSymptoms';


const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFFFFF', // gray/50
    },
    touchButton: {
        alignItems: 'center',
    },
    addButton: {
        fontSize: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F87171",
        position: 'absolute',
        bottom: 10,
        right: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "#FFFFFF",
        fontSize: 40,
        fontWeight: 30,
    }
})

const OverviewScreen = ({ displayWeek }) => {
    const { waterSummary, getWaterSummary } = useWater(displayWeek);
    const { sleepSummary, getSleepSummary } = useSleep(displayWeek);
    const { symptomSummary, getSymptomSummary } = useSymptoms(displayWeek, false);
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        getWaterSummary();
        getSleepSummary();
        getSymptomSummary();
    }, []);


    if (addMode)
        return (<AddScreen setAddMode={setAddMode} />);
    else
        return (
            <>
                <ScrollView style={styles.body}>
                    <WaterSummary waterSummary={waterSummary} />
                    <SleepSummary sleepSummary={sleepSummary} />
                    <SymptomSummary
                        addMode={false}
                        handleSymptomClick={null}
                        symptoms={symptomSummary} />
                </ScrollView>
                <TouchableOpacity
                    style={styles.touchButton}
                    onPress={() => { setAddMode(true) }}
                >
                    <View
                        style={styles.addButton}
                    >
                        <Text style={styles.text} >+</Text>
                    </View>
                </TouchableOpacity>
            </>
        );
}

export default OverviewScreen;