import Image from "next/image";

type GlassmorphCardVariant = {
  rounded: string
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassmorphCard: React.FC<CardProps> = ({ children, className }) => {
  // console.log(children)
  return (
    <div
      className={`bg-glass-white-20   border-primary-white  shadow-glass backdrop-blur-custom ${className}`}
    >
      {children}
    </div>
  )
}

export default GlassmorphCard;