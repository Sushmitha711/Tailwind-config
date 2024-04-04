import React from 'react'

const Loading = () => {

  const theme=localStorage.getItem("Theme")
  return (
    <div className='flex items-center justify-center h-full backdrop-opacity-10 backdrop-invert bg-white/30 '>
        <lord-icon
    src="https://cdn.lordicon.com/jkppkiom.json"
    trigger="loop"
    colors={`primary:${theme === 'dark' ? '#ffffff' : '#000000'}`}
    state="loop-triangle"
    style={{width:"40px",height:"40px"}}>
</lord-icon>
    </div>
  )
}

export default Loading