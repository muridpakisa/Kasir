import React from 'react';
import {Alert} from 'react-native';
let deletePelanggan = (props) => {
  console.log(props.route.params.id);
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM  tbl_pelanggan WHERE id_pelanggan=?',
      [props.route.params.id],
      () => {
        props.navigation.navigate('Pelanggan');
      },
    );
  });
  return <></>;
};
export default deletePelanggan;
