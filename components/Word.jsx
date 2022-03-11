export default function Word({ word, colors, wid }) {
    return (
        <div className="flex flex-row">
            {Array.from(word).map((letter, i) => (
                <div
                    className={`w-14 h-14 ${
                        !colors
                            ? "bg-slate-800"
                            : colors[i] === "v"
                            ? "bg-green-500"
                            : colors[i] === "a"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                    }  m-0.5 flex content-center justify-center items-center border-2`}
                    key={i}
                >
                    <p className="text-gray-300 font-extrabold text-2xl">{letter.toUpperCase()}</p>
                </div>
            ))}
        </div>
    );
}
