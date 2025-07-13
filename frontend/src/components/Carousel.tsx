import {useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export type CarouselImg = {
  url: string,
  description: string
}

type CarouselProps = {
  images: CarouselImg[],
  title?: string,
  description?: string,
  className?: string,
};

const Carousel : React.FC<CarouselProps> = (props) => {
  const {title, description, className} = props;
  const [images, setLoadedImages] = useState<CarouselImg[]>([]);
  const [currentImg, setCurrentImg] = useState<CarouselImg>();

  useEffect(() => {
    setCurrentImg(props.images[0]);
    setLoadedImages(props.images);
  }, []);

  const changeImage = (val: number) => {



  }

  const baseStyle = "w-full h-[270px] flex relative top-0";

  const classes = className ? twMerge(baseStyle, props.className) : baseStyle;

  return (
    <div className={classes}>
      <div className="absolute left-0 top-0 w-full h-full bg-black opacity-75"></div>
      <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center">
        {title ? (<h1 className="text-theme-blue text-5xl my-4">{title}</h1>) : null}
        {description ? (<p className="text-white text-base">{description}</p>) : null}

        {
          images.length > 1 ? (
            <>
              <button className="absolute left-0" onClick={() => {}}><ChevronLeftIcon className="text-white" size={64}/></button>
              <button className="absolute right-0" onClick={() => {}}><ChevronRightIcon className="text-white" size={64}/></button>
            </>
          ) : null
        }
      </div>
      <img  src={currentImg?.url}
            alt={currentImg?.description}
            className="w-full h-full object-cover"
      />
    </div>
  )
}

export default Carousel;
