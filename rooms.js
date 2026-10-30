/* Gaming dashboard inspired by the supplied reference. */
(() => {
 const original=document.querySelector('.container');if(!original)return;
 const shell=document.createElement('div');shell.id='dashboard';
 const sidebar=document.createElement('aside');sidebar.id='dashSidebar';sidebar.innerHTML='<a class="dash-brand" href="#home" aria-label="For Your Eyes Only home"><span>F</span><div>FOR YOUR<br><b>EYES ONLY</b></div></a><p class="dash-nav-label">YOUR LITTLE WORLD</p><nav aria-label="Main navigation"></nav><div class="dash-sidebar-note"><span>JUST FOR YOU</span><strong>Ayesha’s corner.</strong><p>A few letters. A little competition. Something to discover.</p></div>';
 const workspace=document.createElement('div');workspace.id='dashWorkspace';
 const top=document.createElement('header');top.id='dashTop';top.innerHTML='<button id="dashMenu" type="button" aria-label="Toggle navigation" aria-controls="dashSidebar" aria-expanded="false">☰</button><span class="dash-breadcrumb">YOUR PRIVATE COLLECTION</span><div class="dash-profile"><span class="dash-online"></span> Ayesha <b>A</b></div>';
 const content=document.createElement('main');content.id='dashContent';
 shell.append(sidebar,workspace);workspace.append(top,content);document.body.prepend(shell);
 const shade=document.createElement('button');shade.id='dashShade';shade.type='button';shade.setAttribute('aria-label','Close navigation');shade.hidden=true;document.body.append(shade);
 const nav=sidebar.querySelector('nav');
 const routes=[{id:'home',name:'Overview',icon:'⌂'},{id:'letters',name:'Your letters',icon:'✉'},{id:'playroom',name:'The playroom',icon:'♟'},{id:'east-wing',name:'The mystery',icon:'⚿'}];
 const pages=new Map();const controls=[];
 routes.forEach(route=>{const b=document.createElement('button');b.type='button';b.className='dash-nav-button';b.dataset.route=route.id;const i=document.createElement('span');i.textContent=route.icon;i.setAttribute('aria-hidden','true');b.append(i,document.createTextNode(route.name));b.onclick=()=>go(route.id,true);nav.append(b);controls.push(b);const page=document.createElement('section');page.id='dash-page-'+route.id;page.className='dash-page';page.hidden=true;page.tabIndex=-1;page.setAttribute('aria-label',route.name);pages.set(route.id,page);content.append(page)});
 const home=pages.get('home');
 const hero=document.createElement('section');hero.className='dash-hero';hero.innerHTML='<div class="dash-hero-copy"><p>EXCLUSIVELY FOR AYESHA</p><div id="dashHeroTitle"></div><p class="dash-hero-sub">A little music. A few letters.<br>A whole world that’s just ours.</p><button type="button" id="dashRead">OPEN YOUR LETTERS <span>↗</span></button></div><div class="dash-hero-art" aria-hidden="true"><div class="hero-orbit"></div><div class="hero-card card-back">✦</div><div class="hero-card card-front"><span>FOR YOUR</span><b>♥</b><span>EYES ONLY</span></div><i class="hero-spark spark-one">✦</i><i class="hero-spark spark-two">✦</i></div>';
 const title=document.querySelector('.intro h1');if(title)hero.querySelector('#dashHeroTitle').append(title);
 const small=document.querySelector('.intro .small-text');if(small){small.textContent='EXCLUSIVELY FOR AYESHA';hero.querySelector('.dash-hero-copy>p').replaceWith(small)}
 home.append(hero);hero.querySelector('#dashRead').onclick=()=>go('letters',true);
 const music=document.querySelector('.music-card');if(music){music.id='dashRadio';music.querySelector('.song-info h2').textContent='A Little Music';music.querySelector('.song-info p').textContent='Your soundtrack. Stay a while.';content.before(music)}
 // Hero comes before the shared music player on overview; on other pages it remains at the top.
 const stats=document.createElement('div');stats.className='dash-stats-row';stats.innerHTML='<div><span class="dash-stat-icon">✉</span><p><strong>05</strong><small>Letters waiting</small></p></div><div><span class="dash-stat-icon">♟</span><p><strong>02</strong><small>Games to play</small></p></div><div><span class="dash-stat-icon">⚿</span><p><strong>01</strong><small>Mystery to solve</small></p></div><div id="dashAnniversary"><small>OUR NEXT ANNIVERSARY</small></div>';
 const countdown=document.getElementById('anniversaryTimer');if(countdown)stats.querySelector('#dashAnniversary').append(countdown);home.append(stats);
 const heading=document.createElement('div');heading.className='dash-section-heading';heading.innerHTML='<h2>Made for you</h2><span>YOUR COLLECTION</span>';home.append(heading);
 const cards=document.createElement('div');cards.className='dash-card-grid';
 const collection=[{route:'letters',kind:'letters',tag:'WORDS THAT STAY',name:'Open when you need me',text:'Five letters, each for a different moment.',action:'READ THE LETTERS',badge:'5 LETTERS'},{route:'playroom',kind:'play',tag:'A LITTLE COMPETITION',name:'Think you can beat me?',text:'Find the pairs. Pick a side. Try your luck.',action:'ENTER THE PLAYROOM',badge:'2 GAMES'},{route:'east-wing',kind:'mystery',tag:'SOMETHING IS HIDDEN',name:'The room that remembers',text:'Follow the clues. Find what was left behind.',action:'EXPLORE THE ROOM',badge:'MYSTERY'}];
 collection.forEach(c=>{const card=document.createElement('article');card.className='dash-feature';card.innerHTML=`<div class="dash-card-art art-${c.kind}"><span>${c.badge}</span><div aria-hidden="true">${c.kind==='letters'?'✉':c.kind==='play'?'♟':'⚿'}</div></div><div class="dash-card-body"><p class="dash-card-tag">${c.tag}</p><h3>${c.name}</h3><p>${c.text}</p><button type="button">${c.action} <span>↗</span></button></div>`;card.querySelector('button').onclick=()=>go(c.route,true);cards.append(card)});home.append(cards);
 const letters=document.querySelector('.envelope-section');if(letters){pages.get('letters').append(letters);letters.querySelector('.section-label').innerHTML='YOUR LETTERS <span>FIVE LITTLE THINGS FOR YOU</span>';letters.querySelector('.envelope-intro').textContent='Some things are easier to leave in a letter.'}
 const attraction=document.querySelector('.attraction-game');if(attraction)pages.get('playroom').append(attraction);
 const memory=document.getElementById('loveMemory');if(memory)pages.get('playroom').append(memory);
 const mystery=document.getElementById('houseMystery');if(mystery)pages.get('east-wing').append(mystery);
 const modal=document.getElementById('memoryModal');if(modal)document.body.append(modal);
 // Move effects container out of the retired layout; its particles still work.
 const fireworks=document.getElementById('fireworks');if(fireworks)document.body.append(fireworks);
 original.hidden=true;
 const audio=document.getElementById('music'),play=document.getElementById('playButton');
 function sync(){const playing=audio&&!audio.paused;if(play){play.textContent=playing?'❚❚':'▶';play.setAttribute('aria-label',playing?'Pause music':'Play music')}document.querySelector('.album-art')?.classList.toggle('playing',playing)}
 if(audio)['play','pause','ended','error'].forEach(e=>audio.addEventListener(e,sync));sync();
 function closeMenu(){shell.classList.remove('menu-open');shade.hidden=true;document.getElementById('dashMenu').setAttribute('aria-expanded','false')}
 function go(id,focus){if(!pages.has(id))id='home';pages.forEach((p,k)=>p.hidden=k!==id);controls.forEach(b=>{if(b.dataset.route===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});shell.dataset.page=id;closeMenu();
  // The radio follows the banner on home and sits above the selected collection elsewhere.
  if(music){if(id==='home')hero.after(music);else content.before(music)}
  if(id==='east-wing')window.dispatchEvent(new Event('resize'));
  if(focus){window.scrollTo({top:0,behavior:'instant'});pages.get(id).focus({preventScroll:true})}
 }
 document.getElementById('dashMenu').onclick=()=>{const open=shell.classList.toggle('menu-open');shade.hidden=!open;document.getElementById('dashMenu').setAttribute('aria-expanded',String(open))};shade.onclick=closeMenu;
 sidebar.querySelector('.dash-brand').onclick=e=>{e.preventDefault();go('home',true)};
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
 go('home',false);
})();
