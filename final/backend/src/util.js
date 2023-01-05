// Convert mongodb date to string format eg. October 24, 2022
function dateToStr(date) {
    const monthList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"];

    let dateStr = new Date(date).toLocaleString("en-US", { timeZone: "Asia/Taipei" });// MM/dd/yyyy
    const dateList = dateStr.replace(", 12:00:00 AM","").split('/');
    return `${monthList[parseInt(dateList[0])-1]} ${dateList[1]}, ${dateList[2]}`;
}

// Convert date string format yyyyMMdd to Date object
function strToDate(str) {
    const year = str.substring(0, 4);
    const month = str.substring(4, 6);
    const day = str.substring(6, 8);
    let date = new Date(`${year}-${month}-${day}T00:00:00+08:00`);
    return date;
}

// Convert mongodb date to abbreviation string format eg. Oct 21
function dateToAbbreviationStr(date) {
    const monthList = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"];
    let dateStr = new Date(date).toLocaleString("en-US", { timeZone: "Asia/Taipei" });
    const dateList = dateStr.replace(", 12:00:00 AM","").split('/');
    return `${monthList[parseInt(dateList[0])-1]} ${dateList[1]}`;
}


export { dateToStr, strToDate, dateToAbbreviationStr };