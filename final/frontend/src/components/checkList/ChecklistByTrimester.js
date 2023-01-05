import { View, StyleSheet, Pressable,  ScrollView, Text, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavBar } from '../NavBar';
import MonthItem from './MonthItem'
import { useRef } from 'react';

import { useCheckList } from './hooks/useCheckList';

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#ffffff',
    },
    btnGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingLeft:"5%",
        paddingRight:"5%",
        paddingTop:20,
        paddingBottom:20,
        backgroundColor: '#ffffff',
    },
    btn:{
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderStyle: 'solid',
        borderColor: '#f87171',
        borderWidth: 1,
        width: '20%',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Lato',
    },
    trimesterBtn:{
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 18,
        color: '#f87171',
    },
    searchBar: {
        backgroundColor: '#FFFFFF',
        border: 0,
    },
    titleRow: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 24,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
})

const checkByMonth=[
    {'title': 'Getting Pregnant', 'elements': [0], } , 
    {'title': 'Month 1', 'elements': [1,2,3,4],} , 
    {'title': 'Month 2', 'elements': [5,6,7,8],} , 
    {'title': 'Month 3', 'elements': [9,10,11,12,13],} , 
    {'title': 'Month 4', 'elements': [14,15,16,17],} , 
    {'title': 'Month 5', 'elements': [18,19,20,21,22],} , 
    {'title': 'Month 6', 'elements': [23,24,25,26,27],} , 
    {'title': 'Month 7', 'elements': [28,29,30,31],} , 
    {'title': 'Month 8', 'elements': [32,33,34,35],} , 
    {'title': 'Month 9', 'elements': [36,37,38,39,40],}
    ]
let scrollY = []
const ChecklistByTrimester = ({ search, setSearch, trimester, setTrimester, setViewWeek, setViewMonth, navigation}) => {
    const scrollRef = useRef(null)
    const renderOneMonth = ({item})=>{
        return(
        <>
            <View style={styles.titleRow} >
                <Text style={styles.title} >{item.title}</Text>
            </View>
            <FlatList
            data = {item.elements}
            renderItem = {(e) => {
                return <MonthItem text={e.item > 0 ? `Week ${e.item} of pregnency`: 'TTC Checklist'} 
                week={e.item} setViewWeek={setViewWeek} setViewMonth={setViewMonth}></MonthItem>
            }}
            keyExtractor={(item) => item}>
            </FlatList>
        </>)
    }
    return (
        <>
            <NavBar centerText='Checklist'/>
            <SearchBar value={search}
                           onChangeText={(search) => {setSearch(search)}}
                           placeholder='Search Checklist, Keywords, and more' 
                           round={true} 
                           containerStyle={styles.searchBar}
                           inputContainerStyle={{backgroundColor: '#F2F2F2'}} />           
            <View style={styles.btnGroup}>
                <Pressable style={ trimester === 1 ? [styles.btn, {backgroundColor: '#f87171'}] : styles.btn} 
                            onPress = {() => {
                            setTrimester(1)
                            scrollRef.current?.scrollTo({
                                y: scrollY[0],
                                animated: true
                              });
                            }}>
                    <Text style={ trimester === 1 ? [styles.trimesterBtn, {color: '#FFFFFF'}] : styles.trimesterBtn}>1st Trimester</Text>
                </Pressable>
                <Pressable style={ trimester === 2 ? [styles.btn, {backgroundColor: '#f87171'}] : styles.btn} 
                            onPress = {() => {
                            setTrimester(2)
                            console.log(scrollY)
                            scrollRef.current?.scrollTo({
                                y: scrollY[1],
                                animated: true
                              });
                            }}>
                    <Text style={ trimester === 2 ? [styles.trimesterBtn, {color: '#FFFFFF'}] : styles.trimesterBtn}>2nd Trimester</Text>
                </Pressable>
                <Pressable style={trimester === 3 ? [styles.btn, {backgroundColor: '#f87171'}] : styles.btn} 
                            onPress = {() => {
                            setTrimester(3)
                            console.log(scrollY)
                            scrollRef.current?.scrollTo({
                                y: scrollY[2],
                                animated: true
                              });
                            }}>
                    <Text style={ trimester === 3 ? [styles.trimesterBtn, {color: '#FFFFFF'}] : styles.trimesterBtn}>3rd Trimester</Text>
                </Pressable>
            </View>
            <ScrollView style={styles.body} ref={scrollRef}>
                <FlatList
                    data = { checkByMonth.slice(0,4) }
                    renderItem = {renderOneMonth}
                    keyExtractor={(item) => item.title.charAt(item.title.length - 1)}
                    onLayout={event =>
                        (scrollY[0] = event.nativeEvent.layout.y)
                      }
                >
                </FlatList>
                <FlatList
                    data = { checkByMonth.slice(4,7) }
                    renderItem = {renderOneMonth}
                    keyExtractor={(item) => item.title.charAt(item.title.length - 1)}
                    onLayout={event =>
                        (scrollY[1] = event.nativeEvent.layout.y)
                      }
                >
                </FlatList>
                <FlatList
                    data = { checkByMonth.slice(7,10) }
                    renderItem = {renderOneMonth}
                    keyExtractor={(item) => item.title.charAt(item.title.length - 1)}
                    onLayout={event =>
                        (scrollY[2] = event.nativeEvent.layout.y)
                      }
                >
                </FlatList>
            </ScrollView>
        </>
    )
    }
export default ChecklistByTrimester;