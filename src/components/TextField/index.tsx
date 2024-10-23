import { forwardRef, InputHTMLAttributes } from "react";
import * as S from "./styles";

type TextFieldProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <S.Input {...props} ref={ref} />
        <span style={{ fontSize: 12, color: "red" }}>{props.error}</span>
      </div>
    );
  }
);
