import { FormEvent, ChangeEvent, useState, useRef } from "react";

interface Props {

}
 
const BasicInput: React.FC<Props> = ({}) => {

  const [userName, setUserName] = useState<string>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userName);
    const nameInputRefCurrent = nameInputRef.current!.value;
    console.log(nameInputRefCurrent);
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" onChange={inputChangeHandler}/>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  )
}

export default BasicInput;