import type { ReactNode } from 'react';

type InputFormProps = {
  children: ReactNode;
};

export function InputForm({ children }: InputFormProps) {
  return (
    <fieldset className="input-form">
      {children}
    </fieldset>
  )
}