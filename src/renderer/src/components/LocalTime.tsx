import React  from 'react'
import { useState, useEffect } from "react"


export const LocalTime = (): JSX.Element => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000)

    return () => clearInterval(timer); //cleanup on unmount
  }, [])

  return (
    <>
      <h1>Local Time component goes here</h1>
      <div>Current time: {time}</div>
    </>
  )
}
