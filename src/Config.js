import axios from "axios";
import React from "react";
const textApp = "i 记账 -mobile";
const textCountIn = "收入";
const textCountOut = "支出";
const textFooter = ["明细", "图表", "", "其他", "我的"]
const textFooterUrl = ["/", "/graph", "/account", "/others", "/my"]
const textType = {
    "支出" : ["餐饮", "购物", "日用", "交通","餐饮", "购物", "日用", "交通","餐饮", "购物", "日用", "交通"],
    "收入" : ["工资","兼职","理财","其他","工资","兼职","理财","其他","工资","兼职","理财","其他"]
}
const textTypeIcon = {
    "支出" : ['canyin', 'shopping', 'riyongpin', 'jiaotong', 'canyin', 'shopping', 'riyongpin', 'jiaotong','canyin', 'shopping', 'riyongpin', 'jiaotong',],
    "收入" : ['gongzi1', 'jianzhi', 'licai',
        'ziyuan', 'gongzi1', 'jianzhi', 'licai',
        'ziyuan', 'gongzi1', 'jianzhi', 'licai',
        'ziyuan']
};
const footerIcon = ['mingxi', 'Diagram', 'jiahao', 'zhishi', 'usercenter']

const typeInOut = [textCountOut,textCountIn];


const iconType = [];

const saveData = async (url) => {
    const result = await axios(url);
    console.log("saveData成功")
}



const formatInOut = (item) => {
    let formatInOutStr = "";
    if(item["typeInOut"]==="支出"){
        formatInOutStr = '-' + item["count"]
    }else {
        formatInOutStr = '+' + item["count"]
    }
    return formatInOutStr
}

const formatDate = function (date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const yearStr = `${date.getFullYear()}`;
    const monthStr = `${pad(date.getMonth() + 1)}`;
    const dayStr =  `${pad(date.getDate())}`
    return {yearStr, monthStr, dayStr, dateStr}
}

const formatData = (data, type="date") => {
    console.log(data)
    console.log("dataMonth")
    if(Object.keys(data).length===0)return {}
    let resultIndex = []
    let result = {}
    data.forEach((item, index) => {
        resultIndex.push(item[type])
    })
    resultIndex = Array.from(new Set(resultIndex))
    console.log(resultIndex)
    console.log("resultIndex")
    resultIndex = sortData(resultIndex)
    console.log(resultIndex)
    for (let i=0; i<resultIndex.length; i++) {
        result[resultIndex[i]] = []
    }
    data.forEach((item, index) => {
        result[item[type]].push(item)
    })
    return result;
}

const sortData = (monthData) => {
    function splitDateDay(data) {
        return parseInt(data.split("-")[2])
    }
    function sortDay(x, y) {
        if (splitDateDay(x)>splitDateDay(y)) return -1;
        else if (splitDateDay(x)<splitDateDay(y)) return 1;
        else return 0;
    }
    return monthData.sort(sortDay)
}

const DataFresh = React.createContext(null)

const DetailNoData = () =>{
    return <div className="detail-content_nodata">
        <i className="iconfont icon-zanwushuju detail-content_nodata_icon"></i>
        <div className="detail-content_nodata_text">暂无数据</div>
    </div>
}

const fetchUrl =
    {
        "save": 'https://qcluj6.fn.thelarkcloud.com/hello',
        "data": "https://qcluj6.fn.thelarkcloud.com/getAccountData",
        "delete": "https://qcluj6.fn.thelarkcloud.com/deleteItem",
        "edit": "https://qcluj6.fn.thelarkcloud.com/editItem"
    }

const commonAxios = async (url, params) => {
    await axios.post(url, params)
}
export {
    textApp,
    textCountIn,
    textCountOut,
    typeInOut,
    textFooter,
    textFooterUrl,
    textType,
    iconType,
    formatInOut,
    textTypeIcon,
    formatDate,
    saveData,
    fetchUrl,
    formatData,
    DataFresh,
    footerIcon,
    sortData,
    DetailNoData,
    commonAxios
}
