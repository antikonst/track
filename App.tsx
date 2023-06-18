import { StatusBar } from 'expo-status-bar';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, Pressable, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AllCars } from './assets/components/AllCars';
import { Upravlenie } from './assets/components/ChangeCar';

export default function App() {
  const [vodila, setVodila] = useState<any>({
    "position": {
      "latitude": 59.95,
      "longitude": 30.28,
      "latitudeDelta": 0.9,
      "longitudeDelta": 1
    },
    "category": 1,
    "name": "Андрей",
    "number": "+79876543220"
  })

  const [INITIAL_POSITION, SET_INITIAL_POSITION] = useState({
    "latitude": 59.95,
    "longitude": 30.28,
    "latitudeDelta": 0.9,
    "longitudeDelta": 1
  });

  useEffect(() => {
    SET_INITIAL_POSITION(vodila.position)
  })

  const handleChangeVodila = (value: any) => {
    setVodila(value)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        region={vodila.position}
      >
        <AllCars onChange={handleChangeVodila} />
      </MapView>
      <Upravlenie onChange={handleChangeVodila} vodilaChange={vodila} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }
});