import React, {useState} from 'react';
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

function Insertt({navigation}) {
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

export default Insertt;
