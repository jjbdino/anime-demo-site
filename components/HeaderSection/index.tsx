interface HeaderSectionProps {
  title: string;
}

const HeaderSection = ({title}: HeaderSectionProps) => {
  return (
    <div className='p-3 bg-gray-500 text-center font-bold text-xl'><h2>{title}</h2></div>
  )
}

export default HeaderSection;
