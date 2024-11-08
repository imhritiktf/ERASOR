import { ArrowRight } from 'lucide-react'
import React from 'react'

const Hero = () => {
  return (
    <section className="bg-black">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[90.1vh] lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h2 className='text-white border w-fit mx-auto px-5 py-2 mb-10 rounded-full'>See What's New | <span className='text-sky-400'>AI Diagram</span></h2>
        <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
          <strong className="font-extrabold  sm:block text-sky-300">AI co-pilot </strong>
           for technical design.
        </h1>
  
        <p className="mt-7 sm:text-xl/relaxed text-white">
        Deliver accurate, consistent designs faster 
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className=" flex gap-2 justify-center items-center
             w-full rounded bg-white px-8 py-3 text-sm font-medium text-black shadow hover:bg-slate-300 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="#"
          >
           Try Eraser <ArrowRight width={18}/>
          </a>
  
          
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero