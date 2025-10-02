import React from 'react'

export default function SectionTitle({title,subtitle}:{title:string,subtitle:string}) {
  return (
    <div className='section-title mb-15'>
        <h2 className=" text-lg mb-5 ps-9 font-semibold text-red-500 relative before:content-[''] before:absolute before:start-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-10 before:bg-red-500 before:rounded-sm" >{title}</h2>
        <span className='text-4xl font-semibold'>{subtitle}</span>
    </div>
  )
}
