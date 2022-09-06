import React from "react";
import "./Form.css"
import MemeData from "../Memedata"

export default function Form(){
    const [meme, setMeme] = React.useState({
       topText:"",
       bottomText:"",
       randomImage:"https://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImages, setAllMemesImages]= React.useState(MemeData)

    //const [memeImage, setMemeImage] = React.useState("")

    function getMemeImage(){
      const memeArray = allMemeImages.data.memes
      const randomNumber = Math.floor(Math.random()*memeArray.length) 
      const url = memeArray[randomNumber].url
      setMeme(preMeme => ({
        ...preMeme,
        randomImage:url
      }))
     
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(preMeme => ({
            ...preMeme,
            [name]:value
          }))
    }
    return(
        <main>
           <div className="form">
             <input 
                className="form--input" 
                type="text" 
                placeholder="top text"
                name="topText"
                value={meme.topText}
                onChange={handleChange}
             />
             <input 
                className="form--input" 
                type="text" 
                placeholder="botton text"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
             />
             <button 
             className="form--button"
             onClick={getMemeImage}
             >Get a new meme image  🖼</button>
           </div>
           <div className="meme">
            <img src={meme.randomImage} className="form--image"/>
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
           </div>
        </main>
    )
}