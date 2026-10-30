/* Persistent radio, with letters, games and mystery in tabs. */
(() => {
 const main=document.querySelector('.container');if(!main)return;
 const tabs=[{id:'letters',name:'The Letters'},{id:'playroom',name:'The Playroom'},{id:'east-wing',name:'The East Wing'}];
 const nav=document.createElement('nav');nav.id='houseTabs';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Explore the house');
 const content=document.createElement('main');content.id='houseRooms';
 main.after(nav,content);
 const panels=new Map(),buttons=[];
 tabs.forEach((tab,index)=>{
  const panel=document.createElement('section');panel.id='room-'+tab.id;panel.className='house-room';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','tab-'+tab.id);panel.tabIndex=0;panel.hidden=index!==0;content.append(panel);panels.set(tab.id,panel);
  const b=document.createElement('button');b.type='button';b.id='tab-'+tab.id;b.textContent=tab.name;b.setAttribute('role','tab');b.setAttribute('aria-controls',panel.id);b.setAttribute('aria-selected',String(index===0));b.tabIndex=index===0?0:-1;b.onclick=()=>activate(index,false);buttons.push(b);nav.append(b);
 });
 const letters=document.querySelector('.envelope-section');if(letters)panels.get('letters').append(letters);
 const attraction=document.querySelector('.attraction-game');if(attraction)panels.get('playroom').append(attraction);
 const memory=document.getElementById('loveMemory');if(memory)panels.get('playroom').append(memory);
 const mystery=document.getElementById('houseMystery');if(mystery)panels.get('east-wing').append(mystery);
 const memoryDialog=document.getElementById('memoryModal');if(memoryDialog)document.body.append(memoryDialog);
 const countdown=document.getElementById('anniversaryTimer');if(countdown){const header=document.createElement('div');header.id='houseCountdown';const caption=document.createElement('p');caption.textContent='UNTIL OUR ANNIVERSARY';caption.className='countdown-caption';header.append(caption,countdown);main.prepend(header)}
 function activate(index,focus){buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;panels.get(tabs[i].id).hidden=i!==index});if(focus)buttons[index].focus();if(tabs[index].id==='east-wing')window.dispatchEvent(new Event('resize'))}
 nav.addEventListener('keydown',e=>{const i=buttons.indexOf(document.activeElement);if(i<0)return;let next=i;if(e.key==='ArrowRight')next=(i+1)%buttons.length;else if(e.key==='ArrowLeft')next=(i+buttons.length-1)%buttons.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=buttons.length-1;else return;e.preventDefault();activate(next,true)});
 const audio=document.getElementById('music'),play=document.getElementById('playButton');
 function syncMusic(){const playing=audio&&!audio.paused;if(play){play.textContent=playing?'❚❚':'▶';play.setAttribute('aria-label',playing?'Pause music':'Play music')}document.querySelector('.album-art')?.classList.toggle('playing',playing)}
 if(audio)['play','pause','ended','error'].forEach(e=>audio.addEventListener(e,syncMusic));syncMusic();
 activate(0,false);
})();
