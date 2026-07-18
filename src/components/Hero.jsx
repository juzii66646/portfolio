 export default function Hero() {
   return (
     <section className="hero" id="hero">
       <div className="hero-bg">
         <div className="hero-grid" />
         <div className="hero-gradient" />
         <div className="hero-orb" />
       </div>
       <div className="hero-content">
         <p className="hero-badge">广东药科大学 · 计算机科学与技术专业 · 2027届</p>
         <h1 className="hero-title">
           <span className="hero-title-line">AI研究与运营方向</span>
           <span className="hero-title-name">陈美焕</span>
         </h1>
         <p className="hero-subtitle">
           正在寻找AI方向实习 · 可实习6个月以上 · 现居广州市白云区
         </p>
         <div className="hero-actions">
           <a href="#projects" className="btn btn-primary">查看项目</a>
           <a href="#contact" className="btn btn-outline">联系我</a>
         </div>
       </div>
       <div className="hero-scroll-indicator">
         <span>向下滚动</span>
         <div className="scroll-arrow" />
       </div>
     </section>
   )
 }
