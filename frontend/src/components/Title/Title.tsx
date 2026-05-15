import { ReactNode } from "react";
import "./title.css";

type TitleProps = {
  children: ReactNode;
};

export function Title({ children }: TitleProps) {
  return (
    <h2 className="title">
        {children}
    </h2>
  )
}