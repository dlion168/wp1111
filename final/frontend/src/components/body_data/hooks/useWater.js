import { useState } from "react";
import axios from '../../../api';

export default (displayWeek) => {
    const init = {
        "date": ["Oct 24"],
        "capacity": [0]
    }
    const [waterSummary, setWaterSummary] = useState(init);

    let startDate = new Date("2022/10/24");
    let endDate = new Date("2022/10/30");
    startDate.setDate(startDate.getDate() + displayWeek * 7);
    endDate.setDate(endDate.getDate() + displayWeek * 7);

    const convertToDateString = (date) => {
        const yyyy = date.getFullYear();
        const MM = (date.getMonth() + 1).toString().padStart(2, '0');
        const dd = date.getDate().toString().padStart(2, '0');
        return yyyy + MM + dd;
    }

    const getWaterSummary = async () => {
        const {
            data: { data, message },
        } = await axios.get('/water/summary', {
            params: {
                startDate: convertToDateString(startDate),
                endDate: convertToDateString(endDate),
            },
        });
        setWaterSummary(data);
    };

    return { waterSummary, getWaterSummary };
}
