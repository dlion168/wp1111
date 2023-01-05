import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, FlatList, TouchableOpacity} from 'react-native';
import { NavBar } from '../NavBar';
import ChecklistItem from './ChecklistItem'
import { useCheckList } from './hooks/useCheckList';
import AddPage from './AddPage'
const styles = StyleSheet.create({
    bg:{
        backgroundColor: '#FFFFFF',
        height: '100%',
    },    
    height:{
        height: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 8,
        paddingBottom: 8,
    },
    intro: {
        fontSize: 14,
        paddingTop: 8,
        paddingBottom: 8,
    },
    pad: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    block: {
        margin: 24,
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F87171",
        position: 'absolute',
        bottom: "10%",
        right: 10,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "#FFFFFF",
        fontSize: 40,
        fontWeight: 30,
    }
})

const ChecklistPerWeek = ({setViewMonth}) =>{
    const { displayWeek, checkListData, postChecklistItem } = useCheckList()
    const [ detailID, setDetailID ] = useState(undefined)
    const { intro, title, data } = checkListData
    const [isNew, setIsNew] = useState(false)
    
    return(
        <>
        { (detailID !== undefined) ?
        <AddPage editable={false} detailID={detailID} setDetailID={setDetailID} isNew={isNew}/> : 
        <View style= {styles.height}> 
            <View style = {styles.bg}>
                <NavBar centerText='Checklist' leftIcon='cheveron-left-s' leftIconOnPress={()=>{setViewMonth(true)}}/>
                <ScrollView style = {styles.block}>
                    <Text style = {styles.intro}> { intro } </Text>
                    <Text style = {styles.title}> { title } </Text>
                    <FlatList 
                    data = {data}
                    renderItem = { (e) => {
                        return (
                        <View style={styles.pad} key={e.item._id}>
                            <ChecklistItem 
                                _id={e.item._id} 
                                week={displayWeek} 
                                checked={e.item.checked} 
                                text={e.item.text} 
                                liked={e.item.liked}
                                onPress={()=>{
                                    setIsNew(false)
                                    setDetailID(e.item._id)}}
                                >
                            </ChecklistItem>
                        </View>)}}
                    keyExtractor={(item) => item.text}>
                    </FlatList>
                </ScrollView>
            </View>
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={async ()=>{
                        setIsNew(true)
                        let item = await postChecklistItem({week:displayWeek, checked: false, liked: false, text:"",
                            date:new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"}),
                            location:"", repeat:'', note:""})
                        setDetailID(item._id)
                        }}>
                <Text style={styles.text} >+</Text>
            </TouchableOpacity> 
        </View> 
        }
        </>
    )
}
export default ChecklistPerWeek
