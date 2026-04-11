import React, { useEffect, useState } from 'react'

export const UseEffectDemo = () => {
    const[count,setCount]=useState(0)
    useEffect(()=>{
        console.log("use effest called....")
    },[count])
  return (
    <div style={{textAlign:"center"}}> 
          <h1> UseEffectDemo </h1>
          <button onClick={()=>{setCount(count+1)}}>Increment</button>
          <p>Count:{count}</p>
    </div>
  )
}
