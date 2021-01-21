import React, {useState} from 'react';
import {
  View,
  Text,
  Animated,
  AnimatedHeader,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import {FloatingAction} from 'react-native-floating-action';

const DATA = [
  {
    id: '1',
    name: 'Smartphone',
  },
  {
    id: '2',
    name: 'Laptop',
  },
  {
    id: '3',
    name: 'Motherboard',
  },
  {
    id: '4',
    name: 'PSU',
  },
  {
    id: '5',
    name: 'Harddisk',
  },
  {
    id: '6',
    name: 'VGA',
  },
  {
    id: '7',
    name: 'SSD',
  },
];

const Item = ({name}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const Flat = () => {
  const renderItem = ({item}) => <Item name={item.name} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Flat;
