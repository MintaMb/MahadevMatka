

/* eslint-disable prettier/prettier */
import * as opsService from "./Ops";
import * as dataConstants from "../constants/Data.constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiCall } from "./AppSetting";

const get_game_chart = async (body) => { 
    try {  
        let result = await opsService.postDataContent(dataConstants.base.getGameChart,body);
        console.log("chart--------",result)
        return result.result;
    } catch (e) {
        return { status: false, data: {}, message: e.message };
    }
},
get_game_rate = async (body) => { 
    try {  
        let result = await opsService.postDataContent(dataConstants.base.getGameRate,body);
        console.log("chart--------",result)
        return result.result;
    } catch (e) {
        return { status: false, data: {}, message: e.message };
    }
}
export {
    get_game_chart,get_game_rate
};
