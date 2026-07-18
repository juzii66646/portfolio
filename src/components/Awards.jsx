 const awards = [
   {
     year: '2026',
     title: '第十二届"东方财富杯"全国大学生金融挑战赛',
     result: '省赛一等奖',
   },
   {
     year: '2025',
     title: '广东药科大学"创新青春先锋"',
     result: '荣誉称号',
   },
   {
     year: '2024',
     title: '第九届"创客中国"生物医药大赛',
     result: '创客组全国50强',
   },
   {
     year: '2024',
     title: '第十四届"挑战杯"大赛',
     result: '校级银奖',
   },
   {
     year: '2024',
     title: '第九届粤港澳大湾区创新创业比赛',
     result: '优胜奖',
   },
   {
     year: '2024',
     title: '"互联网+"大赛',
     result: '校赛银奖 & 铜奖',
   },
 ]
 
 export default function Awards() {
   return (
     <section className="awards section" id="awards">
       <div className="section-header">
         <span className="section-tag">Honors</span>
         <h2 className="section-title">荣誉奖项</h2>
         <p className="section-desc">在校期间获得的竞赛奖项与荣誉称号</p>
       </div>
       <div className="awards-grid">
         {awards.map((a, i) => (
           <div key={i} className="award-card" style={{ '--delay': `${i * 0.05}s` }}>
             <span className="award-year">{a.year}</span>
             <div className="award-info">
               <span className="award-title">{a.title}</span>
               <span className="award-result">{a.result}</span>
             </div>
           </div>
         ))}
       </div>
     </section>
   )
 }
