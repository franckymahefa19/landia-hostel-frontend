"use client";
import Typewriter from "typewriter-effect";

const TextHeading = ({ descriptions }: {
    descriptions: string[]
}) => {
  return (
    <div>
        <h1 className="font-bold text-lg">Gestion des chambres</h1>
        <span className="text-xs text-muted-foreground">
          <Typewriter
            options={{
              strings: descriptions,
              autoStart: true,
              loop: true,
              delay: 30,
              deleteSpeed: 25,
            }}
          />
        </span>
      </div>
  )
}

export default TextHeading