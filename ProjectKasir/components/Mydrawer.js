import React from 'react'; 
import {
    View,
    Text,
    Image
  } from 'react-native';
  import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';

  const Mydrawer =(props)=>{
    return(
        <View style={{flex: 1}}>
             <DrawerContentScrollView {...props}>
                 <View>
                     <Text style={{marginLeft: 20, marginTop: 10}}>Master</Text>
             <View style={{       
                    backgroundColor: '#dbdbdb',
                    marginVertical: 10,
                    width: 300,
                    height: 1,  }}/>
                    <DrawerItem
                    label="Barang"
                    onPress={() => {props.navigation.navigate('barang')}}
                    />
                    <DrawerItem 
                    label="Kategori"
                    onPress={() => {props.navigation.navigate('Kategori')}}
                    />
                    <DrawerItem 
                    label="Pelanggan"
                    onPress={() => {props.navigation.navigate('Pelanggan')}}
                    />
                    <Text style={{marginLeft: 20, marginTop: 10}}>Transaksi</Text>
             <View style={{       
                    backgroundColor: '#dbdbdb',
                    marginVertical: 10,
                    width: 300,
                    height: 1,  }}/>
                    <DrawerItem 
                    label="Penjualan"
                    onPress={() => {props.navigation.navigate('Penjualan')}}
                    />
                 </View>
             </DrawerContentScrollView>
        </View>
    )
    
}
export default Mydrawer;

