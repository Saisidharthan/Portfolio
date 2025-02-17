import { motion } from "framer-motion"
import { PROJECTS } from "../constants"

const Projects = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
        <motion.h2 
        whileInView={{opacity:1,y:0}}
        initial={{opacity:0,y:-100}}
        transition={{duration:0.5}}
        className="my-20 text-center text-4xl">
            Projects
        </motion.h2>
        <div>
            {PROJECTS.map((project,index)=>(
                <div key={index} className="mb-12 flex flex-wrap lg:justify-center">
                    <motion.div whileInView={{opacity:1,x:0}}
                    initial={{opacity:0,x:-100}}
                    transition={{duration:1}}
                     className="w-full lg:w-1/4 sm:mr-10">
                        <img src={project.image} width={300} height={300} alt={project.title} className="mb-6 rounded" />
                    </motion.div>
                    <motion.div
                    whileInView={{opacity:1,x:0}}
                    initial={{opacity:0,x:100}}
                    transition={{duration:1}}
                     className="w-full max-w-xl lg:w-3/4 flex flex-wrap ">
                        <h6 className="mb-4 font-semibold text-xl text-white">{project.title}</h6>
                        <p className="mb-6 text-neutral-400">{project.description}</p>
                        {project.technologies.map((tech,index)=>(
                            <span key={index} className="mr-2 rounded bg-neutral-900 px-2 py-0.5 text-base font-medium text-purple-900 mt-2">{tech}</span>
                        ))}
                    </motion.div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Projects