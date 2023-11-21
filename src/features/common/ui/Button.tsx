import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button = ({
  children,
  ...otherProps
}: PropsWithChildren<ButtonProps>) => (
  <button
    {...otherProps}
    className="shadow-button hover:shadow-button-l hover:underline hover:bg-[--afternoon-blue] bg-[--afternoon-blue] text-white disabled:bg-[--grey-overcast] disabled:text-[--grey-broken] disabled:border-transparent transition py-2 px-4"
  >
    {children}
  </button>
);
