export default function About() {
  return (
    <section className="about section" id="about">
      <div className="section-header">
        <span className="section-tag">About</span>
        <h2 className="section-title">关于我</h2>
        <p className="section-desc">了解我的背景与经历</p>
      </div>

      <div className="about-grid">
        <div className="about-avatar-col">
          <div className="about-avatar">
            <img src="./photo.png" alt="头像" className="avatar-img" />
          </div>
          <div className="about-contact">
            <h3>联系方式</h3>
            <div className="contact-item">
              <span className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a1.998 1.998 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </span>
              <span>18420014770</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6l8 6 8-6M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M4 6h16"/></svg>
              </span>
              <span>1039735432@qq.com</span>
            </div>
          </div>
          <div className="about-personal">
            <h3>基本信息</h3>
            <p>2004.10 · 共青团员 · 广州市白云区</p>
          </div>
        </div>

        <div className="about-info-col">
          <div className="about-bio">
            <h3>个人介绍</h3>
            <p>
              广东药科大学计算机科学与技术专业2027届本科。在玛氏（Mars）亚太区 IT 团队实习期间，
              独立搭建 AI Agent 智能运维系统并交付 AI 金牌话术 H5 产品 Demo，
              积累了从需求拆解、多数据源对接到产品交付的完整经验。
            </p>
            <p>
              在校期间担任医疗废物管理系统项目负责人，参与“南桂司晨”创新创业项目。
              熟悉 Python、MySQL 及 Vibe Coding，善于用 AI 工具快速把想法做成可体验的成果。
              自驱力强，期待在 AI 产品和应用方向深入积累。
            </p>
          </div>
          <div className="about-experience">
            <h3>实习经历</h3>
            <div className="exp-item">
              <span className="exp-date">2026.07~2026.10</span>
              <span className="exp-role">AI Agent 运维系统开发实习生 · 广州指尖信息（外派玛氏）</span>
            </div>
          </div>
          <div className="about-experience">
            <h3>在校经历</h3>
            <div className="exp-item">
              <span className="exp-date">2025.09~2027.06</span>
              <span className="exp-role">班长 · 组织策划班会与活动协调</span>
            </div>
            <div className="exp-item">
              <span className="exp-date">2023.09~2025.09</span>
              <span className="exp-role">学委 · 课程信息传达与学习资料整理</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
