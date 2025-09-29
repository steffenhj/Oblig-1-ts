import './App.css'
import Header from './Components/Header.tsx'
import Layout from './Components/Layout.tsx'
import HomePage from './Features/Portfolio/HomePage.tsx'




function App() {


  return (
    <>
      <Layout>
        <Header /> 
        <HomePage />
      </Layout>
    </>
  )
}

export default App
