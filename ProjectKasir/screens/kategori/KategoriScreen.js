import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {createStackNavigator} from '@react-navigation/stack';
import InsertKategoriScreen from './InsertKategoriScreen';
import DeleteKategoriScreen from './DeleteKategoriScreen';
import UpdateKategoriScreen from './UpdateKategoriScreen';
import {useIsFocused} from '@react-navigation/native';

const Stack = createStackNavigator();

const ReadQuery = (sql, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(sql, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        callback(temp);
      });
    },
    (error) => {
      console.log('execute sql error :' + error.message);
    },
    () => {
      console.log('execute sql success');
    },
  );
};

const Kategori = (props) => {
  const [kategori, setKategori] = useState([]);
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');

  const Search = () => {
    const [searchSementara, setSearchSementara] = useState('');

    useEffect(() => {
      setSearchSementara(search);
    }, []);
    return (
      <View style={styles.headContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder="Cari Barang..."
            returnKeyType="search"
            onChangeText={(x) => setSearchSementara(x)}
            value={searchSementara}
            onSubmitEditing={(event) => {
              event.persist();
              setSearch(event.nativeEvent.text);
              db.transaction((tx) => {
                tx.executeSql(
                  `SELECT * FROM tbl_kategori WHERE kategori LIKE '%${event.nativeEvent.text}%'`,
                  [],
                  (tx, results) => {
                    console.log(event.nativeEvent.text);
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                      temp.push(results.rows.item(i));
                    setKategori(temp);
                  },
                );
              });
            }}
          />
          <Image source={require('../../src/img/icon/search.png')} style={styles.iconm} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 3, paddingLeft: 120}}>
            <Text style={{fontWeight: 'bold'}}>Kategori</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontWeight: 'bold'}}>Pilihan</Text>
          </View>
        </View>
      </View>
    );
  };

  const Item = ({name, navprops, id}) => (
    <View style={styles.item}>
      <View style={{flex: 3}}>
        <Text style={styles.menum}>{name}</Text>
      </View>
      <View style={{flex: 0, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navprops.navigation.navigate('Edit Screen', {id: id})}>
          <Image source={require('../../src/img/icon/edit.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navprops.navigation.navigate('Delete Screen', {id: id})
          }>
          <Image source={require('../../src/img/icon/trash.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <Item name={item.kategori} navprops={props} id={item.id_kategori} />
  );

  useEffect(() => {
    ReadQuery('SELECT * FROM tbl_kategori ORDER BY id_kategori', (e) =>
      setKategori(e),
    );
  }, [isFocused]);

  return (
    <>
      <Search />
      <FlatList
        data={kategori}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={{position:'absolute',bottom:30,right:30,alignSelf:'flex-end'}}>
          <TouchableOpacity style={{borderRadius:50, backgroundColor:'#275f96', width:55, height:55, justifyContent:'center'}} onPress={() => props.navigation.navigate('Insert')}>
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
};

const KategoriScreen = (props) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Kategori"
          component={Kategori}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Insert"
          component={InsertKategoriScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Delete Screen"
          component={DeleteKategoriScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit Screen"
          component={UpdateKategoriScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    padding: 10,
    flexDirection: 'column',
  },

  searchContainer: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  iconm: {
    width: 20,
    height: 30,
    resizeMode: 'contain',
    margin: 10,
  },
  search: {
    height: 40,
    borderColor: '#275f96',
    borderWidth: 0.5,
    borderRadius: 10,
    flex: 1,
  },
  item: {
    padding: 5,
    backgroundColor: 'white',
    fontSize: 20,
    fontFamily: 'arial',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
    margin: 8,
  },
  menum: {
    marginLeft: 10,
  },
});

export default KategoriScreen;