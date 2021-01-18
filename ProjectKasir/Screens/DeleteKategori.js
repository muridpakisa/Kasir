import React, {useState} from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './MyButton';

const DeleteKategori = ({navigation, route}) => {
  let [inputUserId, setInputUserId] = useState('');

  console.log(route.params.id);

  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM tbl_kategori where id_kategori=?',
      [route.params.id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        navigation.navigate('Kategori');
      },
    );
  });

  return null;
};

export default DeleteKategori;
