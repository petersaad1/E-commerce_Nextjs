import React from 'react'
import { HashLoader } from 'react-spinners'

function loading() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <HashLoader color="green" size={80} />
    </div>
  )
}

export default loading