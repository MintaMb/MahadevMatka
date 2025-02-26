/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, Alert, Linking } from 'react-native';
import { currentTheme } from '../../constants/ThemeProvider';
import { screenWidth } from '../../constants/Sizes.constant';

import { StyleConstants } from '../../constants/Style.constant';
import { tags } from 'react-native-svg/lib/typescript/xml';
import { app_setting, get_profile } from '../../services/User';
import { imageServerUrl } from '../../constants/Data.constant';
import { t } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons, images } from '../../assets/images';
import icon from '../../constants/image';

function DrawerScreen(props) {

    const [userProfileData, setUserProfileData] = useState('')
    const [appSetting, setAppSetting] = useState({})
    const [accountStatus, setAccountStatus] = useState("0")

    useEffect(() => {
        const get_data = async () => {
            let userData = await get_profile();
            setAppSetting(await app_setting())

            console.log(userData)
            setUserProfileData(userData)
        }
        get_data()
        get_profile_data()
    }, [props])
    const logoutHandler = () => {
        Alert.alert('Logout', 'Are you sure you want logout ?', [
            {
                text: 'Yes',
                onPress: async () => {
                    await AsyncStorage.removeItem("phone")
                    await AsyncStorage.removeItem("email")

                    props.navigation.navigate('Login')
                }
            },
            {
                text: 'No',
                onPress: () => console.log('no'),
            },
        ]);
    };

    const get_profile_data = async () => {
        let userData = await get_profile();

        console.log("userData------", userData)


        if (userData.status == "0") {
            AsyncStorage.setItem("accountStatus", "0")
            global.accountStatus = "0"
            setAccountStatus("0")
        } else {
            global.accountStatus = "1"
            AsyncStorage.setItem("accountStatus", "1")
            setAccountStatus("1")


        }
        // setLoading(false)
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: currentTheme().bgColor1 }}>
                <View style={styles.blueHead}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.ImgBorder}>
                            <Image style={styles.headerimg} source={images.logo} />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ color: currentTheme().antiTextColor, fontSize: 25, fontWeight: 'bold' }}>Sara 786</Text>
                            <Text style={{ backgroundColor: '#86102C', color: currentTheme().antiTextColor, paddingHorizontal: 10, marginTop: 10 }}>Online Matka</Text>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={[StyleConstants.icon, { tintColor: '#FFECD7' }]} source={icon.call} />
                            <Text style={[StyleConstants.textWhite3, { marginLeft: 5 }]}>
                                {userProfileData?.phone_number}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={[StyleConstants.icon, { tintColor: '#FFECD7' }]} source={icons.userIcon} />
                            <Text style={[StyleConstants.textWhite3, { marginLeft: 5 }]}>
                                {userProfileData?.name}
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={{ flex: 3, paddingHorizontal: 10 }}>
                    <Text style={styles.heading}>Home</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Drawers', { screen: 'Home' })} style={styles.tags}>
                        <Image source={icons.homeIcon2} style={styles.icon} />
                        <Text style={[StyleConstants.textDrawer, {}]}>
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ProfileScreen')} style={styles.tags}>
                        <Image source={icons.userIcon} style={styles.icon} />
                        <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                            Profile
                        </Text>
                    </TouchableOpacity>


                    {global.accountStatus == "1" || accountStatus == "1" ?
                        <>
                            <View style={{ margin: 10, backgroundColor: currentTheme().textColor, height: 1 }} />


                            <Text style={styles.heading}>Wallet</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('AddFund')} style={styles.tags}>
                                <Image source={icons.rupee} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Add Points
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')} style={styles.tags}>
                                <Image source={icons.withdraw} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Withdraw Points
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => props.navigation.navigate('Wallet')} style={styles.tags}>
                                <Image source={icons.wallet} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Wallet Statement
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => props.navigation.navigate('FundTransfer')} style={styles.tags}>
                                <Image source={icons.transaction} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Transfer Fund
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('BidHistory')} style={styles.tags}>
                                <Image source={icons.transaction} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Bid History
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => props.navigation.navigate('WiningHistory')} style={styles.tags}>
                                <Image source={icons.transaction} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Wining History
                                </Text>
                            </TouchableOpacity>
                            <View style={{ margin: 10, backgroundColor: currentTheme().textColor, height: 1 }} />

                        </>

                        :
                        <></>
                    }

                    {global.accountStatus == "1" || accountStatus == "1" ?
                        <>
                    <Text style={styles.heading}>Bank Account</Text>

                            {/* <TouchableOpacity onPress={() => props.navigation.navigate('AddBank')} style={styles.tags}>
                            <Image source={icons.bank} style={{height:20,width:20}}  />
                            <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                Manage Bank
                            </Text>
                        </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => props.navigation.navigate('BankDetails', { type: 'paytm' })} style={styles.tags}>
                                <Image source={icons.paytm} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Paytm
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('BankDetails', { type: 'phonepe' })} style={styles.tags}>
                                <Image source={icons.phonepe} style={{ height: 20, width: 20 }} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    PhonePe
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('BankDetails', { type: 'gpay' })} style={styles.tags}>
                                <Image source={icons.gpay} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Gpay
                                </Text>
                            </TouchableOpacity>


                        </>
                        :
                        <></>
                    }
                    <View style={{ margin: 20, backgroundColor: currentTheme().textColor, height: 1 }} />

                    <Text style={styles.heading}>More</Text>
                    {global.accountStatus == "1" || accountStatus == "1" ?
                        <>
                            <TouchableOpacity onPress={() => props.navigation.navigate('MarketRate')} style={styles.tags}>
                                <Image source={icons.rupee} style={styles.icon} />
                                <Text style={[StyleConstants.textDrawer, { marginLeft: 15 }]}>
                                    Market Rate
                                </Text>
                            </TouchableOpacity>
                        </>
                        :
                        <></>
                    }
                    <TouchableOpacity onPress={() => logoutHandler()} style={styles.tags}>
                        <Image source={icons.logout1} style={styles.icon} />
                        <Text style={[StyleConstants.textDrawer, { marginLeft: 10 }]}>Log out</Text>
                    </TouchableOpacity>



                </View>


                <View style={{ flex: 1 }}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image source={icons.facebook} style={styles.socialIcon} />
                    <Image source={icons.twitter} style={styles.socialIcon} />
                    <Image source={icons.linkedIn} style={styles.socialIcon} />
                </View> */}
                    {/* <View style={{ marginLeft: 20, marginTop: 10 }}>
                    <Text style={StyleConstants.textSize20}>
                        Version 1.1
                    </Text>
                </View> */}
                </View>
            </View>
        </ScrollView>
    )
}
// const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({

// })
export default DrawerScreen

const styles = StyleSheet.create({
    blueHead: {
        backgroundColor: currentTheme().themeColor,
        // height: screenWidth / 2.8,
        justifyContent: 'center',
        padding: 20
        // alignItems: 'center'
    },
    ImgBorder: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: currentTheme().White,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lngLine: {
        alignSelf: 'center',
        // position: 'absolute',
        borderBottomColor: currentTheme().themeColor,
        borderBottomWidth: 0.5,
        width: screenWidth * (290 / 375),
        top: 15,
        // borderRadius: 10
    },
    tags: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8 },
    tags2: { flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 20 },
    socialIcon: {
        width: 25,
        height: 25,
        marginLeft: 20
    },
    icon: {
        width: 20, height: 20, tintColor: currentTheme().themeColor
    },
    headerimg: {
        height: 58,
        width: 58,
        borderRadius: 29,
        alignSelf: 'center',

    },
    heading: {
        color: currentTheme().themeColor, fontSize: 16, fontWeight: '900'

    }
})