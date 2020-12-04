import React, { useState, useEffect } from "react"
import "../styles/layout.css"
import CircuitBoard from "../assets/CircuitBoard.svg"

export default function Home() {
  const [value, setValue] = useState('')
  const [output, setOutput] = useState('')
  const [decimal, setDecimal] = useState('')

  useEffect(() => {
    showOutput()
  })

  // Show output if value length is equal or bigger than 3, otherwise don't show resistance output
  const showOutput = () => {
    if (value.length >= 3) {
      calculateSMD()
      changeToDecimal()
    } else {
      setDecimal('')
      setOutput('')
    }
  }
  
  // Update input change
  const valueChange = (e) => {
    // Only allow digits and character r
    const value = e.target.value.replace(/[^r?0-9]/gi, "")

    setValue(value)
  }

  // Format number to add k instead of thousand (1000 => 1kΩ) etc.
  const formatNumber = (num) => {
    // Billion
    return Math.abs(num) >= 1.0e+9

      ? Math.abs(num) / 1.0e+9 + 'GΩ'
      // Million
      : Math.abs(num) >= 1.0e+6

      ? Math.abs(num) / 1.0e+6 + 'MΩ'
      // Thousand
      : Math.abs(num) >= 1.0e+3

      ? Math.abs(num) / 1.0e+3 + 'kΩ'
      : Math.abs(num) + 'Ω'
  }

  const changeToDecimal = () => {
    // Replace letter R with a dot
    const letter = value.toString().toUpperCase()
    const replaceLetter = `${+letter.replace('R', '.')}Ω`

    setDecimal(replaceLetter)
  }

  const calculateSMD = () => {
    // Remove last number
    const mainNumber = parseInt(value.toString().slice(0, -1))
    // Get last number
    const lastNumber = parseInt(value.toString().split('').pop())
    // Calculate SMD
    const calculate = mainNumber * Math.pow(10, lastNumber)

    setOutput(formatNumber(calculate))
  }

  return (
    <div className="main">
      <div className="leftScreen">
        <h1 className="title">Enter SMD Code:</h1>
        <div className="smd">
          <span className="square left" />
          <input className="input" value={value} onChange={valueChange} maxLength='4' autoFocus />
          <span className="square right" />
        </div>
        <h1 className="output">Resistance: <span className="bold">{value.match(/[a-zA-Z]/g) ? decimal : output}</span></h1>
      </div>
      <div className="rightScreen">
        <CircuitBoard />
      </div>
    </div>
  )
}
