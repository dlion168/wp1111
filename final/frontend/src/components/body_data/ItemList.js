import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ActionIcon } from '../ActionIcon';

const styles = StyleSheet.create({
    itemListStyle: {
        alignItems: 'center',
        // paddingTop: 0,
        // paddingLeft: 16,
        gap: 16,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 0,
        paddingLeft: 16,
        paddingRight: 16,
        width: 350,
        height: 48,
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        /* Inside auto layout */
        flex: 'none',
        order: 1,
        flexGrow: 0,
    },
    text: {
        fontWeight: 400,
        fontSize: 14,
        color: '#6B7280',
    },
    deleteBox: {
        backgroundColor: '#F87171',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
})

const ItemList = ({ showList, deleteHandler, date }) => {
    return (
        <View style={styles.itemListStyle} >
            {
                showList.map((obj, idx) => {
                    return (
                        <Swipeable
                            rightOpenValue={-100}
                            renderRightActions={() =>
                                <View style={styles.deleteBox}>
                                    <ActionIcon
                                        iconName={'trash-s'}
                                        size={20} padding={15}
                                        onPress={() => deleteHandler(date, obj.time)} />
                                </View>
                            }
                            key={idx}>
                            <View style={styles.item} key={idx} >
                                <Text style={styles.text} >{obj.leftText}</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={styles.text} >{obj.rightText}</Text>
                            </View>
                        </Swipeable>
                    );
                })
            }
        </View>
    );
}

export default ItemList;