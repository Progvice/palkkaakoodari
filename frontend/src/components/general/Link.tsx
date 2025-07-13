import { Link as RouterLink } from "react-router-dom";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const linkVariation = {
  blueBox: "text-theme-blue border-[4px] border-theme-blue py-1 px-6 hover:text-white hover:bg-theme-blue",
  whiteBox: "text-white border-[4px] border-white py-1 px-6 hover:bg-white hover:text-theme-blue",
  regular: "text-black text-base hover:text-theme-blue",
  blue: "text-theme-blue text-base",
  menu: "flex h-full px-3 items-center text-white text-sm hover:text-theme-blue",
  nostyle: "hover:text-theme-blue text-white"
}

type LinkProps = {
  children?: ReactNode,
  variant?: VariationType,
  to: string,
  className?: string
}

type VariationType = keyof typeof linkVariation;

const Link : React.FC<LinkProps> = (props) => {
  const {variant, to, children, className} = props;

  const classNames = twMerge((variant ? linkVariation[variant] : linkVariation.regular), className ? className : "");

  return <RouterLink className={classNames + " transition-all duration-300"} to={to}>{children}</RouterLink>
}

export default Link;
