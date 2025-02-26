import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import images, { icons } from "../../assets/images";
import icon from "../../constants/image";
import IMAGE from '../../constants/image';
import { screenWidth } from "../../constants/Sizes.constant";
import { currentTheme } from "../../constants/ThemeProvider";

function OuterLabelPasswordField(props) {

    const {
        placeholder,
        onChangeText,
        maxLength,
        value,
        keyboardType,
        returnKeyType,
        onSubmitEditing,
        ref,
        setRef,
        showError = true,
        error,
        type,
        editable,
        icon,
        label,
        width
    } = props;
    const [toggle, setToggle] = useState(false);
    const [secure, setSecure] = useState(true);
    const onclick = () => {
        setSecure(!secure);
        setToggle(!toggle);
    };
    return (
        <>
            <View style={{ backgroundColor: currentTheme().bgColor1, borderRadius: 20, paddingHorizontal: 10, position: 'absolute', zIndex: 9999, top: -5, left: width?50: 20 }}>
                <Text style={[StyleConstants.text14,{ fontSize: 14, color: currentTheme().themeColor }]}>{label}</Text>
            </View>
            <View style={[{
                height: 50, width: width? width: screenWidth - 100, borderWidth: 1, borderRadius: 8, marginTop: 5, justifyContent: 'center',
                borderColor: currentTheme().cardColor2,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: currentTheme().backgroundbg, alignSelf: width? "center": 'flex-start'
            }]}>



                <TextInput
                    style={{ flex: 1, marginLeft: 20 }}
                    placeholder={placeholder}
                    color={currentTheme().textColor}
                    keyboardType={keyboardType}
                    placeholderTextColor={currentTheme().textColor}
                    secureTextEntry={secure}
                    onChangeText={onChangeText}
                    returnKeyType={returnKeyType}
                    defaultValue={value}
                    autoCapitalize="none"
                    maxLength={maxLength}
                    editable={editable}
                />


                <TouchableOpacity onPress={() => onclick()} style={{ paddingRight: 10 }}>
                    <Image
                        source={toggle ? IMAGE.eyeon : IMAGE.eyeoff}
                        resizeMode="contain"
                        style={{
                            height: 22,
                            width: 22,
                            tintColor: currentTheme().themeColor,
                        }}
                    />
                </TouchableOpacity>


            </View>
            {/* {showError == true ? (
                <Text style={StyleConstants.errText}>{error}</Text>
            ) : <></>} */}
            {error != "" && <Text style={StyleConstants.errText}>{error}</Text>}
        </>
    );
}
const styles = StyleSheet.create({});
export default OuterLabelPasswordField;