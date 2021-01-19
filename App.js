/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import  SQLite   from 'react-native-sqlite-storage';
import BarangScreen from './screens/barang/BarangScreen'
import KategoriScreen from './screens/kategori/KategoriScreen';
import PelangganScreen from './screens/pelanggan/Pelanggan';


const Drawer = createDrawerNavigator();

const App = () =>  {

  global.db = SQLite.openDatabase({
    name: 'dbkasir',
    createFromLocation: '~/dbkasir.db'
  }, () => {
    console.log('DB Opened');
  }, (error) =>{
    console.log('Error : ' +error.massage);
  })

  return (
    <NavigationContainer>
      <Drawer.Navigator>
          <Drawer.Screen 
            name="barang"
            component={BarangScreen}
            options={ ({navigation}) => {
              return{ 
                headerShown: true, 
                headerTitle: 'Barang',
                headerTitleAlign: 'center',
                headerTintColor: '#275f96',
                headerLeft: () => (
                  <View style={{
                    marginLeft: 10
                  }}>
                    <TouchableWithoutFeedback onPress={()=> navigation.toggleDrawer()}>
                      <Image
                        source={require('./src/img/icon/menu.png')}
                        style={styles.navbar}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                )
              }
            }
            } 
          />

        <Drawer.Screen
          name="Kategori"
          component={KategoriScreen}
          options={({navigation}) => {
            return {
              headerShown: true,
              headerTitle: 'Kategori',
              headerTitleAlign: 'center',
              headerTitleStyle: {color: '#275f96'},
              headerLeft: () => (
                <View
                  style={{
                    marginLeft: 10,
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}>
                    <Image
                      source={require('./src/img/icon/menu.png')}
                      style={styles.navbar}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ),
            };
          }}
        />

      <Drawer.Screen name="Pelanggan" 
      component={PelangganScreen} 
      options={({ navigation }) => {
        return {
          headerShown: true,
          headerTitle: 'Pelanggan',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#275f96'},
          headerLeft: () => 
          <View style={{
                  marginLeft: 10
                 }}>
                 <TouchableWithoutFeedback onPress={()=>{navigation.toggleDrawer()}}>
                   <Image
                   source={
                     require('./src/img/icon/menu.png')
                   }
                   style={styles.navbar}
                 />
             </TouchableWithoutFeedback>
               </View>
        }
      }} 
      />
      </Drawer.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({ 
  navbar:{
    height: 25,
    width: 25,
    margin: 5,
  },
})

export default App;
