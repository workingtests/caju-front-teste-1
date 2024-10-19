import { InputHTMLAttributes } from "react";
import { Input } from "./styles";

type TextFieldProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = (props: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <Input {...props} />
      <span style={{ fontSize: 12, color: "red" }}>{props.error}</span>
    </div>
  );
};
