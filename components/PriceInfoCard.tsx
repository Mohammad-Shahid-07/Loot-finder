import Image from "next/image"

interface Props{
    title:string,
    iconSrc:string,
    value:string,
   
}
const PriceInfoCard = ({title, iconSrc, value}:Props) => {
  return (
    <div className={`price-info_card border-1`}>
      <p  className="text-base text-black-100"> {title}</p>
      <div className="flex gap-1">
        <Image src={iconSrc} alt="title" width={20} height={20} />
        <p className=" text-black-100 text-2xl">{value}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard