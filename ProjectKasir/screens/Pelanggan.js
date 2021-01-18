import React, { useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { 
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  Button
}
from 'react-native';
import ActionButton from 'react-native-action-button';
import { FlatList, TextInput, TouchableWithoutFeedback, bu, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, useIsFocused} from '@react-navigation/native';
import UbahPelangganScreen from '../screens/UbahPelanggan';
import TambahPelangganScreen from '../screens/TambahPelanggan';
import HapusPelangganScreen from '../screens/HapusPelanggan';
import MyFloating from '../component/MyFloating';
const Stack = createStackNavigator();
const Pelanggan =(navigation)=>{
  const getFooter = () => {
    return (
      <View style={{height: 120}}/>
    )
  }
    const [ItemData, setItemData]=useState([])
    const isFocused = useIsFocused();
    useEffect(() => {
      ExecuteQuery('SELECT * FROM tbl_pelanggan ORDER BY id_pelanggan',(e) => setItemData(e));
    }, [isFocused])
    const Item = (props)=>(
      <View style={styles.pelanggan}>
      <TouchableWithoutFeedback style={{marginHorizontal: 20}}>
      <Text style={{color: '#222324',fontWeight: 'bold'}}>{props.nama}</Text>
      </TouchableWithoutFeedback>
      <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
      <TouchableWithoutFeedback onPress={()=> props.navigation.navigation.push('Ubah Pelanggan', {id: props.idUser})}>
        <Image
        source={
          require('../src/img/icon/pencil.png')
        }
        style={styles.navbar}
      />
  </TouchableWithoutFeedback>
      <TouchableWithoutFeedback 
      onPress={()=>Alert.alert(
        'Delete Pelanggan',
        `Apakah Anda Yakin menghapus Pelanggan '${props.nama}' ?`, // <- this part is optional, you can pass an empty string
        [
          {text: 'Batal', onPress: () => console.log('cancle Delete')},
          {text: 'Oke', onPress: () => props.navigation.navigation.navigate('Hapus Pelanggan', {id: props.idUser})},
        ],
        {cancelable: true},
      )}>
        <Image
        source={
          require('../src/img/icon/trash.png')
        }
        style={styles.navbar}
      />
  </TouchableWithoutFeedback>
      </View>
    </View>

    );
    const ExecuteQuery = (sql, callback) => {
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            callback(temp);
          })
      }, (error) => {
          console.log('execute sql error :' + error.massage);
        },() => {
          console.log('ecexute sql success')
        }
      )}
    const renderItem = ({ item }) => (  
      <Item nama={item.nama} navigation={navigation} idUser={item.id_pelanggan}  />
    );
    const Search = () => {
      let [text, settext] = useState('');
      return(
        <View style={styles.searchContainer}>
                <TextInput
                  style={styles.search}
                  placeholder= 'cari Pelanggan...'
                  onChangeText={(text) => settext(text)}
                  value={text}
                  returnKeyType = "search"
                  onSubmitEditing ={
                    (event)=>{
                      event.persist()
                      settext(event.nativeEvent.text)
                      db.transaction((tx) => {
                        tx.executeSql(
                          `SELECT * FROM tbl_pelanggan WHERE nama LIKE '%${event.nativeEvent.text}%'`,
                          [],
                          (tx, results) => {
                            console.log(event.nativeEvent.text);
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i)
                              temp.push(results.rows.item(i));
                            setItemData(temp);});});}}
                />
                 <Image
                    source={
                      require('../src/img/icon/search.png')
                    }
                    style={styles.searchIcon}
                  />
              </View>
      )
    }
    
 return(
  <>
      <View style={{backgroundColor: '#f5f7f6'}}>
            <Search/>
            <SafeAreaView style={{backgroundColor: '#f5f7f6'}}>
      <FlatList
          data={ItemData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={getFooter}
        />
      </SafeAreaView>
      </View>
      <MyFloating click={()=>navigation.navigation.push('Tambah Pelanggan')}/>

      </>
)
}
const PelangganScreen =()=>{
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name="Pelanggan" component={Pelanggan} options={{headerShown: false}}/>
            <Stack.Screen name="Tambah Pelanggan" component={TambahPelangganScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Ubah Pelanggan" component={UbahPelangganScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Hapus Pelanggan" component={HapusPelangganScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  const styles = StyleSheet.create({
    buttonFooter:{
      alignItems: 'flex-end',
      marginHorizontal: 20,
      marginVertical: 20
    },
    navbar:{
      height: 35,
      width: 35,
      marginHorizontal: 10,
    },
    pelanggan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f7f6',
    borderColor: '#fff',
    height: 70,
  },
  searchContainer:{
    flexDirection:'row',
    marginHorizontal: 40,
    marginVertical: 10,
  }, 
  search:{ 
    height: 40, 
    borderColor: '#275f96', 
    borderWidth: .5,
    borderRadius: 5,
    flex:1,

  },
  searchIcon:{
    height:20,
    width:20,
    alignSelf: 'center',
    marginLeft: 5
  },
})
  export default PelangganScreen;
  