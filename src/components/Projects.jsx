 const projects = [
   {
     id: 1,
     title: '医疗废物管理系统',
     subtitle: '项目负责人 · 2026.03~2026.04',
     techStack: 'Spring Boot + MyBatis + MySQL + ECharts + WebSocket',
     tags: ['需求文档', '业务流程图', '30+测试用例', '2项功能迭代'],
     desc: '基于Spring Boot + MyBatis + MySQL + ECharts的医疗废物全流程管理平台，覆盖科室收集、入库暂存、装车运出全生命周期，含台账管理、设备监控、数据统计大屏等模块。统筹5人团队从需求调研到上线全流程，设计执行30+条测试用例覆盖核心场景，推动2项功能迭代，核心功能上线通过率100%。',
     accent: '#4f8cff',
   },
   {
     id: 2,
     title: '"南桂司晨" 创新创业项目',
     subtitle: '项目成员 · 2024.03~2024.12',
     tags: ['市场调研', '竞品分析报告', '50+页商业计划书', '路演PPT'],
     desc: '将肉桂加工后的废料资源化利用，制成新型中草药饲料用于林下养殖"肉桂鸡"，实现农业废弃物价值转化。主导完成5款以上同类产品竞品分析，通过问卷收集50+份用户数据并输出调研报告，基于调研结论设计产品方案并输出50+页商业计划书及路演PPT。',
     accent: '#7c5cfc',
     achievement: '获第九届"创客中国"生物医药大赛创客组全国50强',
     pdf: './nangui.pdf',
     pdfLabel: '查看PPT',
   },
   {
     id: 3,
     title: 'AI研究与工具应用实践',
     subtitle: '深度使用 · 持续探索',
     tags: ['AI工具评测', '提示词工程', '内容输出', '逻辑拆解'],
     desc: '日常深度使用Codex、Claude等AI工具辅助方案撰写、文档整理、竞品调研和逻辑拆解。通过结构化提示词（Prompt Engineering）高效引导AI输出，探索AI在内容创作、信息分析、文档生成等工作流中的最佳实践，有丰富的实际使用场景和持续研究习惯。',
     accent: '#06b6d4',
   },
   {
     id: 4,
     title: '牛转乾坤【彩云汇】',
     subtitle: '创新创业项目',
     tags: ['项目路演PPT', '商业计划'],
     desc: '创新创业项目完整展示PPT，包含项目概述、市场分析、产品方案等内容。',
     accent: '#f59e0b',
     pdf: './niuzhuan.pdf',
     pdfLabel: '查看PPT',
   },
 ]
 
 export default function Projects() {
   return (
     <section className="projects section" id="projects">
       <div className="section-header">
         <span className="section-tag">Projects</span>
         <h2 className="section-title">项目经历</h2>
         <p className="section-desc">我的项目实践与研究成果</p>
       </div>
 
       <div className="projects-grid">
         {projects.map((p) => (
           <article key={p.id} className="project-card" style={{ '--accent': p.accent }}>
             <div className="project-number">0{p.id}</div>
             <div className="project-content">
               <h3 className="project-title">{p.title}</h3>
               <p className="project-subtitle">{p.subtitle}</p>
               {p.techStack && <p className="project-tech">{p.techStack}</p>}
               <p className="project-desc">{p.desc}</p>
               {p.achievement && <p className="project-achievement">{p.achievement}</p>}
               {p.pdf && (
                 <a href={p.pdf} target="_blank" rel="noopener noreferrer" className="project-pdf-btn">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                   {p.pdfLabel}
                 </a>
               )}
               <div className="project-tags">
                 {p.tags.map(tag => (
                   <span key={tag} className="project-tag">{tag}</span>
                 ))}
               </div>
             </div>
             <div className="project-accent-bar" />
           </article>
         ))}
       </div>
     </section>
   )
 }
