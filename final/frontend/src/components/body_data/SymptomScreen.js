import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import ItemList from './ItemList';
import SymptomSummary from './SymptomSummary';
import useSymptoms from './hooks/useSymptoms';
import axios from '../../api';

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFFFFF',
    },
    dataRow: {
        paddingTop: 8,
        paddingBottom: 8,
        margin: 24,
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
    },
    notReachGoal: {
        fontWeight: 700,
        fontSize: 16,
        lineHeight: 1.5,
    },
    reachGoal: {
        fontWeight: 700,
        fontSize: 16,
        lineHeight: 1.5,
        color: '#F87171',
    },
})

const SymptomScreen = ({ displayWeek }) => {
    const [symptomDetail, setSymptomDetail] = useState([]);
    const { symptomSummary, getSymptomSummary } = useSymptoms(displayWeek, false);

    let startDate = new Date("2022/10/24");
    let endDate = new Date("2022/10/30");
    startDate.setDate(startDate.getDate() + displayWeek * 7);
    endDate.setDate(endDate.getDate() + displayWeek * 7);

    const convertToDateString = (date) => {
        const yyyy = date.getFullYear();
        const MM = (date.getMonth() + 1).toString().padStart(2, '0');
        const dd = date.getDate().toString().padStart(2, '0');
        return yyyy + MM + dd;
    }
    const getSymptomData = async () => {
        const { data: { data, symptomMessage }, } = await axios.get('/symptom', {
            params: {
                startDate: convertToDateString(startDate),
                endDate: convertToDateString(endDate),
            },
        });
        setSymptomDetail(data);
    };

    useEffect(() => {
        getSymptomData();
        getSymptomSummary();
    }, []);

    const deleteSymptomData = async (date, time) => {
        const {
            data: { message, data },
        } = await axios.delete('/symptom', { params: { date, time } });
        await getSymptomData();
    };

    // const symptomDetail = [
    //     { 'date': 'October 26, 2022', 'itemList': [{ 'time': '10:00 AM', 'symptomName': 'Cramps' }] },
    //     { 'date': 'October 25, 2022', 'itemList': [{ 'time': '09:00 AM', 'symptomName': 'Acne' }, { 'time': '09:00 PM', 'symptomName': 'Cramps' }] },
    //     { 'date': 'October 24, 2022', 'itemList': [{ 'time': '09:00 AM', 'symptomName': 'Tender breasts' }] },
    // ];

    return (
        <ScrollView style={styles.body}>
            <SymptomSummary
                addMode={false}
                handleSymptomClick={null}
                symptoms={symptomSummary} />
            <View style={styles.detail} >
                {
                    symptomDetail.map((obj, idx) => {
                        let showList = [];
                        obj.itemList.forEach(element => {
                            let obj = {
                                'leftText': element.symptomName,
                                'rightText': element.time,
                                'time': element.time
                            };
                            showList.push(obj);
                        });

                        return (
                            <View style={styles.dataRow} key={idx} >
                                <View style={styles.title} >
                                    <Text style={styles.notReachGoal} >
                                        {obj.date}</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.notReachGoal} >{obj.itemList.length} types</Text>
                                </View>
                                <ItemList
                                    showList={showList}
                                    deleteHandler={deleteSymptomData}
                                    date={obj.date} />
                            </View>
                        );
                    })
                }
            </View>
        </ScrollView >
    );
}

export default SymptomScreen;