import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleConstants } from '../../constants/Style.constant'
import { images } from '../../asstes/images'
import { currentTheme } from '../../constants/ThemeProvider'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'
import Header from '../../Widget/Header'
import { screenWidth } from '../../constants/Sizes.constant'

export default function GameScreen(props) {
    const { selectItem } = props.route.params

    const [game, setGame] = useState([])
    useEffect(() => {
        const getGame = async () => { }
        getGame()

        const currentTimestamp = Math.floor(Date.now() / 1000);
        let status = timeConvert(selectItem.open_time) > currentTimestamp
        console.log(timeConvert(selectItem.open_time) - currentTimestamp)
        if (status) {
            setGame([
                { "id": "1", "name": "Single Digit", "image": require('../../assets/image/sd.png'), "type": "Open" },
                { "id": "2", "name": "Jodi Digit", "image": require('../../assets/image/jodi.png'), "type": "Open" },
                { "id": "3", "name": "Single Pana", "image": require('../../assets/image/sp.png'), "type": "Open" },
                { "id": "4", "name": "Double Pana", "image": require('../../assets/image/dp.png'), "type": "Open" },
                { "id": "5", "name": "Triple Pana", "image": require('../../assets/image/tp.png'), "type": "Open" },
                { "id": "6", "name": "Half Sangam", "image": require('../../assets/image/half.png'), "type": "Open" },
                { "id": "7", "name": "Full Sangam", "image": require('../../assets/image/full.png'), "type": "Open" }

          
            ])
        } else {
            setGame([
                { "id": "1", "name": "Single Digit", "image": require('../../assets/image/sd.png'), "type": "Open" },
                { "id": "3", "name": "Single Pana", "image": require('../../assets/image/sp.png'), "type": "Open" },
                { "id": "4", "name": "Double Pana", "image": require('../../assets/image/dp.png'), "type": "Open" },
                { "id": "5", "name": "Triple Pana", "image": require('../../assets/image/tp.png'), "type": "Open" },
                // { "id": "6", "name": "Half Sangam", "image": require('../../../asstes/image/half.png'), "type": "Open" },
                // { "id": "7", "name": "Full Sangam", "image": require('../../../asstes/image/full.png'), "type": "Open" }

            ])
        }

    }, [props])
    const _goBack = () => {
        props.navigation.goBack()
    }


    const timeConvert = (openTime) => {
        // let openTime = selectItem.open_time;
        let openTimeArr = openTime.split(":")
        const time = new Date();
        if (openTime?.includes("am")) {
            time.setHours(openTimeArr[0], openTimeArr[1].substr(0, 2), 0, 0);
        } else {
            time.setHours(Number(openTimeArr[0]) + 12, openTimeArr[1].substr(0, 2), 0, 0);
        }
        const timestamp = time.getTime() / 1000;
        return timestamp
    }

    return (
        <View style={{ flex: 1 }}>
            <View   style={{ flex: 1 }}>
            <Header
                leftButtonType="back"
                title="Play Game"
                leftButtonAction={_goBack}
                rightButttonType="refresh"
            />

            <FlatList
                data={game}
                style={{ margin: 5 }}
                numColumns={2}
                renderItem={({ item, index }) => { 
                    return (

                        <TouchableOpacity onPress={() => { props.navigation.navigate("BidScreen", { details: item, selectItem: selectItem, status: timeConvert(selectItem.open_time) > Math.floor(Date.now() / 1000) }) }} style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 10, margin: 10 }]}>
                            <Image source={item.image} style={{ height: screenWidth/2.5, width: screenWidth/3 }} resizeMode={'stretch'}/>
                            {/* <Text style={{ color: currentTheme().themeColor,fontSize:20,fontWeight:'bold' }}>{item.name}</Text> */}
                        </TouchableOpacity>

                    )
                }}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})