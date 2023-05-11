import React from "react";

function NavSection({children}: {children: React.ReactNode}) {
  return (
    <div className='px-5 py-2 flex justify-between items-center'>
      {
        React.Children.map(children, (child, index) => (
          <div key={index} className='flex-auto mx-2' >{child}</div>
        ))
      }
    </div>
  )
}

export default NavSection;
