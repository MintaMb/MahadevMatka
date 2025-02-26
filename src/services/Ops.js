import AsyncStorage from "@react-native-async-storage/async-storage";
import  axios from "axios";
import { NativeModules } from "react-native";
const postData = async (url = "", data) => {
    try {
        console.log("url", url)
         
        var header = { headers: {  Accept: 'application/json','Cache-Control': 'no-cache', } };
        let response = await axios.post(url, data, header)
        return response;
        // let response = await axios.post(url, data, { headers:  { "Authorization": tokenData }});
    } catch (e) {
        // if(e.response.data.status == 403 || e.response.data.status == 401 ){
        //     AsyncStorage.clear()
        //     NativeModules.DevSettings.reload();
        // }
        console.log("---post---", JSON.stringify(e.response))
        return e.response.data
    }
};
const postDataContent = async (url = "", data) => {
    try {
        
        console.log("url", url)

        let response = await axios.post(url, data, {
            headers: {  "content-type": 'multipart/form-data;','Cache-Control': 'no-cache', },
        });
        return response.data;
    } catch (e) {
        // if(e.response.data.status == 403 || e.response.data.status == 401 ){
        //     AsyncStorage.clear()
        //     NativeModules.DevSettings.reload();
        // }
        console.log("---post mut   e---", JSON.stringify(e))
        return e.response.data
    }
};
const putData = async (url = "", data) => {
    try {
        let token = await AsyncStorage.getItem("token");

        if (token) {
            token = "Bearer " + token;
        }
        let response = await axios.put(url, data, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (e) {
        // if(e.response.data.status == 403 || e.response.data.status == 401 ){
        //     AsyncStorage.clear()
        //     NativeModules.DevSettings.reload();
        // }
        // console.log("----put e--", JSON.stringify(e.response.data))
        return e.response.data
    }
};
const getData = async (url = "", token = false) => {
    try {
        if (token) {
            token = "Bearer " + token;
        }
        var header = { headers: { Authorization: token,'Cache-Control': 'no-cache' } };
        let response = await axios.get(url, header);
        return response.data;
    } catch (e) {
        // if(e.response.data.status == 403 || e.response.data.status == 401 ){
        //     AsyncStorage.clear()
        //     NativeModules.DevSettings.reload();
        // }
        // console.log("---ree---", JSON.stringify(e.response.data))
        return e.response.data
    }
};

const deleteData = async (url = "", token = false) => {
    try {
        if (token) {
            token = "Bearer " + token;
        }
        let response = await axios.delete(url, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (e) {
        if(e.response.data.status == 403 || e.response.data.status == 401 ){
            AsyncStorage.clear()
            NativeModules.DevSettings.reload();
        }
        console.log("------", JSON.stringify(e.response.data))
        return e.response.data
    }
};

export async function downloadFile(fileUrl, data, token = false) {
    if (token) {
        token = "Bearer " + token;
    }
    axios
        .post(fileUrl, data, {
            responseType: "blob",
            headers: { Authorization: token },
        })
        .then(function (response) {
            const type = response.headers["content-type"];
            const blob = new Blob([response.data], {
                type: type,
                encoding: "UTF-8",
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = data.fileName;
            link.click();
        });
}
export { postData, getData, deleteData, putData, postDataContent };