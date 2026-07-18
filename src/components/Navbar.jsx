 import { useState, useEffect } from 'react'
 
 const navItems = [
   { label: '关于我', href: '#about' },
   { label: '项目', href: '#projects' },
   { label: '优势', href: '#strengths' },
   { label: '荣誉', href: '#awards' },
   { label: '联系', href: '#contact' },
 ]
 
 export default function Navbar() {
   const [scrolled, setScrolled] = useState(false)
   const [active, setActive] = useState('')
 
   useEffect(() => {
     const handleScroll = () => {
       setScrolled(window.scrollY > 60)
       const current = navItems.find(item => {
         const el = document.getElementById(item.href.slice(1))
         if (!el) return false
         return el.getBoundingClientRect().top <= 200
       })
       if (current) setActive(current.href)
     }
     window.addEventListener('scroll', handleScroll, { passive: true })
     return () => window.removeEventListener('scroll', handleScroll)
   }, [])
 
   return (
     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
       <div className="navbar-inner">
         <a href="#" className="navbar-logo">CMH</a>
         <div className="navbar-links">
           {navItems.map(item => (
             <a key={item.href} href={item.href} className={`nav-link ${active === item.href ? 'active' : ''}`}>
               {item.label}
             </a>
           ))}
         </div>
         <a href="#contact" className="nav-cta">联系我</a>
       </div>
     </nav>
   )
 }
