import React from 'react';
import { View, StyleSheet, TextInput, Alert, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Mybutton from '../../components/MyButton';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TambahBarangScreen = ({navigation}) => {
  let [kategori, setKategori] = useState('');
  let [barang, setBarang] = useState('');
  let [harga, setHarga] = useState('');
  let [stok, setStok] = useState('');

  const [kategoriPicker, setKategoriPicker] = useState([]);
  const ReadQuery = (sql, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          callback(temp);
        })
    },
    )
  }
  ReadQuery('SELECT * FROM tbl_kategori ORDER BY id_kategori', (e) => setKategoriPicker(e));

  let register_barang = () => {
    console.log(kategori, barang, harga, stok);

    if (!kategori) {
      alert('Kolom kategori tidak boleh kosong');
      return;
    }
    if (!barang) {
      alert('Kolom barang tidak boleh kosong');
      return;
    }
    if (!harga) {
      alert('Kolom harga tidak boleh kosong');
      return;
    }
    if (!stok) {
      alert('Kolom stok tidak boleh kosong');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO tbl_barang (id_kategori, barang, harga, stok) VALUES (?,?,?,?)',
        [kategori, barang, harga, stok],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Berhasil',
              'Barang telah ditambahkan',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Barang')
                },
              ],
              { cancelable: false }
            );
          } else alert('Gagal menambahkan barang');
        }
      );
    });
  };

  return (
    <>
          <View style={styles.container}>
            <Picker
                mode='dropdown'
                selectedValue={kategori}
                style={styles.picker}
                onValueChange={(itemValue) => setKategori(itemValue)}
            >
                <Picker.Item label="Pilih Kategori" value="" />
                { kategoriPicker.map( (i,k) => (<Picker.Item label={i.kategori} value={i.id_kategori} key={k}/>) ) }
            </Picker>
            
            <TextInput
              style={styles.input}
              placeholder='Nama Barang...'
              onChangeText={
                (barang) => setBarang(barang)
              }
            />

            <TextInput
              style={styles.input}
              placeholder='Harga Barang...'
              keyboardType='number-pad'
              onChangeText={
                (harga) => setHarga(harga)
              }
            />

            <TextInput
              style={styles.input}
              placeholder='Stok Barang...'
              keyboardType='number-pad'
              onChangeText={
                (stok) => setStok(stok)
              }
            />

            <Mybutton 
              title = "Tambah Barang"
              customClick = {register_barang}
            />

          
    </View>
    <View style={{position:'absolute',bottom:30,left:30,alignSelf:'flex-end'}}>
          <TouchableOpacity style={{borderRadius:50, backgroundColor:'#275f96', width:55, height:55, justifyContent:'center'}} onPress={() => navigation.navigate('Barang')}>
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

};

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    input:{
        height: 40, 
        borderColor: '#275f96', 
        borderBottomWidth: .5,
        borderRadius: 5,
        marginBottom:10
    }
})

export default TambahBarangScreen;