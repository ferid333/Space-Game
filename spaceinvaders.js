var canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#canvas'))
const ctx=canvas.getContext("2d")
const spaceshipimg=document.getElementById("spaceshipimg")
const mainscore=document.querySelector(".mainscore")
const mainlevel=document.querySelector(".mainlevel")
const hearts=document.querySelector(".hearts")
const gameover=document.querySelector(".gameover")
const reset=document.querySelector(".reset")


canvas.width=window.innerWidth
canvas.height=window.innerHeight
var invaderimg=new Image()
invaderimg.src="img/invader.png"
let isleft=false
let isright=false
let rotation=0
let invrow=5
let invcolumn=5
let invgap=40
let invaders=[]
let score=0
let islevelup=false
let level=1
let life=3
let maxlevel=3
let opacity=1
let damage=true
let a=setInterval(game,1000/50)
createinvaders()  
reset.addEventListener("click",()=>{
    location.reload()
})
var spaceship={
    x:canvas.width/2,
    y:canvas.height,
    w:100,
    h:100,
    vx:7,
    status:true,

}

function levelUp() {
    invrow=5
    invcolumn=5
    score=0
    level+=1
    mainlevel.textContent=level
    invrow=invrow*level
    invcolumn=invcolumn*level
    createinvaders()  
}
function moveInvaders() {
    for (let i = 0; i < invaders.length; i++) {
        for (let j = 0; j < invaders[i].length; j++){
            let invader=invaders[i][j]
            if(invader.x+invaderimg.width>canvas.width || invader.x<0){
                invader.vx=-invader.vx
            }
            invader.x+=invader.vx;
        }
    }     
}
function gameOver() {
    clearInterval(a)
     gameover.style.display="flex"
}

function createinvaders() {
    for (let i = 0; i < invrow; i++) {
        invaders[i]=[]
        for (let j = 0; j < invcolumn; j++) {
          invaders[i][j]={
            x:canvas.width/2-invaderimg.width*9+invgap*i,
            y:100+invgap*j,
            vx:5,
            vy:5,
            status:true,
          }
        }
    }
        
}
function createSpaceship() {
    let num=0
    spaceship.status=true
    life--
    let b=setInterval(()=>{
        damage=false
        num++
        if(opacity==1){
            opacity=0.4
        }
        else{
            opacity=1
        }
        if(num==10){
            damage=true
            clearInterval(b)
        }
    },300)
    
}
var particules=[]
function createpaticulers(lx,ly,color,random) {
    for (let i = 0; i < 15; i++) {
        particules.push({
            x:lx,
            y:ly,
            r:Math.random()*3,
            life:2,
            color:color,
            random:random,
        })
    }
    
}
function createStars() {
    stars.push({
        x:Math.random()*canvas.width,
        y:0,
        r:Math.random()*2,
        color:"white"
    })
}

var stars=[]
var bullets=[]
var fires=[]

window.addEventListener("keydown",e=>{

    if(e.keyCode=="37" || e.key=="a"){
       isleft=true
    }
   if(e.keyCode=="39" || e.key=="d"){
        isright=true
    }
   if(e.keyCode=="13"){
       if(bullets.length<10){
        bullets.push({
            x:spaceship.x-spaceship.w/2,
            y:canvas.height-spaceship.h,
            r:3,
            vy:10,
            status:true,
        })
       }
   }
    
})
window.addEventListener("mousedown",()=>{
    if(bullets.length<10 && spaceship.status){
        spaceshiphit.play()
    bullets.push({
        x:spaceship.x-spaceship.w/2,
        y:canvas.height-spaceship.h,
        w:8,
        h:10,
        vy:10,
        status:true,
    })
  
}
})
window.addEventListener("keyup",e=>{
        isleft=false
         isright=false
         rotation=0
})

