import { IconButtonStyled } from "./styles";

type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  return <IconButtonStyled {...props}>{props.children}</IconButtonStyled>;
};
