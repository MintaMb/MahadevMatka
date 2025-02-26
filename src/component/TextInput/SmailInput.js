import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";
import { currentTheme } from "../../constants/ThemeProvider";

function SmailInput(props) {
  const {
    placeholder,
    onChangeText,
    onBlur,
    value,
    keyboardType,
    returnKeyType,
    // onSubmitEditing,
    ref,
    setRef,
    showError = true,
    error,
  } = props;
  return (
    <>
      <View style={styles.Textinput}>
        <TextInput
          style={{ height: 40, fontFamily: fontFamily.medium, fontSize: 14 }}
          placeholder={placeholder}
          color={currentTheme().black}
          keyboardType={keyboardType}
          placeholderTextColor={currentTheme().black}
          onChangeText={(e) => onChangeText(e)}
        //   onSubmitEditing={() => onSubmitEditing()}
        //   returnKeyType={returnKeyType}
          value={value}
          onBlur={onBlur}
          ref={ref}
          autoCapitalize="none"
        />
      </View>
      {/* {showError == true ? (
                <Text style={StyleConstants.errText}>{error}</Text>
            ) : null} */}
    </>
  );
}
const styles = StyleSheet.create({
  Textinput: {
    // borderWidth: 1,
    width: screenWidth / 1.3,
    height: 40,
    justifyContent: "center",
    borderRadius: 7,
    paddingHorizontal: 10,
    // borderStyle: 'dotted',
    marginBottom: 8,
    paddingTop: 10,
    // paddingVertical:10,
    // borderColor:"#D3D3D3",
    // alignItems:'center',
    justifyContent: "center",
    // borderStyle enum('solid', 'dotted', 'dashed')
  },
});
export default SmailInput;
