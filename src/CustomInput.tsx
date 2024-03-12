import React from "react";

interface customInputProps {
    children: React.ReactNode;
    value: string;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

function CustomInput ({children, value, onChange} : customInputProps) {
    return (
        <div>
        <label htmlFor="text">{children}</label>
        <input type="text" id='text' onChange={onChange} placeholder='Enter Text'/>
        </div>
    )
}

export default CustomInput;