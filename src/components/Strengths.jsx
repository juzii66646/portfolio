 const strengths = [
   {
     icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4L20 12L28 13L22 19L24 28L16 23L8 28L10 19L4 13L12 12L16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
     title: 'AI工具深度使用',
     desc: '日常深度使用Codex、Claude等AI工具辅助方案撰写、文档整理和逻辑拆解，通过结构化提示词高效引导AI输出。计算机专业背景，能理解AI技术原理。',
   },
   {
     icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M4 16H28M4 8H28M4 24H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 8V24M16 8V24M24 8V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/></svg>,
     title: '信息搜集与研究分析',
     desc: '有实际行业调研和竞品分析经验，能快速从多源渠道收集、整理信息，输出结构化竞品对比报告与用户调研报告。',
   },
   {
     icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 6V26M6 16H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5"/></svg>,
     title: '内容输出与文档撰写',
     desc: '擅长撰写调研报告、商业计划书、产品方案及需求文档，具备清晰的文字表达和结构化输出能力，能独立完成专业文档撰写。',
   },
   {
     icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 22L12 16L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 22H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
     title: '办公与项目推进',
     desc: '熟练使用Excel（数据透视表、VLOOKUP）、Word、PPT等工具。具备团队统筹与项目协调能力，曾担任班长和项目负责人推动多方协作。',
   },
 ]
 
 export default function Strengths() {
   return (
     <section className="strengths section" id="strengths">
       <div className="section-header">
         <span className="section-tag">Strengths</span>
         <h2 className="section-title">个人优势</h2>
         <p className="section-desc">我的核心能力与专业技能</p>
       </div>
       <div className="strengths-grid">
         {strengths.map((item, i) => (
           <div key={i} className="strength-card">
             <div className="strength-icon">{item.icon}</div>
             <h3 className="strength-title">{item.title}</h3>
             <p className="strength-desc">{item.desc}</p>
           </div>
         ))}
       </div>
     </section>
   )
 }
