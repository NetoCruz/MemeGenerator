import React from "react";
import "./Form.css"

export default function Form(){
    return(
        <main>
           <form className="form">
             <input className="form--input" type="text" placeholder="top text"/>
             <input className="form--input" type="text" placeholder="botton text"/>
             <button className="form--button">Get a new meme image  🖼</button>
           </form>
        </main>
    )
}