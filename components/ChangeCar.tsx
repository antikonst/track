import React, { useCallback, useEffect, useState } from "react"
import { Modal, StyleSheet, Text, Pressable, View, ScrollView, Dimensions } from "react-native"
import spisok from '../tracks.json'
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';

interface Props {
  onChange: (obj: any) => void
  vodilaChange: any
}

const cat: any = {
  1: require("../assets/gruz.png"),
  2: require("../assets/pass.png"),
  3: require("../assets/spec.png")
}

const { width, height } = Dimensions.get("window");

export const Upravlenie: React.FC<Props> = ({ onChange, vodilaChange }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [vodila, setVodila] = useState(vodilaChange)
  const waPress = useCallback(async (num: string, name: string) => {
    await Linking.openURL(`whatsapp://send?text=“Добрый день, ${name}, подскажите, пожалуйста, какой номер заказа у вас сейчас в работе?”&phone=${num}`)
  }, []);

  const tel = useCallback(async (tel: string) => {
    await Linking.openURL(`tel:${tel}`)
  }, []);

  const [vid1, setVid1] = useState(true)
  const [vid2, setVid2] = useState(true)
  const [vid3, setVid3] = useState(true)
  const filterChange1 = () => {
    setVid1(!vid1)
  }
  const filterChange2 = () => {
    setVid2(!vid2)
  }
  const filterChange3 = () => {
    setVid3(!vid3)
  }

  useEffect(() => {
    onChange(vodila)
  }, [vodila])

  const [numCat, setNumCat] = useState([1, 2, 3])

  const [elems, setElems] = useState<any>()

  useEffect(() => {
    setElems(spisok.map((item: any, index: any) => {
      if (numCat.find(i => item.category === i)) {
        return (
          <View key={index} style={[styles.whiteUpravlenie, { marginVertical: 10, justifyContent: 'center' }, styles.vnutriKnopki]}>
            <Pressable
              key={index}
              style={{ flexDirection: 'row' }}
              onPress={() => { setModalVisible(false); setVodila(item) }}>
              <Text style={styles.wt}>{item.name}</Text>
              <Image source={cat[item.category]} style={styles.img} contentFit="cover" />
            </Pressable>
            <Pressable onPress={() => waPress(item.number, item.name)} >
              <Image source={require('../assets/wa.png')} style={styles.img} contentFit="cover" />
            </Pressable>
            <Pressable onPress={() => tel(item.number)} >
              <Image source={require('../assets/tel.png')} style={styles.img} contentFit="cover" />
            </Pressable>
          </View >)
      }
    }
    ))

  }, [numCat])

  useEffect(() => {
    setNumCat([vid1 ? 1 : 0, vid2 ? 2 : 0, vid3 ? 3 : 0])
  }, [vid1, vid2, vid3])

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ marginBottom: 15 }}>фильтр</Text>
            <View style={{ flex: 1, flexDirection: 'row', width: width * 0.6, justifyContent: 'space-between' }}>
              <Pressable style={[{ padding: 7, borderRadius: 50 }, vid1 && { backgroundColor: 'white' }]} onPress={filterChange1}><Image source={require('../assets/gruz.png')} style={styles.imgF} contentFit="cover" /></Pressable>
              <Pressable style={[{ padding: 7, borderRadius: 50 }, vid2 && { backgroundColor: 'white' }]} onPress={filterChange2}><Image source={require('../assets/pass.png')} style={styles.imgF} contentFit="cover" /></Pressable>
              <Pressable style={[{ padding: 7, borderRadius: 50 }, vid3 && { backgroundColor: 'white' }]} onPress={filterChange3}><Image source={require('../assets/spec.png')} style={styles.imgF} contentFit="cover" /></Pressable>
            </View>
            <ScrollView style={{ height: height * 0.72 }}>{elems}</ScrollView>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.whiteUpravlenie, styles.firstBtn]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.wt}>Список авто</Text>
      </Pressable>
      {vodilaChange.name ? <View style={[styles.whiteUpravlenie, styles.nameBtn, styles.vnutriKnopki]}>
        <Pressable
          style={{ flexDirection: 'row' }}
          onPress={() => { setModalVisible(!modalVisible) }}
        >
          <View>
            <Text style={styles.wt}>{vodilaChange.name}</Text>
            <Text style={styles.wt}>{vodilaChange.number}</Text>
          </View>

          <Image source={cat[vodilaChange.category]} style={styles.imgBase} contentFit="cover" />
        </Pressable>
        <Pressable
          onPress={() => waPress(vodilaChange.number, vodilaChange.name)}
        >
          <Image source={require('../assets/wa.png')} style={styles.imgBase} contentFit="cover" />
        </Pressable>
        <Pressable
          onPress={() => tel(vodilaChange.number)}
        >
          <Image source={require('../assets/tel.png')} style={styles.tel} contentFit="cover" />
        </Pressable>
      </View > : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ccc",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  whiteUpravlenie: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    maxWidth: 280,
  },
  wt: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  firstBtn: {
    marginTop: 50
  },
  nameBtn: {
    marginTop: 20
  },
  img: {
    width: 23,
    height: 23,
    marginStart: 10
  },
  vnutriKnopki: {
    flex: 1,
    flexDirection: 'row'
  },
  imgBase: {
    width: 35,
    height: 35,
    marginStart: 10
  },
  tel: {
    width: 25,
    height: 25,
    marginStart: 10,
    marginTop: 3
  },
  imgF: {
    width: 48,
    height: 48,
  },
})