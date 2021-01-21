import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import SQLite from 'react-native-sqlite-storage';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import PelangganScreen from './screens/Pelanggan';
import TambahPelangganScreen from './screens/TambahPelanggan';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Drawer = createDrawerNavigator(); 
const Stack = createStackNavigator();

const App = () => {
  global.db = SQLite.openDatabase({
    name: 'dbkasir',
    // location: 'default',
    location: 'default',
    createFromLocation: '~dbkasir.db'
  }, ()=>{
    console.log('Database Opened');
  },(error)=>{
    console.log('Error:'+ error.message);
  })
  return (
    <NavigationContainer>
    <Drawer.Navigator>
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
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  navbar:{
    height: 25,
    width: 25,
  },
});

export default App;
