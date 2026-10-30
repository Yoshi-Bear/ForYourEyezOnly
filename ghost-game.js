/* DON'T GET CAUGHT — standalone Playroom game */
(() => {
 if(document.getElementById('ghostGameLaunch'))return;
 const room=document.getElementById('dash-page-playroom')||document.getElementById('room-playroom')||document.querySelector('.attraction-game')?.parentElement;
 if(!room)return;
 const invite=document.createElement('section');invite.id='ghostGameInvite';invite.innerHTML='<div class="gg-invite-art" aria-hidden="true"><span></span></div><div><small>LIGHTS OUT. SOMETHING IS FOLLOWING.</small><h2>Don’t get caught.</h2><p>Three keys. One way out. You’re not alone.</p></div><button id="ghostGameLaunch" type="button">Play if you dare ↗</button>';room.append(invite);
 const modal=document.createElement('dialog');modal.id='ghostGameModal';modal.setAttribute('aria-labelledby','ggTitle');modal.innerHTML='<button id="ggClose" aria-label="Close game" type="button">×</button><p class="gg-eyebrow">THE HOUSE DOES NOT WANT YOU TO LEAVE</p><h2 id="ggTitle">Don’t get caught.</h2><div class="gg-stats"><span id="ggKeys">0 / 3 keys</span><span id="ggClock">0:00</span><span id="ggBest">No escape yet</span></div><div id="ggStage"><canvas id="ggCanvas" width="600" height="520" role="img" aria-label="Dark maze: collect three keys and reach the exit. A ghost follows you."></canvas><div id="ggOverlay"><h3 id="ggOverlayTitle">Something heard you come in.</h3><p id="ggOverlayText">Collect all three keys, then reach the exit. The ghost gets faster with every key. One hiding spell. Three seconds.</p><button id="ggStart" type="button">Enter the house</button></div></div><p id="ggStatus" role="status">Move with WASD, arrow keys, or the buttons below. H to hide.</p><div class="gg-controls"><div class="gg-dpad" role="group" aria-label="Movement controls"><button data-gg-dir="up" aria-label="Move up" type="button">↑</button><button data-gg-dir="left" aria-label="Move left" type="button">←</button><button data-gg-dir="down" aria-label="Move down" type="button">↓</button><button data-gg-dir="right" aria-label="Move right" type="button">→</button></div><button id="ggHide" type="button">Hide · 1 use</button></div><p class="gg-help">You are the small blue light. Keys glow gold. The exit is green.<br>No sudden sound or flashing images. Leaving the game pauses it.</p>';
 document.body.append(modal);
 const $=id=>document.getElementById(id),canvas=$('ggCanvas'),ctx=canvas.getContext('2d');if(!ctx)return;
 const maze=[
 '###############',
 '#.....#.......#',
 '#.###.#.#####.#',
 '#.#...#.....#.#',
 '#.#.#####.#.#.#',
 '#...#.....#...#',
 '###.#.#####.#.#',
 '#...#.....#.#.#',
 '#.#######.#.#.#',
 '#.........#...#',
 '#.#####.#####.#',
 '#.....#.......#',
 '###############'];
 const W=15,H=13,T=40,exit={x:13,y:11},initialKeys=[{x:5,y:1},{x:13,y:1},{x:1,y:11}];
 let player={x:1,y:1},ghost={x:13,y:9},keys=[],collected=0,active=false,paused=false,hideUsed=false,hiddenUntil=0,elapsed=0,lastFrame=0,ghostTimer=0,grace=0,held=null,moveTimer=0,escapeCount=0,lastStatus='',previousOverflow='',best=null;
 try{best=Number(localStorage.getItem('fye-ghost-best'))||null}catch{}
 function say(text){if(lastStatus!==text){$('ggStatus').textContent=text;lastStatus=text}}
 function clock(ms){const seconds=Math.floor(ms/1000);return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0')}
 function walkable(x,y){return x>=0&&x<W&&y>=0&&y<H&&maze[y][x]!=='#'}
 function ghostStep(){const queue=[{x:ghost.x,y:ghost.y,path:[]}],seen=new Set([ghost.x+','+ghost.y]);for(let i=0;i<queue.length;i++){const cell=queue[i];if(cell.x===player.x&&cell.y===player.y){if(cell.path.length)ghost=cell.path[0];return}for(const [dx,dy]of[[0,-1],[-1,0],[0,1],[1,0]]){const x=cell.x+dx,y=cell.y+dy,k=x+','+y;if(walkable(x,y)&&!seen.has(k)){seen.add(k);queue.push({x,y,path:cell.path.concat({x,y})})}}}}
 function collision(){if(active&&hiddenUntil<=elapsed&&player.x===ghost.x&&player.y===ghost.y)finish(false)}
 function move(dir){if(!active||paused)return;const d={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[dir];if(!d)return;const x=player.x+d[0],y=player.y+d[1];if(!walkable(x,y))return;player={x,y};const i=keys.findIndex(k=>k.x===x&&k.y===y);if(i>=0){keys.splice(i,1);collected++;$('ggKeys').textContent=collected+' / 3 keys';say(collected===3?'All three keys. Get to the green exit.':'You found a key. It heard that.')}collision();if(active&&x===exit.x&&y===exit.y){if(collected===3)finish(true);else say('The door needs all three keys.')}draw()}
 function hide(){if(!active||paused||hideUsed)return;hideUsed=true;hiddenUntil=elapsed+3000;$('ggHide').disabled=true;$('ggHide').textContent='Hidden · 3s';say('Hold your breath. Three seconds of safety.');draw()}
 function finish(won){active=false;held=null;$('ggHide').disabled=true;$('ggOverlay').hidden=false;$('ggOverlayTitle').textContent=won?'You made it out.':'It found you.';$('ggOverlayText').textContent=won?'You survived in '+clock(elapsed)+'. Unfortunately, you’re still stuck with me.':'The hallway goes quiet. Then you hear your own footsteps coming back. Try another way.';$('ggStart').textContent=won?'Go back in?':'Try again';say(won?'Escaped. '+clock(elapsed)+'.':'Caught. You can try again.');if(won&&(!best||elapsed<best)){best=Math.round(elapsed);try{localStorage.setItem('fye-ghost-best',String(best))}catch{}}updateBest();draw()}
 function updateBest(){$('ggBest').textContent=best?'Best '+clock(best):'No escape yet'}
 function start(){player={x:1,y:1};ghost={x:13,y:9};keys=initialKeys.map(k=>({...k}));collected=0;elapsed=0;ghostTimer=0;grace=3500;hiddenUntil=0;hideUsed=false;held=null;moveTimer=0;paused=false;active=true;$('ggKeys').textContent='0 / 3 keys';$('ggClock').textContent='0:00';$('ggHide').disabled=false;$('ggHide').textContent='Hide · 1 use';$('ggOverlay').hidden=true;lastFrame=performance.now();say('Find the keys. You have a few seconds before it starts moving.');draw();$('ggHide').focus({preventScroll:true})}
 function draw(){ctx.clearRect(0,0,600,520);ctx.fillStyle='#0a1011';ctx.fillRect(0,0,600,520);for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(maze[y][x]==='#'){ctx.fillStyle='#24332c';ctx.fillRect(x*T,y*T,T,T);ctx.strokeStyle='#344339';ctx.lineWidth=1;ctx.strokeRect(x*T+.5,y*T+.5,T-1,T-1)}else{ctx.fillStyle=(x+y)%2?'#111a17':'#131d18';ctx.fillRect(x*T,y*T,T,T)}}
 ctx.fillStyle=collected===3?'#5fcba0':'#466250';ctx.fillRect(exit.x*T+10,exit.y*T+4,20,32);ctx.fillStyle='#d7efbf';ctx.font='9px Arial';ctx.textAlign='center';ctx.fillText('EXIT',exit.x*T+20,exit.y*T+24);
 keys.forEach(k=>{const x=k.x*T+20,y=k.y*T+20;ctx.save();ctx.shadowColor='#efc66a';ctx.shadowBlur=13;ctx.strokeStyle='#efc66a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x-4,y-4,5,0,Math.PI*2);ctx.moveTo(x,y);ctx.lineTo(x+8,y+9);ctx.moveTo(x+5,y+6);ctx.lineTo(x+9,y+2);ctx.stroke();ctx.restore()});
 const gx=ghost.x*T+20,gy=ghost.y*T+20;ctx.save();ctx.shadowColor='#d7e6d0';ctx.shadowBlur=14;ctx.fillStyle='#ced8c3';ctx.beginPath();ctx.arc(gx,gy-3,12,Math.PI,0);ctx.lineTo(gx+12,gy+13);ctx.lineTo(gx+6,gy+8);ctx.lineTo(gx,gy+14);ctx.lineTo(gx-6,gy+8);ctx.lineTo(gx-12,gy+13);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#101914';ctx.fillRect(gx-7,gy-4,4,6);ctx.fillRect(gx+3,gy-4,4,6);ctx.restore();
 const px=player.x*T+20,py=player.y*T+20;ctx.save();ctx.shadowBlur=15;ctx.shadowColor=hiddenUntil>elapsed?'#ae8bd9':'#80dfff';ctx.fillStyle=hiddenUntil>elapsed?'#c4a0ed':'#a3ebff';ctx.beginPath();ctx.arc(px,py,7,0,Math.PI*2);ctx.fill();ctx.restore();
 // Dim distant corridors without concealing the whole maze or exit.
 const fog=ctx.createRadialGradient(px,py,45,px,py,210);fog.addColorStop(0,'rgba(0,0,0,0)');fog.addColorStop(1,'rgba(0,0,0,.72)');ctx.fillStyle=fog;ctx.fillRect(0,0,600,520);
 if(paused){ctx.fillStyle='#030805bb';ctx.fillRect(0,0,600,520);ctx.fillStyle='#d9dfce';ctx.font='bold 24px Georgia';ctx.textAlign='center';ctx.fillText('Paused',300,260)}}
 function frame(now){const dt=Math.min(100,Math.max(0,now-lastFrame));lastFrame=now;if(active&&!paused&&modal.open&&!document.hidden){elapsed+=dt;ghostTimer+=dt;if(held){moveTimer+=dt;if(moveTimer>=135){moveTimer=0;move(held)}}if(hiddenUntil>elapsed){$('ggHide').textContent='Hidden · '+Math.ceil((hiddenUntil-elapsed)/1000)+'s'}else if(hideUsed){$('ggHide').textContent='Hide used'}if(elapsed>grace&&ghostTimer>Math.max(320,620-collected*85)){ghostTimer=0;if(hiddenUntil<=elapsed)ghostStep();collision()}$('ggClock').textContent=clock(elapsed);draw()}requestAnimationFrame(frame)}
 $('ghostGameLaunch').onclick=()=>{previousOverflow=document.body.style.overflow;modal.showModal();document.body.style.overflow='hidden';paused=false;lastFrame=performance.now();draw()};$('ggClose').onclick=()=>modal.close();modal.addEventListener('close',()=>{paused=true;held=null;document.body.style.overflow=previousOverflow;$('ghostGameLaunch').focus()});$('ggStart').onclick=start;$('ggHide').onclick=hide;
 const keyDirs={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
 document.addEventListener('keydown',e=>{if(!modal.open||!active)return;const dir=keyDirs[e.key]||keyDirs[e.key.toLowerCase()];if(dir){e.preventDefault();if(!e.repeat){held=dir;moveTimer=0;move(dir)}}else if(e.key.toLowerCase()==='h'){e.preventDefault();hide()}});document.addEventListener('keyup',e=>{const dir=keyDirs[e.key]||keyDirs[e.key.toLowerCase()];if(dir===held)held=null});
 modal.querySelectorAll('[data-gg-dir]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();if(!active)return;b.setPointerCapture(e.pointerId);held=b.dataset.ggDir;moveTimer=0;move(held)});['pointerup','pointercancel','lostpointercapture'].forEach(type=>b.addEventListener(type,()=>held=null));b.addEventListener('click',e=>{if(e.detail===0)move(b.dataset.ggDir)})});
 document.addEventListener('visibilitychange',()=>{held=null;paused=document.hidden;if(!paused)lastFrame=performance.now();draw()});window.addEventListener('blur',()=>{held=null;paused=true;draw()});window.addEventListener('focus',()=>{if(modal.open){paused=false;lastFrame=performance.now()}});
 keys=initialKeys.map(k=>({...k}));updateBest();draw();requestAnimationFrame(frame);
})();
