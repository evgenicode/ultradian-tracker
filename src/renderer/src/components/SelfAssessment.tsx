import React from "react";
// import { addUserMark } from "../ipcService";

const GaugeScale = ({scale}: { scale: number }) => {
  const buttons = Array.from({ length: scale }, (_, i ) => (
    <button key={i} onClick={ () => handleClick(i) } className="btn">
      {i + 1}
    </button>
  ));
  return <div>{buttons}</div>
}

const handleClick = async (i: number) => {
  const grade = i + 1;
  const newMark = { 
    mark: grade, 
    timestamp: new Date().toISOString(), 
    date: new Date().toLocaleDateString() 
  };
  const result = await (window as any).api.addUserMark(newMark.mark, newMark.timestamp, newMark.date).catch((error: Error) => {
    console.error("failed to add mark", error);
  });
  console.log(`clicked!${grade}`)
  if (result) {
    console.log("sent to db", result);
  }
};


export const SelfAssesment = () => {
  return (
    <>
      <h1>Energy Flow</h1>
      
      <GaugeScale scale={10} />
    </>
  )
}