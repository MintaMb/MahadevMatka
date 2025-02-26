
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
  Vibration,
  ImageBackground,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import uuid from "react-native-uuid";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { base, mainUrl } from '../../../constants/Data.constant';
 
import { screenHeight, screenWidth } from '../../../constants/Sizes.constant';  
//::::::::::::::::::::::::::::::::::::::: import component  
import LargeTextInput from '../../../component/TextInput/LargeTextInput';
import PasswordTextInput from '../../../component/TextInput/PasswordTextInput';  
import { postDataContent } from '../../../services/Ops'; 
import { currentTheme } from '../../../constants/ThemeProvider'; 
 
import LargefillBtn from '../../../component/Button/LargefillBtn';
import { images } from '../../../assets/images';
// import messaging from '@react-native-firebase/messaging';

function SignUp(props) {
  const [email, setEmail] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [loading, setLoading] = useState(false);   
  const getFcmToken = async () => {
    return ""//await messaging().getToken();
  };

  const signup_method = async () => {
    if (mobileNumber === '' || password === '' || firstName == '') {
      Toast.show({ type: 'error', text1: 'Singup Error !', text2: 'Please fill Singup details' });
      // Vibration.vibrate(300);
    }
    else  if (mobileNumber.length != 10) {
      // setPasswordErr('not match');
       Toast.show({ type: 'error', text1: 'Mobile Number Error !', text2: 'Please Enter  Mobile Minimum Length 10  ' });
       // Vibration.vibrate(300);
     } 
    else  if (password.length < 6) {
      // setPasswordErr('not match');
       Toast.show({ type: 'error', text1: 'Password Error !', text2: 'Please Enter  Password Minimum Length 6  ' });
       // Vibration.vibrate(300);
     } 
    else {
      console.log('errr else');
      setLoading(true)
      var formdata = new FormData();
      formdata.append("user_name", firstName);
      formdata.append("user_phone", mobileNumber);
      formdata.append("user_password", password);
      formdata.append("user_mpin", "123456");
      formdata.append("user_email", "");
      formdata.append("token_id", await getFcmToken());


      // console.log(body, '-body');

      let result = await postDataContent(base.signUp, formdata);
      console.log(result, '---------signup-------');
      if (result.success == "1") {
        setLoading(false) 
        AsyncStorage.setItem('phone', mobileNumber);
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('phone', mobileNumber); 
        global.accountStatus = "1";//result.data.status
        props.navigation.navigate('Drawers', { screen: 'home' })
        Toast.show({ type: 'success', text1: 'Congratulations Singup Successful !', text2: result.msg });

        // props.navigation.navigate('Drawers', { screen: 'Home' });
      } else {
        setLoading(false)

        Toast.show({ type: 'error', text1: result.msg });
      }

    }
  }; 
  return (
    <ScrollView>
    <View style={{ flex: 1, backgroundColor: currentTheme().themeColor }}> 
      <View showsVerticalScrollIndicator={false} style={{ marginBottom: 0 }}>
          <View style={{  flexDirection:'row',justifyContent:'space-between',height:150}}>
            <Image source={images.logo} style={{ height: 100, width: 100 ,borderRadius:100,margin:10}} />
            <Image source={require('./../../../assets/image/authtopbg.png')} style={{ height: 200, width: 200  }} />
          </View>
         
        <View style={{ backgroundColor: currentTheme().White, height: screenHeight, borderTopLeftRadius: 30, borderTopRightRadius: 30,padding:10 }}>
          <Text style={{ color: currentTheme().textColor,  marginTop: 40, fontSize: 30, fontWeight: "600" }}>Welcome!</Text>
          <Text style={{   fontSize: 16 }}>Create a New Account</Text>
 
           
            <LargeTextInput 
              label={'Full Name'}
              placeholder={'Enter Name'}
              value={firstName} 
              onChangeText={e => {
                setFirstName(e);
              }}
              style={{marginTop:20}}
            />  
            <LargeTextInput 
              label={'Mobile No'}
              placeholder={'Enter Mobile No'}
              value={mobileNumber}
              keyboardType='number-pad'
              onChangeText={e => {
                setMobileNumber(e);
              }}
            />
            
            <PasswordTextInput
              label={"Password"}
              placeholder={"Enter Password here"}
              maxLength={10}
              value={password}
             
              onChangeText={e => {
                setPassword(e);
              }}
              error=""

            />
             
            <LargefillBtn
              animating={loading}
              label={"Sign Up"}
              onPress={() => { 
                signup_method()
              }}
              backgroundColor={"#FF493E"}
            />
           
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}>
            <Text style={{ fontSize: 15 }}>Have An Account?</Text>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
              <Text style={{ fontSize: 16, color: '#FF493E' }}>Sign In</Text>
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
});
export default SignUp;


