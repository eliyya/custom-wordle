import { useState } from "react";
import Display from "../components/Display";
import Keyboard from "../components/Keyboard";

export default function Home() {
    const posibleWords = ["trevol"];
    const realWord = (posibleWords[Math.floor(Math.random() * posibleWords.length)]??"wordle").toUpperCase()
    const [words, setWord] = useState([]);
    const [colors, setColors] = useState([]);
    const [row, setRow] = useState(0);

    const setLetter = ({ target: { innerHTML: letter } }) => {
        if (words[row].replace(/ +/g, "").length === realWord.length) return;
        let w = words[row];
        if (!w) w = letter;
        else w = w.replace(/ +/g, "") + letter;
        w += " ".repeat(realWord.length - w.length);
        let newWords = [...words];
        newWords[row] = w;
        setWord(newWords);
    };

    const deleteLetter = () => {
        if (words[row].replace(/ +/g, "").length === 0) return
        let w = words[row].replace(/ +/g, "")
        w = w.substring(0, w.length-1)
        w += " ".repeat(realWord.length - w.length);
        let newWords = [...words];
        newWords[row] = w;
        setWord(newWords);
    }

    const validateLetters = () => {
        if (words[row].replace(/ +/g, "").length !== realWord.length) return
        let newColors = []
        for (let i = 0; i < realWord.length; i++) {
            if (realWord[i] === words[row][i]) newColors.push('v')
            else if (realWord.includes(words[row][i])) newColors.push('a')  
            else newColors.push('g')
        }
        setRow(row+1)
        setColors([...colors, newColors])
    }
    return (
        <div className="h-screen bg-gray-800 flex flex-row justify-center">
            <main className="max-w-xl flex flex-col justify-evenly h-full">
                <Display colors={colors} words={words} realWord={realWord} />
                <Keyboard validateLetters={validateLetters} setLetter={setLetter} deleteLetter={deleteLetter}/>
            </main>
        </div>
    );
}
