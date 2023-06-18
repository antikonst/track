import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AllCars } from './components/AllCars';
import { Upravlenie } from './components/ChangeCar';

export default function App() {
  const [vodila, setVodila] = useState<any>({
    "position": {
      "latitude": 59.95,
      "longitude": 30.28,
      "latitudeDelta": 0.7,
      "longitudeDelta": 1
    },
    "category": 1,
    "name": "Андрей",
    "number": "+79876543220"
  })

  const [iniPosition, setIniPosition] = useState({
    "latitude": 59.95,
    "longitude": 30.28,
    "latitudeDelta": 0.7,
    "longitudeDelta": 1
  });

  useEffect(() => {
    setIniPosition(vodila.position)
  })

  const handleChangeVodila = (value: any) => {
    setVodila(value)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={iniPosition}
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