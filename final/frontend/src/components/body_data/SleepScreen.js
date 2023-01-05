import { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import ItemList from './ItemList';
import SleepSummary from './SleepSummary';
import useSleep from './hooks/useSleep';
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

const SleepScreen = ({ displayWeek }) => {
    const [sleepDetail, setSleepDetail] = useState([]);
    // const sleepSummary={
    //     "date": [
    //         "Oct 24",
    //         "Oct 25",
    //         "Oct 26",
    //         "Oct 27",
    //         "Oct 28",
    //         "Oct 29",
    //         "Oct 30"
    //     ],
    //     "hours": [
    //         0,
    //         0,
    //         0,
    //         0,
    //         0,
    //         0,
    //         0
    //     ]
    // }
    const { sleepSummary, getSleepSummary } = useSleep(displayWeek);
    const convertToDateString = (date) => {
        const yyyy = date.getFullYear();
        const MM = (date.getMonth() + 1).toString().padStart(2, '0');
        const dd = date.getDate().toString().padStart(2, '0');
        return yyyy + MM + dd;
    }

    let startDate = new Date("2022/10/24");
    let endDate = new Date("2022/10/30");
    startDate.setDate(startDate.getDate() + displayWeek * 7);
    endDate.setDate(endDate.getDate() + displayWeek * 7);

    const getSleepData = async () => {
        const {
            data: { data, message },
        } = await axios.get('/sleep', {
            params: {
                startDate: convertToDateString(startDate),
                endDate: convertToDateString(endDate),
            },
        });
        setSleepDetail(data);
        getSleepSummary();
    };

    useEffect(() => {
        getSleepData();
    }, []);

    const deleteSleepData = async (date, time) => {
        const {
            data: { message, data },
        } = await axios.delete('/sleep', { params: { date } });
        await getSleepData();
    };

    return (
        <ScrollView style={styles.body}>
            <SleepSummary sleepSummary={sleepSummary} />
            <View style={styles.detail} >
                {
                    sleepDetail.map((obj, idx) => {
                        let showList = [{
                            'leftText': 'Sleep',
                            'rightText': `${obj.hours} hrs`,
                            'time': ''
                        }];

                        return (
                            <View style={styles.dataRow} key={idx} >
                                <View style={styles.title} >
                                    <Text style={styles.notReachGoal} >
                                        {obj.date}
                                    </Text>
                                    <View style={{ flex: 1 }} />
                                </View>
                                <ItemList
                                    showList={showList}
                                    deleteHandler={deleteSleepData}
                                    date={obj.date} />
                            </View>
                        );
                    })
                }
            </View>
        </ScrollView >
    );
}

export default SleepScreen;