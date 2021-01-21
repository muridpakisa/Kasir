import React from 'react';
import { 
  View,
  Image,
}
from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const MyFloating =(props)=>{
    return(
        <View style={{position:'absolute',bottom:30,right:30,alignSelf:'flex-end',}}>
             <TouchableOpacity
             onPress={props.click}
              activeOpacity={0.5}
              style={{justifyContent: 'center',alignItems: 'center', backgroundColor: '#275f96', width: 56, height: 56, borderRadius: 27}}
             >
             <Image
        source={
          require('../src/img/icon/add.png')
        }
        style={{height: 25,width: 25,}}/>
             </TouchableOpacity>
        </View>
    )
}
export default MyFloating;