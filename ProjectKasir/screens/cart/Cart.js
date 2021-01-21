import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import Mybutton from '../../components/MyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [keranjang, setKeranjang] = React.useState([]);
  useEffect(() => {
    dummy();
    getdata();
    console.log('object');
  }, []);
  const getdata = async () => {
    try {
      const value = await AsyncStorage.getItem('keranjang');
      if (value !== null) {
        // We have data!!
        // setKeranjang(value);
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const DATA = [
    {
      id: '1',
      title: 'VGA RTX 3060',
      jumlah: '3',
      harga: '6000',
      total: '18000',
    },
    {
      id: '2',
      title: 'INTEL CORE I9',
      jumlah: '1',
      harga: '8000',
      total: '8000',
    },
    {
      id: '3',
      title: 'MOTHERBOARD MSI',
      jumlah: '1',
      harga: '3000',
      total: '3000',
    },
  ];

  const dummy = async () => {
    let objek = JSON.stringify(DATA);
    try {
      console.log('simpan');
      await AsyncStorage.setItem('keranjang', objek);
    } catch (error) {
      // Error saving data
    }
  };

  const Item = ({title, jumlah, harga, total}) => (
    <View style={styles.item}>
      <Text style={styles.title1}>{title}</Text>
      <Text style={styles.title}>{jumlah}</Text>
      <Text style={styles.title}>{harga}</Text>
      <Text style={styles.title}>{total}</Text>
    </View>
  );
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      jumlah={item.jumlah}
      harga={item.harga}
      total={item.total}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{margin: 5, flexDirection: 'row'}}>
        <Text style={{fontSize: 18, flex: 4}}>Barang</Text>
        <Text style={{fontSize: 18, flex: 1.5}}>Jumlah</Text>
        <Text style={{fontSize: 18, flex: 1.5}}>Harga</Text>
        <Text style={{fontSize: 18, flex: 1.5}}>Total</Text>
      </View>
      <FlatList
        data={DATA} //keranjang
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          backgroundColor: 'black',
          justifyContent: 'flex-end',
          marginVertical: 10,
          height: 0.5,
        }}
      />
      <View style={{margin: 5, flexDirection: 'row'}}>
        <Text style={{fontSize: 18, flex: 4}}>Total :</Text>
        <Text style={{fontSize: 18, flex: 1}}>19000</Text>
      </View>
      <View style={{marginTop: 20}}>
        <Mybutton title="Submit" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: 'row',
    padding: 15,
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  title1: {
    fontSize: 18,
    flex: 3,
  },
});

export default CartScreen;