function draw() {
    hearts.innerHTML=""
    for (let i = 0; i < life; i++) {
       let img=document.createElement("img")
       img.classList.add("heart")
       img.src="img/images-removebg-preview.png"
       hearts.appendChild(img)
    }
    ctx.fillStyle="black"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    createStars()
   
    for (let i = 0; i < stars.length; i++) {
        ctx.fillStyle=stars[i].color
        ctx.globalAlpha=0.6
        ctx.beginPath()
        ctx.arc(stars[i].x,stars[i].y,stars[i].r,0,Math.PI*2)
        ctx.fill()
        ctx.closePath() 
    }
        if(spaceship.status){
         ctx.globalAlpha=opacity
        ctx.fillStyle="white"
        ctx.save()
            ctx.translate(spaceship.x-spaceship.w/2, spaceship.y-spaceship.h/2);
            ctx.rotate(rotation);
            ctx.translate(-spaceship.x+spaceship.w/2, -spaceship.y+spaceship.h/2);
            ctx.drawImage(spaceshipimg,spaceship.x-spaceship.w,spaceship.y-spaceship.h,spaceshipimg.width*0.20,spaceshipimg.height*0.20)
            ctx.restore()
        }
    ctx.globalAlpha=1
    ctx.fillStyle="red"
    for (let i = 0; i <bullets.length; i++) {
            ctx.fillRect(bullets[i].x,bullets[i].y,bullets[i].w,bullets[i].h)
    }
    for (let i = 0; i < invaders.length; i++) {
        for (let j = 0; j <  invaders[i].length; j++){
            let invader=invaders[i][j]
           if(invader.status){
            ctx.drawImage(invaderimg,invader.x,invader.y)
           } 
        }
        
    }
    ctx.fillStyle="yellow"
    for (let i = 0; i < fires.length; i++) {
        if(fires[i].status){
            ctx.fillRect(fires[i].x,fires[i].y,fires[i].w,fires[i].h)
        }
    
    }
    for (let i = 0; i < particules.length; i++) {
        ctx.fillStyle= particules[i].color
        ctx.beginPath()
        ctx.arc(particules[i].x,particules[i].y,particules[i].r,0,Math.PI*2)
        ctx.fill()
    }      
}

function update() {
    let randomtime=Math.floor(Math.random()*1000)
    let randominvaderrow=Math.floor(Math.random()*invaders.length)
   let randominvadercolumn=Math.floor(Math.random()*invcolumn)
   for (let i = 0; i < stars.length; i++) {
    if(stars[i].y+stars[i].r>canvas.height){
        stars.splice(i,1)
    }
    stars[i].y+=2
   }
   if(randomtime%(1000/(Math.pow(10,(level-1))))==0){
    if(invaders[randominvaderrow][randominvadercolumn]){
        fires.push({
            w:5,
            h:10,
            x:invaders[randominvaderrow][randominvadercolumn].x+invaderimg.width,
            y:invaders[randominvaderrow][randominvadercolumn].y,
            vy:5,
            status:invaders[randominvaderrow][randominvadercolumn].status
        })
    }
    }
    if(isleft && spaceship.x-spaceship.w>0){
        spaceship.x-=spaceship.vx
        rotation=-0.15
    }
     if(isright &&  spaceship.x+spaceship.w<canvas.width){
        spaceship.x+=spaceship.vx
        rotation=0.15
    }
    for (let i = 0; i <bullets.length; i++) {
       bullets[i].y-=bullets[i].vy
       if( bullets[i].y<=0){
           bullets.splice(i,1)
       }
    }
    for (let i = 0; i <fires.length; i++) {
        fires[i].y+=fires[i].vy
        if( fires[i].y>=canvas.height){
            fires.splice(i,1)
        }
     }
    for (let i = 0; i < invaders.length; i++) {
        for (let j = 0; j < invaders[i].length; j++){
            let invader=invaders[i][j]
            if(invader.status){
                for (let t = 0; t < bullets.length; t++) {
                    if(bullets[t].y<=invader.y+invaderimg.height && bullets[t].y+bullets[t].h>=invader.y && bullets[t].x<invader.x+invaderimg.width && bullets[t].x+bullets[t].w>invader.x){
                        bullets.splice(t,1)
                        invader.status=false
                        score+=10
                        mainscore.textContent=score
                        aliendie.play()
                        mainscore.style.color="purple"
                        setTimeout(()=>{
                        mainscore.style.color="white"
                        },1000)
                        createpaticulers(invader.x,invader.y,"purple",20)
                        invaders[i].splice(j, 1)
                    }
                }
            }
        }
        
    }
    for (let t = 0; t < fires.length; t++) {
        if(spaceship.status && damage){
        if(fires[t].y+fires[t].h>=spaceship.y-spaceship.h && fires[t].y<=spaceship.y  && fires[t].x<spaceship.x &&  fires[t].x+fires[t].w>spaceship.x-spaceship.w){
            fires.splice(t,1)
            spaceship.status=false
            createpaticulers(spaceship.x-spaceship.w,spaceship.y-spaceship.h,"#eeee6d",50)
            setTimeout(()=>{
                createSpaceship() 
            },300)
            
            lifelost.play()
        }
    }
    }
    for (let i = 0; i < particules.length; i++) {
        particules[i].life-=0.25
        particules[i].x+=(Math.floor(Math.random()*3)-1)*Math.random()* particules[i].random+5
        particules[i].y+=(Math.floor(Math.random()*3)-1)*Math.random()* particules[i].random+5
        if(particules[i].life==0){
            particules.splice(i,1)
        }
    }
    for (let i = 0; i < invaders.length; i++) {
           if(invaders[i].length==0){
              islevelup=true
           }
           else{
            
            islevelup=false
            break;
           }
         
    }
    if(islevelup){
        levelUp()
    }   
}
function game() {
    draw()
    update()
    if(level>1){
        moveInvaders()
    }
    if(life==0 || level>3){
        gameOver()
    }
   
}


