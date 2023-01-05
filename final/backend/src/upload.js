import ChecklistItem from "./models/ChecklistItem";
import ChecklistPerWeek from "./models/ChecklistPerWeek";
import checklistData from "../checklistData.json";
const dataInit = async ()=>{
    const checkItem = await ChecklistItem.find();
    const checkPerWeek = await ChecklistPerWeek.find();
    if (checkPerWeek.length != 41 || checkItem.length != 78){
        console.log("Total checklist items are not equal to default ", checkItem.length)
        console.log('Reset checklist Data');
        await ChecklistItem.deleteMany({});
        await ChecklistPerWeek.deleteMany({});
        for (let i=0 ; i<checklistData.length ; i++){
            let dataId = []
            for (let j=0 ; j<checklistData[i].data.length ; j++){
                let item = await new ChecklistItem(checklistData[i].data[j]).save()
                dataId.push(item._id)
            }
            let weekData = await new ChecklistPerWeek({week:i, intro:checklistData[i].intro, title:checklistData[i].title, data:dataId}).save()
        }
    }
    else{
        console.log("The number of checklist items are correct", checkItem.length)
      }
}

export { dataInit }