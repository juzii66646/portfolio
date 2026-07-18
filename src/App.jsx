 import Navbar from './components/Navbar'
 import Hero from './components/Hero'
 import About from './components/About'
 import Projects from './components/Projects'
 import Strengths from './components/Strengths'
 import Awards from './components/Awards'
 import Contact from './components/Contact'
 
 function App() {
   return (
     <div className="app">
       <Navbar />
       <main>
         <Hero />
         <About />
         <Projects />
         <Strengths />
         <Awards />
       </main>
       <Contact />
     </div>
   )
 }
 
 export default App
