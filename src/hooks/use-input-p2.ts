import { useState } from "react";

type ValidatorFunction<T> = (value: T) => boolean;

const useInputP2 = <T>(validateValue: ValidatorFunction<T>) => {
  
  const [value, setValue] = useState<T | null>(null);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = value !== null 
    ? validateValue(value) 
    : false;
  const hasError: boolean = isTouched && !valueIsValid;

  const valueInputHandler = (event: T) => setValue(event);
  const inputBlurHandler = () => setIsTouched(true);

  const reset = () => {
    setValue(null);
    setIsTouched(false);
  }

  return {
    value,
    isValid: valueIsValid,
    hasError,
    valueInputHandler,
    inputBlurHandler,
    reset
  }
}

export default useInputP2;