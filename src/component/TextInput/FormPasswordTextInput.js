import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, I18nManager } from 'react-native';
import { ColorsConstant, lightTheme } from '../../constants/Colors.constant';
import IMAGE from '../../constants/image';
import { StyleConstants } from '../../constants/Style.constant';
import { currentTheme } from '../../constants/ThemeProvider';
import { isValidPassword } from '../../services/Validation';
import { fontFamily } from '../../constants/font';
import { screenWidth } from '../../constants/Sizes.constant';
import { lang } from '../../Language/languge';

function FormPasswordTextInput(props) {
  const {
    label,
    validationType,
    placeholder,
    onChangeText,
    value,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    onBlur,
    onPressIn,
    showError = true,
    error,
    confirmValue,
    icon
  } = props;
  const [toggle, setToggle] = useState(false);
  const [secure, setSecure] = useState(true);
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');
  const onclick = () => {
    setSecure(!secure);
    setToggle(!toggle);
  };
  return (
    <View >

      {/* <Text style={[styles.txtName,{marginRight: lang('lang') == 'ar' ? 20 : 0,marginLeft:0, color: currentTheme().textColor,fontWeight: "bold",}]}>{label}</Text> */}
      <View
        style={[
          styles.Textinputs,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // transform:[{scaleX:I18nManager.isRTL ? -1 : 1}]
            backgroundColor: currentTheme().antiTextColor,
            borderColor: currentTheme().cardColor2,
            height: 50, width: screenWidth - 40,
            borderRadius:8


            // marginVertical: 10,
          },
        ]}>
        <Image style={{ height: 22, width: 22, tintColor: currentTheme().primaryColor }} resizeMode="contain" source={icon} />

        <TextInput
          style={{ flex: 1, writingDirection: 'auto', textAlign: lang('lang') == 'ar' ? 'right' : 'left',marginLeft:20  }}
          placeholder={placeholder}
          color={currentTheme().textColor}
          keyboardType={keyboardType}
          placeholderTextColor={currentTheme().textColor}
          onChangeText={e => {
            onChangeText(e), setName(e);
          }}
          onSubmitEditing={() => onSubmitEditing}
          returnKeyType={returnKeyType}
          secureTextEntry={secure}

          value={value}
          maxLength={25}
          onBlur={() => {
            if (name.length == '') {
              setNameErr('Please Enter ' + placeholder);
            }
            // else if (!isValidPassword(name)) {
            //   setNameErr('Please Enter Valid ' + placeholder);
            // } 
            else {
              setNameErr('');
            }
          }}
          onPressIn={onPressIn}
        />
        <TouchableOpacity onPress={() => onclick()} style={{ paddingRight: 20 }}>
          <Image
            source={toggle ? IMAGE.eyeon : IMAGE.eyeoff}
            resizeMode="contain"
            style={{
              height: 22,
              width: 22,
              tintColor: currentTheme().primaryColor,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        {/* {nameErr && ( */}
        <Text style={[StyleConstants.errText, { marginLeft: 10, marginTop: 0 }]}>
          {nameErr}
        </Text>
        {/* )} */}
        {/* {error && (
          <Text style={[StyleConstants.errText, {marginLeft: 8, marginTop: 5}]}>
            {error}
          </Text>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Textinputs: {
    paddingStart: 10,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    borderWidth: 1,
    height: 45
    // textAlign:'right',
    // textTransform:'uppercase'

  },
  txtName: {

    marginBottom: 5,
    // fontFamily: fontFamily.Regular,
    fontWeight: '600',
    marginLeft: 10,


  },
});
export default FormPasswordTextInput;
