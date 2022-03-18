import { useState } from "react";
import Display from "../components/Display";
import Keyboard from "../components/Keyboard";
import confeti from 'canvas-confetti'
import { useEffect } from "react";
import { useCallback } from "react";

export default function Home() {

    const [posibleWords, setPosibleWords] = useLocalStorage('posibleWords', 'wordle')

    const getWord = useCallback(() => {
        const pw = posibleWords.split(/ +/gi)
        let p = pw[Math.floor(Math.random() * pw.length)]
        return p.toUpperCase()
    }, [posibleWords])

    const [words, setWords] = useState([]);
    const [realWord, setWord] = useState(getWord());
    const [colors, setColors] = useState([]);
    const [row, setRow] = useState(0);
    const [win, setWin] = useState(false)
    const [with_nav, setNav] = useState(false)

    const command = useCallback((e) => {
        if (e.shiftKey && (e.key == 'z' || e.key == 'Z')) {
            setNav(!with_nav)
            localStorage.setItem('with_nav', !with_nav)
        }
    }, [with_nav])

    const setLetter = useCallback(({ target: { innerHTML: letter } }) => {
        if (with_nav) return
        if (win) return
        if (words[row].replace(/ +/g, "").length === realWord.length) return;
        let w = words[row];
        if (!w) w = letter;
        else w = w.replace(/ +/g, "") + letter;
        w += " ".repeat(realWord.length - w.length);
        let newWords = [...words];
        newWords[row] = w;
        setWords(newWords);
        // const pwls = localStorage.getItem('posibleWords')?.split(/ +/gi)??[]
        // if (posibleWords.length === 0 && pwls.length > 0) setPosibleWords(pwls)
        // else if (posibleWords.length === 0) setPosibleWords(["wordle"])
    }, [realWord, row, with_nav, win, words])

    const deleteLetter = useCallback(() => {
        if (with_nav) return
        if (win) return
        if (words[row].replace(/ +/g, "").length === 0) return
        let w = words[row].replace(/ +/g, "")
        w = w.substring(0, w.length-1)
        w += " ".repeat(realWord.length - w.length);
        let newWords = [...words];
        newWords[row] = w;
        setWords(newWords);
    }, [realWord, row, with_nav, win, words])

    const validateLetters = useCallback(() => {
        if (with_nav) return
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
            confeti({ particleCount: 600, spread: 180 })
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
    }, [colors, getWord, realWord, row, win, words, with_nav])

    const changeWords = (e) => {
        // localStorage.setItem('posibleWords', e.target.value)
        setPosibleWords(e.target.value)
    }

    useEffect(() => {
        document.getElementsByTagName('body')[0].onkeydown = (e) => {
            if (e.ctrlKey) command(e)
            else if(Array.from('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM').includes(e.key)) setLetter({target:{innerHTML:e.key.toUpperCase()}})
            else if (e.key == 'Backspace') deleteLetter()
            else if (e.key == 'Enter') validateLetters()
        }
        setNav(localStorage.getItem('with_nav') == 'true')
    }, [command, deleteLetter, setLetter, validateLetters])

    return (
        <div className="h-screen bg-gray-800 flex flex-row justify-center bg-[url('/img/wallpaper.jpg')] bg-cover bg-center">
            <main className="max-w-xl flex flex-col justify-between h-full">
                {with_nav ? <nav className="h-16 w-full bg-white flex flex-row justify-center">
                    <input onChange={changeWords} value={posibleWords.join(' ')} className="border-slate-800 m-3 w-full text-center" id="wrds" type="text" />
                    {/* <button onClick={changeWords} className="bg-green-500 m-3 px-2" >Guardar</button> */}
                </nav> : <div></div>}
                <Display colors={colors} words={words} realWord={realWord} />
                <Keyboard validateLetters={validateLetters} setLetter={setLetter} deleteLetter={deleteLetter}/>
                <div></div>
            </main>
        </div>
    );
}

function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }