import { MapPin } from "lucide-react"

type InfoProps = {
  title: string,
  value: string,
  padding: number,
  icon?: boolean
}

const Info = ({title, value, padding, icon}: InfoProps) => {
  return (
    <div className={`flex flex-col pr-${padding}`}>
      <span className="text-lightgrey text-label leading-label font-normal mb-1">{title}</span>
      <span className="text-darkgrey text-h3 font-normal">
        {icon ? <MapPin className="h-4 w-4 stroke-lightgrey inline mb-1 mr-0.5" /> : null}
        {value}
      </span>
    </div>
  );
}

export default Info;