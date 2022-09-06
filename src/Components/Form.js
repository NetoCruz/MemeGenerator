import React from "react";
import "./Form.css"
import MemeData from "../Memedata"

export default function Form(){
    function getMemeImage(){
      const memeArray = MemeData.data.memes
      const randomNumber = Math.floor(Math.random()*memeArray.length) 
      const url = memeArray[randomNumber].url
      console.log(url)
    }
    return(
        <main>
           <div className="form">
             <input className="form--input" type="text" placeholder="top text"/>
             <input className="form--input" type="text" placeholder="botton text"/>
             <button 
             className="form--button"
             onClick={getMemeImage}
             >Get a new meme image  🖼</button>
           </div>
        </main>
    )
}