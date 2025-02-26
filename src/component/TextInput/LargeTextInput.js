import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { screenWidth } from '../../constants/Sizes.constant';
import { currentTheme, useTheme } from '../../constants/ThemeProvider';
import { isValidEmail, isValidMobile } from '../../services/Validation';
import { fontFamily } from '../../constants/font';
import { lang } from '../../Language/languge';

function LargeTextInput(props) {
  // const inputE2 = useRef(null);
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');
  // console.log(currentTheme().themeBorder)
  const theme = useTheme();
  const {
    label,
    validationType,
    placeholder,
    onChangeText,
    maxLength,
    value,
    keyboardType,
    width,
    returnKeyType,
    onSubmitEditing,
    ref,
    setRef,
    showError = true,
    error,
    onBlur,
    style,
    elevation,
    mandatry,
    editable
    // setCheckErr,
  } = props;
  return (
    <View style={[{width: width ? width : '100%',marginTop:0 },style]}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.txtName, {
          color: currentTheme().textColor, 
          // marginLeft: 10
        }]}>{label}</Text>
        {
          mandatry && <Text style={{ color: "red" }}>*</Text>
        }
      </View>
      <View style={[StyleConstants.Textinput, {  elevation: elevation ? 2 : 0 }]}>
        <TextInput
          placeholder={placeholder}
          color={currentTheme().textColor}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor={currentTheme().placeholderColor}
          editable={editable}
          onChangeText={e => {
            setNameErr('');
            onChangeText(e);
            setName(e);
          }}
          onBlur={e => {
            const re = /^[a-zA-Z\s]*$/;
            if (validationType == 'text') {
              if (name.length == '') {
                setNameErr('Please fill input');
              } else if (re.test(name) == false) {
                setNameErr('Please Enter Valid Name');
              }
            } else if (validationType == 'email') {
              if (name.length == '') {
                setNameErr('Please Enter ' + placeholder);
              } else if (!isValidEmail(name)) {
                setNameErr('Please Enter Valid ' + placeholder);
              }
            } else if (validationType == 'mobile') {
              if (name.length == '') {
                setNameErr('Please Enter ' + placeholder);
              } else if (!isValidMobile(name)) {
                setNameErr('Please Enter Valid ' + placeholder);
              }
            } else {
              setNameErr('');
            }
            // setCheckErr(nameErr)
          }}
          returnKeyType={'next'}
          defaultValue={value}
          autoCapitalize="none"
          maxLength={maxLength}
          style={{
            height: 50,
            width: '100%', 
            color: currentTheme().textColor,
            // borderColor: currentTheme().inputBorderColor,
            textAlign: lang('lang') === 'ar' ? 'right' : 'left',
            // paddingStart:20
            // marginRight:200
            marginLeft: lang('lang') == 'ar' ? 0 : 0
            // marginLeft:lang('lang') == 'ar' ? -120 : 0
          }}
        />
      </View>

      <Text style={[StyleConstants.errText, { marginTop: 0, marginLeft: 10 }]}>
        {nameErr}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  Textinputs: {
    paddingStart: 10,
    width: screenWidth * (335 / 375),
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    borderWidth: 5,
  },
  txtName: {
    // marginBottom: 5,
    // marginHorizontal: 10,
    // fontFamily: fontFamily.Regular,
    fontWeight: '400',
    // marginLeft: 20,
    fontSize:15
  },
});
export default LargeTextInput;
