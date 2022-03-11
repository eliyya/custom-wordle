import Word from "./Word";

/**
 * Returns a table whit words
 * @param {{words:string[];realWord:string}} params
 * @returns {Display}
 */
export default function Display({ words, realWord, colors }) {
    console.log('dd', colors);
    if (words.length < 6) for (let i = words.length; i < 6; i++) words.push(" ".repeat(realWord.length))

    return (
        <div className="flex flex-row w-full justify-center">
            <div>
                {words.map((word, i) => (
                    <Word wid={i} key={i} colors={colors[i]} word={word} />
                ))}
            </div>
        </div>
    );
}
