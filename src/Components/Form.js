import React from "react";
import html2canvas from 'html2canvas';
import "./Form.css"
import MemeData from "../Memedata"




export default function Form(){

    const exportAsPicture = () => {
        // const html = document.getElementsByTagName('HTML')[0];
        // const body =  document.getElementsByTagName('BODY')[0]
        //let htmlWidth = html.clientWidth;
        //let bodyWidth = body.clientWidth;

        const data = document.getElementById('card')
        //const newWidth = data.scrollWidth - data.clientWidth


        // if (newWidth > data.clientWidth){
        //     htmlWidth += newWidth
        //     bodyWidth += newWidth
        // }

        // html.style.width = htmlWidth + 'px'
        // body.style.width = bodyWidth + 'px'
        

        html2canvas(data, {
            logging: true,
            letterRendering: 1,
        
            useCORS: true,
          }).then((canvas)=>{
            return canvas.toDataURL('image/jpg', 1.0)
        }).then((image)=>{
            saveAs(image, 'mymeme.jpg')
            // html.style.width = null
            // body.style.width = null
        })
        
    }

    const saveAs = (blob, fileName) =>{
        const elem = window.document.createElement('a');
        elem.href = blob
        elem.download = fileName;
        (document.body || document.documentElement).appendChild(elem);
        if (typeof elem.click === 'function') {
            elem.click();
        } else {
            elem.target = '_blank';
            elem.dispatchEvent(new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            }));
        }
        URL.revokeObjectURL(elem.href);
        elem.remove()
    }



    const [meme, setMeme] = React.useState({
       topText:"",
       bottomText:"",
       randomImage:"https://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes]= React.useState(MemeData)

    //const [memeImage, setMemeImage] = React.useState("")

    // function getMemeImage(){
    // const memeArray = allMemeImages.data.memes
    //  const randomNumber = Math.floor(Math.random()*memeArray.length) 
    //  const url = memeArray[randomNumber].url
    //  setMeme(preMeme => ({
    //    ...preMeme,
    //    randomImage:url
    //  }))
     
    //} 
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

   

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
           <div className="container">
                <div id="card"  className="meme card">
                    <img crossOrigin="anonymous" src={meme.randomImage} className="form--image" alt="meme"/>
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </div>
           <div>
        <button className="button--dw" onClick={exportAsPicture}>Download Meme</button>
      </div>
        </main>
    )
}
