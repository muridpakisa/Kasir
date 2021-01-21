/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Anjay from './Screens/KategoriScreen';
import Insertt from './Screens/InsertKategori';
import SQLite from 'react-native-sqlite-storage';
import Flat from './Screens/Flatlist';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  global.db = SQLite.openDatabase(
    {
      name: 'dbkasir',
      createFromLocation: '~/dbkasir.db',
    },
    () => {
      console.log('Database Opened');
    },
    (error) => {
      console.log('Error: ' + error.message);
    },
  );
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Kategori"
          component={Anjay}
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
                  <TouchableOpacity
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}>
                    <Image
                      source={require('./img/menu.png')}
                      style={styles.navbar}
                    />
                  </TouchableOpacity>
                </View>
              ),
            };
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
  navbar: {
    height: 25,
    width: 25,
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
  iconm: {
    width: 20,
    height: 30,
    resizeMode: 'contain',
    margin: 15,
  },
});

export default App;
