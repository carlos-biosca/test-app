import { ReactElement } from "react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface Position {
  lat: string | number,
  lon: string | number
}

interface Error {
  lat: boolean,
  lon: boolean
}

const Area: React.FC = (): ReactElement => {
  const [position, setPosition] = useState<Position>({lat: "0.00", lon: "0.00"});
  const [error, setError] = useState<Error>({lat: false, lon: false});

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setPosition(position => ({...position, [name]: value}))
    setError(error => ({...error, [name]: Number.isNaN(Number(value)) || value === ''}))
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
          <Input type="text" name="lat" value={position.lat} onChange={(e) => handlePositionChange(e)} className="rounded-tl-lg rounded-bl-lg"/>
        </div>
        <div className="flex-1">
          <Label htmlFor="latitude">LONGITUDE</Label>
          <Input type="text" name="lon" value={position.lon} onChange={(e) => handlePositionChange(e)} className="rounded-tr-lg rounded-br-lg"/>
        </div>
      </div>
      {error.lat || error.lon ? (<p className="text-red-600 mb-4 text-center text-xs">-- coordinates are not valid --</p>) : null}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-h3">Area</h3>
        <span className="text-lightgrey text-label font-normal leading-label pr-2">max 20 km</span>
      </div>
      <Slider defaultValue={[1]} max={20} step={1} className="bullets mb-7"/>
      <div className="w-full h-[180px] bg-blue rounded-lg"></div>
    </>
  );
};

export default Area;