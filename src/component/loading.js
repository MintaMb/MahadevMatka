import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

import {StyleConstants} from '../constants/Style.constant';
import FastImage from 'react-native-fast-image';
import { currentTheme } from '../constants/ThemeProvider';
function Loading(props) {
  return (
    <ActivityIndicator
      color={currentTheme().themeColor}
      style={ls.activityIndicator}
      size={'large'}
    />
  );
}
const s = StyleConstants,
  ls = StyleSheet.create({
    activityIndicator: {
      backgroundColor: currentTheme().darkLight,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 9999,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
export default Loading;
