import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { AllCars } from './components/AllCars';
import { Upravlenie } from './components/ChangeCar';
import { ChangeLang } from './components/Switch';

export default function App() {
  const [vodila, setVodila] = useState<any>({})
  //общий вид карты
  const iniPosition = {
    "latitude": 59.95,
    "longitude": 30.28,
    "latitudeDelta": 0.7,
    "longitudeDelta": 1
  }
  //проверка, выбрано ли ТС
  const [booleanPosition, setBooleanPosition] = useState(false)
  //язык
  const [lang, setLang] = useState(true)
  //массив выбранных категорий
  const [numCat, setNumCat] = useState([1, 2, 3])
  //смена ТС
  const handleChangeVodila = (value: any) => {
    setVodila(value)
  }
  //смена массива категорий
  const handleChangeNumCat = (value: number[]) => {
    setNumCat(value)
  }
  //смена состояния выбора ТС
  const handleChangePosition = (value: any) => {
    setBooleanPosition(value)
  }
  //смена языка
  const switchLang = (value: any) => {
    setLang(value)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={booleanPosition ? vodila.position : iniPosition}
        region={booleanPosition ? vodila.position : iniPosition}
      >
        <AllCars onChange={handleChangeVodila} lang={lang} numCat={numCat} />
      </MapView>
      <Upravlenie onChange={handleChangeVodila} vodilaChange={vodila} lang={lang} onNumCat={handleChangeNumCat} onIniPosition={handleChangePosition} />
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