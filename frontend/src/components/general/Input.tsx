import { twMerge } from "tailwind-merge";

export type InputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...args: any[]) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any[]) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: (...args: any[]) => any;
  value?: string | number,
  label?: string,
  field?: string,
  type?: "text"|"number"|"password",
  placeHolder?: string,
  className?: {
    div?: string,
    input?: string,
    label?: string,
  },
  labelClassName?: string,
}

const Input : React.FC<InputProps> = (props) => {
  const {label, field, onChange, onClick, type, className, value} = props;

  return (
    <div className={twMerge("flex flex-col", className?.div ?? "")}>
      {label ? (
        <label className={twMerge("my-2", className?.label ?? "")} htmlFor={label}>{field}</label>
      ) : null}
      <input
        {...(value !== undefined ? { value } : {})}
        onClick={() => onClick ? onClick() : () => {}}
        type={type ? type : "text"}
        id={label}
        className={twMerge("my-2 border border-theme-grey p-2", className?.input ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field ? field : ''}
      />
    </div>
  )
}

export default Input;
