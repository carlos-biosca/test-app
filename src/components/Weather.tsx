import { ReactElement } from "react";
import {useState, useEffect} from "react"
import Info from "./Info";
import clouds from "/clouds.svg"

import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Location {
  city: string,
  id: number,
  location: {
    coordinate: number[],
    type: string
  },
  timezone: string
}

const Weather: React.FC = (): ReactElement => {
  const [options, setOptions] = useState<Location[]>([]);

  useEffect(() => {
    fetch('locations.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => setOptions(res));
  },[]);

  return (
    <>
      <h1 className="text-h1 pt-[72px] mb-[18px] text-center">
        Weather City
      </h1>
      <h3 className="text-h3 mb-4">
        City
      </h3>

      <Select>
        <SelectTrigger className="w-full bg-lightblue text-darkblue mb-4">
          <SelectValue placeholder="Choose a location" />
        </SelectTrigger>
        <SelectContent>
          {
            options && options.length > 0 ? (
              options.map(option => <SelectItem value={option.city} key={option.id}>{option.city}</SelectItem>)
            ) : (null)
          }
        </SelectContent>
      </Select>

      <div className="border border-thumbborder rounded-lg p-4">
          <div className="flex items-center pb-4 border-b border-blue mb-4">
            <img src={clouds} alt="" className="block pr-2"/>
            <Info title="WEATHER" value="clouds" padding={4}/>
            <Info title="DESCRIPTION" value="few clouds: 11-25%" padding={0}/>
          </div>

          <div className="flex items-center mb-4">
            <Info title="SUNSET" value="21:00" padding={8}/>
            <Info title="SUNRISE" value="07:00" padding={8}/>
            <Info title="LOCATION" value="Barcelona" padding={0} icon/>
          </div>

          <div className="flex items-center mb-2">
            <Info title="TEMPERATURE" value="31,34" padding={8}/>
            <Info title="FEELS LIKE" value="34,1254" padding={0}/>
          </div>

          <div>
            <p className="text-lightgrey text-label leading-label font-normal text-right mb-2">70% humidity</p>
            <Progress value={70}/>
          </div>
      </div>
      
    </>
  );
}

export default Weather;