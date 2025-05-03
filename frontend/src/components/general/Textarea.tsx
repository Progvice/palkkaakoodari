import { twMerge } from "tailwind-merge";

export type TextareaProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...args: any[]) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any[]) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: (...args: any[]) => any;
  resize?: boolean,
  value?: string | number,
  label?: string,
  field?: string,
  placeHolder?: string,
  className?: {
    div?: string,
    textarea?: string,
    label?: string,
  },
  labelClassName?: string,
}

const Textarea : React.FC<TextareaProps> = (props) => {
  const {label, field, onChange, onClick, className, value} = props;

  return (
    <div className={twMerge("flex flex-col", className?.div ?? "")}>
      {label ? (
        <label className={twMerge("my-2", className?.label ?? "")} htmlFor={label}>{field}</label>
      ) : null}
      <textarea
        {...(value !== undefined ? { value } : {})}
        onClick={() => onClick ? onClick() : () => {}}
        id={label}
        className={twMerge("my-2 border border-theme-grey p-2", className?.textarea ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field ? field : ''}
      />
    </div>
  )
}

export default Textarea;
