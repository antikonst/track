import { Marker } from 'react-native-maps';
import Track from '../../tracks.json';
import { useEffect, useState } from 'react';

const cat: any = {
  1: require("../../assets/gruz.png"),
  2: require("../../assets/pass.png"),
  3: require("../../assets/spec.png")
}

interface Props {
  onChange: (obj: any) => void
}

export const AllCars: React.FC<Props> = ({ onChange }) => {

  const [vodila, setVodila] = useState({})

  useEffect(() => {
    onChange(vodila)
  }, [vodila])

  const allTracks = Track.map((item, index) => (
    <Marker
      key={index}
      coordinate={item.position}
      title={item.name}
      description={item.number}
      image={cat[item.category]}
      onPress={() => setVodila(item)}
    />))
  return <>{allTracks}</>
}