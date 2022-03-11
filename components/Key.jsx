export default function key({ children, setLetter, deleteLetter, validateLetters }) {
    return children.length > 1 ? (
        <div
            onClick={
                children.length === 1 ? setLetter : children.toLowerCase() === "delete" ? deleteLetter : validateLetters
            }
            className="w-24 h-14 bg-slate-600 m-0.5 flex content-center justify-center items-center border rounded text-gray-300"
        >
            {children}
        </div>
    ) : (
        <div
            onClick={
                children.length === 1 ? setLetter : children.toLowerCase() === "delete" ? deleteLetter : validateLetters
            }
            className="w-14 h-14 font-semibold bg-slate-600 m-0.5 flex content-center justify-center items-center border rounded-md text-gray-300"
        >
            {children}
        </div>
    );
}
