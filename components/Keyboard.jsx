import KeyRow from "./KeyRow";


export default function Keyboard({ setLetter, deleteLetter, validateLetters }) {
    return (
        <div>
            <KeyRow validateLetters={validateLetters} deleteLetter={deleteLetter} setLetter={setLetter} keys={[..."QWERTYUIOP"]}/>
            <KeyRow validateLetters={validateLetters} deleteLetter={deleteLetter} setLetter={setLetter} keys={[..."ASDFGHJKL"]}/>
            <KeyRow validateLetters={validateLetters} deleteLetter={deleteLetter} setLetter={setLetter} keys={["Delete",..."ZXCVBNM", "Enter"]}/>
        </div>
    );
}
