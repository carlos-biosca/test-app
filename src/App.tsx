import './App.css'
import Area from './components/Area'
import Weather from './components/Weather'
import { Cloud, Disc } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function App() {
  return (
    <div className="relative bg-white w-[375px] h-[812px] px-4">
      <Tabs defaultValue="area" className="w-full">
        <TabsList>
          <TabsTrigger value="area" className='dot'><Disc className="stroke-thumbborder"/></TabsTrigger>
          <TabsTrigger value="weather" className='dot'><Cloud className="stroke-thumbborder"/></TabsTrigger>
        </TabsList>
        <TabsContent value="area"><Area /></TabsContent>
        <TabsContent value="weather"><Weather /></TabsContent>
      </Tabs>
    </div>
  )
}

export default App
