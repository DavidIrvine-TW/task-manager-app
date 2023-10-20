import React from 'react'

const DrkMdSwitch = ({checked, toggle}) => {

  return (
    <label className=" flex items-center tablet:ml-[1.625rem] relative w-[44px] h-[24px]" aria-label="Dark mode">
        <input className="peer opacity-0 w-0 h-0" type="checkbox" checked={checked} onChange={toggle} />
        <span className="absolute cursor-pointer inset-0 rounded-[12px] bg-lghtsecondary dark:bg-drkbackground-950 before:absolute 
        before:content-[''] before:h-[20px] before:w-[20px] before:rounded-full before:left-[2px] 
        before:bottom-[2px] before:bg-black peer-focus-visible:bg-violet-500 peer-checked:before:translate-x-[20px] 
        before:transition-all"></span>
      </label>
  )
}

export default DrkMdSwitch