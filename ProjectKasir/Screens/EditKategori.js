import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  AnimatedHeader,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import {FloatingAction} from 'react-native-floating-action';
import Mybutton from '../Screens/MyButton';

const UpdateKategori = ({navigation, route}) => {
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
export default UpdateKategori;
