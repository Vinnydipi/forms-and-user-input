import { useState } from 'react';

type ValidatorFunction<T> = (value: T) => boolean;

const useInput = <T>(validateValue: ValidatorFunction<T>) => {

  const [enteredValue, setEnteredValue] = useState<T | undefined>();
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = enteredValue !== undefined 
    ? validateValue(enteredValue) 
    : false;
  const hasError: boolean = isTouched && !valueIsValid;

  const valueChangeHandler = (value: T) => setEnteredValue(value);
  const inputBlurHandler = () => setIsTouched(true);

  const reset = () => {
    setEnteredValue(undefined);
    setIsTouched(false);
  }
  
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError, // Same name so we dont have to do hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
}

export default useInput;