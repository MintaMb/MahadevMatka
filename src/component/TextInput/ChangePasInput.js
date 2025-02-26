import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image,StyleSheet } from 'react-native';
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import IMAGE from "../../constants/image";
import { screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";


function ChangePasInput(props) {
    const { placeholder, onChangeText, value, keyboardType, returnKeyType,
        onSubmitEditing, onBlur, onPressIn, showError = true, error } = props
    const [toggle, setToggle] = useState(false)
    const [secure, setSecure] = useState(true)
    const onclick = () => {
        setSecure(!secure)
        setToggle(!toggle)
    }
    return (
        <>
            <View style={[StyleConstants.Textinput,StyleConstants.RowView,{borderColor:ColorsConstant.orangedark,width:screenWidth-32}]}>
                <TextInput style={{ flex: 1 }}
                    placeholder={placeholder}
                    color={ColorsConstant.Black}
                    keyboardType={keyboardType}
                    placeholderTextColor={ColorsConstant.textphlder}
                    onChangeText={(e) => onChangeText(e)}
                    onSubmitEditing={() => onSubmitEditing}
                    returnKeyType={returnKeyType}
                    secureTextEntry={secure}
                    value={value}
                    maxLength={10}
                    onBlur={onBlur}
                    onPressIn={onPressIn}
                />
                <TouchableOpacity onPress={() => onclick()}>
                    <Image source={toggle ? IMAGE.eyeon : IMAGE.eyeoff} resizeMode='contain' style={{ height: 20, width: 20,tintColor:ColorsConstant.themeColor }} />
                </TouchableOpacity>
            </View>
            {
                error != "" && 
                <Text style={styles.errText}>{error}</Text>
            }
        </>
    );
}
const styles=StyleSheet.create({
    errText: {
        color: ColorsConstant.Error,
        fontSize: 12,
        fontFamily: fontFamily.Regular,
        marginTop:-4,
        marginLeft:10,
        width:screenWidth-32
    },
})
export default ChangePasInput;