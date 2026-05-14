import { TextareaHTMLAttributes } from "react";
import "./text-area.css";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({
  ...props
}: TextAreaProps) {
  return (
    <textarea
      className='textarea'
      {...props}
    />
  );
}