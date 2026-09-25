(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const navToggle = $('.nav-toggle');
  const mobileNav = $('#mobile-nav');
  const dialog = $('#menu-dialog');
  let content = null;
  let lastCard = null;
  let toastTimer;
  let currentFilter = 'all';
  const closeNavigation = () => { navToggle.setAttribute('aria-expanded', 'false'); navToggle.setAttribute('aria-label', '탐색 메뉴 열기'); mobileNav.hidden = true; };
  navToggle.addEventListener('click', () => {
    const opening = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(opening));
    navToggle.setAttribute('aria-label', opening ? '탐색 메뉴 닫기' : '탐색 메뉴 열기');
    mobileNav.hidden = !opening;
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNavigation));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileNav.hidden) { closeNavigation(); navToggle.focus(); } });
  matchMedia('(min-width: 1181px)').addEventListener('change', e => { if(e.matches) closeNavigation(); });
  document.addEventListener('click', e => { if(!mobileNav.hidden && !e.target.closest('.site-header')) closeNavigation(); });
  $('#year').textContent = new Date().getFullYear();
  function toast(message) {
    clearTimeout(toastTimer);
    $('#toast').textContent = message;
    $('#toast').hidden = false;
    toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 3500);
  }
  function makeImage(menu) {
    const img = document.createElement('img');
    img.src = menu.image;
    img.alt = menu.imageAlt;
    img.loading = 'lazy';
    img.className = menu.imageClass === 'original' ? 'original' : `diptych ${menu.imageClass}`;
    return img;
  }
  function priceLabel(menu) { return typeof menu.price === 'number' && Number.isFinite(menu.price) ? `${menu.price.toLocaleString('ko-KR')}원${menu.priceUnit ? ' / '+menu.priceUnit : ''}` : '[가격 확인 후 입력]'; }
  function openMenu(menu, trigger) {
    lastCard = trigger;
    $('#dialog-title').textContent = menu.name;
    $('#dialog-label').textContent = menu.label;
    $('#dialog-description').textContent = menu.detail;
    $('#dialog-price').textContent = priceLabel(menu);
    $('#dialog-availability').textContent = menu.priceSource ? menu.priceSource : (menu.confirmed ? '판매 메뉴' : '매장 확인 예정');
    const label = document.createElement('span'); label.textContent = menu.imageCaption || 'AI 연출 이미지 · 실제 메뉴와 다를 수 있습니다';
    $('#dialog-image').replaceChildren(makeImage(menu), label);
    dialog.showModal();
    document.body.classList.add('dialog-open');
    $('.dialog-close').focus();
  }
  function closeMenu() { if(dialog.open) dialog.close(); }
  $('.dialog-close').addEventListener('click', closeMenu);
  dialog.addEventListener('click', e => { if(e.target !== dialog) return; const r=dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeMenu(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); if(lastCard?.isConnected) lastCard.focus({preventScroll:true}); });
  $('#dialog-visit').addEventListener('click', () => { closeMenu(); });
  function renderMenus(filter) {
    const grid = $('#menu-grid');
    const menus = content.menus.filter(m => m.category === 'dakgalbi' && filter !== 'side');
    $('#signature-layout').hidden = filter === 'side';
    $('#rice-feature').hidden = filter === 'dakgalbi';
    const fragment = document.createDocumentFragment();
    for(const menu of menus) {
      const card = document.createElement('button'); card.type='button'; card.className='menu-card'; card.dataset.menuId=menu.id;
      card.setAttribute('aria-label', `${menu.name} 자세히 보기`);
      const badge = document.createElement('span'); badge.className='signature-label'; badge.textContent=menu.label;
      const copy = document.createElement('div'); copy.className='card-content';
      const line = document.createElement('div'); line.className='card-title-line';
      const title=document.createElement('h3'); title.textContent=menu.name;
      const arrow=document.createElement('span'); arrow.className='card-arrow'; arrow.textContent='↗'; arrow.setAttribute('aria-hidden','true');
      line.append(title,arrow);
      const desc=document.createElement('p'); desc.className='card-description'; desc.textContent=menu.description;
      copy.append(badge,line,desc); card.append(copy);
      card.addEventListener('click', () => openMenu(menu,card)); fragment.append(card);
    }
    grid.replaceChildren(fragment); grid.setAttribute('aria-busy','false');
    $('#filter-status').textContent = `${filter === 'all' ? '전체' : filter === 'dakgalbi' ? '닭갈비' : '곁들임'} 메뉴 ${filter === 'all' ? content.menus.length : filter === 'side' ? 1 : menus.length}개를 표시합니다.`;
  }
  function renderRice() {
    const menu = content.menus.find(m => m.id === 'rice');
    if(!menu) return;
    const feature = $('#rice-feature');
    const photo = document.createElement('div'); photo.className='rice-photo';
    const imageLabel = document.createElement('span'); imageLabel.textContent='AI 연출 이미지 · 실제 메뉴 사진이 아닙니다';
    photo.append(makeImage(menu), imageLabel);
    const copy = document.createElement('div'); copy.className='rice-copy';
    const label = document.createElement('p'); label.className='eyebrow'; label.textContent='THE FINISH';
    const title = document.createElement('h3'); title.textContent='마지막 한 숟갈까지, 볶음밥.';
    const description = document.createElement('p'); description.textContent='닭갈비를 즐긴 뒤, 철판 위에 남은 맛으로 마무리하는 한 끼.';
    const button = document.createElement('button'); button.type='button'; button.className='text-link rice-detail'; button.dataset.menuId=menu.id; button.textContent='볶음밥 자세히 보기 ↗';
    button.addEventListener('click',()=>openMenu(menu,button));
    copy.append(label,title,description,button); feature.replaceChildren(photo,copy);
  }
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    if(!content) return;
    currentFilter=button.dataset.filter;
    document.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active',b===button); b.setAttribute('aria-pressed',String(b===button)); });
    renderMenus(currentFilter);
  }));
  function renderCatalog(data) {
    const list=$('#catalog');
    data.catalog.forEach((group,index)=>{
      const details=document.createElement('details'); details.className='catalog-group'; details.open=index<2;
      const summary=document.createElement('summary');summary.textContent=group.title;
      const mark=document.createElement('span');mark.textContent='+';mark.setAttribute('aria-hidden','true');summary.append(mark);
      const dl=document.createElement('dl');
      group.items.forEach(item=>{const row=document.createElement('div');const dt=document.createElement('dt');dt.textContent=item.name;
        if(item.unit){const small=document.createElement('small');small.textContent=item.unit;dt.append(small);}
        const dd=document.createElement('dd');dd.textContent=item.price.toLocaleString('ko-KR')+'원';row.append(dt,dd);dl.append(row);});
      details.append(summary,dl);list.append(details);
    });
    data.orderNotes.forEach(text=>{const li=document.createElement('li');li.textContent=text;$('#order-notes').append(li);});
  }
  function applyStoreInformation(data) {
    $('#store-source').textContent=data.storeInfoSource || '';
    $('#store-source').hidden=!data.storeInfoSource;
    for(const [field,id] of [['address','address-value'],['phone','phone-value'],['hours','hours-value'],['parking','parking-value']]) {
      if(typeof data[field] === 'string' && data[field].trim()) { $('#'+id).textContent=data[field]; $('#'+id).classList.remove('pending'); }
    }
    if(data.address?.trim()) {
      const copy=$('#copy-address'); copy.hidden=false;
      copy.addEventListener('click',async () => { try { await navigator.clipboard.writeText(data.address); toast('매장 주소를 복사했어요.'); } catch { toast('복사가 지원되지 않아 주소를 직접 선택해 주세요.'); } });
    }
    if(typeof data.phone === 'string' && /^[\d+\s()-]{7,22}$/.test(data.phone)) {
      const call=$('#call-link'); call.href='tel:'+data.phone.replace(/[^+\d]/g,''); call.hidden=false;
    }
    if(typeof data.mapUrl === 'string') { try {
      const url=new URL(data.mapUrl);
      if(url.protocol==='https:') { const link=$('#map-link'); link.href=url.href; link.hidden=false;  }
    } catch {} }
  }
  fetch('content.json').then(response => { if(!response.ok) throw new Error('Content unavailable'); return response.json(); }).then(data => {
    if(!Array.isArray(data.menus)) throw new Error('Invalid menu data');
    content=data; $('#menu-notice').textContent=data.menuNotice; renderMenus(currentFilter); renderRice(); renderCatalog(data); applyStoreInformation(data);
  }).catch(() => {
    const grid=$('#menu-grid'); grid.setAttribute('aria-busy','false'); const p=document.createElement('p'); p.textContent='메뉴를 불러오지 못했어요. 잠시 후 새로고침해 주세요.'; const retry=document.createElement('button'); retry.className='button primary'; retry.textContent='새로고침'; retry.onclick=()=>location.reload(); grid.replaceChildren(p,retry);
  });
  if('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries => { for(const entry of entries) if(entry.isIntersecting) document.querySelectorAll('.desktop-nav a').forEach(a => a.classList.toggle('is-current',a.hash==='#'+entry.target.id)); },{rootMargin:'-15% 0px -55% 0px'});
    ['story','menu','visit'].forEach(id => observer.observe($('#'+id)));
  }
})();
