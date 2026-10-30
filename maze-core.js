/* Deterministic maze generation shared by the game and validation. */
(function(root){
 function random(seed){let n=seed>>>0;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296}}
 function settings(level){const l=Math.max(1,Math.min(50,level));return {level:l,w:15+2*Math.floor((l-1)/5),h:13+2*Math.floor((l-1)/7),ghosts:1+Math.floor((l-1)/10),keys:3+Math.floor((l-1)/12),ghostMs:Math.max(165,350-l*3.6),playerMs:125,biome:Math.floor((l-1)/10),boostMs:6500,hideMs:Math.max(1600,3000-l*20),curseMs:7000,swarmCap:Math.min(10,3+Math.floor(l/7))}}
 function generate(level){const cfg=settings(level),rnd=random(87321+level*7919),grid=Array.from({length:cfg.h},()=>Array(cfg.w).fill(1));grid[1][1]=0;const stack=[{x:1,y:1}];while(stack.length){const cur=stack[stack.length-1],dirs=[[2,0],[-2,0],[0,2],[0,-2]].sort(()=>0);for(let i=dirs.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[dirs[i],dirs[j]]=[dirs[j],dirs[i]]}let dug=false;for(const [dx,dy]of dirs){const x=cur.x+dx,y=cur.y+dy;if(x>0&&y>0&&x<cfg.w-1&&y<cfg.h-1&&grid[y][x]){grid[cur.y+dy/2][cur.x+dx/2]=0;grid[y][x]=0;stack.push({x,y});dug=true;break}}if(!dug)stack.pop()}
 // Loops give players routes around pursuers instead of unavoidable corridor traps.
 for(let y=1;y<cfg.h-1;y++)for(let x=1;x<cfg.w-1;x++)if(grid[y][x]&&rnd()<.19){if((!grid[y-1][x]&&!grid[y+1][x])||(!grid[y][x-1]&&!grid[y][x+1]))grid[y][x]=0}
 const start={x:1,y:1},dist=Array.from({length:cfg.h},()=>Array(cfg.w).fill(-1)),queue=[start];dist[1][1]=0;for(let i=0;i<queue.length;i++){const p=queue[i];for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const x=p.x+dx,y=p.y+dy;if(x>=0&&y>=0&&x<cfg.w&&y<cfg.h&&!grid[y][x]&&dist[y][x]<0){dist[y][x]=dist[p.y][p.x]+1;queue.push({x,y})}}}
 const cells=queue.filter(p=>dist[p.y][p.x]>5).sort((a,b)=>dist[b.y][b.x]-dist[a.y][a.x]);const used=new Set(['1,1']);
 function reserve(p){used.add(p.x+','+p.y);return {...p}}
 const exit=reserve(cells[0]);
 function pick(minDistance=0){const candidates=cells.filter(p=>!used.has(p.x+','+p.y)&&dist[p.y][p.x]>=minDistance);const pool=candidates.length?candidates:cells.filter(p=>!used.has(p.x+','+p.y));return reserve(pool[Math.floor(rnd()*pool.length)])}
 const keys=Array.from({length:cfg.keys},()=>pick(8));const ghosts=Array.from({length:cfg.ghosts},()=>pick(Math.min(18,Math.floor(cells.length/4))));
 const items=[];for(let i=0;i<2+Math.floor(level/12);i++)items.push({...pick(3),type:'speed'});if(level>=3)for(let i=0;i<1+Math.floor(level/10);i++)items.push({...pick(5),type:'rage'});if(level>=7)for(let i=0;i<1+Math.floor(level/15);i++)items.push({...pick(8),type:'swarm'});
 return {cfg,grid,start,exit,keys,ghosts,items};
 }
 root.GhostMaze={settings,generate};if(typeof module!=='undefined')module.exports=root.GhostMaze;
})(typeof window!=='undefined'?window:globalThis);
