import { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Image,
    Modal,
    Keyboard,
    KeyboardAvoidingView,
    TextInput,
    TouchableWithoutFeedback,
    Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

// ::::::::::::::::::::::::::::::::: import constants
import { fontFamily } from "../../constants/font";
import { StyleConstants } from "../../constants/Style.constant";
import { ColorsConstant } from "../../constants/Colors.constant";
import { currentTheme, useTheme } from "../../constants/ThemeProvider";
import { screenWidth } from "../../constants/Sizes.constant";

function DropDownCom(props) {
    // const {theme} = useTheme()
    const {
        type,
        name,
        placeholder,
        value,
        setName,
        setId,
        list,
        onPress,
        error,
        id,
        disable,
        mandatary,
        search,
        width,
        choice,
        borderColor,
        backgroundColor

    } = props;

    let identy = useRef(name);

    const [selectValue, setSelectValue] = useState("");

    return (
        <>
            {
                name &&
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={{
                            color: currentTheme().textColor,
                            fontWeight: "bold",
                        }}
                    >
                        {name}
                    </Text>

                </View>
            }


            <View style={[{
                width: width ? width : screenWidth - 40, borderWidth: 0, justifyContent: 'center',
                borderColor: borderColor ? borderColor : currentTheme().inputBorderColor, borderRadius: 10,
                paddingHorizontal: 5,
                backgroundColor: backgroundColor ? backgroundColor : currentTheme().inputbg,
                alignSelf: "center",
            }]}>

                {
                    mandatary &&
                    <View style={{ position: 'absolute', backgroundColor: currentTheme().secondaryColor, height: 50, width: 5, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, }} />

                }


                <Dropdown
                    showsVerticalScrollIndicator={false}
                    containerStyle={{ 
                        marginTop: -2,
                        borderWidth: 2, 
                        borderColor: currentTheme().inputBorderColor,
                        backgroundColor: currentTheme().backgroundbg,
                        borderRadius: 10, 
                    }}
                    itemContainerStyle={{ borderRadius: 10, }}
                    style={[
                        styles.dropdown,
                        {
                            borderColor: currentTheme().White,

                            // borderRadius:10

                        },
                    ]}

                    itemTextStyle={[styles.textstyledropdown, { color: currentTheme().textColor, }]}
                    placeholderStyle={[, StyleConstants.text16, styles.placeholderStyle, { color: currentTheme().textColor, fontSize: 16, }]}
                    selectedTextStyle={[styles.selectedTextStyle, { color: currentTheme().textColor, }]}
                    iconStyle={[styles.iconStyle, {
                        tintColor: currentTheme().textColor,
                    }]}

                    data={list}

                    searchPlaceholder="Search"
                    inputSearchStyle={{ color: currentTheme().textColor, }}
                    maxHeight={250}
                    labelField="label"
                    search={search}
                    disable={disable}
                    valueField="value"
                    placeholder={placeholder}
                    value={value == "" || value == null ? selectValue : value}
                    onChange={(item) => {
                        setSelectValue(item.value);
                        setName(item.label);
                        setId(item.value);
                        onPress(item.value, item.label);
                    }}

                />
                {/* {error != "" && ( */}
                {error && <Text style={StyleConstants.errText}>{error}</Text>}
            </View>
        </>
    );
}

const styles = StyleSheet.create({

    dropdownContainer: {
        // backgroundColor: "red",
        // paddingVertical: 5,
    },
    dropdown: {
        height: 50,
        // borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,

    },
    icon: {
        marginRight: 5,
    },

    placeholderStyle: {

        paddingHorizontal: 5,
    },
    textstyledropdown: {

        marginVertical: -18,

    },
    selectedTextStyle: {

        textTransform: "capitalize",
        paddingHorizontal: 5,

    },
    iconStyle: {
        tintColor: currentTheme().themeColor,
        width: 30
    }

});

export default DropDownCom;
