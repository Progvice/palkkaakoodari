import { ReactNode } from "react";
import { cn } from "../../lib/utils";


const variations = {
  blue: "bg-theme-blue text-white",
  blueBorder: "transition-all duration-200 bg-transparent text-theme-blue border-[4px] border-theme-blue hover:bg-theme-blue hover:text-white",
  noStyle: ""
};

type VariationType = keyof typeof variations;

export type ButtonProps = {
  children?: ReactNode,
  variant?: VariationType,
  onClick?: (...args: unknown[]) => void,
  type?: "submit" | "reset" | "button",
  className?: string
}

const Button : React.FC<ButtonProps> = ({children, variant, onClick, type = "button", className}) => {

  const baseStyles = variant !== "noStyle" ? "py-2 px-4 flex justify-center items-center flex-row " : "";
  const btnVariant = baseStyles + (variant ? variations[variant] : variations.blue);
  const classes = className ? cn(btnVariant, className) : btnVariant;

  return (<button type={type} className={classes} onClick={onClick ? onClick : () => {}}>{children ? children : null}</button>)

}

export default Button;
