import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, Button } from 'react-native';
import SymptomSummary from './SymptomSummary';
import useSymptoms from './hooks/useSymptoms';
import axios from '../../api';

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        margin: 24,
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        margin: 24,
        justifyContent: 'center'
    },
    img: {
        borderRadius: 30,
        height: 60,
        width: 60,
        backgroundColor: '#bae6fd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 400,
        fontSize: 14,
        color: '#6B7280',
        paddingRight: 5
    },
    buttonItem: {
        alignItems: 'center'
    },
    addButton: {
        fontSize: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    input: {
        height: 40,
        width: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        textAlign: 'right'
    },
    updateButton: {
        borderRadius: 20,
        height: 40,
        margin: 10,
        paddingBottom: 10,
    },
    inputView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 40,
        width: 40,
    },
})

const AddScreen = ({ setAddMode }) => {
    const today = new Date();
    let day = today.getDate().toString().padStart(2, '0');
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let year = today.getFullYear();

    const [date, setDate] = useState(`${year}/${month}/${day}`);
    // const [weight, setWeight] = useState(0);
    const [sleep, setSleep] = useState(0);
    const [water, setWater] = useState(0);
    const { symptomSummary, setSymptomSummary }
        = useSymptoms(0, true);

    const handleSymptomClick = (symptomName) => {
        let newSymptoms = symptomSummary;
        newSymptoms.map((obj, idx) => {
            if (obj['symptomName'] == symptomName) {
                obj['choose'] = !obj['choose']
            }
        });
        setSymptomSummary(newSymptoms);
    };

    const saveForm = async () => {
        const dateString = date.replace('/', '').replace('/', '')
        const currentTime = new Date();
        const hour = (currentTime.getHours() % 12).toString().padStart(2, '0');
        const minute = currentTime.getMinutes().toString().padStart(2, '0');
        const afternoon = currentTime.getHours() > 12 ? "PM" : "AM";

        if (water > 0) {
            const { data: { waterData, waterMessage }, } = await axios.post('/water', {
                date: dateString,
                time: `${hour}:${minute} ${afternoon}`,
                capacity: water
            });
        }

        if (sleep > 0) {
            const { data: { sleepData, sleepMessage }, } = await axios.post('/sleep', {
                date: dateString,
                hours: sleep
            });
        }

        let symptomList = []
        symptomSummary.map((obj, idx) => {
            if (obj.choose)
                symptomList.push(obj.symptomName);
        });

        if (symptomList.length > 0) {
            const { data: { symptomData, symptomMessage }, } = await axios.post('/symptom', {
                date: dateString,
                time: `${hour}:${minute} ${afternoon}`,
                symptomName: symptomList.sort().join(',')
            });
        }
        setAddMode(false);
    };

    return (
        <ScrollView style={styles.body}>
            <View >
                <View style={styles.inputView}>
                    <Text>Date</Text>
                    <TextInput
                        style={styles.input}
                        value={date}
                        placeholder="useless placeholder"
                        keyboardType="string"
                        onChangeText={(value) => setDate(value)}
                    />
                </View>
                {/* <View style={styles.inputView}>
                    <Text>Weight</Text>
                    <TextInput
                        style={styles.input}
                        value={weight}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                        onChangeText={(value) => setWeight(value)}
                    />
                    <Text>kg</Text>
                </View> */}
                <View style={styles.inputView}>
                    <Text>Sleep</Text>
                    <TextInput
                        style={styles.input}
                        value={sleep}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                        onChangeText={(value) => setSleep(value)}
                    />
                    <Text>hr</Text>
                </View>
                <View style={styles.inputView}>
                    <Text>Water</Text>
                    <TextInput
                        style={styles.input}
                        value={water}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                        onChangeText={(value) => setWater(value)}
                    />
                    <Text>ml</Text>
                </View>
            </View>
            <SymptomSummary
                addMode={true}
                handleSymptomClick={handleSymptomClick}
                symptoms={symptomSummary} />
            <Button
                style={styles.updateButton}
                onPress={saveForm}
                title="Update Your Day"
                color="#F87171"
                accessibilityLabel="Update Your Day"
            />
            <Button
                style={styles.updateButton}
                onPress={() => { setAddMode(false) }}
                title="Go Back To Overview"
                color="#c2c7cc"
                accessibilityLabel="Go Back To Overview"
            />
        </ScrollView>
    );
}

export default AddScreen;