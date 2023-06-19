import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { AllCars } from './components/AllCars';
import { Upravlenie } from './components/ChangeCar';
import { ChangeLang } from './components/Switch';

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

  const [lang, setLang] = useState(true)
  const [numCat, setNumCat] = useState([1, 2, 3])

  useEffect(() => {
    setIniPosition(vodila.position)
  })

  const handleChangeVodila = (value: any) => {
    setVodila(value)
  }

  const handleChangeNumCat = (value: number[]) => {
    setNumCat(value)
  }

  const switchLang = (value: any) => {
    setLang(value)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={iniPosition}
        region={vodila.position}
      >
        <AllCars onChange={handleChangeVodila} lang={lang} numCat={numCat} />
      </MapView>
      <Upravlenie onChange={handleChangeVodila} vodilaChange={vodila} lang={lang} onNumCat={handleChangeNumCat} />
      <ChangeLang onChange={switchLang} />
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