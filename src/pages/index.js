import React, { useState, useEffect } from "react"
import "../styles/layout.css"
import CircuitBoard from "../assets/CircuitBoard.svg"
import { digit, multiply } from '../components/EIA96Codes';

export default function Home() {
  const [value, setValue] = useState('')
  const [output, setOutput] = useState('')
  const [decimal, setDecimal] = useState('')
  const [EIA96, setEIA96] = useState('')

  useEffect(() => {
    showOutput()
  })

  // Show output if value length is equal or bigger than 3, otherwise don't show resistance output
  const showOutput = () => {
    if (value.length >= 3) {
      calculateSMD()
      changeToDecimal()
      calculateEIA96()
    } else {
      setDecimal('')
      setOutput('')
      setEIA96('')
    }
  }
  
  // Update input change
  const valueChange = (e) => {
    // Only allow digits and character r
    const value = e.target.value.replace(/[^rzyxsabhcdef?0-9]/gi, "")

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

  const calculateEIA96 = () => {
    // Get the index of digit object from EIA96Codes.js
    const indexOfDigit = digit.map(x => x.code).indexOf(value.replace(/\D/gi, ""))
    // Get the value of index | If there's no value, return 'null', otherwise return value of index
    const valueOfIndexDigit = indexOfDigit === -1 ? 'null' : digit[indexOfDigit].value

    // Get the index of const multiply object from EIA96Codes.js
    const indexOfMultiply = multiply.map(x => x.code).indexOf((value.toUpperCase()).replace(/\d/gi, ""))
    // Get the value of index | If there's no value, return 'null', otherwise return value of index
    const valueOfIndexMultiply = indexOfMultiply === -1 ? 'null' : multiply[indexOfMultiply].value

    // Calculate values of digit and multiply
    const calculateEIA96 = Number(valueOfIndexDigit * valueOfIndexMultiply)

    setEIA96(`${formatNumber(calculateEIA96)} (≤1%)`)
  }

  // Display Calculated Reistance
  const displayOutput = (
    value.match(/r/g) 
      // Regex - show decimal if character r is matched
      ? decimal
      : value.match(/[zyxsabhcdef]/g)
      // Regex - show EIA96 if characters zyxsabgcdef are matched
      ? EIA96
      // Else show output
      : output
  )

  return (
    <div className="main">
      <div className="leftScreen">
        <h1 className="title">Enter SMD Code:</h1>
        <div className="smd">
          <span className="square left" />
          <input className="input" value={value} onChange={valueChange} maxLength='4' autoFocus spellCheck='false' />
          <span className="square right" />
        </div>
        <h1 className="output">Resistance: <span className="bold">{displayOutput}</span></h1>
      </div>
      <div className="rightScreen">
        <CircuitBoard />
      </div>
    </div>
  )
}
