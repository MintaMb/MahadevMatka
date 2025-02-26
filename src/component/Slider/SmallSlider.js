/* eslint-disable prettier/prettier */
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState,useEffect} from 'react';
import {ColorsConstant, lightTheme} from '../../constants/Colors.constant';
import {screenHeight, screenWidth} from '../../constants/Sizes.constant';
import { domainUrl } from '../../constants/Data.constant';

export default function SmallSlider(props){
const scrollView = useRef()
  const {list, navigation} = props;
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const setSliderPage = event => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / screenWidth);

    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const {currentPage: pageIndex} = sliderState;

  const _render_item = list => {
    return list.map((item, index) => {
      // console.log('-=-=-=list.lent',item.image);
      return (
        <View key={index} style={{height:150,width:screenWidth-20}} >
          <Image 
            source={{uri: domainUrl+'image/'+item.image}}
            style={{
              // start:10,
              // end:10,
              alignSelf:'center',
              height: '100%',
              width: '100%', 
              borderRadius:4,
              marginHorizontal:4 ,
            }}
            resizeMode='stretch'
          />
          
        </View>
      );
    });
  };

  
// useEffect(() => {
//   let i=1;
//  let timeout = setInterval(() => {
//     if(list.length > i){
//       scrollDown(i++);
//     }
//     else{
//       clearInterval(timeout)
//       // i=0
//     }
//   }, 3000)
//   //return clearInterval(this.timeout)

// }, [props])




// const [offset, setOffset] = useState(0);
// const scrollViewRef = useRef();

// const scrollDown = (i) => {
//   const y =  screenWidth*i;  /// we can get the height from the onLayout in view
//   scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
//   setOffset(y);
// }

const handleScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 50;
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      
  }
};
  return(
      <View style={{margin:10}}>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={(height,width) => scrollView.current.scrollTo({y: height})}
        horizontal={true}
        scrollEventThrottle={16} 
        pagingEnabled={true}
        // style={{height: 150,paddingHorizontal:10,
        // width: screenWidth-20 }}
        showsHorizontalScrollIndicator={false}
      //  nestedScrollEnabled
      
        onScroll={event => {
          setSliderPage(event);
        }}>
        {_render_item(list || [])}
      </ScrollView>
       {/* <View style={[styles.paginationWrapper, {flexDirection: 'row'}]}>
       {list?.map((key, index) => (
         <View
           style={
             pageIndex === index
               ? styles.activepaginationDots
               : styles.inactivepaginationDots
           }
           key={index}
         />
       ))}
       
     </View> */}
     </View>
     
  
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    height: screenWidth * (391 / 375),
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: "black",
    flex: 1,
    paddingTop: screenWidth * (20 / 375),
    paddingHorizontal: screenWidth * (35 / 375),
  },
  header: {
    fontSize: 41,
    color: 'white',
    marginBottom: screenWidth * (20 / 375),
  },
  paragraph: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  paginationWrapper: {
    // position: 'absolute',
    // bottom: screenWidth * (-20 / 375),
    marginVertical:10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems:'center',
    width:screenWidth,
    justifyContent:'center'
  },
  buttonContent: {
    position: 'absolute',
    bottom: screenWidth * (60 / 375),
    alignSelf: 'center',
  },
  activepaginationDots: {
    height: 10,
    width: 30,
    borderRadius: 10 / 2,
    backgroundColor: lightTheme.themeColor,
    marginLeft: 10,
  },
  inactivepaginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    borderWidth:1,
    borderColor:lightTheme.themeColor,
    marginLeft: 10,
  },
  paginationWrapperPosition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});