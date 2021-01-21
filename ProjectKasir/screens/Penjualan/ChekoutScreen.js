import React, { useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { 
  View,
  Text,
  SafeAreaView,
  StyleSheet,
}
from 'react-native';
import ActionButton from 'react-native-action-button';
import { FlatList, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, useIsFocused} from '@react-navigation/native';
import Mybutton from '../../components/MyButton';

const Stack = createStackNavigator();
const Penjualan =(navigation)=>{
  const Chekout = () => {
    
      const [bayar, setbayar] = useState();
      let [text, settext] = useState('');
      const [kembali, setkembali] = useState(0);
      return(
        <View style={styles.searchContainer}>
                <View style={styles.searchContainer}>
                  <View style={{marginTop: 22, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>Total Pesanan (1 produk):</Text>
                    <Text style={{fontWeight: 'bold', color:"#275f96"}}>12000</Text>
                  </View>
            <TextInput
              style={styles.search}
              placeholder= 'Bayar'
              returnKeyType = "done"
              onChangeText={(text) => settext(text)}
              value={text}
              keyboardType='number-pad'
              onSubmitEditing ={(event)=>{
                event.persist()
                settext(event.nativeEvent.text)
                setkembali(event.nativeEvent.text-12000)
              }}
            />
            <TextInput
              keyboardType='number-pad'
              style={styles.search}
              value={''+kembali}
              placeholder= 'Kembalian'
            />
            <Mybutton title="Simpan"/>
          </View>
              </View>
      )
    }
    
 return(
  <>
      <View style={{backgroundColor: '#f5f7f6'}}>
            <SafeAreaView style={{backgroundColor: '#f5f7f6', marginHorizontal: 35}}>
                <Chekout/>
      </SafeAreaView>
      </View>

      </>
)
}
const PenjualanScreen =()=>{
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name="Penjualan" component={Penjualan} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  const styles = StyleSheet.create({
searchContainer:{
    flexDirection:'column',
    marginBottom: 20
},
search:{ 
    height: 40, 
    borderColor: '#275f96', 
    borderBottomWidth: .5,
    marginVertical: 10},
buttonFooterRight:{
    height: 50,
    backgroundColor: '#275f96',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4, },
})
  export default PenjualanScreen;