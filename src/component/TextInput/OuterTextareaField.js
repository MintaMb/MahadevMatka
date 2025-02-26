import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import images, { icons } from "../../assets/images";
import icon from "../../constants/image";
import { screenWidth } from "../../constants/Sizes.constant";
import { currentTheme } from "../../constants/ThemeProvider";

function OuterTextareaField(props) {

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
        width,
        mandatary,

    } = props;
    return (
        <>
            <View style={{
                backgroundColor: currentTheme().bgColor1, borderRadius: 20, paddingHorizontal: 10, position: 'absolute', zIndex: 9999, top: -5, left: width ? 50 : 30,
                backgroundColor: currentTheme().backgroundbg, borderColor: currentTheme().cardColor2
            }}>
                <Text style={[StyleConstants.text14, { fontSize: 14, color: currentTheme().themeColor, backgroundColor: currentTheme().backgroundbg }]}>{label}</Text>
            </View>
            <View style={[StyleConstants.Textinput3, { alignSelf: 'center', width: width ? width : screenWidth - 40, backgroundColor: currentTheme().backgroundbg, borderColor: currentTheme().cardColor2 }]}>
                {
                    mandatary &&
                    <View style={{ backgroundColor: currentTheme().secondaryColor, height: 150, width: 5, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, }} />

                }

                <TextInput
                    style={{ flex: 1, marginLeft: 20 }}
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
                    textAlignVertical="top"
                    multiline


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
export default OuterTextareaField;