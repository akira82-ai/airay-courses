(function(){
  const style=document.createElement('style');
  style.textContent=`.prompt-card[data-prompt-copy-ready]{padding-right:2.6vw!important}.prompt-copy{position:absolute;top:.8vh;right:.75vw;width:22px;height:22px;border:0;background:transparent;color:inherit;display:grid;place-items:center;opacity:.32;cursor:pointer;padding:0;transition:opacity .18s ease,transform .18s ease}.prompt-copy:hover{opacity:.68}.prompt-copy:active{transform:scale(.94)}.prompt-copy svg{width:13px;height:13px;stroke-width:1.8}.prompt-copy.copied{opacity:.9}body:has(#export-stable[data-exporting="1"]) .prompt-copy{display:none}`;
  document.head.appendChild(style);
  async function copyText(text){
    if(navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    const ta=document.createElement('textarea');
    ta.value=text;
    ta.setAttribute('readonly','');
    ta.style.cssText='position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.select();
    const ok=document.execCommand('copy');
    ta.remove();
    if(!ok) throw new Error('copy failed');
  }
  function setIcon(btn,name){
    btn.innerHTML=`<i data-lucide="${name}"></i>`;
    if(window.lucide) lucide.createIcons();
  }
  document.querySelectorAll('.prompt-frame .prompt-card').forEach((card)=>{
    const pre=card.querySelector('.prompt-pre');
    if(!pre || card.dataset.promptCopyReady) return;
    card.dataset.promptCopyReady='true';
    const btn=document.createElement('button');
    btn.className='prompt-copy';
    btn.type='button';
    btn.setAttribute('aria-label','复制提示词');
    btn.title='复制提示词';
    setIcon(btn,'copy');
    btn.addEventListener('click',async(e)=>{
      e.preventDefault();
      e.stopPropagation();
      try{
        await copyText(pre.textContent);
        btn.classList.add('copied');
        btn.setAttribute('aria-label','已复制');
        btn.title='已复制';
        setIcon(btn,'check');
        setTimeout(()=>{btn.classList.remove('copied');btn.setAttribute('aria-label','复制提示词');btn.title='复制提示词';setIcon(btn,'copy')},1000);
      }catch{
        btn.classList.remove('copied');
        btn.setAttribute('aria-label','复制失败');
        btn.title='复制失败';
      }
    });
    card.appendChild(btn);
  });
})();
