import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useCheckList } from './hooks/useCheckList';

const styles = StyleSheet.create({
    taskCard: {
    },
    taskCardFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB', // gray/50
        borderRadius: 10,
        overflow: 'hidden',
        height: 48,
        width: "90%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    label:{
        fontWeight: 'bold',
        fontSize: 14,
        color: '#1F2937', // gray/800
    },
    iconContainer: {
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
});
// @param text: str, text to display in item
// @param status: enum(['complete', 'past', 'current', 'future'])  
const MonthItem = ({text, week, setViewWeek, setViewMonth}) => {
    const {curWeek} = useCheckList();
    let status = curWeek === week ? "current" : curWeek > week ? "past" : "future"
    // if ()
    return(
        <TouchableOpacity style={ status === 'current' ?  [styles.taskCardFlex, {backgroundColor: '#f87171'}] : styles.taskCardFlex}
            onPress={()=>{
                setViewWeek(week)
                setViewMonth(false)}}>
            <Text style={status === 'future' ?  styles.label : 
            [styles.label, status === 'current' ? {color: '#ffffff'} : {color: '#f87171'}] } 
            numberOfLines={1}>{text}</Text>
            <View stype={styles.iconContainer}>
                <FontAwesome5 name={ status === 'current' ? 'flag' : status === 'complete' ? 'circle-check' : 'chevron-right'} 
                size={12} color={status === 'current' ? '#FFFFFF' : status === 'past' ? '#f87171' : '#1F2937'} solid />
            </View>
        </TouchableOpacity>
    )
};

export default MonthItem;

