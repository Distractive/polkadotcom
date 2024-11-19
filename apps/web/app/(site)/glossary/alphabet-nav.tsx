import Link from "next/link"

export default function AlphabetNav({
  availableLetters,
}: {
  availableLetters: string[]
}) {
  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

  return (
    <div className="mb-12 flex flex-wrap gap-7 text-lg md:gap-4">
      {alphabet.map((letter) => {
        const isAvailable = availableLetters.includes(letter)

        return isAvailable ? (
          <Link
            key={letter}
            href={`#section-${letter}`}
            className="font-bold transition-colors hover:text-pink"
          >
            {letter}
          </Link>
        ) : (
          <span key={letter} className="cursor-default text-grey-400">
            {letter}
          </span>
        )
      })}
    </div>
  )
}
