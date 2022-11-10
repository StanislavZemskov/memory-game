import './App.css';
import Board from "./components/Board";
import {useEffect, useState} from "react";

function App() {

    const faces = ['😁', '🌈', '🍒', '🎯 ', '🎃', '🚀']

    const [field, setField] = useState([])

    const [score, setScore]= useState([])


    function startGame(){
        const newField = new Array(12).fill(null).map(el =>({
            id: Math.random(),
            name: '',
            isOpen: false
        }))
        if(newField )
            for(let i=0; i < faces.length; i++){
                for(let j=0; j<2; j++) {
                    let index
                        do {
                        index = [Math.trunc(Math.random() * 12)]
                    }
                        while (newField[index].name !== '')
                        newField[index].name = faces[i]
                }
        }
       setField(newField)
        setHistory([])
    }

    const [history, setHistory] = useState([])

    const openCard = (id) => {
        if(field.filter(el => el.id === id)[0].isOpen === false){
        const newField = field.map(el => el.id === id  ? {...el, isOpen: true} : el)
        setField(newField)
        setHistory([...history, newField.filter(el => el.id === id)[0].name])
    }
}
    console.log(history)

    const checkPairs = () => {
        if(history.length % 2 === 0) {
            if (history[history.length - 1] !== history[history.length - 2]) {
                const newField = field.map(el =>
                    el.name === history[history.length - 1] || el.name === history[history.length - 2]
                        ? {...el, isOpen: false} : el)
                setField(newField)
            }
        }
    }

    function counterScore(){
        if(field.filter(el => el.isOpen === true).length === 12){
            setScore([...score, history.length/2])
        }
    }

    useEffect(() =>{
        if(history.length % 2 === 0) {
            setTimeout(() => {
                checkPairs()
            }, 500)
        }
        counterScore()
    },[history])

  return (
    <div className="App">

        <button onClick={startGame}>{field.length === 0 ? 'Start Game' : 'Restart'}</button>

      <Board field={field}
             openCard={openCard}/>

        <h2>
            {field.filter(el => el.isOpen === true).length === 12 ? 'Congrats!' : ''}
        </h2>

        <div>
            {score.length === 0 ? '' : `Your score ${score.join(', ')}`}
        </div>

    </div>
  );
}

export default App
