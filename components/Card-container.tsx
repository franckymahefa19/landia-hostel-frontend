import React from 'react'
const CardContainer = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='p-2 pb-3 border border-border/50 shadow rounded-lg mt-4'>{children}</div>
  )
}

export default CardContainer