import React from 'react';

import {Alert} from 'react-native';

const HapusBarangScreen = (props) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM tbl_barang WHERE id_barang=?',
      [props.route.params.id],
      (tx, results) => {
        props.navigation.navigate('Barang');
      },
    );
  });
  return null;
};

export default HapusBarangScreen;
