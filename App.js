import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, I18nManager, Appearance, useColorScheme, Alert, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import ThemeProvider, { currentTheme, useTheme } from './src/constants/ThemeProvider'
import ThemeWrapper from './src/constants/ThemeWrapper'
import Router from './src/navigation/Routes'
import { Toast } from 'react-native-toast-message/lib/src/Toast'  
import "./src/Utlies/ignoreWarnings";  
import NetworkProvider from './src/context/NetworkProvider'
 
const App = () => {
 
  return (
    <ThemeProvider >
      <ThemeWrapper>
        <NetworkProvider> 
          <Router /> 
          <Toast />
        </NetworkProvider>
      </ThemeWrapper>
    </ThemeProvider>
 
  )
}

export default App 
