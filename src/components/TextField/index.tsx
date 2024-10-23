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
        <label htmlFor={props.name}>{props.label}</label>
        <S.Input {...props} id={props.name} ref={ref} />
        {props.error && (
          <span style={{ fontSize: 12, color: "red" }}>{props.error}</span>
        )}
      </div>
    );
  }
);
