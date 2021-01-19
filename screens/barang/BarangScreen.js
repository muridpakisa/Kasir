import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, Alert, Button} from 'react-native';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import TambahBarangScreen from './TambahBarangScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import HapusBarangScreen from './HapusBarangScreen';
import UbahBarangScreen from './UbahBarangScreen';

const BarangScreen = () => {

  const Stack = createStackNavigator();

  const Barang = (navprops) => {

    const [barang, setBarang] = useState([]);
    const [kategori, setKategori] = useState([]);
    const [kategoriSort, setKategoriSort] = useState();
    const [search, setSearch] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT tbl_barang.*, tbl_kategori.kategori FROM tbl_barang INNER JOIN tbl_kategori WHERE tbl_barang.id_kategori = tbl_kategori.id_kategori ORDER BY id_barang',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setBarang(temp);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM tbl_kategori',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setKategori(temp);
          }
        );
      });
    },[isFocused]);
    
    // useEffect(() => {
    //   ReadQuery('SELECT tbl_barang.*, tbl_kategori.kategori FROM tbl_barang INNER JOIN tbl_kategori WHERE tbl_barang.id_kategori = tbl_kategori.id_kategori ORDER BY id_barang', (e) => setBarang(e));
    //   ReadQuery('SELECT * FROM tbl_kategori ORDER BY id_kategori', (e) => setKategori(e));
    // },[isFocused])

    // const ReadQuery = (sql, callback) => {
    //   db.transaction((tx) => {
    //     tx.executeSql(
    //       sql,
    //       [],
    //       (tx, results) => {
    //         var temp = [];
    //         for (let i = 0; i < results.rows.length; ++i)
    //           temp.push(results.rows.item(i));
    //         callback(temp);
    //       })
    //   },
    //   )
    // }

    const Item = (props) => (
            <View style={styles.baris}>
              <Text style={styles.no}>{props.index + 1 }</Text>
              <Text style={styles.barang}>{props.barang}</Text>
              <Text style={styles.kategori}>{props.kategori}</Text>
              <View style={styles.aksi}>
              <TouchableOpacity 
                onPress={() => props.navprops.navigation.navigate('ubahBarang', {id:props.id_barang})}>
               <Image
                  source={require('../../src/img/icon/edit.png')}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert(
                  'Hapus',
                  `Apakah anda ingin menghapus '${props.barang}'`,
                  [
                    {
                      text: 'Batal'
                    },
                    {
                      text: 'Ok',
                      onPress: () => props.navprops.navigation.navigate('hapusBarang', {id:props.id_barang})
                    }
                  ],
              { cancelable: false }
                )}
              >
                <Image
                  source={require('../../src/img/icon/trash.png')}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
              </View>
            </View>
    )
  
    const Head = () => {
      const [searchSementara, setSearchSementara] = useState('');

      useEffect(() => { setSearchSementara(search) },[])

      return(
        <View style={styles.headGlobal}>
          <View style={styles.headContainer}>
            <Picker
                mode='dropdown'
                style={styles.picker}
                selectedValue={kategoriSort}
                onValueChange={(x) => {
                  setKategoriSort(x)
                  if(x != null){
                    setBarang(barang.filter((obj) => (obj.id_kategori == x)));
                    // db.transaction((tx) => {
                    // tx.executeSql(
                    //   'SELECT tbl_barang.*, tbl_kategori.kategori FROM tbl_barang INNER JOIN tbl_kategori WHERE tbl_barang.id_kategori = tbl_kategori.id_kategori AND tbl_barang.id_kategori = ? ORDER BY id_barang',
                    //   [x],
                    //   (tx, results) => {
                    //     var temp = [];
                    //     for (let i = 0; i < results.rows.length; ++i)
                    //       temp.push(results.rows.item(i));
                    //     setBarang(temp);
                    //   }
                    // );
                    // });
                    if(search != null){
                      db.transaction((tx) => {
                        tx.executeSql(
                          `SELECT tbl_barang.*, tbl_kategori.kategori FROM tbl_barang INNER JOIN tbl_kategori WHERE tbl_barang.id_kategori = tbl_kategori.id_kategori AND tbl_barang.id_kategori = ? AND  barang LIKE '%${search}%'`,
                          [x],
                          (tx, results) => {
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i)
                              temp.push(results.rows.item(i));
                            setBarang(temp);
                          }
                        );
                        });
                    }
                  } else {
                    db.transaction((tx) => {
                      tx.executeSql(
                        'SELECT tbl_barang.*, tbl_kategori.kategori FROM tbl_barang INNER JOIN tbl_kategori WHERE tbl_barang.id_kategori = tbl_kategori.id_kategori ORDER BY id_barang',
                        [],
                        (tx, results) => {
                          var temp = [];
                          for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                          setBarang(temp);
                        }
                      );
                    });

                    if(search != null){
                      db.transaction((tx) => {
                        tx.executeSql(
                          `SELECT tbl_barang.*, tbl_kategori.kategori FROM tbl_barang INNER JOIN tbl_kategori WHERE tbl_barang.id_kategori = tbl_kategori.id_kategori AND  barang LIKE '%${search}%'`,
                          [],
                          (tx, results) => {
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i)
                              temp.push(results.rows.item(i));
                            setBarang(temp);
                          }
                        );
                        });
                    }
                  }
                
                }
                    
                  } 
              >
                <Picker.Item label="Pilih Kategori" value={null} />
                { kategori.map( (i, k) => (<Picker.Item label={i.kategori} value={i.id_kategori} key={k} />) ) }
              </Picker>
  
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.search}
                placeholder= 'cari barang...'
                returnKeyType='search'
                onChangeText={ (x) => setSearchSementara(x) }
                value={searchSementara}
                onSubmitEditing ={
                  (event) => {
                    event.persist()
                    setSearch(event.nativeEvent.text)

                    if(kategoriSort != null){
                      db.transaction((tx) => {
                        tx.executeSql(
                          `SELECT tbl_barang.*, tbl_kategori.kategori FROM tbl_barang INNER JOIN tbl_kategori WHERE tbl_barang.id_kategori = tbl_kategori.id_kategori AND tbl_barang.id_kategori = ${kategoriSort} AND  barang LIKE '%${event.nativeEvent.text}%'`,
                          [],
                          (tx, results) => {
                            console.log(event.nativeEvent.text);
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i)
                              temp.push(results.rows.item(i));
                            setBarang(temp);
                          }
                        );
                      });
                    } else {
                      db.transaction((tx) => {
                        tx.executeSql(
                          `SELECT tbl_barang.*, tbl_kategori.kategori FROM tbl_barang INNER JOIN tbl_kategori WHERE tbl_barang.id_kategori = tbl_kategori.id_kategori AND barang LIKE '%${event.nativeEvent.text}%'`,
                          [],
                          (tx, results) => {
                            console.log(event.nativeEvent.text);
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i)
                              temp.push(results.rows.item(i));
                            setBarang(temp);
                          }
                        );
                        });
                    }
                  }
                }
               
              />
                <Image
                    source={
                      require('../../src/img/icon/search.png')
                    }
                    style={styles.searchIcon}
                  />
            </View>
          </View>
  
            <View style={styles.barangHeader}>
              <Text style={styles.headerNo}>No.</Text>
              <Text style={styles.headerBarang}>Barang</Text>
              <Text style={styles.headerKategori}>Kategori</Text>
              <Text style={styles.headerAksi}>Aksi</Text>
            </View>
        </View>
      )
    }
  
    const Foot = () => {
      return (
        <View style={{height:250}}>
        </View>
      );
    }

    const renderItem = ({ item, index }) => (
      <Item barang={item.barang} kategori={item.kategori} index={index} navprops={navprops} kategori={item.kategori} id_barang={item.id_barang}/>
    );

      
    
    return(
    <>
        <Head/> 
        <SafeAreaView style={{backgroundColor:'white'}}>
          <FlatList
            style={styles.flatlist}
            data={barang}
            renderItem={renderItem}
            ListFooterComponent={Foot}
            keyExtractor= {item => item.id_barang.toString()}
          />
        </SafeAreaView>
        <View style={{position:'absolute',bottom:30,right:30,alignSelf:'flex-end'}}>
          <TouchableOpacity style={{borderRadius:50, backgroundColor:'#275f96', width:55, height:55, justifyContent:'center'}} onPress={() => navprops.navigation.navigate('tambahBarang')}>
           <Image
            source={require('../../src/img/icon/add.png')}
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
  }

  return (
          <NavigationContainer independent={true}>
            <Stack.Navigator>
              <Stack.Screen name="Barang" component={Barang} options={{headerShown:false}}/>
              <Stack.Screen name="tambahBarang" component={TambahBarangScreen} options={{headerShown:false}} />
              <Stack.Screen name="hapusBarang" component={HapusBarangScreen} options={{headerShown:false}} />
              <Stack.Screen name="ubahBarang" component={UbahBarangScreen} options={{headerShown:false}} />
            </Stack.Navigator>
          </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  container:{
    padding:15,
  },

  headGlobal:{
    backgroundColor:'white',
    flexDirection:'column',
    padding:10,
    paddingBottom:0
  },

  headContainer:{
    flexDirection:'column',
    marginBottom:15,
  },

  searchContainer:{
    flexDirection:'row',
    paddingRight:10
  }, 
  search:{ 
    height: 40, 
    borderColor: '#275f96', 
    borderWidth: .5,
    borderRadius: 5,
    flex:1
  },
  searchIcon:{
    height:20,
    width:20,
    alignSelf: 'center',
    marginLeft:4
  },
  picker:{
    height:40,
    borderColor: '#275f96', 
    borderWidth: .5,
    borderRadius: 20,
    marginBottom:'10',
    marginBottom:10
    // color:'#275f96'
  },

  barangContainer:{
    flexDirection: 'column'
  },

  barangHeader:{
    flexDirection:'row',
    marginBottom:10,
  },
  headerNo:{
    flex:2,
    fontSize:20,
    fontWeight:"bold",
    // textAlign:'center'
  },
  headerBarang:{
    flex:4,
    fontSize:20,
    fontWeight:"bold",
    // textAlign:'center'
  },
  headerKategori:{
    flex:4,
    fontSize:20,
    fontWeight:"bold",
    // textAlign:'center'
  },
  headerAksi:{
    flex:4,
    fontSize:20,
    fontWeight:"bold",
    textAlign:'center'
  },

  flatlist:{
    padding:10,
    paddingTop:0
  },
  baris:{
    alignItems:'center',
    flexDirection: 'row',
    marginBottom:10
  },
  no:{
    fontSize:15,
    flex:2,
    // textAlign:'center'
  },
  barang:{
    fontSize:15,
    flex:4,
    // textAlign:'center'
  },
  kategori:{
    fontSize:15,
    flex:4,
    // textAlign:'center'
  },
  aksi:{
    fontSize:15,
    flex:4,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  editIcon:{
    width:30,
    height:30
  },
  deleteIcon:{
    width:30,
    height:30
  }
})

export default BarangScreen;