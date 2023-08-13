import { ReactElement } from "react";
import {useState, useEffect} from "react"
import Info from "./Info";
import convertTime from "@/lib/timeConverters";
import { MapPin } from "lucide-react";

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
    coordinates: number[],
    type: string
  },
  timezone: string
}

interface Weather {
  weather: [
    {
      description: string,
      icon: string,
      main: string
    }
  ],
  sys: {
    sunrise: number,
    sunset: number
  },
  name: string,
  main: {
    feels_like: number,
    humidity: number,
    temp: number
  }
}

const Weather: React.FC = (): ReactElement => {
  const [options, setOptions] = useState<Location[]>([]);
  const [coordinates, setCoordinates] = useState<number[] | null>(null);
  const [data, setData] = useState<Weather | null >(null);

  const handleSelect = (value: string) => {
    const currentlocation = options.filter(option => option.city === value);
    setCoordinates(currentlocation[0].location.coordinates)
  }

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

  useEffect(() => {
    if(coordinates){
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&appid=249efd60e5021ba25f979f2caac2b853&units=metric`)
      .then(res => res.json())
      .then(res => {
        res.sys.sunrise = convertTime(res.sys.sunrise)
        res.sys.sunset = convertTime(res.sys.sunset)
        setData(res)
      });
    }
  },[coordinates]);

  return (
    <>
      <h1 className="text-h1 pt-[72px] mb-[18px] text-center">
        Weather City
      </h1>
      <h3 className="text-h3 mb-4">
        City
      </h3>

      <Select onValueChange={(e) => handleSelect(e)}>
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

      {
        data ? (
          <div className="border border-thumbborder rounded-lg p-4">
            <div className="flex items-center pb-4 border-b border-blue mb-4">
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="" className="block pr-2"/>
              <Info title="WEATHER" value={data.weather[0].main.toLowerCase()} padding={4}/>
              <Info title="DESCRIPTION" value={data.weather[0].description} padding={0}/>
            </div>
            <div className="flex items-center mb-4">
              <Info title="SUNSET" value={data.sys.sunset} padding={8}/>
              <Info title="SUNRISE" value={data.sys.sunrise} padding={8}/>
              <div className="flex flex-col pr-0">
                <span className="text-lightgrey text-label leading-label font-normal mb-1 pr-8">LOCATION</span>
                {
                  coordinates ? (
                    <a href={`https://maps.google.com/?q=${coordinates[1]},${coordinates[0]}`} 
                    target="_blank" 
                    className="text-darkgrey text-h3 font-normal pr-4"
                    >
                      <MapPin className="h-4 w-4 stroke-lightgrey inline mb-1 mr-0.5" />
                      {data.name}
                    </a>
                  ) : null
                }
              </div>
            </div>
            <div className="flex items-center mb-2">
              <Info title="TEMPERATURE" value={data.main.temp} padding={8}/>
              <Info title="FEELS LIKE" value={data.main.feels_like} padding={0}/>
            </div>
            <div>
              <p className="text-lightgrey text-label leading-label font-normal text-right mb-2">
                {data.main.humidity}% humidity
              </p>
              <Progress value={data.main.humidity}/>
            </div>
          </div>
        ) : null
      }
    </>
  );
}

export default Weather;