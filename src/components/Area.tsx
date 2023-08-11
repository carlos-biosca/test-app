import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const Area = () => {
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
          <Input type="number" placeholder="0.00" className="rounded-tl-lg rounded-bl-lg"/>
        </div>
        <div className="flex-1">
          <Label htmlFor="latitude">LONGITUDE</Label>
          <Input type="number" placeholder="0.00" className="rounded-tr-lg rounded-br-lg"/>
        </div>
      </div>
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