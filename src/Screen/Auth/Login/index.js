import React, { useEffect, useRef, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  BackHandler,
  Alert,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screenHeight, screenWidth } from "../../../constants/Sizes.constant";
import LargefillBtn from "../../../component/Button/LargefillBtn";
import { icons, images } from "../../../assets/images";
import { currentTheme, useTheme } from "../../../constants/ThemeProvider";
import { base } from "../../../constants/Data.constant";
import Toast from "react-native-toast-message";
import LargeTextInput from "../../../component/TextInput/LargeTextInput";
import PasswordTextInput from "../../../component/TextInput/PasswordTextInput";
import CheckBox from "@react-native-community/checkbox";
import { postDataContent } from "../../../services/Ops";
import { app_setting, admin_setting } from "../../../services/User";


const CELL_COUNT = 6;
function Login(props) {
  // console.log(currentTheme().themeMode)
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState('91');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [appSetting, setAppSetting] = useState({})

  useEffect(() => {
    const get_data = async () => {
      console.log("-------", await admin_setting())
      setAppSetting(await admin_setting())
    }
    get_data()
  }, [props])



  // const {theme, updateTheme} = useTheme();
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
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
  }, [props]);

  useEffect(() => {
    const get_remember_me = async () => {
      let remember_me = await AsyncStorage.getItem("rememberme")
      if (remember_me === "true") {
        let country = await AsyncStorage.getItem("country")
        let mobile = await AsyncStorage.getItem("mobile")
        let password = await AsyncStorage.getItem("password")
        setCountry(country)
        setMobileNumber(mobile)
        setPassword(password)
      } else {
      }
    }
    get_remember_me();
  }, [props]);


  const remember_me_handler = async () => {
    setToggleCheckBox(!toggleCheckBox);
    if (toggleCheckBox) {
      AsyncStorage.setItem("mobile", mobileNumber)
      AsyncStorage.setItem("password", password)
      AsyncStorage.setItem("rememberme", "true")
    } else {

      AsyncStorage.removeItem("mobile")
      AsyncStorage.removeItem("password")
      AsyncStorage.removeItem("rememberme")
    }
  }

  const login_handler = async () => {
    if (mobileNumber === '' || password === '') {
      Toast.show({ type: 'error', text1: 'Login Error !', text2: 'Please fill Login details' });
      // Vibration.vibrate(300);
    }
    else if (mobileNumber.length != 10) {
      // setPasswordErr('not match');
      Toast.show({ type: 'error', text1: 'Mobile Number Error !', text2: 'Please Enter  Mobile Minimum Length 10  ' });
      // Vibration.vibrate(300);
    }
    else if (password.length < 6) {
      // setPasswordErr('not match');
      Toast.show({ type: 'error', text1: 'Password Error !', text2: 'Please Enter  Password Minimum Length 6  ' });
      // Vibration.vibrate(300);
    }
    else {
      try {
        remember_me_handler()
        setLoading(true);
        var formdata = new FormData();
        formdata.append("phone_number", mobileNumber);
        formdata.append("password", password);
        formdata.append("token_id", "");


        console.log(formdata)

        let result = await postDataContent(base.login, formdata);
        console.log('-=-==--=result', result.data.status);
        if (result.success == "1") {
          AsyncStorage.setItem('phone', mobileNumber);
          // AsyncStorage.setItem('email', email);
          global.accountStatus = result.data.status
          props.navigation.navigate('Drawers', { screen: 'home' })
          setLoading(false);

          AsyncStorage.setItem('userData', JSON.stringify(result.data));
          Toast.show({ type: 'success', text1: 'Congratulations Login Successful !', text2: "Login Successful" });

        } else {
          setLoading(false);
          Toast.show({ type: 'error', text1: 'Login Error !', text2: "Login Failed" });
          // Vibration.vibrate(300);
        }
      } catch (e) {
        Toast.show({ type: 'error', text1: 'Network Issue !', text2: 'Please check your internet connection' });
        setLoading(false);
        // Vibration.vibrate(300);

      }
    }
  };


  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: currentTheme().themeColor }}>
        <View showsVerticalScrollIndicator={false} style={{ marginBottom: 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 150 }}>
            <Image source={images.logo} style={{ height: 100, width: 100, borderRadius: 100, margin: 10 }} />
            <Image source={require('./../../../assets/image/authtopbg.png')} style={{ height: 200, width: 200 }} />
          </View>

          <View style={{ backgroundColor: currentTheme().White, height: screenHeight, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 10 }}>
            <Text style={{ color: currentTheme().textColor, marginTop: 40, fontSize: 30, fontWeight: "600" }}>Welcome!</Text>
            <Text style={{ fontSize: 16 }}>Sign in to Continue</Text>


            <LargeTextInput
              label={'Mobile No'}
              placeholder={'Enter Phone Number'}
              value={mobileNumber || ''}
              maxLength={10}
              keyboardType="numeric"
              onChangeText={(e) => {
                setMobileNumber(e);
              }}
              style={{ marginTop: 20 }}
            />

            <PasswordTextInput
              label={"Password"}
              placeholder={"Enter Password here"}
              maxLength={10}
              value={password || ''}
              keyboardType="default"
              onChangeText={(e) => {
                setPassword(e);
              }}

            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  value={toggleCheckBox}
                  boxType="square"
                  style={{ height: 21, width: 21 }}
                  tintColors={{
                    true: currentTheme().themeColor,
                    false: currentTheme().gary,
                  }}
                  onPress={() => { remember_me_handler() }}
                />
                <Text style={{ color: "#9EA4AE", fontSize: 18, marginLeft: 10, }}>Remember me</Text>
              </View>
              <Text
                onPress={() => { Linking.openURL('whatsapp://send?text=hello sir , My password is lost &phone=+91' + appSetting.admin_mobile) }
                }
                style={{ color: '#1D1D1D' }}>Forgot Password ?</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <LargefillBtn
                label={"Sign in"}
                onPress={() => {
                  login_handler()
                }}
                backgroundColor={"#FF493E"}
                animating={loading}

              />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 15 }}>Don't Have An Account?</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
                <Text style={{ fontSize: 16, color: '#FF493E' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  activityIndicator: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: "center",
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default Login;


