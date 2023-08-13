import { useMap, Marker, Circle } from 'react-leaflet'
import { Icon } from "leaflet";

type MapViewProps = {
  lat: number,
  lon: number,
  radius: number
}
  
const MapView = ({lat, lon, radius}: MapViewProps) => {
    const customIcon = new Icon ({ iconUrl: "/map-pin.svg", iconSize: [38,38]})
    const map = useMap();
    map.setView([lat, lon]);
    map.setZoom(13 - radius/5);
    
    return (
      <Marker position={[lat, lon]} icon={customIcon}>
        <Circle center={[lat, lon]} pathOptions={{color: 'hsla(195, 83%, 60%, 1)'}} radius={radius * 500} />
      </Marker>
    )
}

export default MapView;