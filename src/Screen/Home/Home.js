/* eslint-disable curly */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line prettier/prettier
import { StyleSheet, Text, TouchableOpacity, View, RefreshControl, Image, TextInput, ImageBackground, FlatList, SafeAreaView, BackHandler, Alert, Linking, ScrollView } from 'react-native'
import { icons, images } from '../../assets/images';
import { currentTheme } from '../../constants/ThemeProvider';
import { StyleConstants } from '../../constants/Style.constant';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { get_banner, get_home_data, get_slider } from '../../services/Dashboard';
import { base } from '../../constants/Data.constant';
import { app_setting, get_profile } from '../../services/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmailFillBtn from '../../component/Button/SmallFillBtn';
import { list } from '../../enums/List';
import SmallSlider from '../../component/Slider/SmallSlider';
import icon from '../../constants/image';
import Loading from '../../component/loading';
const Home = props => {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState([])
  const [bannerData, setBannerData] = useState([])
  const [search, setSearch] = useState("")
  const [userData, setUserData] = useState("")
  const [refreshing, setRefreshing] = React.useState(false);
  const [accountStatus, setAccountStatus] = useState("0")
  const [appSetting, setAppSetting] = useState({})

  useEffect(() => {
    get_data()
  }, [props])
  const get_data = async () => {
    get_profile_data()
    setAppSetting(await app_setting())
    let result = await get_home_data()
    setHomeData(result.result)
    setUserData(await get_profile())
    let sliderResult = await get_slider(base.slider)
    console.log(sliderResult)
    setBannerData(sliderResult)
    ///onRefresh()

    if (result.result.length > 0) {
      setLoading(false)
    }

  }
  const get_profile_data = async () => {
    let userData = await get_profile();
    console.log(userData)
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

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  function timeConvert(timeStr) {
    const [hoursStr, minutesStr] = timeStr.split(":");
    let [hours, minutes] = [parseInt(hoursStr), parseInt(minutesStr)];

    // Adjust hours for PM
    if (timeStr.includes("pm") && hours !== 12) {
      hours += 12;
    }
    // Adjust hours for AM
    if (timeStr.includes("am") && hours === 12) {
      hours = 0;
    }

    // Create a new Date object and set the hours and minutes
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);

    // Convert time to seconds and return
    return Math.floor(time.getTime() / 1000);
  }

  const renderItem = ({ item, index }) => {
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    const closeTimeInSeconds = timeConvert(item.close_time);

    // Determine market status
    const marketStatus = timeConvert(item.open_time) > timeConvert("07:00 am") && currentTimeInSeconds <= closeTimeInSeconds;

    //console.log(  timeConvert(item.close_time) , new Date().getTime()/1000)
    return <TouchableOpacity
      disabled={(global.accountStatus == "0" || accountStatus == "0") || !marketStatus || item.game_status == "0"}
      onPress={() => { props.navigation.navigate("GameScreen", { selectItem: item }) }}
      style={[styles.header, { backgroundColor: (global.accountStatus == "0" || accountStatus == "0") || !marketStatus || item.game_status == "0" ? '#FFEBEA' : '#EEFFE5' }]}>
      <TouchableOpacity
        onPress={() => { props.navigation.navigate("ChartScreen", { games_name: item.games_name }) }}
        style={{ flex: 1, height: 50, width: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Image source={images.document} style={[{ height: 30, width: 30,tintColor:currentTheme().themeColor }]} />
      </TouchableOpacity>

      <View style={{ flex: 3, justifyContent: 'space-between', }}>
        <Text style={{ color: currentTheme().themeColor, fontSize: 14, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>{item.games_name}</Text>
        <Text style={{ color: currentTheme().blue, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{item.open_pana}_{item.open_digit}{item.close_digit}_{item.close_pana}</Text>
      </View>


      <View style={{ flex: 2, justifyContent: 'space-between', }}>
        <Text style={{ color: currentTheme().textColor, fontSize: 10, marginLeft: 5 }}>OPEN:- {item.open_time}</Text>
        <Text style={{ color: currentTheme().textColor, fontSize: 10, alignContent: 'center', marginLeft: 5 }}>CLOSE:- {item.close_time}</Text>
      </View>
      {global.accountStatus == "1" || accountStatus == "1" ?
        <TouchableOpacity
          disabled={(global.accountStatus == "0" || accountStatus == "0") || !marketStatus || item.game_status == "0"}

          onPress={() => { props.navigation.navigate("GameScreen", { selectItem: item }) }}
          style={{ flex: 1, height: 50, width: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image source={(global.accountStatus == "0" || accountStatus == "0") || !marketStatus || item.game_status == "0" ? images.close : images.open} style={[{ height: 40, width: 40, borderRadius: 10, resizeMode: 'stretch' }]} />
        </TouchableOpacity>
        :
        <></>
      }
    </TouchableOpacity>
  };


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      get_data()
      // get_profile_data()
    }, 2000);
  }, []);


  return (

    <View style={{ flex: 1, backgroundColor: currentTheme().themeColor }}>

      <ImageBackground style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '70%' }}></View>
        <ImageBackground source={require('./../../assets/image/authtopbg.png')} style={{ height: 80, width: '70%' }}></ImageBackground>
        <View style={{ width: screenWidth, height: 200, position: 'absolute', }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 30 }}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}
              style={{ borderWidth: 1, height: 40, width: 40, borderColor: currentTheme().antiTextColor, justifyContent: 'center', borderRadius: 5 }} >
              <Image source={icons.drawerIcon} style={{ height: 30, width: 30, alignSelf: 'center', tintColor: currentTheme().antiTextColor }} resizeMode='contain' />
            </TouchableOpacity>
            {/* <Image source={images.logo} style={{height:40,width:40,alignSelf: 'center',tintColor:currentTheme().antiTextColor}} /> */}
            <Text style={{ fontSize: 20, color: currentTheme().White, alignSelf: 'center', fontWeight: '600' }}>Sara-786</Text>

            {global.accountStatus == "1" || accountStatus == "1" ?
              <TouchableOpacity onPress={() => { props.navigation.navigate("Wallet") }} style={{ backgroundColor: '#FFCA0D', flexDirection: 'row', height: 25, paddingHorizontal: 5, borderRadius: 3, justifyContent: 'center', alignSelf: 'center', }}>
                <Image source={icons.wallet} style={{ height: 20, width: 20, alignSelf: 'center', tintColor: currentTheme().textColor }} resizeMode='contain' />
                <Text style={[styles.text, { fontSize: 15, fontWeight: '600', alignSelf: 'center', }]}> ₹ {userData.wallet}</Text>
              </TouchableOpacity>
              :
              <></>

            }
          </View>
        </View>


      </ImageBackground>
      {loading ? <Loading /> : <></>}
      <View style={{ borderRadius: 20 }}>
        <SmallSlider list={bannerData} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ margin: 10, padding: 10, borderRadius: 20, backgroundColor: '#a63e57', width: screenWidth - 20 }}>
          {global.accountStatus == "1" || accountStatus == "1" ?
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <TouchableOpacity
                style={{ alignSelf: 'flex-start', backgroundColor: '#fff', flexDirection: 'row', borderRadius: 10, padding: 10, width: 160, }}
                onPress={() => props.navigation.navigate('AddFund')}>
                <Image style={{ height: 30, width: 30, tintColor: currentTheme().errors }} resizeMode='stretch' source={icons.wallet}
                ></Image>
                <Text style={[StyleConstants.textBold14, { alignSelf: 'center', marginLeft: 10 }]}>Add Point</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: 'flex-start', backgroundColor: '#fff', flexDirection: 'row', borderRadius: 10, padding: 10, width: 160, }}
                onPress={() => props.navigation.navigate('Withdraw')}>
                <Image style={{ height: 30, width: 30, tintColor: currentTheme().success }} resizeMode='stretch' source={icons.wallet}
                ></Image>
                <Text style={[StyleConstants.textBold14, { alignSelf: 'center', marginLeft: 10 }]}>Withdraw</Text>
              </TouchableOpacity>


            </View>
            :
            <></>
          }

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity style={{ alignSelf: 'flex-start', backgroundColor: '#FFDA9D', flexDirection: 'row', borderRadius: 10, padding: 10, width: 160, }} onPress={() => Linking.openURL('tel://' + appSetting.admin_wp)}>
              <Image style={{ height: 20, width: 20, }} resizeMode='stretch' source={icon.call}
              ></Image>
              <Text style={[StyleConstants.textBold14, { marginLeft: 10 }]}>{appSetting.admin_wp}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: 'flex-end', backgroundColor: '#FFDA9D', flexDirection: 'row', borderRadius: 10, padding: 10, width: 160, }} onPress={() => Linking.openURL('whatsapp://send?text=hello&phone=' + appSetting.admin_wp)}>
              <Image style={{ height: 20, width: 20, }} resizeMode='stretch' source={icons.whatapp}
              ></Image>
              <Text style={[StyleConstants.textBold14, { marginLeft: 10 }]}>{appSetting.admin_wp}</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* <View style={[{ marginTop: 10, height: screenHeight / 2 }]}> */}
        <FlatList
          data={homeData}
          renderItem={renderItem}
          numColumns={1}
          style={{
          }}
          showsVerticalScrollIndicator={false}
        // ListFooterComponent={(
        //   <View style={{ height: 100 }}></View>
        // )}

        />

        {/* </View> */}
      </ScrollView>
    </View>




  );
}


export default Home;


const styles = StyleSheet.create({

  tgl: {
    backgroundColor: currentTheme().White,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  search: {
    width: '85%',
    marginLeft: 10,
    borderRadius: 5,
    height: 45,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10
  },
  slider: {
    // height: screenWidth / 1.7,
    marginTop: 10,
    // marginLeft:8
  },
  image: {
    height: 110,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
    // flex:1
  },
  title: {
    color: currentTheme().textColor,
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  header: {
    marginTop: 10,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth - 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: currentTheme().lightGray,
    flexDirection: 'row'
  },
  text: {
    fontSize: 16,
    color: '#000'
  },
  btn: {
    borderRadius: 10,
    backgroundColor: currentTheme().themeColor,
    padding: 10,
    // marginHorizontal: 5,
    // flex: 1,
    // width:screenWidth/3.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 40, width: 40,
    alignSelf: 'center',
    marginLeft: 5
  },
  btnText: {
    color: currentTheme().antiTextColor,
    marginHorizontal: 10
    // marginLeft: 5
  }
});