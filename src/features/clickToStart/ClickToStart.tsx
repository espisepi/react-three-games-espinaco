import { useState } from "react"
import type { FC, ChangeEvent, ReactNode } from "react"

interface ClickToStartProps {
  password?: string
  children: ReactNode
}

export const ClickToStart: FC<ClickToStartProps> = ({
  password = "",
  children,
}) => {
  // Estado para determinar si se ha hecho clic
  const [clicked, setClicked] = useState(false)

  // Estado para manejar el valor del input
  const [inputValue, setInputValue] = useState("")

  // Maneja el cambio de valor en el input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    if (value === password) {
      setClicked(true)
    }
  }

  if (clicked) {
    return <>{children}</>
  } else if (password === "") {
    return (
      <>
        <div
          className="background-initial"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            color: "white",
            backgroundColor: "#500050",
            backgroundImage: 'url("images/portada.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => setClicked(true)}
        >
          <h1 style={{ cursor: "pointer" }}>Click to Start</h1>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            color: "white",
            backgroundColor: "#500050",
            backgroundImage: 'url("images/portada.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 style={{ cursor: "pointer" }}>Enter Password</h1>
          <input type="text" value={inputValue} onChange={handleChange} />
        </div>
      </>
    )
  }
}
