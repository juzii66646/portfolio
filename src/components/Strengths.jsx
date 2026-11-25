const strengths = [
  {
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M10 10l-5 6 5 6M22 10l5 6-5 6M18 6l-4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: '技术栈',
    desc: 'Python / REST API / MySQL / JavaScript / Vue3 / Git / Postman',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M14 4l2.2 6.2L22 12l-5.8 1.8L14 20l-1.8-6.2L6 12l6.2-1.8L14 4zM23 18l1.1 3.1L27 22l-2.9.9L23 26l-1.1-3.1L19 22l2.9-.9L23 18z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    title: 'AI 能力',
    desc: 'AI Agent 工作流设计、多数据源对接、RCA 根因分析、语义检索（加权匹配算法）、Prompt Engineering',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 3L27 9.5v13L16 29 5 22.5v-13L16 3zM5 9.5l11 6.5 11-6.5M16 16v13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    title: '产品能力',
    desc: '需求拆解、独立开发交付、Vibe Coding 快速原型、移动端交互设计、数据驱动优化',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M5 27V17M13 27V7M21 27V13M29 27V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: '数据能力',
    desc: '数据过滤引擎（95%+）、增量同步、账务对账（误差 0%）、知识库治理（479 条分级分类）',
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
