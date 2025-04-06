import React, { ChangeEvent, useState } from "react";
import { InputBar } from "../../components/InputBar/InputBar";
import { Button } from "../../components/Button/Button";

export const Main = () => {
    const [searchInput, setInput] = useState("")

    const emptyFunction = () =>{
        console.log('Test')
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value: string = event.currentTarget.value;
        console.log(value)
        setInput(value);
    };

    return(
        <div>
            <InputBar
                onSubmit={emptyFunction}
                onInputChange={handleInput}
                inputString={searchInput}
            />
            <Button
                buttonName="Test"
                buttonType="Test"
                onClick={emptyFunction}
            />
        </div>
    )
}