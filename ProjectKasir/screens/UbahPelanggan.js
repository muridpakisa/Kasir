import React, { useEffect, useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Alert
}
from 'react-native';
import {TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Mybutton from '../component/Mybutton';
const UbahPelangganScreen =(props)=>{
  let [pNama, setNama] = useState('');
  let [palamat, setalamat] = useState('');
  let [ptelp, settelp] = useState('');
  let updateAllStates = (Nama,alamat,telp) => {
    setNama(Nama);
    setalamat(alamat);
    settelp(telp);
  };

  useEffect(()=>{
    console.log(props.route);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tbl_pelanggan WHERE id_pelanggan = ?',
        [props.route.params.id],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.nama,
              res.alamat,
              res.telp
            );
          } else {
            alert('No user found');
            updateAllStates('', '', '');
          }
        }
      );
    });
  },
  []
  )
  let UbahPelanggan = () => {
    console.log(pNama, palamat, ptelp);
    if (!pNama) {
      alert('Silahkan isi Nama');
      return;
    }
    if (!palamat) {
      alert('Silakan isi Alamat');
      return;
    }
    if (!ptelp) {
      alert('Silahkan isi Nomor telphone');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tbl_pelanggan set nama=?, alamat=? , telp=? where id_pelanggan=?',
        [pNama, palamat, ptelp, props.route.params.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected >0) {
            Alert.alert(
              'Success',
              'Pelanggan Sudah Terupdate',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate('Pelanggan')
                },
              ],
              { cancelable: true }
            );
          } else alert('Updation Failed');
        }
      );
    });
  };

    return (
    <View style={{marginHorizontal: 40,}}>
    {/* <View style={{alignItems: 'center', marginVertical: 10}}>
        <Text style={{fontSize: 20,}}>Form Tambah Pelanggan</Text>
    </View> */}
        <View style={styles.searchContainer}>
            <TextInput
              style={styles.search}
              placeholder= 'Nama'
              value={pNama}
              onChangeText={
                (pNama) => setNama(pNama)
              }
            />
            <TextInput
              style={styles.search}
              placeholder= 'Alamat'
              value={palamat}
              onChangeText={
                (palamat) => setalamat(palamat)
              }
            />
            <TextInput
              keyboardType='number-pad'
              style={styles.search}
              placeholder= 'No Telp'
              value={ptelp}
              onChangeText={
                (ptelp) => settelp(ptelp)
              }
            />
            <Mybutton title="Ubah Pelanggan" customClick={UbahPelanggan}/>
          </View>
          
    </View>
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
  export default UbahPelangganScreen;
  