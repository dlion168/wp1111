import { StyleSheet, TouchableOpacity, View, Text, Touchable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    taskCardFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB', // gray/50
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'space-between',
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: 8,
        paddingBottom: 8,
    },
    checkBoxContainer: {
        padding: 12,
    },
    label: {
        // flex: 1,
        fontSize: 14,
        color: '#1F2937', // gray/800
    },
    iconContainer: {
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});

const AddListItem = ({onAddHandler}) => {
    return (
        <TouchableOpacity style={styles.taskCardFlex} onPress={onAddHandler}>
            <View style={styles.iconContainer} >
                <FontAwesome5 name='plus' color='#f87171' size={18}/>
            </View>
            <Text style={styles.label} numberOfLines={1}>Create Your Own Checklist</Text>
            <View style={styles.iconContainer} >
                <FontAwesome5 name='chevron-right' color='grey' size={18}/>
            </View>
        </TouchableOpacity>
    );
};

export default AddListItem;