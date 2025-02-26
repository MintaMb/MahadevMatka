import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

// ::::::::::::::::::::::::::::::::: import constants
import { ColorsConstant } from "./../../constants/Colors.constant";
import { StyleConstants } from "./../../constants/Style.constant";
import { currentTheme } from "../../constants/ThemeProvider";
import { screenWidth } from "../../constants/Sizes.constant";

function TextArea(props) {
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
    } = props;
    return (
        <>
            <TextInput
                style={[styles.textArea, { color: currentTheme().black, backgroundColor:currentTheme().backgroundbg,borderColor:currentTheme().cardColor2}]}
                underlineColorAndroid="transparent"
                placeholder={placeholder}
                placeholderTextColor={currentTheme().grey}
                numberOfLines={3}
                multiline={true}
                value={value}
                onChangeText={onChangeText}
            />

            {/* {showError == true ? (
                <Text style={StyleConstants.errText}>{error}</Text>
            ) : (
                <></>
            )} */}
            {error != "" && <Text style={StyleConstants.errText}>{error}</Text>}
        </>
    );
}

const styles = StyleSheet.create({
    textAreaContainer: { marginVertical: 10 },
    textArea: {
        height: "auto",
        borderWidth: 1,
        borderColor: currentTheme().cardColor2,
        justifyContent: "flex-start",
        textAlignVertical: "top",
        color: currentTheme().black,
        backgroundColor: currentTheme().backgroundbg,
        padding: 10,
        borderRadius: 20,
        paddingHorizontal: 16,
        width: screenWidth - 60,
        minHeight: 250

    },
});

export default TextArea;