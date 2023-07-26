import { FormEvent } from "react";
import useInputP2 from "../hooks/use-input-p2";

const BasicForm: React.FC = () => {
  const {
    value: enteredFirstName,
    isValid: firstNameInputIsValid,
    hasError: firstNameInputHasError,
    valueInputHandler: firstNameChange,
    inputBlurHandler: firstNameBlur,
    reset: resetFirstNameInput
  } = useInputP2<string>((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    isValid: lastNameInputIsValid,
    hasError: lastNameInputHasError,
    valueInputHandler: lastNameChangeInput,
    inputBlurHandler: lastNameBlur,
    reset: resetLastNameInput,
  } = useInputP2<string>((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    valueInputHandler: emailChangeInput,
    inputBlurHandler: emailBlurInput,
    reset: resetEmailInput,
  } = useInputP2<string>((value) => value.trim() !== '' && value.includes('@'));

  let formIsValid: boolean = false;

  if (firstNameInputIsValid 
      && lastNameInputIsValid
      && emailInputIsValid) {
        formIsValid = true;
  }

  const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredFirstName);
    console.log(enteredLastName);
    console.log(enteredEmail);
    
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();    
  }
  
  const firstNameInputSection = firstNameInputHasError 
    ? "form-control invalid"
    : "form-control";
  
  const lastNameInputSection = lastNameInputHasError
    ? "form-control invalid" 
    : "form-control";

  const emailInputSection = emailInputHasError
    ? "form-control invalid" 
    : "form-control";

  return (
    <form onSubmit={submitFormHandler}>
      <div className='control-group'>
        <div className={firstNameInputSection}>
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='name' 
            onChange={(e) => firstNameChange(e.target.value)} 
            onBlur={firstNameBlur}
            value={enteredFirstName || ''}
          />
          {firstNameInputHasError && 
            <p className="error-text">Invalid First Name Input!</p>
          }
        </div>
        <div className={lastNameInputSection}>
          <label htmlFor='name'>Last Name</label>
          <input 
            type='text' 
            id='name' 
            onChange={(e) => lastNameChangeInput(e.target.value)}
            onBlur={lastNameBlur}
            value={enteredLastName || ''}
          />
          {lastNameInputHasError && 
            <p className="error-text">Invalid Last Name Input!</p>
          }
        </div>
      </div>
      <div className={emailInputSection}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='text' 
          id='name' 
          onChange={(e) => emailChangeInput(e.target.value)}
          onBlur={emailBlurInput}
          value={enteredEmail || ''}          
        />
        {emailInputHasError &&
          <p className="error-text">Email Is Empty and/or missing '@'!</p> 
        }
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default BasicForm;
