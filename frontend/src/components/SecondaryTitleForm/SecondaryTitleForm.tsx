import { ReactNode } from "react";
import "./secondary-title-form.css";

type SecondaryTitleFormProps = {
  children: ReactNode;
};

export function SecondaryTitleForm({ children }: SecondaryTitleFormProps) {
  return (
    <h2 className="secondary-title-form">
        {children}
    </h2>
  )
}