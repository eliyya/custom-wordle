import { useState } from "react";
import Display from "../components/Display";
import Keyboard from "../components/Keyboard";
import confeti from 'canvas-confetti'

export default function Home() {
    const posibleWords = ["trevol", "trevoles"];
    const getWord = () => (posibleWords[Math.floor(Math.random() * posibleWords.length)]??"wordle").toUpperCase()
    const [words, setWords] = useState([]);
    const [realWord, setWord] = useState(getWord());
    const [colors, setColors] = useState([]);
    const [row, setRow] = useState(0);
    const [win, setWin] = useState(false)

    const setLetter = ({ target: { innerHTML: letter } }) => {
        if (win) return
        if (words[row].replace(/ +/g, "").length === realWord.length) return;
        let w = words[row];
        if (!w) w = letter;
        else w = w.replace(/ +/g, "") + letter;
        w += " ".repeat(realWord.length - w.length);
        let newWords = [...words];
        newWords[row] = w;
        setWords(newWords);
    };

    const deleteLetter = () => {
        if (win) return
        if (words[row].replace(/ +/g, "").length === 0) return
        let w = words[row].replace(/ +/g, "")
        w = w.substring(0, w.length-1)
        w += " ".repeat(realWord.length - w.length);
        let newWords = [...words];
        newWords[row] = w;
        setWords(newWords);
    }

    const validateLetters = () => {
        if (win) return
        if (words[row].replace(/ +/g, "").length !== realWord.length) return
        let newColors = []
        for (let i = 0; i < realWord.length; i++) {
            if (realWord[i] === words[row][i]) newColors.push('v')
            else if (realWord.includes(words[row][i])) newColors.push('a')  
            else newColors.push('g')
        }
        if (!newColors.includes('g') && !newColors.includes('a')) {
            setColors([...colors, newColors])
            setWin(true)
            confeti({ particleCount: 300, spread: 180 })
            setTimeout(() => {
                setWin(false)
                setColors([])
                setRow(0)
                setWord(getWord())
                setWords([])
            }, 5_000)
        } else {
            setColors([...colors, newColors])
            setRow(row+1)
            console.log(row);
            if (row === 5) {
                setWin(true)
                setTimeout(() => {
                    setWin(false)
                    setColors([])
                    setRow(0)
                    setWord(getWord())
                    setWords([])
                }, 3_000)
            }
        }
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