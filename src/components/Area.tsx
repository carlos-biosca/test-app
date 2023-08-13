import { ReactElement } from "react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import MapView from "./MapView";

interface Position {
  lat: number,
  lon: number
}

interface Error {
  lat: boolean,
  lon: boolean
}

const Area: React.FC = (): ReactElement => {
  const [position, setPosition] = useState<Position>({lat: 0.00, lon: 0.00});
  const [error, setError] = useState<Error>({lat: false, lon: false});
  const [range, setRange] = useState<number[]>([1]);

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setPosition(position => ({...position, [name]: value}))
    setError(error => ({...error, [name]: isNaN(parseFloat(value))}))
  }

  const handleRangeChange = (value: number[]) => {
    setRange(value)
  } 

  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        setPosition({
          lat: position.coords.latitude, 
          lon: position.coords.longitude
        })
      })
    }
  },[]);

  return (
    <>
      <h1 className="text-h1 pt-[72px] mb-[18px] text-center">
        Area Selector
      </h1>
      <h3 className="text-h3 mb-[9px]">
        Location
      </h3>

      <div className='flex mb-4'>
        <div className="flex-1 relative separator">
          <Label htmlFor="latitude">LATITUDE</Label>
          <Input type="number" name="lat" value={position.lat} onChange={(e) => handlePositionChange(e)} className="rounded-tl-lg rounded-bl-lg"/>
        </div>
        <div className="flex-1">
          <Label htmlFor="latitude">LONGITUDE</Label>
          <Input type="number" name="lon" value={position.lon} onChange={(e) => handlePositionChange(e)} className="rounded-tr-lg rounded-br-lg"/>
        </div>
      </div>
      {error.lat || error.lon ? (<p className="text-red-600 mb-4 text-center text-xs">-- coordinates are not valid --</p>) : null}
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-h3">Area</h3>
        <span className="text-lightgrey text-label font-normal leading-label pr-2">max 20 km</span>
      </div>
      <Slider value={range} min={1} max={20} step={1} onValueChange={(e) => handleRangeChange(e)} className="bullets mb-7"/>
      
      <MapContainer center={[position.lat, position.lat]} zoom={13} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {error.lat || error.lon ? null : <MapView lat={position.lat} lon={position.lon} radius={range[0]}/>}
      </MapContainer>
    </>
  );
};

export default Area;