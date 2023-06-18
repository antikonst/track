import { Marker } from 'react-native-maps';
import Track from '../tracks.json';
import { useEffect, useState } from 'react';

const cat: any = {
  1: require("../assets/gruz.png"),
  2: require("../assets/pass.png"),
  3: require("../assets/spec.png")
}

interface Props {
  onChange: (obj: any) => void
  lang: boolean
}

export const AllCars: React.FC<Props> = ({ onChange, lang }) => {
  const [allTracks, setAllTracks] = useState<any>(<></>)
  const [vodila, setVodila] = useState({})

  useEffect(() => {
    onChange(vodila)
  }, [vodila])

  useEffect(() => {
    setAllTracks(Track.map((item, index) => (
      <Marker
        key={index}
        coordinate={item.position}
        title={lang ? item.name : item.ename}
        description={item.number}
        image={cat[item.category]}
        onPress={() => setVodila(item)}
      />)))
  }, [lang])

  return <>{allTracks}</>
}