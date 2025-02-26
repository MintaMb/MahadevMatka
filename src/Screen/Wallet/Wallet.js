/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    Image,
    Modal,
    Platform,
    TextInput,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from 'react-native';
import { currentTheme } from '../../constants/ThemeProvider';
import { list } from '../../enums/List';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { get_profile, get_wallet_history } from '../../services/User';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postDataContent } from '../../services/Ops';
import { base } from '../../constants/Data.constant';
import { images } from '../../assets/images';
import SmailFillBtn from '../../component/Button/SmallFillBtn';
import DatePicker from '../../component/DatePicker/DatePicker';
import { StyleConstants } from '../../constants/Style.constant';
import icon from '../../constants/image';
import Loading from '../../component/loading';

function Wallet(props) {

    const [wallet, setWallet] = useState("")
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(moment(new Date()).add(1, 'day'))

    useEffect(() => {
        const get_data = async () => {
            setLoading(true)
            let userData = await get_profile(); 
            setWallet(userData.wallet)
            setLoading(false)

        }
        const currentDate = new Date();
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(currentDate.getMonth() - 2);

        // Initialize state with the date one month ago
        setFromDate(lastMonthDate);


        get_history_data(lastMonthDate) 
        get_data()
    }, [props])

    const get_history_data = async (fromDate) => {
        let phone_number = await AsyncStorage.getItem("phone")
        setLoading(true)

        var body = new FormData();
        body.append("phone_number", phone_number);
        body.append("date1", moment(fromDate).format("YYYY-MM-DD"))//phone_number);
        body.append("date2", moment(toDate).format("YYYY-MM-DD"))//phone_number);
        console.log(body)
        let result = await postDataContent(base.get_wallet_history, body);
        console.log("bid history", result)
        setHistory(result.result)
        setLoading(false) 
    }


    const _goBack = () => {
        props.navigation.goBack()
    }
    return (
        <View style={{ flex: 1, backgroundColor: currentTheme().themeColor }}>
            {loading && <Loading/>}
            <View style={{ width: screenWidth, backgroundColor: currentTheme().themeColor,flex:1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 30 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Drawers", { screen: "Home" })}
                        style={{ height: 40, width: 40, justifyContent: 'center', borderRadius: 5 }} >
                        <Image source={icon.backArrow} style={{ height: 25, width: 25, alignSelf: 'center' }} resizeMode='contain' />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, color: currentTheme().White,   alignSelf: 'center', fontWeight: '600' }}>Wallet</Text>

                </View>
            </View>

            <View style={{ justifyContent: 'space-around', marginVertical: 20, borderTopEndRadius: 30, borderTopStartRadius: 30, backgroundColor: currentTheme().bgColor, height: screenHeight,flex:9 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                    <View>
                        <Text style={{ color: currentTheme().textColor, fontSize: 20, fontWeight: '500' }}>From Date</Text>
                        <View style={{ borderWidth: 1, padding: 10, width: screenWidth / 3, borderColor: "#FF493E", borderRadius: 10, alignItems: 'center', backgroundColor: '#FFFAEF' }}>
                            <DatePicker
                                selectedDate={fromDate}
                                setSelectedDate={setFromDate}
                                mode='date'
                                label='To Date'
                                width={screenWidth / 3.1}

                            />
                        </View>

                    </View>
                    <View>
                        <Text style={{ color: currentTheme().textColor, fontSize: 20, fontWeight: '500' }}>To Date</Text>
                        <View style={{ borderWidth: 1, padding: 10, width: screenWidth / 3, borderColor: "#FF493E", borderRadius: 10, alignItems: 'center', backgroundColor: '#FFFAEF' }}>

                            <DatePicker
                                selectedDate={toDate}
                                setSelectedDate={setToDate}
                                mode='date'
                                label='To Date'
                                width={screenWidth / 3.1}

                            />
                        </View>
                    </View>
                </View>
                <SmailFillBtn
                    label={"Apply"}
                    backgroundColor={currentTheme().themeColor}
                    color={currentTheme().White}
                    onPress={() => get_history_data()}
                />
                <FlatList
                    data={history}
                    style={{ }}
                    renderItem={({ item, index }) => (
                        <View style={[StyleConstants.itemList, { flexDirection: 'row', marginTop: 10, borderRadius: 5}]}>

                            <View style={{ flex: 2, padding: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: currentTheme().textColor }}>{item.remark}</Text>
                                <Text style={{ fontSize: 12, color: currentTheme().textColor }}>{item.date}</Text>

                            </View>
                            <View style={{ paddingHorizontal:20, padding:5,alignSelf:'center',right:20, backgroundColor: currentTheme().success,   justifyContent: 'center', borderRadius: 5 }}>
                                <Text style={{ fontSize: 18, color: currentTheme().White, alignSelf: 'center' }}>₹ {item.amount}</Text>

                            </View>
                            {/* <View style={{ flex: 2, padding: 10, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: currentTheme().textColor, alignSelf: 'center' }}>{item.time}</Text>
                </View> */}

                        </View>
                    )
                    }
                    ListFooterComponent={(
                        <View style={{ height: 100 }}></View>
                    )}
                    showsVerticalScrollIndicator={false} />
            </View>
        </View>

    );
}
export default Wallet;
