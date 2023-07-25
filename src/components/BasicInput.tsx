import { FormEvent, ChangeEvent, useState, useRef } from "react";

interface Props {

}

const BasicInput: React.FC<Props> = ({}) => {

  const [userName, setUserName] = useState<string>('');
  const [enteredNameIsValid, setEnteredValidNameIsValid] = useState<boolean>(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);
  
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (userName.trim() === '') {
      setEnteredValidNameIsValid(false);
      return;
    }
    setEnteredValidNameIsValid(true);
    console.log(userName);
  }
  
  const inputTouchedAndInvalid = enteredNameTouched && !enteredNameIsValid;
  const formClassName = enteredNameIsValid 
    ? "form-control" 
    : "form-control invalid";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={formClassName}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={inputChangeHandler}/>
        {inputTouchedAndInvalid && <p className="error-text">Name must not be empty!</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  )
}

export default BasicInput;