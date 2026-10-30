/* Rooms reuse the existing elements, listeners and saved game state. */
(() => {
 const main=document.querySelector('.container');
 if(!main)return;
 const hub=document.createElement('nav');hub.id='houseHub';hub.setAttribute('aria-label','Choose a room');
 const rooms=[
  {id:'letters',number:'01',name:'The Letters',description:'Five seals. Words left behind.',icon:'✉'},
  {id:'playroom',number:'02',name:'The Playroom',description:'A little competition in the dark.',icon:'♟'},
  {id:'east-wing',number:'03',name:'The East Wing',description:'A portrait. A candle. Something hidden.',icon:'⚿'},
  {id:'radio',number:'04',name:'The Radio',description:'Something is still broadcasting.',icon:'◉'}
 ];
 const panels=new Map();let lastDoor=null;
 const toolbar=document.createElement('div');toolbar.id='houseToolbar';
 const back=document.createElement('button');back.type='button';back.textContent='← Back to the house';
 const location=document.createElement('span');location.id='houseLocation';
 toolbar.append(back,location);toolbar.hidden=true;
 const content=document.createElement('main');content.id='houseRooms';content.tabIndex=-1;
 main.after(hub,toolbar,content);
 const live=document.createElement('p');live.id='houseNavigationStatus';live.className='house-sr';live.setAttribute('role','status');document.body.append(live);
 rooms.forEach(room=>{
  const panel=document.createElement('section');panel.className='house-room';panel.id='room-'+room.id;panel.hidden=true;
  const heading=document.createElement('h2');heading.className='room-heading';heading.id=panel.id+'-title';heading.textContent=room.name;panel.setAttribute('aria-labelledby',heading.id);panel.append(heading);content.append(panel);panels.set(room.id,panel);
  const door=document.createElement('button');door.type='button';door.className='house-door-card';door.setAttribute('aria-controls',panel.id);door.setAttribute('aria-expanded','false');door.dataset.room=room.id;
  const number=document.createElement('span');number.className='door-number';number.textContent=room.number+' / ENTER';
  const icon=document.createElement('span');icon.className='door-icon';icon.textContent=room.icon;icon.setAttribute('aria-hidden','true');
  const title=document.createElement('strong');title.textContent=room.name;
  const description=document.createElement('span');description.className='door-description';description.textContent=room.description;
  door.append(number,icon,title,description);door.onclick=()=>{lastDoor=door;setRoom(room.id,true)};hub.append(door);
 });
 const letters=document.querySelector('.envelope-section');if(letters)panels.get('letters').append(letters);
 const music=document.querySelector('.music-card');if(music){const label=music.previousElementSibling;if(label?.classList.contains('section-label'))panels.get('radio').append(label);panels.get('radio').append(music)}
 const attraction=document.querySelector('.attraction-game');if(attraction)panels.get('playroom').append(attraction);
 const memory=document.getElementById('loveMemory');if(memory)panels.get('playroom').append(memory);
 const mystery=document.getElementById('houseMystery');if(mystery)panels.get('east-wing').append(mystery);
 // Dialogs and secret overlays stay outside hidden rooms.
 const memoryDialog=document.getElementById('memoryModal');if(memoryDialog)document.body.append(memoryDialog);
 const countdown=document.getElementById('anniversaryTimer');if(countdown){const header=document.createElement('div');header.id='houseCountdown';const caption=document.createElement('p');caption.textContent='UNTIL OUR ANNIVERSARY';caption.className='countdown-caption';header.append(caption,countdown);main.prepend(header)}
 const dock=document.createElement('button');dock.id='houseMusicDock';dock.type='button';document.body.append(dock);
 const audio=document.getElementById('music'),play=document.getElementById('playButton');
 function syncMusic(){const playing=audio&&!audio.paused;dock.textContent=playing?'❚❚ Pause music':'▶ Play music';dock.setAttribute('aria-label',playing?'Pause music':'Play music');if(play){play.textContent=playing?'❚❚':'▶';play.setAttribute('aria-label',playing?'Pause music':'Play music')}document.querySelector('.album-art')?.classList.toggle('playing',playing)}
 dock.onclick=async()=>{if(!audio)return;if(!audio.paused){audio.pause();return}try{await audio.play()}catch{live.textContent='Music could not play. Check that your song file is available.'}};
 if(audio)['play','pause','ended','error'].forEach(e=>audio.addEventListener(e,syncMusic));syncMusic();
 let current='home';
 function setRoom(id,focus){if(id!=='home'&&!panels.has(id))id='home';current=id;const home=id==='home';hub.hidden=!home;toolbar.hidden=home;document.querySelector('.intro').hidden=!home;main.classList.toggle('in-room',!home);document.body.dataset.houseRoom=id;
  panels.forEach((p,key)=>p.hidden=key!==id);hub.querySelectorAll('button').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.room===id)));location.textContent=home?'':rooms.find(r=>r.id===id).name;live.textContent=home?'Back in the house':location.textContent+' opened';
  // Clamp restored draggable objects after their room becomes visible.
  if(id==='east-wing')window.dispatchEvent(new Event('resize'));
  if(focus){window.scrollTo({top:0,behavior:'instant'});if(home)(lastDoor||hub.querySelector('button')).focus({preventScroll:true});else content.focus({preventScroll:true})}
 }
 back.onclick=()=>setRoom('home',true);
 // Escape closes dialogs through their existing handlers before leaving a room.
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&current!=='home'&&!document.querySelector('dialog[open],.overlay.active,.secret-overlay.active,.prank-overlay.active'))setRoom('home',true)});
 setRoom('home',false);
})();
