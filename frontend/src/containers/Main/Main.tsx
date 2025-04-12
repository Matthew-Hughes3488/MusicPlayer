import "./Main.scss"
import React, { ChangeEvent, useState } from "react";
import { InputBar } from "../../components/InputBar/InputBar";
import { MusicCard } from "../MusicCard/MusicCard";

export const Main = () => {
    const [searchInput, setInput] = useState("")

    const emptyFunction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Test");
      };
      

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value: string = event.currentTarget.value;
        setInput(value);
    };

    return(
        <section className="main-page">
            <InputBar
                onSubmit={emptyFunction}
                onInputChange={handleInput}
                inputString={searchInput}
            />
            <MusicCard/>
        </section>
    )
}