import { ImageBackground, StyleSheet, Text, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { StyleConstants } from '../../constants/Style.constant'
import { currentTheme } from '../../constants/ThemeProvider'
import Header from '../../Widget/Header'
import LargeTextInput from '../../component/TextInput/LargeTextInput'
import { screenWidth } from '../../constants/Sizes.constant'
import LargefillBtn from '../../component/Button/LargefillBtn'
import SmallFillBtn from '../../component/Button/SmallFillBtn'
import { get_profile } from '../../services/User'
import Loading from '../../component/loading'
import { base } from '../../constants/Data.constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postDataContent } from '../../services/Ops'
import Toast from 'react-native-toast-message';

export default function BankDetails(props) {

  const { type } = props.route.params;
  const [paytmUpi, setPaytmUpi] = useState("")
  const [phoneUpi, setPhoneUpi] = useState("")
  const [googleUpi, setGoogleUpi] = useState("")
  const [loading, setLoading] = useState("")

  const [wallet, setWallet] = useState("")
  useEffect(() => {
    const get_data = async () => {
      setLoading(true)
      let userData = await get_profile();
      setWallet(userData.wallet)
      setGoogleUpi(userData.googlepay)
      setPaytmUpi(userData.paytm)
      setPhoneUpi(userData.phonepay)
      setLoading(false)
    }
    get_data()
  }, [props])


  const update_upi = async () => {
    // 
    try {
      let phone_number = await AsyncStorage.getItem("phone")

      setLoading(true);

      var body = new FormData();
      body.append("phone_number", phone_number);
      body.append("phonpe", phoneUpi);
      body.append("gpay", googleUpi);
      body.append("paytm", paytmUpi);

      console.log(body)
      let result = await postDataContent(base.bankUpdate, body);

      if (result.success == "1") {
        Toast.show({ type: 'success', text1: "Password Changed !", text2: result.msg });
        setLoading(false);

      } else {
        // Vibration.vibrate(300);
        Toast.show({ type: 'error', text1: result.msg });
        setLoading(false);
      }

    } catch (error) {
      console.log(error);
      setLoading(false);
      // Vibration.vibrate(300);

    } finally {
      setLoading(false);
    }
  };


  const _goBack = () => {
    props.navigation.goBack()
  }
  return (
    <View style={{ flex: 1,backgroundColor:currentTheme().themeColor }}>
      <Header
        leftButtonType="back"
        title={type}
        leftButtonAction={_goBack}
        rightButttonType="refresh"
      />
      <ImageBackground>
        {loading && <Loading />}
        {type == "paytm" &&
          <View style={[StyleConstants.cardView, { padding: 20, marginTop: 20, alignItems: 'center', backgroundColor: currentTheme().bgColor,borderWidth:0 }]}>
            <Text style={{ fontSize: 30, color: currentTheme().themeColor, fontWeight: 'bold' }}>Paytm UPI</Text>
            <LargeTextInput
              label={""}
              validationType="text"
              placeholder={'Enter Paytm Upi ID'}
              value={paytmUpi}
              // keyboardType="number-pad"
              onChangeText={e => {
                setPaytmUpi(e);
              }}
              returnKeyType="next"
              style={[styles.txtInput, { borderColor: currentTheme().textColor, alignSelf: 'center', backgroundColor: currentTheme().bgColor,borderWidth:0 }]}
              // width={screenWidth - 40}
            />
            <SmallFillBtn

              label={'Update'}
              onPress={() => {
                update_upi();
              }}
              width='94%'
              backgroundColor={currentTheme().themeColor}
            />

          </View>
        }
        {type == "phonepe" &&

          <View style={[StyleConstants.cardView, { padding: 20, marginTop: 20, alignItems: 'center', backgroundColor:currentTheme().bgColor,borderWidth:0  }]}>
            <Text style={{ fontSize: 30, color: currentTheme().themeColor, fontWeight: 'bold' }}>Phonepe UPI</Text>
            <LargeTextInput
              label={""}
              validationType="text"
              placeholder={'Enter Phonepe Upi ID'}
              value={phoneUpi}
              // keyboardType="number-pad"
              onChangeText={e => {
                setPhoneUpi(e);
              }}
              returnKeyType="next"
              style={[styles.txtInput, {   alignSelf: 'center'  }]}
              width={screenWidth - 40}
            />
            <SmallFillBtn
              label={'Update'}
              onPress={() => {
                update_upi();
              }}
              width='94%'
              backgroundColor={currentTheme().themeColor}
            />

          </View>
        }
        {type == "gpay" &&

          <View style={[StyleConstants.cardView, { padding: 20, marginTop: 20, alignItems: 'center', backgroundColor: currentTheme().bgColor}]}>
            <Text style={{ fontSize: 30, color: currentTheme().themeColor, fontWeight: 'bold' }}>GPay UPI</Text>
            <LargeTextInput
              label={""}
              validationType="text"
              placeholder={'Enter GPay Upi ID'}
              value={googleUpi}
              // keyboardType="number-pad"
              onChangeText={e => {
                setGoogleUpi(e);
              }}
              returnKeyType="next"
              style={[styles.txtInput, { borderColor: currentTheme().textColor, alignSelf: 'center' }]}
              width={screenWidth - 40}
            />
            <SmallFillBtn

              label={'Update'}
              onPress={() => {
                update_upi();
              }}
              width='94%'
              backgroundColor={currentTheme().themeColor}
            />

          </View>
        }
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: currentTheme().bgColor,
  },
  txtName: {
    color: currentTheme().textColor,
    marginBottom: 5,
    // marginHorizontal: 10,
    // fontFamily: fontFamily.Regular,
    fontWeight: '600',
  },
  txtInput: {
    paddingHorizontal: 10,
    width: screenWidth - 20,
    alignSelf: 'center',
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
    color: '#000'

  }
})