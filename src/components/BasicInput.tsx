import { FormEvent } from "react";
import useInput from "../hooks/use-input";

const BasicInput: React.FC = () => {
  const {
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput 
  } = useInput<string>((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enterEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput<string>((value) => value.trim() !== '' && value.includes('@'));

  let formIsValid: boolean = false;

  if (enteredNameIsValid && enterEmailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enteredNameIsValid || !enterEmailIsValid) {
      return;
    }
    console.log(enteredName);
    console.log(enteredEmail);
    resetNameInput();
    resetEmailInput();
  }
  
  const nameInputSection = nameInputHasError ? "form-control invalid" : "form-control";
  const emailInputSection = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputSection}>
        <label htmlFor="name">Your Name</label>
        <input 
          type="text"
          id="name" 
          onChange={(event) => nameChangeHandler(event.target.value)}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty!</p>}
      </div>
      <div className={emailInputSection}>
        <label htmlFor="name">Your Email</label>
        <input 
          type="text"
          id="name" 
          onChange={(event) => emailChangeHandler(event.target.value)}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && 
          <p className="error-text">Email must not be empty and/or include '@'!</p>
        }
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default BasicInput;