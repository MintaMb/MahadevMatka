import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import images, { icons } from "../../assets/images";
import icon from "../../constants/image";
import { screenWidth } from "../../constants/Sizes.constant";
import { currentTheme, useTheme } from "../../constants/ThemeProvider";
import { fontFamily } from "../../constants/font";

function FormTextInput(props) {
    // const inputE2 = useRef(null);
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
        icon
    } = props;
    const { theme, updateTheme } = useTheme()
    return (
        <>
            <View style={[StyleConstants.Textinput2, { alignSelf: 'center', backgroundColor: currentTheme().antiTextColor, borderColor: currentTheme().cardColor2 }]} key={theme}>

                <Image style={{ height: 22, width: 22, tintColor: currentTheme().primaryColor }} resizeMode="contain" source={icon} />


                <TextInput
                    style={{ flex: 1, marginLeft: 20, fontFamily: fontFamily.Regular }}
                    placeholder={placeholder}
                    color={currentTheme().textColor}
                    keyboardType={keyboardType}
                    placeholderTextColor={currentTheme().textColor}
                    onChangeText={onChangeText}
                    returnKeyType={returnKeyType}
                    defaultValue={value}
                    autoCapitalize="none"
                    maxLength={maxLength}
                    editable={editable}
                />
                {
                    type == "package" &&
                    <Image source={icon.stroke2} />

                }



            </View>
            {/* {showError == true ? (
                <Text style={StyleConstants.errText}>{error}</Text>
            ) : <></>} */}
            {error != "" && <Text style={StyleConstants.errText}>{error}</Text>}
        </>
    );
}
const styles = StyleSheet.create({});
export default FormTextInput;