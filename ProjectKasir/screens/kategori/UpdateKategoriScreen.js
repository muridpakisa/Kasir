import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Mybutton from '../../components/MyButton';

const UpdateKategoriScreen = ({navigation, route}) => {
  let [inputKategori, setKategori] = useState('');
  let updateAllStates = (Kategori) => {
    setKategori(Kategori);
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tbl_kategori WHERE id_kategori = ?',
        [route.params.id],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.kategori);
          } else {
            alert('No user found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  }, []);
  let UbahKategori = () => {
    console.log(inputKategori);
    if (!inputKategori) {
      alert('Silahkan isi Kategori');
      return;
    }

    db.transaction((tx) => {
      console.log(route.params.id);
      tx.executeSql(
        'UPDATE tbl_kategori set kategori=? WHERE id_kategori=?',
        [inputKategori, route.params.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'kategori Sudah Terupdate',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Kategori'),
                },
              ],
              {cancelable: true},
            );
          } else {
            alert('Update Tidak Berhasil');
          }
        },
      );
    });
  };

  return (
    <>
    <View style={{marginHorizontal: 40}}>
      {/* <View style={{alignItems: 'center', marginVertical: 10}}>
        <Text style={{fontSize: 20,}}>Form Tambah Pelanggan</Text>
    </View> */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Kategori"
          value={inputKategori}
          onChangeText={(inputKategori) => setKategori(inputKategori)}
        />
        <Mybutton title="Ubah Kategori" customClick={UbahKategori} />
      </View>
    </View>

<View style={{position:'absolute',bottom:30,left:30,alignSelf:'flex-end'}}>
          <TouchableOpacity style={{borderRadius:50, backgroundColor:'#275f96', width:55, height:55, justifyContent:'center'}} onPress={() => navigation.navigate('Kategori')}>
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
  searchContainer: {
    flexDirection: 'column',
  },
  search: {
    height: 40,
    borderColor: '#275f96',
    borderBottomWidth: 0.5,
    marginVertical: 10,
  },
  buttonFooterRight: {
    height: 50,
    backgroundColor: '#275f96',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
export default UpdateKategoriScreen;