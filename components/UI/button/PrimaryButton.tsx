import Image from "next/image";

type ButtonData = {
  text: String,
  icon?: string
}

const PrimaryButton = (props: ButtonData) => {
  return (
    <button
      type="button"
      className="
        text-white 
        bg-primary-500 hover:bg-primary-600 
        focus:ring-4 focus:bg-primary-400 
        rounded-2lg text-sm px-6 py-3 font-bold
        flex items-center justify-center gap-2
      "
    >
      {props?.icon &&
        (
          <Image
            src={props?.icon}
            alt='btn-icon'
            width={20}
            height={20}
          />
        )
      }
      {props?.text}
    </button>
  )
}

export default PrimaryButton;