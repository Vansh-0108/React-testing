import React, { useEffect, useState } from 'react';
import './App.css';
import { User, getUser } from './get-user';

interface customInputProps {
  children: React.ReactNode;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

function App() {
  const [text, setText] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    }
    fetchUser();
  }, [])

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value)
  }

  return (
    <div>
      {user ? <p>Username: {user.name}</p> : null}
      <CustomInput value = {text} onChange = {handleChange}>
        Input:
      </CustomInput>
      <p>You typed: {text ? text : '...'}</p>
    </div>
  );
}

function CustomInput ({children, value, onChange} : customInputProps) {
  return (
    <div>
      <label htmlFor="text">{children}</label>
      <input type="text" id='text' onChange={onChange} placeholder='Enter Text'/>
    </div>
  )
}

export default App;
