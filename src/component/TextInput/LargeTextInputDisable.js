import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

// ::::::::::::::::::::::::::::::::: import constants
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import { currentTheme } from "../../constants/ThemeProvider";

function LargeTextInputDisable(props) {
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
            <View style={[StyleConstants.TextinputDisable]}>
                <TextInput
                    placeholder={placeholder}
                    // placeholderTextColor={ColorsConstant.DarkLight}
                    style={{ flex: 1 }}
                    color={currentTheme().textColor}
                    onChangeText={(e) => onChangeText(e)}
                    returnKeyType={returnKeyType}
                    value={value}
                    autoCapitalize="none"
                    editable={false}
                    selectTextOnFocus={false}
                />
            </View>
            {/* {showError == true ? (
                <Text style={StyleConstants.errText}>{error}</Text>
            ) : <></>} */}
            {/* {error != "" && <Text style={StyleConstants.errText}>{error}</Text>} */}
        </>
    );
}

const styles = StyleSheet.create({});

export default LargeTextInputDisable;
