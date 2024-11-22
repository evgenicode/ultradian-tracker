// import React from "react"

const GaugeScale = ({scale}: { scale: number }) => {
  const buttons = Array.from({ length: scale }, (_, i ) => (
    <button key={i} onClick={ () => handleClick(i) } className="btn">
      {i + 1}
    </button>
  ));
  return <div>{buttons}</div>
}

const handleClick = (i: number) => {
  console.log(`clicked!${i + 1}`)
}


export const SelfAssesment = () => {
  return (
    <>
      <h1>Energy Flow</h1>
      
      <GaugeScale scale={10} />
    </>
  )
}