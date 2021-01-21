import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Mybutton from '../../components/MyButton';

function InsertKategoriScreen({navigation}) {
  let [kategoriName, setKategori] = useState('');

  let register_kategori = () => {
    console.log(kategoriName);
    if (!kategoriName) {
      alert('Please fill name');
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO tbl_kategori (kategori) VALUES (?)',
        [kategoriName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Anda Berhasil Memasukkan Kategori',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Kategori'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Registration Failed');
          }
        },
      );
    });
  };

  return (
    <>
      <View style={styles.headContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder="Masukkan Kategori..."
            onChangeText={(kategoriName) => setKategori(kategoriName)}
            // onChangeText={text => onChangeText(text)}
            // value={value}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Mybutton title="Submit" customClick={register_kategori} />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          left: 30,
          alignSelf: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: '#275f96',
            width: 55,
            height: 55,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Kategori')}>
          <Image
            source={require('../../src/img/icon/back.png')}
            style={{
              height: 20,
              width: 20,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    padding: 15,
    flexDirection: 'column',
  },

  searchContainer: {
    paddingRight: 10,
  },

  search: {
    height: 40,
    borderColor: '#275f96',
    //borderWidth: 0.5,
    borderBottomWidth: 0.5,
  },
});

export default InsertKategoriScreen;
