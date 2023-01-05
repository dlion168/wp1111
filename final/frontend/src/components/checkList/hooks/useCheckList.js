import { useState, createContext, useContext, useEffect } from "react";
import axios from '../../../api'
const CheckListContext = createContext({
    displayWeek: undefined,
    curWeek: undefined,
    setDisplayWeek: ()=>{},
    checkListData: [],
    setCheckListData: ()=>{},
    postChecklistItem: ()=>{},
    putChecklistItem: ()=>{},
    onDeleteHandler: ()=>{},
});
const ChecklistProvider = (props) => {
    const { children, storeData } = props; // parse storeData and add storeData to value
    const [checkListData, setCheckListData] = useState({intro:"", title:"", data:[]})
    const [curWeek, setCurWeek] = useState(2)
    const [displayWeek, setDisplayWeek] = useState(curWeek)
    const getChecklistByWeek = async (week, setfunc) => {
        const {
            data: { message, checklists },
        } = await axios.get('/checklist/week', {
            params: {week: week}
        });
        console.log(message, checklists);
        checklists.data.sort((x,y)=>Number(y.liked)-Number(x.liked))
        setfunc(checklists);
    }
    const deleteChecklistItem = async (_id) => {
        const {
            data: { message,  returnID },
        } = await axios.delete('/checklist/delItem', {
            params: {id: _id}
        });
        console.log(message, returnID);
        return returnID
    }
    const postChecklistItem = async (item) => {
        const {
            data: { message,  returnItem },
        } = await axios.post('/checklist/item', {
            params: {item: item}
        });
        console.log(message, returnItem);
        let a = JSON.parse(JSON.stringify(checkListData))
        a.data.push(returnItem)
        console.log("Before : ",a.data)
        a.data.sort((x,y)=>Number(y.liked)-Number(x.liked))
        console.log("After : ",a.data)
        setCheckListData(a)
        return await returnItem
    }

    const putChecklistItem = async (_id, item) => {
        const {
            data: { message, returnItem },
        } = await axios.put('/checklist/item', {
            params: {_id: _id, item: item}
        });
        let arrayId = checkListData.data.findIndex((obj) => {
            return obj._id == _id
        });

        let a = JSON.parse(JSON.stringify(checkListData))
        a.data[arrayId] = returnItem 
        a.data.sort((x,y)=>Number(y.liked)-Number(x.liked))
        console.log(message, a);
        setCheckListData(a);
    }

    useEffect(() => {
        getChecklistByWeek(displayWeek, setCheckListData);
    }, [displayWeek])

    const onDeleteHandler = async (_id) => {
        let deletedId = await deleteChecklistItem(_id);
        console.log("deletedId = ", deletedId)
        let arrayId = checkListData.data.findIndex(function(item, i){
            return item._id === deletedId
          }); 
        console.log("deleted array ID = ", arrayId)
        let a = JSON.parse(JSON.stringify(checkListData))
        a.data.splice(arrayId, 1);
        setCheckListData(a);
    };

    return <CheckListContext.Provider
        value={{ 
            displayWeek, 
            curWeek, 
            setDisplayWeek, 
            checkListData, 
            setCheckListData,
            postChecklistItem, 
            putChecklistItem, 
            onDeleteHandler, 
            storeData }}
        {...props}
    />

};
const useCheckList = () => useContext(CheckListContext);
export { useCheckList, ChecklistProvider };