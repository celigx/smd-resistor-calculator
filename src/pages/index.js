import React, { useState } from "react"

export default function Home() {
  const [value, setValue] = useState('');
  
  // Update input change
  const valueChange = (e) => {
    setValue(e.target.value)
  }
  console.log('input:', value)

  return (
  <div>
    <h1>Enter SMD Code:</h1>
    <input value={value} maxLength='4' onChange={valueChange} />
  </div>
  )
}
