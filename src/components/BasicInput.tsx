import { FormEvent, ChangeEvent, useState } from "react";

interface Props {};

const BasicInput: React.FC<Props> = ({}) => {
  // States for the name/email form inputs
  const [userName, setUserName] = useState<string>('');
  const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState<boolean>(false);
  // Constants used for the name variable
  const enteredNameIsValid: boolean = userName.trim() !== '';
  const enteredNameIsInvalid: boolean = enteredNameTouched && !enteredNameIsValid;
  // Constants used for the email variable
  const enteredEmailIsValid: boolean = email.includes('@') && email.trim() !== '';
  const enteredEmailIsInvalid: boolean = enteredEmailTouched && !enteredEmailIsValid;

  let formIsValid: boolean = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }
  const emailInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    console.log(userName);
    console.log(email);

    setUserName('');
    setEnteredNameTouched(false);
    setEmail('');
    setEnteredEmailTouched(false);
  }

  const nameInputBlurHandler = () => setEnteredNameTouched(true);
  const emailInputBlurHandler = () => setEnteredEmailTouched(true);
  
  const nameInputSection = enteredNameIsInvalid 
    ? "form-control invalid"
    : "form-control";
  
  const emailInputSection = enteredEmailIsInvalid 
    ? "form-control invalid" 
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputSection}>
        <label htmlFor="name">Your Name</label>
        <input 
          type="text"
          id="name" 
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={userName}
        />
        {enteredNameIsInvalid && <p className="error-text">Name must not be empty!</p>}
      </div>
      <div className={emailInputSection}>
        <label htmlFor="name">Your Email</label>
        <input 
          type="text"
          id="name" 
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={email}
        />
        {enteredEmailIsInvalid && 
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