import React from 'react';
import { View, StyleSheet, TextInput, Alert, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Mybutton from '../../components/MyButton';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UbahBarangScreen = (props) => {
  let [kategori, setKategori] = useState('');
  let [barang, setBarang] = useState('');
  let [harga, setHarga] = useState();
  let [stok, setStok] = useState();

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

  let updateAllStates = (kategori, barang, harga, stok) => {
    setKategori(kategori);
    setBarang(barang);
    setHarga(harga);
    setStok(stok);
  };

  useEffect(() => {
    console.log(props.route.params.id, barang, harga, stok);
        db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM tbl_barang where id_barang = ?',
            [props.route.params.id],
            (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
                let res = results.rows.item(0);
                updateAllStates(
                res.id_kategori,
                res.barang,
                res.harga,
                res.stok,
                );
            } else {
                alert('No user found');
                updateAllStates('', '', '');
            }
            }
        );
        });
    },[])
    

  let updateUser = () => {
    console.log(kategori, barang, harga, stok);

    if (!kategori) {
      alert('Please fill kategori');
      return;
    }
    if (!harga) {
      alert('Please fill harga');
      return;
    }
    if (!barang) {
      alert('Please fill barang');
      return;
    }
    if (!stok) {
      alert('Please fill stok');
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tbl_barang set barang=?, id_kategori=? , harga=?, stok=? where id_barang=?',
        [barang, kategori, harga, stok, props.route.params.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Berhasil',
              'Barang berhasil di update',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate('Barang'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
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
              value={barang}
              onChangeText={
                (barang1) => setBarang(barang1)
              }
            />

            <TextInput
              style={styles.input}
              placeholder='Harga Barang...'
              value={''+harga}
              onChangeText={
                (harga1) => setHarga(harga1)
              }
            />

            <TextInput
              style={styles.input}
              placeholder='Stok Barang...'
              value={''+stok}
              onChangeText={
                (stok1) => setStok(stok1)
              }
            />

            <Mybutton
              title = "Ubah"
              customClick = {updateUser}
            />
    </View>


<View style={{position:'absolute',bottom:30,left:30,alignSelf:'flex-end'}}>
          <TouchableOpacity style={{borderRadius:50, backgroundColor:'#275f96', width:55, height:55, justifyContent:'center'}} onPress={() => props.navigation.navigate('Barang')}>
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

export default UbahBarangScreen;