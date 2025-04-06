import { ChangeEventHandler, FormEventHandler } from "react";
import "./InputBar.scss";

type InputBarProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  inputString: string;
};


export const InputBar = ({onSubmit, onInputChange, inputString} : InputBarProps) =>{

    return (
        <section className="input-bar">
        <form className="input-bar__input-form" action="" onSubmit={onSubmit}>
            <input
            className="input-bar__input-form--input-bar"
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Search"
            value={inputString}
            onChange={onInputChange}
            />
            <button className="input-bar__input-form--submit" type="submit">
            🔍
            </button>
      </form>
        </section>
    )

}