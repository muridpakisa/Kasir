import React, { useState } from 'react';
import { 
  View,
  Text,
  Animated,
  AnimatedHeader,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert
}
from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Mybutton from '../../components/MyButton';
const TambahPelangganScreen = ({navigation})=>{
  let [Nama, setNama] = useState('');
  let [telp, settelp] = useState('');
  let [alamat, setalamat] = useState('');
  let TambahPelanggan = () =>{
    console.log(Nama, telp, alamat);
    if (!Nama) {
      alert('Silahkan isi nama');
      return;
    }
    if (!telp) {
      alert('Silahkan isi Nomor telphone');
      return;
    }
    if (!alamat) {
      alert('Silakan isi Alamat');
      return;
    }
 
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO tbl_pelanggan (nama, alamat, telp) VALUES (?,?,?)',
      [Nama, alamat, telp],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Pelanggan'),
              },
            ],
            { cancelable: false }
          );
        } else alert('fail');
      }
    );
  });
}
    return (
    <>
    <View style={{marginHorizontal: 40,}}>
    {/* <View style={{alignItems: 'center', marginVertical: 10}}>
        <Text style={{fontSize: 20,}}>Form Tambah Pelanggan</Text>
    </View> */}
        <View style={styles.searchContainer}>
            <TextInput
              style={styles.search}
              placeholder= 'Nama'
              onChangeText={
                (Nama) => setNama(Nama)
              }
            />
            <TextInput
              style={styles.search}
              placeholder= 'Alamat'
              onChangeText={
                (alamat) => setalamat(alamat)
              }
            />
            <TextInput
              keyboardType='number-pad'
              style={styles.search}
              placeholder= 'No Telp'
              onChangeText={
                (telp) => settelp(telp)
              }
            />
            <Mybutton title="Tambah Pelanggan" customClick={TambahPelanggan}/>
          </View>
          
    </View>
    
    <View style={{position:'absolute',bottom:30,left:30,alignSelf:'flex-end'}}>
          <TouchableOpacity style={{borderRadius:50, backgroundColor:'#275f96', width:55, height:55, justifyContent:'center'}} onPress={() => navigation.navigate('Pelanggan')}>
           <Image
            source={require('../../src/img/icon/back.png')}
            style={{
              height:20,
              width:20,
              alignSelf: 'center',
            }}
           />
          </TouchableOpacity>
        </View>
    </>
    );
  }
  const styles = StyleSheet.create({
  searchContainer:{
    flexDirection:'column',
  }, 
  search:{ 
    height: 40, 
    borderColor: '#275f96', 
    borderBottomWidth: .5,
    marginVertical: 10
  },
  buttonFooterRight:{
    height: 50,
    backgroundColor: '#275f96',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    
},
})
  export default TambahPelangganScreen;
  