import './App.css'
import Header from './Components/Header.tsx'
import Experiences from './Components/Experiences.tsx'
import Contact from './Components/Contact.tsx'
import Projects from './Components/Projects.tsx'


function App() {
  const student = 'Halgeir Geirson'
  const degree = 'Bachelor IT'
  const points = 180
  const experienceOne = 'Figma UI for customer X'
  const experienceTwo = 'Website for customer Y'
  const email = 'student@hiof.no'

  // const projectOne:  = {

  // }

  return (
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences experienceOne={experienceOne} experienceTwo={experienceTwo} />
      <Contact email={email} />
      <Projects />
    </div>
  )
}

export default App
