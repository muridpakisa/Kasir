import React, {useState} from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';
import Mytextinput from '../../components/Mytextinput';
import Mybutton from '../../components/MyButton';

const DeleteKategoriScreen = ({navigation, route}) => {

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

export default DeleteKategoriScreen;