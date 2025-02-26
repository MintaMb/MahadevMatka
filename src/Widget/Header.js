import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import {Appbar} from 'react-native-paper';

// ::::::::::::::::::::::::::::::::: import constant
import {fontFamily} from '../constants/font';
import {screenWidth} from '../constants/Sizes.constant';
import {ColorsConstant} from '../constants/Colors.constant';

// ::::::::::::::::::::::::::::::::: import icon images
import leftBackIcon from '../assets/icon/left.png';
import {currentTheme} from '../constants/ThemeProvider';
import {images} from '../assets/images';
import icon from '../constants/image';

export default function Header(props) {
  const {refresh, setRefresh, animating, setAnimating, headerCenter} = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', _goBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', _goBack);
    };
  }, [refresh]);

  const _goBack = () => {
    if (typeof props.leftButtonAction === 'undefined') {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    } else {
      props.leftButtonAction();
      return true;
    }
  };
  const _handleRefresh = async () => {
    const {user} = props;
    // let result = await getUserPlan(user.token);
    // let userResult = await getUser(user.token);
    if (result.status) {
    }
    if (userResult.status) {
      let userData = userResult.data;
      let refreshedData = {...user, ...userData};
      //console.log('refreshedData',refreshedData)
    }
  };
  const refreshData = () => {
    setRefresh(new Date().getTime());
  };
  return (
    <>
      {/* <View style={[ls.statusBar, { backgroundColor: currentTheme()gary }]}>
     <StatusBar translucent backgroundColor={currentTheme()gary}  />
     </View> */}
      <Appbar.Header
        style={{
          backgroundColor: currentTheme().themeColor,
          // borderBottomWidth: 1,
          borderBottomColor: currentTheme().inputBorderColor,
          // position: 'relative',
          // zIndex: 1,
          height: 48,
          marginLeft: -6,
          // paddingHorizontal: 15,
        }}>
        {props.leftButttonType !== 'noIcon' ? (
          <Appbar.Action
            animated={false}
            style={{
              width: typeof props.leftButtonType == 'undefined' ? 250 : 40,
              height: typeof props.leftButtonType == 'undefined' ? 50 : 40,
              borderRadius: 4,
              backgroundColor: props.buttonBackColor,
              alignItems: 'center',
            }}
            icon={() =>
              props.leftButtonType === 'back' ? (
                <TouchableOpacity style={ls.leftButton} onPress={_goBack}>
    
                  <Image source={icon.backArrow} style={[ls.leftButtonIcon,{tintColor: currentTheme().White,}]} />
                </TouchableOpacity>
              ) : (
                props.leftButtonTemplate
              )
            }
          />
        ) : (
          <Text></Text>
        )}
        <Appbar.Content
          style={props.headerCenter ? {width: screenWidth} : ''}
          titleStyle={{
            fontSize: 17,
            color: currentTheme().White,
            marginLeft: -10,
          }}
          title={props.title}
        />
        {props.rightButttonType === 'refresh' &&
        props.rightButtonAction !== 'undefined' ? (
          <View>{props.rightButtonAction}</View>
        ) : (
          <Text></Text>
        )}
      </Appbar.Header>
      {animating && (
        <ActivityIndicator
          animating={animating}
          color={currentTheme().White}
          size="small"
          style={ls.activityIndicator}
        />
      )}
    </>
  );
}
const ls = StyleSheet.create({
  // statusBar: {
  //     height: StatusBar.currentHeight,
  //   },
  activityIndicator: {
    backgroundColor: currentTheme().black,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  leftButton: {
    // width: 40,
    // height: 40,
    // alignItems: "center",
    // justifyContent: "center",
    tintColor:'#fff'
  },
  leftButtonIcon: {
    width: 20,

    height: 20,
    marginRight:10,
    resizeMode: 'contain',
  },
});
