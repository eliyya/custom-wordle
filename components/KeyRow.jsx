import Key from "./Key";

export default function KeyRow({keys, setLetter, deleteLetter, validateLetters}) {
    return (
        <div className="flex flex-row w-full justify-center text-2xl">
            {keys.map((l) => (
                <Key validateLetters={validateLetters} deleteLetter={deleteLetter}  setLetter={setLetter} key={l}>{l}</Key>
            ))}
        </div>
    );
}
