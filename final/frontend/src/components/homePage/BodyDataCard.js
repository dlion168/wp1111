import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const style_dict = {
    'Sleep': {
        icon: require('../../assets/image/BodyData/Bed.png'),
        bg1: '#FAF5FF', // purple/50
        bg2: '#F3E8FF', // purple/100
    },
    'Water': {
        icon: require('../../assets/image/BodyData/Potable water.png'),
        bg1: '#EEF2FF', // indigo/50
        bg2: '#E0E7FF', // indigo/100
    },
    'Symptom': {
        icon: require('../../assets/image/BodyData/Symptom/Stethoscope.png'),
        bg1: '#F0F9FF', // sky/50
        bg2: '#E0F2FE', // sky/100
    },
}

const styles = StyleSheet.create({
    outer: {
        width: 110,
        height: 125,
        borderRadius: 10,
        marginLeft: 8,
        marginRight: 8,
        padding: 16,
        display: 'flex',
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    round: {
        width: 64,
        height: 64,
        borderRadius: 32,
        position: 'absolute',
        right: -8,
        top: -8,
        padding: 16,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    icon: {
        height: 32,
        width: 32,
    },
    name: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1F2937', // gray/800
        opacity: 0.5,
        marginBottom: 4,
    },
    summaryBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937', // gray/800
    },
    unit: {
        fontSize: 10,
        color: '#1F2937', // gray/800
        opacity: 0.5,
    },
    space: {
        width: 4,
    },
})

const BodyDataCard = ({ name, text1='', unit1='', text2='', unit2='', onPress }) => {
    const style = style_dict[name];
    return (
        <TouchableOpacity style={[styles.outer, {backgroundColor: style.bg1}]} onPress={onPress} >
            <View style={[styles.round, {backgroundColor: style.bg2}]}>
                <Image style={styles.icon} source={style.icon}/>
            </View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.summaryBox}>
                <Text style={styles.text} numberOfLines={1}>{text1}</Text>
                <View style={styles.space}/>
                <Text style={styles.unit}>{unit1}</Text>
                <View style={styles.space}/>
                <View style={styles.space}/>
                <Text style={styles.text} numberOfLines={1}>{text2}</Text>
                <View style={styles.space}/>
                <Text style={styles.unit}>{unit2}</Text>
            </View>
        </TouchableOpacity>
    );
}

export { BodyDataCard }