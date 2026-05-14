const fs = require('fs');
const templatePath = '/Users/agiray/Desktop/github/airay-skills/skills/airay-html-ppt-skill/assets/template.html';
const mdPath = '/Users/agiray/Documents/Codex/2026-05-08/new-chat/lessnon-2.md';
const outPath = '/Users/agiray/Desktop/test/ai-course-部门/lesson-2.html';

const md = fs.readFileSync(mdPath, 'utf8');
const blocks = [...md.matchAll(/##\s*技巧\s*(\d+)\n([\s\S]*?)(?=\n##\s*技巧\s*\d+|$)/g)].map(m => {
  const n = Number(m[1]);
  const body = m[2];
  const title = (body.match(/主标题：(.+)/) || [,''])[1].trim();
  const subtitle = (body.match(/副标题：(.+)/) || [,''])[1].trim();
  const main = (body.match(/主要内容：([\s\S]*?)(?=\n错误的提示词示例：)/) || [,''])[1].trim();

  const pairs = [];
  const reg = /错误的提示词示例：\s*\n[“\"]([^\n”\"]+)[”\"]\s*\n正确的提示词示例：\s*\n[“\"]([^\n”\"]+)[”\"]/g;
  let mm;
  while ((mm = reg.exec(body)) !== null) {
    pairs.push({ bad: mm[1].trim(), good: mm[2].trim() });
  }

  return { n, title, subtitle, main, pairs: pairs.slice(0,3) };
});

const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const actFor = (n) => n<=4 ? '定义清楚' : (n<=8 ? '执行对齐' : '治理稳定');
const total = 39;
let page = 1;
const slides = [];
const add = (html) => { slides.push(html); page += 1; };
const chunk = (txt, a, b) => txt.slice(a,b).trim();

add(`<section class="slide hero dark">
  <div class="chrome"><div>Lesson 2 · 基础提示词及其应用</div><div>Cover · ${String(page).padStart(2,'0')} / ${total}</div></div>
  <div class="frame" style="display:grid;gap:4vh;align-content:center;min-height:80vh">
    <div class="kicker" data-anim>AI 课程 · 第二课</div>
    <h1 class="h-hero" data-anim>基础提示词</h1>
    <h2 class="h-sub" data-anim>及其应用</h2>
    <div class="meta-row" data-anim><span>企业内训版</span><span>·</span><span>统一母版 · 高密可执行</span></div>
  </div>
  <div class="foot"><div>课程总览</div><div>2026</div></div>
</section>`);

add(`<section class="slide light">
  <div class="chrome"><div>导航 · 三幕结构</div><div>Intro · ${String(page).padStart(2,'0')} / ${total}</div></div>
  <div class="frame" style="padding-top:5vh">
    <div class="kicker" data-anim>课程地图</div>
    <h2 class="h-xl" style="font-size:5.3vw" data-anim>Rundown</h2>
    <div class="grid-3" style="margin-top:6vh">
      <div class="stat-card" data-anim><div class="stat-label">Act I</div><div class="stat-nb" style="font-size:4.4vw">定义清楚</div><div class="stat-note">技巧 1-4：任务/目标/背景/结构</div></div>
      <div class="stat-card" data-anim><div class="stat-label">Act II</div><div class="stat-nb" style="font-size:4.4vw">执行对齐</div><div class="stat-note">技巧 5-8：复述/边界/模板/重复</div></div>
      <div class="stat-card" data-anim><div class="stat-label">Act III</div><div class="stat-nb" style="font-size:4.4vw">治理稳定</div><div class="stat-note">技巧 9-11：验收/分层/优先级</div></div>
    </div>
  </div>
  <div class="foot"><div>先认地图，再进细节</div><div>结构先行</div></div>
</section>`);

const divider = (title, note, cls='hero dark') => `<section class="slide ${cls}">
  <div class="chrome"><div>${title}</div><div>Divider · ${String(page).padStart(2,'0')} / ${total}</div></div>
  <div class="frame" style="display:grid;gap:5vh;align-content:center;min-height:80vh">
    <div class="kicker" data-anim>Act</div>
    <h1 class="h-hero" style="font-size:8.5vw" data-anim>${title}</h1>
    <p class="lead" style="max-width:58vw" data-anim>${note}</p>
  </div>
  <div class="foot"><div>${title}</div><div>—</div></div>
</section>`;

for (const b of blocks) {
  if (b.n === 1) add(divider('定义清楚', '先把任务讲对，再追求表达漂亮。', 'hero dark'));
  if (b.n === 5) add(divider('执行对齐', '先对齐理解，再推进执行，减少返工。', 'hero light'));
  if (b.n === 9) add(divider('治理稳定', '从一次可用，走向长期稳定复用。', 'hero dark'));

  const theme1 = (b.n % 2 === 0) ? 'light' : 'dark';
  const theme2 = (b.n % 2 === 0) ? 'dark' : 'light';
  const theme3 = 'light';
  const text = b.main.replace(/\s+/g,' ').trim();
  const t1 = chunk(text, 0, Math.floor(text.length*0.46));
  const t2 = chunk(text, Math.floor(text.length*0.46), Math.floor(text.length*0.78));
  const t3 = chunk(text, Math.floor(text.length*0.78), text.length);

  add(`<section class="slide ${theme1}">
    <div class="chrome"><div>${actFor(b.n)} · 技巧 ${b.n}</div><div>P1 · ${String(page).padStart(2,'0')} / ${total}</div></div>
    <div class="frame grid-2-7-5" style="padding-top:6vh">
      <div class="col" style="justify-content:space-between;min-height:66vh" data-anim>
        <div>
          <div class="kicker">技巧 ${b.n} · 认知页</div>
          <h2 class="h-xl" style="font-size:4.2vw">${esc(b.title)}</h2>
          <p class="lead" style="font-size:1.55vw;margin-top:1.2vh">${esc(b.subtitle)}</p>
        </div>
        <div class="body-zh" style="font-size:1.08vw;line-height:1.8;max-width:42vw">
          <p>${esc(t1)}</p>
          <p style="margin-top:1.8vh">${esc(t2)}</p>
          <p style="margin-top:1.8vh">${esc(t3)}</p>
        </div>
      </div>
      <figure class="tile" data-anim>
        <div class="frame-img r-3x4" style="height:56vh">
          <img src="images/${String(page).padStart(2,'0')}-skill${b.n}-p1-hero.jpg" alt="技巧${b.n}竖图占位">
        </div>
        <figcaption class="frame-cap"><span class="pf">${esc(b.title)}</span><span class="idx">3:4 · 1200×1600+</span></figcaption>
      </figure>
    </div>
    <div class="foot"><div>技巧 ${b.n} · ${esc(b.title)}</div><div>P1</div></div>
  </section>`);

  add(`<section class="slide ${theme2}">
    <div class="chrome"><div>${actFor(b.n)} · 技巧 ${b.n}</div><div>P2 · ${String(page).padStart(2,'0')} / ${total}</div></div>
    <div class="frame" style="padding-top:6vh">
      <div class="kicker" data-anim>技巧 ${b.n} · 方法页（高密约 500 字）</div>
      <h2 class="h-xl" style="font-size:4vw" data-anim>${esc(b.title)}</h2>
      <div class="grid-3" style="margin-top:5vh;align-items:start">
        <div class="stat-card" data-anim>
          <div class="stat-label">怎么做</div>
          <div class="body-zh" style="font-size:1.02vw;line-height:1.8;opacity:.92">
            <p>1）先写任务目标、受众、边界，再写输出形式。</p>
            <p>2）把要求改成可判断句，避免“更好一些”这类模糊词。</p>
            <p>3）先小范围试跑一版，根据偏差再补约束。</p>
            <p style="margin-top:1.4vh">${esc(chunk(text,0,Math.min(170,text.length)))}</p>
          </div>
        </div>
        <div class="stat-card" data-anim>
          <div class="stat-label">验收标准</div>
          <div class="body-zh" style="font-size:1.02vw;line-height:1.8;opacity:.92">
            <p>1）结论是否对准目标，不偏题。</p>
            <p>2）结构是否完整，关键字段不缺漏。</p>
            <p>3）是否满足字数、语气、禁用项。</p>
            <p style="margin-top:1.4vh">输出可被他人复用，替换变量即可继续使用。</p>
          </div>
        </div>
        <div class="stat-card" data-anim>
          <div class="stat-label">常见误区</div>
          <div class="body-zh" style="font-size:1.02vw;line-height:1.8;opacity:.92">
            <p>误区1：只给主题，不给场景和结果标准。</p>
            <p>误区2：一次塞太多不相关背景，稀释主目标。</p>
            <p>修正：只保留与任务成败相关的信息。</p>
            <p style="margin-top:1.4vh">口诀：先定目标，再定结构，最后补边界。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="foot"><div>技巧 ${b.n} · 横向三模块</div><div>P2</div></div>
  </section>`);

  const pairs = (b.pairs.length ? b.pairs : [
    {bad:'写一份总结，专业一点。',good:'请写项目周总结，面向部门负责人，结构为：进展、问题、风险、下周计划；600 字以内；语气客观；不要空话。'},
    {bad:'帮我做个方案。',good:'请输出客服提效方案，包含目标、现状诊断、3 条策略、实施步骤、风险与指标，表格+要点形式。'},
    {bad:'优化一下这段话。',good:'把以下文字改为对外公告风格，保留事实，不新增信息，控制在 180 字内，避免口语化表达。'}
  ]).slice(0,3);

  add(`<section class="slide ${theme3}">
    <div class="chrome"><div>${actFor(b.n)} · 技巧 ${b.n}</div><div>P3 · ${String(page).padStart(2,'0')} / ${total}</div></div>
    <div class="frame" style="padding-top:6vh">
      <div class="kicker" data-anim>技巧 ${b.n} · 错误与正确对照</div>
      <h2 class="h-xl" style="font-size:3.7vw" data-anim>${esc(b.title)}</h2>
      <div class="grid-3" style="margin-top:4.8vh;align-items:start">
        ${pairs.map((p, i) => `<div class="col" data-anim style="gap:1.2vh">
          <div class="meta">模块 ${i+1}</div>
          <div class="callout" style="padding:1.8vh 1.2vw;border-left-width:2px">
            <div class="meta" style="margin-bottom:.9vh">错误提示词</div>
            <pre style="margin:0;white-space:pre-wrap;font-family:var(--mono);font-size:.78vw;line-height:1.65;letter-spacing:.02em;opacity:.95">${esc(p.bad)}</pre>
          </div>
          <div class="callout" style="padding:1.8vh 1.2vw;border-left-width:2px">
            <div class="meta" style="margin-bottom:.9vh">正确提示词</div>
            <pre style="margin:0;white-space:pre-wrap;font-family:var(--mono);font-size:.78vw;line-height:1.65;letter-spacing:.02em;opacity:.95">${esc(p.good)}</pre>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="foot"><div>技巧 ${b.n} · 代码风格对照</div><div>P3</div></div>
  </section>`);
}

add(`<section class="slide hero light">
  <div class="chrome"><div>Lesson 2 · 收束</div><div>End · ${String(page).padStart(2,'0')} / ${total}</div></div>
  <div class="frame" style="display:grid;gap:4vh;align-content:center;min-height:80vh">
    <div class="kicker" data-anim>总结</div>
    <h1 class="h-hero" style="font-size:7.4vw" data-anim>写提示词不是玄学</h1>
    <p class="lead" style="max-width:62vw" data-anim>把需求变成规格，把规格变成模板，把模板变成组织能力。先清楚，再对齐，后治理。</p>
    <div class="meta-row" data-anim><span>定义清楚</span><span>·</span><span>执行对齐</span><span>·</span><span>治理稳定</span></div>
  </div>
  <div class="foot"><div>行动建议：从下一个高频场景开始模板化</div><div>谢谢</div></div>
</section>`);

if (slides.length !== total) throw new Error(`page count mismatch: ${slides.length}`);

let html = fs.readFileSync(templatePath, 'utf8');
html = html.replace('<title>[必填] 替换为 PPT 标题 · Deck Title</title>', '<title>Lesson 2 · 基础提示词及其应用</title>');
html = html.replace('<!-- SLIDES_HERE -->', slides.join('\n\n'));
fs.writeFileSync(outPath, html);
console.log('ok', outPath, slides.length, 'blocks', blocks.length, 'pairs', blocks.map(b=>b.pairs.length).join(','));
