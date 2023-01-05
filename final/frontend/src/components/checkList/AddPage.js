import { StyleSheet, ScrollView, View, Text, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ChecklistItem from './ChecklistItem';
import { useCheckList } from './hooks/useCheckList';
import { useState, useEffect } from 'react';
import { NavBar } from '../NavBar';
import { ActionIcon } from '../ActionIcon';
import { SelectList } from 'react-native-dropdown-select-list';

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFFFFF', // gray/50
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 24,
        paddingRight: 24,
        width: null,
        height: "100%",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'Center',
    },
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
        paddingTop: 4,
        paddingBottom: 4,
    },
    taskCardTextFlex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#F9FAFB', // gray/50
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'space-between',
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: 4,
        paddingBottom: 4,
    },
    taskCardCloseFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB', // gray/50
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-start',
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: 4,
        paddingBottom: 4,
    },
    checkBoxContainer: {
        padding: 12,
    },
    pad: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    iconContainer: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    input: {
        height: 30,
        margin: 12,
        borderWidth: 0,
        padding: 10,
        width: "80%"
      },
});

const AddPage =  ({isNew, editable, detailID, setDetailID}) => {
    const { displayWeek, putChecklistItem, onDeleteHandler, checkListData } = useCheckList();
    let item = checkListData.data.find((e) => e._id == detailID)
    const [text, setText] = useState(item.text)
    const [date, setDate] = useState(item.date)
    const [location, setLocation] = useState(item.location)
    const [repeat, setRepeat] = useState(item.repeat)
    const [note, setNote] = useState(item.note)
    const [edit, setEdit] = useState(editable)
    const [dateOpen, setDateOpen] = useState(false)
    const repeatOption = [{"key":1, "value":'daily'} ,{"key":2, "value":'weekly'}, {"key":3, "value":'biweekly'}, {"key":4, "value":'monthly'}]
    return (
        <>
            <NavBar 
                    leftIcon={ edit ? 'trash-s': 'cheveron-left-s' }
                    rightIcon= { edit ? 'save-s': 'pencil-s'}
                    centerText=''
                    leftText={ edit ? 'Discard':'Back' }
                    rightText={ edit ? 'Save':'Edit' }
                    leftIconOnPress={()=>{
                        if (!edit){
                            if (text.trim().length === 0){
                                onDeleteHandler(detailID)}
                            setDetailID(undefined)
                        }
                        else{
                            setText(item.text)
                            setDate(item.date)
                            setLocation(item.location)
                            setRepeat(item.repeat)
                            setNote(item.note)
                            setEdit(()=>!edit)
                        }
                        }
                    } 
                    rightIconOnPress={()=>{
                        if (edit){
                            let updatedItem = {week:displayWeek, text:text, date:date, 
                                location:location, repeat:repeat, note:note} 
                            putChecklistItem(detailID, updatedItem)
                        }
                        setEdit(()=>!edit)
                    }}
                />
            <ScrollView style={styles.body}>
                <View style={styles.pad}>
                    <Text style={styles.title}> {displayWeek === 0? "TTC checklist":`Week ${displayWeek} of Pregnency`}</Text>
                </View>
                <View style={styles.pad}>
                    <ChecklistItem _id={detailID} checked={item.checked} text={text} liked={item.liked} onPress={()=>{}}/>
                </View>
                <View style={styles.pad}>
                    <View style={styles.taskCardTextFlex}>
                        <Text style={{fontWeight: 'bold'}}>Description</Text>
                        {edit ? 
                        <TextInput
                            multiline
                            numberOfLines={3}
                            style={[styles.input, {height: 100}]}
                            onChangeText={(v)=>setText(v)}
                            value={text}
                            placeholder="Add description"
                        />:
                        <Text style={styles.input}>
                            {text}
                        </Text>}
                    </View>
                </View>
                <View style={styles.pad}>
                    <View style={styles.taskCardFlex}>
                        <View style={styles.iconContainer} >
                            <FontAwesome5 name='calendar' color='#f87171' size={18}/>
                        </View>
                        {edit ? 
                        <TextInput
                            style={styles.input}
                            onChangeText={(v)=>{setLocation(v)}}
                            value={date}
                            placeholder="Add Date"
                        />:
                        <Text style={styles.input}>
                            {date}
                        </Text>}
                        {/* <Text style={styles.input}> 
                            {date}
                        </Text> 
                        {edit?
                        <Pressable style={styles.iconContainer}>
                            <ActionIcon iconName={'pencil-p'} onPress={()=>{setDateOpen(true)}} size={16}/>
                        </Pressable> :
                        <></> 
                        } */}
                    </View>
                </View>
                <View style={styles.pad}>
                    <View style={styles.taskCardFlex}>
                        <View style={styles.iconContainer} >
                            <FontAwesome5 name='map-marker-alt' color='#f87171' size={18}/>
                        </View>
                        {edit ? 
                        <TextInput
                            style={styles.input}
                            onChangeText={(v)=>{setLocation(v)}}
                            value={location}
                            placeholder="Add Location"
                        />:
                        <Text style={styles.input}>
                            {location}
                        </Text>}
                    </View>
                </View>
                <View style={styles.pad}>
                    <View style={styles.taskCardCloseFlex}>
                        <View style={[styles.iconContainer, {marginRight: 18}]} >
                            <FontAwesome5 name='sync-alt' color='#f87171' size={18}/>
                        </View>
                        {edit?
                        <SelectList 
                            setSelected={(val) => setRepeat(val)} 
                            data={repeatOption} 
                            save="value"
                        />:
                        // <TextInput
                        //     style={styles.input}
                        //     onChangeText={(v)=>setRepeat(v)}
                        //     value={repeat}
                        //     placeholder="Repeat times"
                        // />:
                        <Text style={styles.input}>
                            {repeat}
                        </Text>}
                    </View>
                </View>
                <View style={styles.pad}>
                    <View style={styles.taskCardTextFlex}>
                        <Text style={{fontWeight: 'bold'}}>Note</Text>
                        {edit? 
                        <TextInput
                            multiline
                            numberOfLines={3}
                            style={[styles.input, {height: 100}]}
                            onChangeText={(v)=>setNote(v)}
                            value={note}
                            placeholder="Add note"
                        />:
                        <Text style={styles.input}>{note}</Text>}
                    </View>
                </View>
                {/* TODO: Related articles */}
                {/* <View style={styles.block} >
                    <View style={styles.titleRow} >
                        <Text style={styles.title} >Related Articles</Text>
                    </View>
                    <ScrollView style={styles.pad} horizontal >
                        {theme.map((group, idx) =>
                            <TopicCardSingle
                                key={idx}
                                top={group.topic[0]}
                                onPress={() => navigation.jumpTo('Library')} // TODO: goto topicMenu
                            />
                        )}
                    </ScrollView>
                </View> */}
            </ScrollView>
        </>
    );
};

export default AddPage;