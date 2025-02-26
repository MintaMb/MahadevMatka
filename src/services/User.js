/* eslint-disable prettier/prettier */
import * as opsService from "./Ops";
import * as dataConstants from "../constants/Data.constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiCall } from "./AppSetting";

const get_profile = async () => { 
    try { 
      let phone = await AsyncStorage.getItem('phone');
       
        var formdata = new FormData();
        formdata.append("phone_number", phone);
        let result = await opsService.postDataContent(dataConstants.base.getProfile,formdata);
        console.log(result)
        return result.data;
    } catch (e) {
        return { status: false, data: {}, message: e.message };
    }
},
get_wallet_history = async () => { 
    try { 
      let phone = await AsyncStorage.getItem('phone');
       
        var formdata = new FormData();
        formdata.append("phone_number", phone);
        let result = await opsService.postDataContent(dataConstants.base.get_wallet_history,formdata);
        return result.data;
    } catch (e) {
        return { status: false, data: {}, message: e.message };
    }
},
app_setting = async () => { 
    try { 
      let phone = await AsyncStorage.getItem('phone');
       
        var formdata = new FormData();
        formdata.append("phone_number", phone);
        let result = await opsService.postDataContent(dataConstants.base.app_setting,formdata);
        return result.data;
    } catch (e) {
        return { status: false, data: {}, message: e.message };
    }
},
admin_setting= async () => { 
    try {  
        let result = await opsService.postDataContent(dataConstants.base.app_setting,{});
        return result.data;
    } catch (e) {
        return { status: false, data: {}, message: e.message };
    }
}
export {
    get_profile,app_setting,get_wallet_history,admin_setting
};
