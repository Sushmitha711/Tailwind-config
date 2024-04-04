import React from 'react';

const NotFound = (position) => {
  return (
    <div className='flex justify-center bg-slate-50 items-center z-50 absolute top-0 left-0 right-0 h-screen w-full'>
        <div className='text-center'>
        This page does not exist. It may have been removed by the author.
        </div>
    </div>
  )
}

export default NotFound;