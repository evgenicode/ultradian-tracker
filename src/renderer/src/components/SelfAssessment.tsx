// import React from "react"

const GaugeScale = (scale):any => {
  
  return scale
}

const handleClick = () => {
  alert("clicked!")
}

export const SelfAssesment = () => {
  return (
    <>
      <h1>Energy Flow</h1>
      <button onClick={handleClick} className="btn">1</button>
      {/* <GaugeScale scale={1} /> */}
    </>
  )
}