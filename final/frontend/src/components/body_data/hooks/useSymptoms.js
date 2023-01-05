import { useState } from "react";
import axios from '../../../api';

export default (displayWeek, addMode) => {
    const init = addMode ? [
        { 'symptomName': 'Cramps', 'choose': true },
        { 'symptomName': 'Tender breasts', 'choose': false },
        { 'symptomName': 'Headache', 'choose': false },
        { 'symptomName': 'Acne', 'choose': false },
    ] : [
        { 'symptomName': 'Cramps', 'times': 0 },
        { 'symptomName': 'Tender breasts', 'times': 0 },
        { 'symptomName': 'Headache', 'times': 0 },
    ];

    const [symptomSummary, setSymptomSummary] = useState(init);

    const convertToDateString = (date) => {
        const yyyy = date.getFullYear();
        const MM = (date.getMonth() + 1).toString().padStart(2, '0');
        const dd = date.getDate().toString().padStart(2, '0');
        return yyyy + MM + dd;
    }

    //get data from database
    const fetchSymptomSummary = async (startDate, endDate) => {
        const summary = await axios.get('/symptom/summary', {
            params: {
                startDate: convertToDateString(startDate),
                endDate: convertToDateString(endDate),
            },
        });
        return summary.data.summary;
    };

    const getSymptomSummary = async () => {
        if (addMode) {
            setSymptomSummary(symptomSummary);
        }
        else {
            let startDate = new Date("2022/10/24");
            let endDate = new Date("2022/10/30");
            startDate.setDate(startDate.getDate() + displayWeek * 7);
            endDate.setDate(endDate.getDate() + displayWeek * 7);
            const data = await fetchSymptomSummary(startDate, endDate);

            const symptomsList = ['Cramps', 'Tender breasts', 'Headache', 'Acne'];
            let tmp = [];
            symptomsList.forEach(element => {
                let item = { 'symptomName': element }
                if (data[element])
                    item['times'] = data[element];
                else
                    item['times'] = 0;
                tmp.push(item);
            })
            setSymptomSummary(tmp);
        };
    }

    return { symptomSummary, setSymptomSummary, getSymptomSummary };
}
