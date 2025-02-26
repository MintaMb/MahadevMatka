import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text,Image } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import images from "../../assets/images";
import icon from "../../constants/image";
import { screenWidth } from "../../constants/Sizes.constant";

function ModalInput(props) {
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
        editable
    } = props;
    return (
        <>
            <View style={[StyleConstants.Textinput2, {width:screenWidth-120,marginHorizontal:20}]}>
               
                <TextInput
                    style={{ flex: 1 }}
                    placeholder={placeholder}
                    color={ColorsConstant.black}
                    keyboardType={keyboardType}
                    placeholderTextColor={ColorsConstant.gary}
                    onChangeText={onChangeText}
                    returnKeyType={returnKeyType}
                    defaultValue={value}
                    autoCapitalize="none"
                    maxLength={maxLength}
                    editable={editable}
                />
            
           
                
                
            </View>
            {/* {showError == true ? (
                <Text style={StyleConstants.errText}>{error}</Text>
            ) : <></>} */}
            {error != "" && <Text style={StyleConstants.errText}>{error}</Text>}
        </>
    );
}
const styles = StyleSheet.create({});
export default ModalInput;