type InfoProps = {
  title: string,
  value: string | number ,
  padding: number,
}

const Info = ({title, value, padding}: InfoProps) => {
  return (
    <div className={`flex flex-col pr-${padding}`}>
      <span className="text-lightgrey text-label leading-label font-normal mb-1">{title}</span>
      <span className="text-darkgrey text-h3 font-normal">{value}</span>
    </div>
  );
}

export default Info;