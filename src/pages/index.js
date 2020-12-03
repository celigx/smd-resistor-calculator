import React, { useState, useEffect } from "react"

export default function Home() {
  const [value, setValue] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    calculateSMD()
  })
  
  // Update input change
  const valueChange = (e) => {
    setValue(e.target.value)
  }

  const calculateSMD = () => {
    // Remove last number
    const mainNumber = parseInt(value.toString().slice(0, -1))
    // Get last number
    const lastNumber = parseInt(value.toString().split('').pop())
    // Calculate SMD
    const calculate = mainNumber * Math.pow(10, lastNumber)

    setOutput(calculate)
  }

  return (
  <div>
    <h1>Enter SMD Code:</h1>
    <input value={value} maxLength='4' onChange={valueChange} />
    <h1>{output}</h1>
  </div>
  )
}