import { ReactNode } from "react";
import "./title-form.css";

type TitleFormProps = {
  children: ReactNode;
};

export function TitleForm({ children }: TitleFormProps) {
  return (
    <h2 className="title-form">
        {children}
    </h2>
  )
}