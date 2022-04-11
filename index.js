const canvas = document.querySelector('canvas')
canvas.height = innerHeight
canvas.width = innerWidth

const c = canvas.getContext('2d')
const friction = 0.99
const scoreEl = document.querySelector('#score')
const startBtn = document.querySelector('#startGameBtn')
const modal = document.querySelector('#modalEl')
const totalScore = document.querySelector('#totalScore')
const myAudio = document.querySelector('#myAudio')
const gameOver = new Audio('./assets/audio/gameOver.wav')
const brand = document.querySelector('.brand')
const bgSound = document.querySelector('#bgSound')

class Player {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    up() {
        gsap.to(this, {
            y: this.y - this.velocity.y
        })
    }

    down() {
        gsap.to(this, {
            y: this.y + this.velocity.y
        })
    }

    right() {
        gsap.to(this, {
            x: this.x + this.velocity.x
        })
    }

    left() {
        gsap.to(this, {
            x: this.x- this.velocity.x
        })
    }

    draw() {
        c.beginPath()
        c.arc(
            this.x, this.y, this.radius, 0, Math.PI*2, false
        )
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.draw()
    }
}

const x = canvas.width/2
const y = canvas.height/2

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(
            this.x, this.y, this.radius, 0, Math.PI*2, false
        )
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x*5
        this.y = this.y + this.velocity.y*5
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(
            this.x, this.y, this.radius, 0, Math.PI*2, false
        )
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(
            this.x, this.y, this.radius, 0, Math.PI*2, false
        )
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
}

class Bg {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(
            this.x, this.y, this.radius, 0, Math.PI*2, false
        )
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
    }
}

let playerVelocity = {
    x: 70,
    y: 70
}
let player = new Player(x, y, canvas.width>=740?15:10, 'white', playerVelocity)
console.log(player)
let projectiles = []
let enemies = []
let particles = []
let bgs = []
let animationId
let score = 0

var space = 30
for(var i=10; i<canvas.width; i+=space){
    for(var j=10; j<canvas.height; j+=space){
        bgs.push(new Bg(
            i, j, 3, 'rgba(0,0,231, 0.2)'
        ))
    }
}

function init() {
    score = 0
    scoreEl.innerHTML = `Score: ${score}`
    totalScore.innerHTML = score
    player = new Player(x, y, canvas.width>=740?15:10, 'white', playerVelocity)
    projectiles = []
    enemies = []
    particles = []
}

function spawnEnemies() {
    setInterval(()=> {
        const radius = (30-4)*Math.random() + 4
        const color = `hsl(${Math.random()*360}, 100%, 50%)`
        let ex
        let ey
        if(Math.random()<0.5) {
            ex = Math.random()<0.5 ? 0-radius : canvas.width+radius
            ey = Math.random()*canvas.height
        }else {
            ex = Math.random()*canvas.width
            ey = Math.random()<0.5 ? 0-radius : canvas.height+radius
        }
        const angle = Math.atan2(
            -ey + player.y,
            -ex + player.x
        )
        enemies.push(new Enemy(
            ex, ey, radius, color,
            {
                x: Math.cos(angle)*(canvas.width>=740?1.5:2.5),
                y: Math.sin(angle)*(canvas.width>=740?1.5:2.5)
            }
        ))
    }, 1000)
}

function animate() {
    bgs.forEach((bg)=>{
        var dist = Math.hypot(player.x - bg.x, player.y - bg.y)
        if(dist < 80) {
            bg.color = 'rgba(0, 0, 0, 0)';
        }
        else if(dist < 110) {
            bg.color = 'rgba(0,0,231, 1)';
        }
        else {
            bg.color = 'rgba(0,0,231, 0.05)';
        }
        bg.update()
    })
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    particles.forEach((particle, index) => {
        if(particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    })
    projectiles.forEach((projectile, index)=> {
        projectile.update()
        if(projectile.x-projectile.radius > canvas.width ||
            projectile.x+projectile.radius < 0 ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
            ){
            setTimeout(()=> {
                projectiles.splice(index, 1)
            }, 0)
        }
    })
    enemies.forEach((enemy, eIndex)=>{
        enemy.update()
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
            if(dist - player.radius - enemy.radius < 0) {
                playAudio(gameOver)
                cancelAnimationFrame(animationId)
                totalScore.innerHTML = score
                startBtn.innerHTML = 'Retry'
                modal.style.display = 'flex';
            }
        projectiles.forEach((projectile, pIndex)=>{
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if(dist - projectile.radius - enemy.radius < 0) {
                var explosion = new Audio('./assets/audio/explosion.wav')
                explosion.volume = 0.6
                playAudio(explosion)
                for(var i=0; i<enemy.radius*2; i++) {
                    particles.push(new Particle(
                        projectile.x, projectile.y, 2*Math.random(), enemy.color,
                        {
                            x: (Math.random() - 0.5)*(Math.random()*6),
                            y: (Math.random() - 0.5)*(Math.random()*6)
                        }
                    ))
                }
                if(enemy.radius - 10 > 6) {
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                }
                else {
                    setTimeout(()=> {
                        enemies.splice(eIndex, 1)
                        projectiles.splice(pIndex, 1)
                    }, 0)
                }
                setTimeout(()=> {
                    projectiles.splice(pIndex, 1)
                }, 0)
                score += Math.ceil(enemy.radius)*10
                scoreEl.innerHTML = `Score: ${score}`
            }
        })
    })
}

window.addEventListener('click', (event)=> {
    var shot = new Audio('./assets/audio/shoot.mp3')
    shot.volume = 0.6
    playAudio(shot)
    const angle = Math.atan2(
        event.clientY - player.y,
        event.clientX - player.x
    )
    projectiles.push(new Projectile(
        player.x, player.y, 5, 'white', 
        {
            x: Math.cos(angle)*(canvas.width>=740?1:2),
            y: Math.sin(angle)*(canvas.width>=740?1:2)
        }
    ))
})


window.addEventListener("keypress", function(event) {
    if (event.key == 'a' && player.x - 4 * player.radius > 0 ) {
        console.log(player.x)
        player.left()
    }
    if (event.key == 'd' && player.x + 4 * player.radius < canvas.width) {
        player.right()
    }
    if (event.key == 'w' && player.y - 4 * player.radius > 0) {
        player.up()
    }
    if (event.key == 's' && player.y + 4 * player.radius < canvas.height) {
        player.down()
    }
  });

function playAudio(a) {
    a.play();
}
startBtn.addEventListener('click', (event) => {
    brand.style.display = 'none';
    init()
    animate()
    spawnEnemies()
    modal.style.display = 'none';
    playAudio(bgSound)
})
