/**
 * Farm Rush – Escape the Coop
 * Core Game Engine and Logic
 */

// --- CONSTANTS ---
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;
const TILE_SIZE = 48;
const GRAVITY = 0.55;
const FRICTION = 0.85;

// --- ASSET LIST ---
const ASSET_PATHS = [
  'asset/logo_game1.png', 'asset/play1.png', 'asset/restart1.png', 'asset/retry1.png', 
  'asset/game_over1.png', 'asset/next_level1.png', 'asset/win_srceen1.png', 'asset/hati1.png',
  'asset/panah_kiri1.png', 'asset/panah_kanan1.png', 'asset/panah_lompat1.png',

  'asset/idletelur1.png', 'asset/idletelur2.png', 'asset/walktelur3.png', 
  'asset/jumptelur4.png', 'asset/falltelur5.png',
  'asset/dietelur1.png', 'asset/dietelur2.png', 'asset/dietelur3.png', 'asset/dietelur4.png', 'asset/dietelur5.png',
  'asset/ulat1_kiri.png', 'asset/ulat1_kanan.png', 'asset/ulat_mati_diinjak.png',
  'asset/ayamjalan1.png', 'asset/ayammarah1.png', 'asset/ayammarah2.png', 'asset/ayamkagetdiinjak1.png',
  'asset/bg_level1.png', 'asset/bg_level2.png',
  'asset/ember1.png', 'asset/ember2.png', 'asset/taliember1.png',
  'asset/gandum1.png', 'asset/gandum2.png', 'asset/telur1.png',
  'asset/pintutertutup1.png', 'asset/pintutertutup2.png', 'asset/pintutertutup3.png', 'asset/pintutertutup4.png',
  'asset/pintuterbuka1.png', 'asset/pintuterbuka2.png', 'asset/pintuterbuka3.png', 'asset/pintuterbuka4.png',
  'asset/grass1.png', 'asset/grass2.png', 'asset/grass3.png', 'asset/grass4.png', 'asset/grass5.png', 'asset/grass6.png', 'asset/grass7.png',
  'asset/dritmiddle1.png', 'asset/dritmiddle2.png', 'asset/dritmiddle3.png', 'asset/dritmiddle4.png', 'asset/dritmiddle5.png', 'asset/dritmiddle6.png', 'asset/dritmiddle7.png',
  'asset/dirtbottom1.png', 'asset/dirtbottom2.png', 'asset/dirtbottom3.png', 'asset/dirtbottom4.png', 'asset/dirtbottom5.png',
  'asset/papankayu1.png', 'asset/papankayu2.png', 'asset/papankayu3.png', 'asset/papankayu4.png', 'asset/papankayu5.png',
  'asset/tiangkayu1.png', 'asset/tiangkayu2.png', 'asset/tiangkayu3.png', 'asset/tiangkayu4.png', 'asset/tiangkayu5.png',
  'asset/jerami1.png', 'asset/jerami2.png', 'asset/jerami3.png', 'asset/jerami4.png', 'asset/jeramipanjang1.png',
  'asset/tali1.png', 'asset/tali2.png', 'asset/tali3.png', 'asset/tali4.png',
  'asset/lubang1.png', 'asset/lubang2.png', 'asset/lubang3.png', 'asset/lubang4.png', 'asset/exit1.png'
];

// --- SOUND SYNTHESIZER (Web Audio API) ---
class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playJump() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playCollectGandum() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playCollectEgg() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.06); // E5
    osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.12); // G5
    osc.frequency.setValueAtTime(1046.50, this.ctx.currentTime + 0.18); // C6
    
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playStomp() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(60, this.ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playDie() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.4);
    
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playDoorOpen() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.setValueAtTime(130, this.ctx.currentTime + 0.1);
    osc.frequency.setValueAtTime(160, this.ctx.currentTime + 0.2);
    
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playWin() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // Arpeggio
    notes.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + idx * 0.08);
      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.3);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  }
}
const Sounds = new SoundController();

// --- PARTICLE SYSTEM ---
class Particle {
  constructor(x, y, color, vx, vy, life, size = 4) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.life = life; // frames
    this.maxLife = life;
    this.size = size;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // gravity on particles
    this.life--;
  }

  draw(ctx, cameraX) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life / this.maxLife;
    ctx.beginPath();
    ctx.arc(this.x - cameraX, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  spawnBurst(x, y, color, count, speed = 3, customSize = 4) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const mag = (0.3 + Math.random() * 0.7) * speed;
      this.particles.push(new Particle(
        x, y,
        color,
        Math.cos(angle) * mag,
        Math.sin(angle) * mag - 1.5, // bias upwards
        20 + Math.random() * 20,
        customSize
      ));
    }
  }

  spawnWalkDust(x, y) {
    this.particles.push(new Particle(
      x, y,
      'rgba(230,220,200,0.5)',
      (Math.random() - 0.5) * 1.5,
      -Math.random() * 0.8,
      10 + Math.random() * 10,
      3
    ));
  }

  spawnFeathers(x, y) {
    // Chicken feathers: white/orange/red particles
    const colors = ['#ffffff', '#fce8d5', '#ff9f43', '#ee5253'];
    for (let i = 0; i < 15; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const mag = (0.5 + Math.random() * 0.8) * 4;
      this.particles.push(new Particle(
        x, y,
        color,
        Math.cos(angle) * mag,
        Math.sin(angle) * mag - 2.5,
        30 + Math.random() * 25,
        2 + Math.random() * 3
      ));
    }
  }

  spawnSparks(x, y) {
    // Gold sparkle particles
    for (let i = 0; i < 10; i++) {
      this.particles.push(new Particle(
        x, y,
        '#ffd700',
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4 - 1,
        15 + Math.random() * 15,
        2
      ));
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx, cameraX) {
    for (let p of this.particles) {
      p.draw(ctx, cameraX);
    }
  }

  clear() {
    this.particles = [];
  }
}
const Particles = new ParticleSystem();


// --- PLAYER CLASS ---
class Player {
  constructor(x, y) {
    this.spawnX = x;
    this.spawnY = y;
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 48;
    this.vx = 0;
    this.vy = 0;
    
    // Physics parameters
    this.speed = 0.8;
    this.maxSpeed = 5.5;
    this.jumpForce = 12.5;
    this.onGround = false;
    this.isDead = false;
    
    // Double jump tracking
    this.canDoubleJump = false;
    this.jumpKeyWasDown = false;
    
    // Animation/State Properties
    this.state = 'idle'; // 'idle', 'walk', 'jump', 'fall', 'die'
    this.facingRight = true;
    this.animTimer = 0;
    this.dieAnimFrame = 0;
    this.dieTimer = 0;
    
    // Collision offsets (makes hitbox smaller than visual bounds)
    this.hitboxOffset = { x: 5, y: 4 };
    this.hitboxWidth = this.width - this.hitboxOffset.x * 2;
    this.hitboxHeight = this.height - this.hitboxOffset.y * 2;

    // Invulnerability timer
    this.invulnerableTimer = 0;
  }

  getHitbox() {
    return {
      x: this.x + this.hitboxOffset.x,
      y: this.y + this.hitboxOffset.y,
      w: this.hitboxWidth,
      h: this.hitboxHeight
    };
  }

  reset(x, y) {
    this.x = x !== undefined ? x : this.spawnX;
    this.y = y !== undefined ? y : this.spawnY;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
    this.isDead = false;
    this.state = 'idle';
    this.dieAnimFrame = 0;
    this.dieTimer = 0;
    this.canDoubleJump = false;
    this.jumpKeyWasDown = false;
    this.invulnerableTimer = 0;
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    this.state = 'die';
    this.vy = -6; // small jump on death
    this.vx = 0;
    Sounds.playDie();
    
    // Starch egg burst particles
    Particles.spawnBurst(this.x + this.width / 2, this.y + this.height / 2, '#fff4db', 20, 4, 3);
    Particles.spawnBurst(this.x + this.width / 2, this.y + this.height / 2, '#ffa800', 8, 3, 5); // yolk
  }

  update(inputs, solids, levelWidth, game) {
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer--;
    }

    if (this.isDead) {
      this.vy += 0.35; // slower gravity during death
      this.y += this.vy;
      
      // Update death animation frames
      this.dieTimer++;
      if (this.dieTimer % 8 === 0) {
        if (this.dieAnimFrame < 4) {
          this.dieAnimFrame++;
        } else {
          // Death animation complete
          if (game.lives > 1) {
            game.lives--;
            game.updateHUD();
            const spawn = LEVEL_MAPS[game.currentLevelIndex].playerSpawn;
            this.reset(spawn.x, spawn.y);
            this.invulnerableTimer = 90; // 1.5 seconds at 60 fps
          } else {
            game.lives = 0;
            game.updateHUD();
            game.triggerGameOver();
          }
        }
      }
      return;
    }

    // --- Inputs Handling ---
    let moving = false;
    if (inputs.left) {
      this.vx -= this.speed;
      this.facingRight = false;
      moving = true;
    }
    if (inputs.right) {
      this.vx += this.speed;
      this.facingRight = true;
      moving = true;
    }
    
    // Friction
    if (!moving) {
      this.vx *= FRICTION;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
    }
    
    // Clamp horizontal speed
    if (this.vx > this.maxSpeed) this.vx = this.maxSpeed;
    if (this.vx < -this.maxSpeed) this.vx = -this.maxSpeed;
    
    // Gravity
    this.vy += GRAVITY;
    
    // Reset double jump when on ground
    if (this.onGround) {
      this.canDoubleJump = true;
    }
    
    // Jump Execution
    const jumpPressed = inputs.jump && !this.jumpKeyWasDown;
    if (jumpPressed) {
      if (this.onGround) {
        this.vy = -this.jumpForce;
        this.onGround = false;
        Sounds.playJump();
        Particles.spawnWalkDust(this.x + this.width/2, this.y + this.height);
      } else if (this.canDoubleJump) {
        this.vy = -this.jumpForce;
        this.canDoubleJump = false;
        Sounds.playJump();
        // Double jump particle burst
        Particles.spawnBurst(this.x + this.width/2, this.y + this.height, '#ffffff', 8, 3, 2);
        Particles.spawnBurst(this.x + this.width/2, this.y + this.height, '#ffd700', 4, 2, 3);
      }
    }
    this.jumpKeyWasDown = inputs.jump;
    
    // Variable Jump Height (releasing jump key halts upward momentum)
    if (!inputs.jump && this.vy < -3) {
      this.vy = -3;
    }

    // --- State and Animation ---
    this.animTimer++;
    if (this.onGround) {
      if (Math.abs(this.vx) > 0.3) {
        this.state = 'walk';
        if (this.animTimer % 8 === 0) {
          Particles.spawnWalkDust(this.x + this.width / 2, this.y + this.height);
        }
      } else {
        this.state = 'idle';
      }
    } else {
      if (this.vy < 0) {
        this.state = 'jump';
      } else {
        this.state = 'fall';
      }
    }

    // --- Collision Detection & Resolution ---
    // Axis separation is used to prevent clipping issues.
    
    // 1. Move Horizontally
    this.x += this.vx;
    
    // Boundary lock
    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }
    if (this.x + this.width > levelWidth) {
      this.x = levelWidth - this.width;
      this.vx = 0;
    }
    
    this.resolveCollisions(solids, 'x');

    // 2. Move Vertically
    this.onGround = false;
    this.y += this.vy;
    
    // Floor boundary (fall to death)
    if (this.y > CANVAS_HEIGHT + 100) {
      this.die();
      return;
    }
    
    this.resolveCollisions(solids, 'y');
  }

  resolveCollisions(solids, axis) {
    for (let solid of solids) {
      // Recalculate the player hitbox on each iteration to reflect resolved position changes
      const hitbox = this.getHitbox();
      
      // Check solid AABB overlap
      if (
        hitbox.x < solid.x + solid.w &&
        hitbox.x + hitbox.w > solid.x &&
        hitbox.y < solid.y + solid.h &&
        hitbox.y + hitbox.h > solid.y
      ) {
        // Handle wooden plank platforms as "one-way" from top
        if (solid.isPlank) {
          if (axis === 'y' && this.vy > 0 && (this.y + this.height - this.vy <= solid.y + 8)) {
            // resolve landing
            this.y = solid.y - this.height;
            this.vy = 0;
            this.onGround = true;
          }
          continue; // Planks do not block sideways or upwards
        }

        // Standard solid collision
        if (axis === 'x') {
          if (this.vx > 0) {
            this.x = solid.x - this.hitboxOffset.x - this.hitboxWidth;
          } else if (this.vx < 0) {
            this.x = solid.x + solid.w - this.hitboxOffset.x;
          }
          this.vx = 0;
        } else if (axis === 'y') {
          if (this.vy > 0) {
            // Landing on top
            this.y = solid.y - this.hitboxOffset.y - this.hitboxHeight;
            this.vy = 0;
            this.onGround = true;
          } else if (this.vy < 0) {
            // Hit ceiling
            this.y = solid.y + solid.h - this.hitboxOffset.y;
            this.vy = 0;
          }
        }
      }
    }
  }

  draw(ctx, images, cameraX) {
    if (this.invulnerableTimer > 0 && Math.floor(this.animTimer / 4) % 2 === 0) {
      return;
    }

    let imgName = 'asset/idletelur1.png';
    let rotation = 0;
    let scaleY = 1;
    let scaleX = 1;

    switch (this.state) {
      case 'idle':
        // Alternate idle 1 and 2
        imgName = Math.floor(this.animTimer / 15) % 2 === 0 ? 'asset/idletelur1.png' : 'asset/idletelur2.png';
        break;
      case 'walk':
        imgName = 'asset/walktelur3.png';
        // Tilt animation for walking
        rotation = Math.sin(this.animTimer * 0.25) * 0.14; // tilt back and forth
        scaleY = 1.0 + Math.sin(this.animTimer * 0.5) * 0.05; // squash/stretch
        break;
      case 'jump':
        imgName = 'asset/jumptelur4.png';
        scaleY = 1.15; // stretch upward
        scaleX = 0.85;
        break;
      case 'fall':
        imgName = 'asset/falltelur5.png';
        scaleY = 0.9;  // squash flat
        scaleX = 1.1;
        break;
      case 'die':
        imgName = `asset/dietelur${this.dieAnimFrame + 1}.png`;
        break;
    }

    const img = images[imgName];
    if (!img) return;

    ctx.save();
    
    // Center alignment for translation
    const drawX = this.x - cameraX + this.width / 2;
    const drawY = this.y + this.height / 2;
    
    ctx.translate(drawX, drawY);
    
    // Scale and flip logic
    const fX = this.facingRight ? 1 : -1;
    ctx.scale(fX * scaleX, scaleY);
    
    if (rotation !== 0) {
      ctx.rotate(rotation);
    }
    
    ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}


// --- ENEMIES ENGINE ---
class Enemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = 0;
    this.vy = 0;
    
    this.isStomped = false;
    this.stompTimer = 0;
    this.shouldRemove = false;
    this.facingRight = false;
  }

  getHitbox() {
    return { x: this.x, y: this.y, w: this.width, h: this.height };
  }

  stomp() {
    this.isStomped = true;
    Sounds.playStomp();
  }

  update(solids, levelWidth) {}
  draw(ctx, images, cameraX) {}
}

class Caterpillar extends Enemy {
  constructor(x, y) {
    super(x, y, 48, 32);
    this.vx = -1.2;
    this.gravity = 0.4;
  }

  stomp() {
    super.stomp();
    Particles.spawnBurst(this.x + this.width/2, this.y + this.height/2, '#85c345', 12, 3, 3); // green mush
  }

  update(solids, levelWidth) {
    if (this.isStomped) {
      this.stompTimer++;
      if (this.stompTimer > 25) {
        this.shouldRemove = true;
      }
      return;
    }

    // Gravity
    this.vy += this.gravity;
    this.y += this.vy;

    // Y collision check (falling on platform/planks)
    for (let solid of solids) {
      if (this.x < solid.x + solid.w && this.x + this.width > solid.x && this.y + this.height > solid.y && this.y < solid.y + solid.h) {
        if (!solid.isPlank || (solid.isPlank && this.vy > 0 && this.y + this.height - this.vy <= solid.y + 10)) {
          this.y = solid.y - this.height;
          this.vy = 0;
        }
      }
    }

    // Move horizontally
    this.x += this.vx;

    // Check boundaries or platform edges to turn around
    if (this.x <= 0) {
      this.x = 0;
      this.vx = -this.vx;
    }
    if (this.x + this.width >= levelWidth) {
      this.x = levelWidth - this.width;
      this.vx = -this.vx;
    }

    this.facingRight = this.vx > 0;

    // Wall collision horizontal turn
    for (let solid of solids) {
      if (!solid.isPlank && this.x < solid.x + solid.w && this.x + this.width > solid.x && this.y + this.height > solid.y && this.y < solid.y + solid.h) {
        this.x -= this.vx; // step back
        this.vx = -this.vx; // change direction
        break;
      }
    }
  }

  draw(ctx, images, cameraX) {
    let imgName = this.isStomped ? 'asset/ulat_mati_diinjak.png' : (this.facingRight ? 'asset/ulat1_kanan.png' : 'asset/ulat1_kiri.png');
    const img = images[imgName];
    if (!img) return;

    ctx.save();
    if (this.isStomped) {
      // Fade out effect
      ctx.globalAlpha = 1.0 - (this.stompTimer / 25);
      ctx.drawImage(img, this.x - cameraX, this.y + 10, this.width, this.height - 10);
    } else {
      ctx.drawImage(img, this.x - cameraX, this.y, this.width, this.height);
    }
    ctx.restore();
  }
}

class Chicken extends Enemy {
  constructor(x, y) {
    super(x, y, 48, 48);
    this.vx = -1.6;
    this.gravity = 0.5;
    this.angry = false;
    this.animTimer = 0;
  }

  stomp() {
    super.stomp();
    // Burst white and orange feathers!
    Particles.spawnFeathers(this.x + this.width / 2, this.y + this.height / 2);
  }

  update(solids, levelWidth, playerX, playerY) {
    if (this.isStomped) {
      this.stompTimer++;
      if (this.stompTimer > 25) {
        this.shouldRemove = true;
      }
      return;
    }

    this.animTimer++;
    
    // Aggressive AI check
    const dist = Math.hypot(playerX - this.x, playerY - this.y);
    if (dist < 250 && Math.abs(playerY - this.y) < 100) {
      this.angry = true;
      const speed = 3.5;
      this.vx = playerX < this.x ? -speed : speed;
    } else {
      this.angry = false;
      const speed = 1.5;
      if (Math.abs(this.vx) > speed) {
        this.vx = this.vx > 0 ? speed : -speed;
      }
    }

    // Apply gravity
    this.vy += this.gravity;
    this.y += this.vy;

    // Floor platform colliders
    for (let solid of solids) {
      if (this.x < solid.x + solid.w && this.x + this.width > solid.x && this.y + this.height > solid.y && this.y < solid.y + solid.h) {
        // resolve vertical collision
        if (!solid.isPlank || (solid.isPlank && this.vy > 0 && this.y + this.height - this.vy <= solid.y + 10)) {
          this.y = solid.y - this.height;
          this.vy = 0;
        }
      }
    }

    // Move horizontally
    this.x += this.vx;

    // Boundaries
    if (this.x <= 0) {
      this.x = 0;
      this.vx = -this.vx;
    }
    if (this.x + this.width >= levelWidth) {
      this.x = levelWidth - this.width;
      this.vx = -this.vx;
    }

    this.facingRight = this.vx > 0;

    // Wall collision horizontal
    for (let solid of solids) {
      if (!solid.isPlank && this.x < solid.x + solid.w && this.x + this.width > solid.x && this.y + this.height > solid.y && this.y < solid.y + solid.h) {
        this.x -= this.vx;
        this.vx = -this.vx;
        break;
      }
    }
  }

  draw(ctx, images, cameraX) {
    let imgName = 'asset/ayamjalan1.png';
    if (this.isStomped) {
      imgName = 'asset/ayamkagetdiinjak1.png';
    } else if (this.angry) {
      imgName = Math.floor(this.animTimer / 6) % 2 === 0 ? 'asset/ayammarah1.png' : 'asset/ayammarah2.png';
    }

    const img = images[imgName];
    if (!img) return;

    ctx.save();
    if (this.isStomped) {
      ctx.globalAlpha = 1.0 - (this.stompTimer / 25);
    }
    
    // Draw flipped based on direction
    const drawX = this.x - cameraX + this.width / 2;
    const drawY = this.y + this.height / 2;
    ctx.translate(drawX, drawY);
    
    // If walking right, flip image since default image faces left
    const fX = this.facingRight ? -1 : 1;
    ctx.scale(fX, 1);
    
    ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}


// --- INTERACTIVE ENTITIES ---

// Wheat Collectible (+10 pts)
class Gandum {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 36;
    this.hoverOffset = Math.random() * Math.PI * 2;
    this.collected = false;
  }

  getHitbox() {
    return { x: this.x, y: this.y, w: this.width, h: this.height };
  }

  collect() {
    this.collected = true;
    Sounds.playCollectGandum();
    Particles.spawnSparks(this.x + this.width/2, this.y + this.height/2);
  }

  draw(ctx, images, cameraX, animTimer) {
    if (this.collected) return;
    
    // Floating hover animation
    const yOffset = Math.sin(animTimer * 0.05 + this.hoverOffset) * 6;
    const imgName = Math.floor(animTimer / 12) % 2 === 0 ? 'asset/gandum1.png' : 'asset/gandum2.png';
    const img = images[imgName];
    if (!img) return;

    ctx.drawImage(img, this.x - cameraX, this.y + yOffset, this.width, this.height);
  }
}

// Small Egg Collectible (+50 pts & Achievement)
class TelurKecil {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 34;
    this.hoverOffset = Math.random() * Math.PI * 2;
    this.collected = false;
  }

  getHitbox() {
    return { x: this.x, y: this.y, w: this.width, h: this.height };
  }

  collect() {
    this.collected = true;
    Sounds.playCollectEgg();
    Particles.spawnBurst(this.x + this.width/2, this.y + this.height/2, '#ffd700', 16, 4, 3);
  }

  draw(ctx, images, cameraX, animTimer) {
    if (this.collected) return;
    
    const yOffset = Math.sin(animTimer * 0.08 + this.hoverOffset) * 8;
    const img = images['asset/telur1.png'];
    if (!img) return;

    // Glowing effect
    ctx.save();
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 10 + Math.sin(animTimer * 0.1) * 5;
    ctx.drawImage(img, this.x - cameraX, this.y + yOffset, this.width, this.height);
    ctx.restore();
  }
}

// Pendulum swinging hazard
class SwingingBucket {
  constructor(anchorX, anchorY, length) {
    this.anchorX = anchorX;
    this.anchorY = anchorY;
    this.length = length || 180;
    this.angle = 0;
    this.maxAngle = Math.PI / 3.5; // ~50 degrees
    this.speed = 0.035;
    this.timeOffset = Math.random() * 100;
    
    this.bucketSize = 42;
    this.bucketX = 0;
    this.bucketY = 0;
  }

  update(frameCounter) {
    this.angle = this.maxAngle * Math.sin((frameCounter + this.timeOffset) * this.speed);
    this.bucketX = this.anchorX + this.length * Math.sin(this.angle);
    this.bucketY = this.anchorY + this.length * Math.cos(this.angle);
  }

  getHitbox() {
    // Return hitbox centered on the bucket
    return {
      x: this.bucketX - this.bucketSize / 2 + 4,
      y: this.bucketY - this.bucketSize / 2 + 4,
      w: this.bucketSize - 8,
      h: this.bucketSize - 8
    };
  }

  draw(ctx, images, cameraX) {
    // 1. Draw Anchor
    ctx.fillStyle = '#6b5037';
    ctx.fillRect(this.anchorX - cameraX - 6, this.anchorY - 6, 12, 12);
    
    // 2. Draw Rope (drawn as dotted lines or repeating rope texture)
    ctx.save();
    ctx.strokeStyle = '#c4ab82';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.anchorX - cameraX, this.anchorY);
    ctx.lineTo(this.bucketX - cameraX, this.bucketY);
    ctx.stroke();
    ctx.restore();

    // 3. Draw Bucket
    const img = images['asset/ember1.png'];
    if (!img) return;

    ctx.save();
    ctx.translate(this.bucketX - cameraX, this.bucketY);
    ctx.rotate(this.angle); // Rotate bucket with swing direction
    ctx.drawImage(img, -this.bucketSize / 2, -this.bucketSize / 2, this.bucketSize, this.bucketSize);
    ctx.restore();
  }
}

// Pressure switch that triggers gate opening
class PressurePlate {
  constructor(x, y, doorId) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 14;
    this.doorId = doorId;
    this.isPressed = false;
  }

  getHitbox() {
    return { x: this.x, y: this.y, w: this.width, h: this.height };
  }

  press() {
    if (!this.isPressed) {
      this.isPressed = true;
      Sounds.playDoorOpen();
      Particles.spawnBurst(this.x + this.width/2, this.y + this.height, '#ff4444', 8, 2, 2);
    }
  }

  draw(ctx, cameraX) {
    // Draw wood base
    ctx.fillStyle = '#8e7156';
    ctx.fillRect(this.x - cameraX, this.y + 6, this.width, 8);
    
    // Draw plate trigger
    ctx.fillStyle = this.isPressed ? '#4bbf3b' : '#d63031';
    const topY = this.isPressed ? this.y + 4 : this.y;
    const h = this.isPressed ? 4 : 8;
    ctx.fillRect(this.x - cameraX + 4, topY, this.width - 8, h);
  }
}

// Sliding coop doors
class CoopDoor {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 96; // 2 tiles tall
    this.id = id;
    this.state = 'closed'; // 'closed', 'opening', 'open'
    this.animTimer = 0;
    this.animFrame = 0;
  }

  open() {
    if (this.state === 'closed') {
      this.state = 'opening';
      this.animTimer = 0;
    }
  }

  getHitbox() {
    // If fully open, it is no longer solid (no collision box)
    if (this.state === 'open') return null;
    return { x: this.x, y: this.y, w: this.width, h: this.height };
  }

  update() {
    if (this.state === 'opening') {
      this.animTimer++;
      if (this.animTimer % 8 === 0) {
        if (this.animFrame < 3) {
          this.animFrame++;
        } else {
          this.state = 'open';
        }
      }
    }
  }

  draw(ctx, images, cameraX) {
    let imgName = 'asset/pintutertutup1.png';
    if (this.state === 'open') {
      imgName = 'asset/pintuterbuka4.png';
    } else if (this.state === 'opening') {
      imgName = `asset/pintuterbuka${this.animFrame + 1}.png`;
    } else {
      // closed animation wiggle slightly
      imgName = 'asset/pintutertutup1.png';
    }

    const img = images[imgName];
    if (!img) return;

    ctx.drawImage(img, this.x - cameraX, this.y, this.width, this.height);
  }
}

// Exit Door to next stage / freedom
class ExitGate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 96; // 2 tiles tall door
    this.state = 'closed'; // 'closed', 'opening', 'open'
    this.animTimer = 0;
    this.animFrame = 0;
  }

  getHitbox() {
    // Narrower hitbox so the player enters the door center to clear the level
    return { x: this.x + 10, y: this.y, w: this.width - 20, h: this.height };
  }

  update(playerX, playerY) {
    if (this.state === 'closed') {
      const dist = Math.abs(playerX - this.x);
      // Auto open when player gets close to exit
      if (dist < 110) {
        this.state = 'opening';
        this.animTimer = 0;
        Sounds.playDoorOpen();
      }
    } else if (this.state === 'opening') {
      this.animTimer++;
      if (this.animTimer % 8 === 0) {
        if (this.animFrame < 3) {
          this.animFrame++;
        } else {
          this.state = 'open';
        }
      }
    }
  }

  draw(ctx, images, cameraX) {
    let imgName = 'asset/pintutertutup1.png';
    if (this.state === 'open') {
      imgName = 'asset/pintuterbuka4.png';
    } else if (this.state === 'opening') {
      imgName = `asset/pintuterbuka${this.animFrame + 1}.png`;
    }

    const img = images[imgName];
    if (!img) return;

    ctx.drawImage(img, this.x - cameraX, this.y, this.width, this.height);
  }
}


// --- MAP DEFINITIONS ---
const LEVEL_MAPS = {
  1: {
    name: "Ladang Pagi",
    bg: "asset/bg_level1.png",
    width: 3360,
    tiles: [
      // 12 rows tall. Row 9 is standard ground height.
      "......................................................................",
      "......................................................................",
      "......................................................................",
      "......................................................................",
      "......................................................................",
      "......................................................................",
      "......................................................................",
      "......................................................................",
      "...........GGGGG.......L..R.......2P.2...................H................",
      "GGGGGGGGGGGdddddU...GGG.....GGGGGGGGGGGGGGGGGG2.3.....GGGGGGGGGGGGGGGGG",
      "dddddddddddddddd....ddd.....dddddddddddddddddddddd....ddddddddddddddddd",
      "dddddddddddddddd....ddd.....dddddddddddddddddddddd....ddddddddddddddddd"
    ],
    playerSpawn: { x: 80, y: 384 },
    exitGate: { x: 3200, y: 336 }, // Aligned to floor height (432 - 96)
    collectibles: [
      { type: 'gandum', x: 200, y: 396 },
      { type: 'gandum', x: 350, y: 396 },
      { type: 'gandum', x: 580, y: 348 }, // elevated
      { type: 'gandum', x: 640, y: 348 }, // elevated
      { type: 'egg', x: 840, y: 460 },    // bottom of ditch
      { type: 'gandum', x: 1000, y: 396 },
      { type: 'gandum', x: 1128, y: 348 }, // L platform
      { type: 'gandum', x: 1272, y: 348 }, // R platform
      { type: 'egg', x: 1200, y: 250 },   // floating between L and R platforms
      { type: 'gandum', x: 1450, y: 396 },
      { type: 'gandum', x: 1700, y: 348 }, // bridge plank
      { type: 'gandum', x: 1750, y: 348 }, // bridge plank
      { type: 'gandum', x: 1950, y: 396 },
      { type: 'gandum', x: 2400, y: 348 }, // long hay platform
      { type: 'gandum', x: 2450, y: 348 }, // long hay platform
      { type: 'egg', x: 2424, y: 280 },   // floating above long hay
      { type: 'gandum', x: 2700, y: 396 },
      { type: 'gandum', x: 3050, y: 396 }
    ],
    enemies: [
      { type: 'ulat', x: 400, y: 400 },   // standard ground
      { type: 'ulat', x: 600, y: 352 },   // elevated ground
      { type: 'ulat', x: 1128, y: 352 },  // L platform
      { type: 'ayam', x: 1450, y: 384 },  // standard ground
      { type: 'ayam', x: 1950, y: 384 },  // standard ground
      { type: 'ulat', x: 2800, y: 400 },  // standard ground
      { type: 'ayam', x: 2950, y: 384 }   // standard ground
    ],
    obstacles: [] // Level 1 has no traps
  },
  2: {
    name: "Kandang Ayam Chaos",
    bg: "asset/bg_level2.png",
    width: 3840,
    tiles: [
      "................................................................................",
      "................................................................................",
      "................................................................................",
      ".......................................p.p.p....................................",
      ".....................p.p.p............t.t.t.t.......................p.p.p.......",
      ".......p.p.p........t.t.t.t...........t.t.t.t........p.p.p.........t.t.t.t......",
      "......t.t.t.t.......t.t.t.t...........t.t.t.t.......t.t.t.t........t.t.t.t......",
      "......t.t.t.t.......t.t.t.t...p.p.p...t.t.t.t.......t.t.t.t........t.t.t.t......",
      "......t.t.t.t.......t.t.t.t..t.t.t.t..t.t.t.t.......t.t.t.t..e.....t.t.t.t......",
      "GGGGGGGGGGGGG..GGGGGGGGGGGG..GGGGGGGGGGGG..GGGGGGGGGGGG..GGGGGGGGGGGG..GGGGGGGGG",
      "ddddddddddddd..dddddddddddd..dddddddddddd..dddddddddddd..dddddddddddd..ddddddddd"
    ],
    playerSpawn: { x: 80, y: 350 },
    exitGate: { x: 3700, y: 336 }, // Aligned to floor height (432 - 96)
    collectibles: [
      { type: 'gandum', x: 250, y: 396 },
      { type: 'gandum', x: 384, y: 204 }, // platform 1
      { type: 'egg', x: 620, y: 140 },    // dangerous timing above swing bucket 1
      { type: 'gandum', x: 780, y: 396 },
      { type: 'gandum', x: 1056, y: 156 }, // platform 2
      { type: 'gandum', x: 1150, y: 396 },
      { type: 'gandum', x: 1350, y: 396 },
      { type: 'egg', x: 1520, y: 120 },   // switch 1 niche
      { type: 'gandum', x: 1780, y: 396 },
      { type: 'gandum', x: 1920, y: 108 }, // platform 3
      { type: 'gandum', x: 2150, y: 396 },
      { type: 'gandum', x: 2420, y: 396 },
      { type: 'gandum', x: 2592, y: 204 }, // platform 5
      { type: 'egg', x: 3312, y: 100 },   // platform 6
      { type: 'gandum', x: 3350, y: 396 }
    ],
    enemies: [
      { type: 'ulat', x: 384, y: 208 },   // platform 1
      { type: 'ayam', x: 550, y: 384 },   // ground
      { type: 'ulat', x: 1056, y: 160 },  // platform 2
      { type: 'ayam', x: 1150, y: 384 },  // ground
      { type: 'ulat', x: 1920, y: 112 },  // platform 3
      { type: 'ayam', x: 2300, y: 384 },  // ground
      { type: 'ulat', x: 2800, y: 400 },  // ground
      { type: 'ayam', x: 3450, y: 384 },  // ground
      { type: 'ayam', x: 3312, y: 144 }   // platform 6
    ],
    obstacles: [
      // Swinging Buckets: anchorX, anchorY, length
      { type: 'swing', x: 620, y: 60, length: 170 },
      { type: 'swing', x: 2050, y: 50, length: 190 },
      { type: 'swing', x: 3000, y: 60, length: 160 },
      
      // Switches and doors: switchX, switchY, doorX, doorY, id
      // Switch 1 opens Door 1 (Switch rests on Platform 4 at col 31)
      { type: 'door_system', switchX: 1520, ySw: 322, doorX: 1750, yDr: 336, id: 1 },
      // Switch 2 opens Door 2 (Switch rests on Platform 5 at col 56)
      { type: 'door_system', switchX: 2720, ySw: 226, doorX: 2900, yDr: 336, id: 2 }
    ]
  }
};


// --- CHROMA KEY FLOOD FILL UTILITY ---
function removeBlackBackground(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  try {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const w = canvas.width;
    const h = canvas.height;
    
    // Visited map to track BFS traversal
    const visited = new Uint8Array(w * h);
    const queue = [];
    
    // Check if pixel is dark/black (under RGB threshold of 12)
    const isBlack = (x, y) => {
      const idx = (y * w + x) * 4;
      if (data[idx+3] === 0) return false; // already transparent
      // Higher threshold to catch compressed dark gray pixels on wood planks, hay, etc.
      return data[idx] < 35 && data[idx+1] < 35 && data[idx+2] < 35;
    };
    
    const setTransparent = (x, y) => {
      const idx = (y * w + x) * 4;
      data[idx+3] = 0; // set alpha channel to 0
    };
    
    // Seed queue with border pixels
    for (let x = 0; x < w; x++) {
      if (isBlack(x, 0) && !visited[0 * w + x]) {
        queue.push(x, 0);
        visited[0 * w + x] = 1;
      }
      if (isBlack(x, h - 1) && !visited[(h - 1) * w + x]) {
        queue.push(x, h - 1);
        visited[(h - 1) * w + x] = 1;
      }
    }
    for (let y = 0; y < h; y++) {
      if (isBlack(0, y) && !visited[y * w + 0]) {
        queue.push(0, y);
        visited[y * w + 0] = 1;
      }
      if (isBlack(w - 1, y) && !visited[y * w + (w - 1)]) {
        queue.push(w - 1, y);
        visited[y * w + (w - 1)] = 1;
      }
    }
    
    // BFS traversal to flood fill border-connected black pixels
    let head = 0;
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    
    while (head < queue.length) {
      const x = queue[head++];
      const y = queue[head++];
      
      setTransparent(x, y);
      
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const vIdx = ny * w + nx;
          if (!visited[vIdx] && isBlack(nx, ny)) {
            visited[vIdx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
    
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  } catch (e) {
    console.error("Gagal melakukan chroma-key: ", e);
    return img;
  }
}

// --- GAME CLASS (STATE MACHINE) ---
class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Core Managers
    this.player = new Player(0, 0);
    this.inputs = { left: false, right: false, jump: false };
    
    // Game States
    this.state = 'LOADING'; // LOADING, START, PLAYING, GAMEOVER, CLEAR, WIN
    this.score = 0;
    this.totalScore = 0;
    this.currentLevelIndex = 1;
    this.unlockedLevelIndex = 1;
    
    // Level entities lists
    this.tiles = [];
    this.solids = []; // cache of solid walls for collision calculations
    this.enemies = [];
    this.collectibles = [];
    this.swingingBuckets = [];
    this.doors = [];
    this.pressurePlates = [];
    this.exitGate = null;
    
    // Camera
    this.camera = { x: 0 };
    this.frameCounter = 0;
    
    // Asset image store
    this.images = {};
    
    // Setup inputs & event listeners
    this.setupControls();
    
    // Load local storage high scores
    if (localStorage.getItem('farmrush_unlocked')) {
      this.unlockedLevelIndex = parseInt(localStorage.getItem('farmrush_unlocked'));
    }
  }

  // --- INITIALIZATION ---
  init() {
    this.loadAssets();
  }

  loadAssets() {
    let loadedCount = 0;
    const totalCount = ASSET_PATHS.length;
    const bar = document.getElementById('loader-bar');
    const text = document.getElementById('loader-text');

    ASSET_PATHS.forEach(path => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedCount++;
        
        // Remove black backgrounds for elements/tiles/UI buttons, but keep full screens intact
        const isBackground = path.includes('bg_level') || path.includes('game_over') || path.includes('win_srceen');
        if (!isBackground) {
          this.images[path] = removeBlackBackground(img);
        } else {
          this.images[path] = img;
        }

        // Dynamically update any HTML <img> tags with the transparent/processed image
        const imgElements = document.querySelectorAll('img');
        imgElements.forEach(el => {
          if (el.getAttribute('src') === path) {
            if (this.images[path] instanceof HTMLCanvasElement) {
              el.src = this.images[path].toDataURL();
            } else {
              el.src = path;
            }
          }
        });
        
        const pct = Math.floor((loadedCount / totalCount) * 100);
        bar.style.width = pct + '%';
        text.innerText = `Memuat ${path.split('/').pop()} (${pct}%)`;

        if (loadedCount === totalCount) {
          setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
            this.showMainMenu();
          }, 800);
        }
      };
      
      img.onerror = () => {
        console.error("Gagal memuat asset: " + path);
        // still increment to avoid soft lock
        loadedCount++;
        if (loadedCount === totalCount) {
          document.getElementById('loading-screen').classList.add('hidden');
          this.showMainMenu();
        }
      };
    });
  }

  // --- SCREEN STATES CHANGES ---
  showMainMenu() {
    this.state = 'START';
    
    // Update Menu locks
    const btnL2 = document.getElementById('btn-level-2');
    if (this.unlockedLevelIndex >= 2) {
      btnL2.classList.remove('locked');
      btnL2.classList.add('active');
      btnL2.removeAttribute('disabled');
      const lock = btnL2.querySelector('.lock-icon');
      if (lock) lock.style.display = 'none';
    }

    // Toggle active classes based on selection
    document.querySelectorAll('.btn-level').forEach(btn => {
      btn.onclick = (e) => {
        const lvl = parseInt(btn.getAttribute('data-level'));
        if (lvl <= this.unlockedLevelIndex) {
          this.currentLevelIndex = lvl;
          document.querySelectorAll('.btn-level').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      };
    });

    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('game-hud').classList.add('hidden');
    document.getElementById('mobile-controls').classList.add('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('level-clear-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');

    // Setup action buttons
    document.getElementById('btn-play').onclick = () => {
      Sounds.init(); // Init Audio Context
      document.getElementById('start-screen').classList.add('hidden');
      this.startLevel(this.currentLevelIndex);
    };
  }

  startLevel(levelNum) {
    this.currentLevelIndex = levelNum;
    this.score = 0;
    this.frameCounter = 0;
    this.lives = 3;
    
    // Load level map design
    const lvlData = LEVEL_MAPS[levelNum];
    if (!lvlData) return;

    // Reset Managers
    this.enemies = [];
    this.collectibles = [];
    this.swingingBuckets = [];
    this.doors = [];
    this.pressurePlates = [];
    this.solids = [];
    this.tiles = [];
    Particles.clear();

    // Setup level text
    document.getElementById('hud-level-name').innerText = `LEVEL ${levelNum}: ${lvlData.name.toUpperCase()}`;
    this.updateHUD();

    // Parse Tilemap Grid
    const mapGrid = lvlData.tiles;
    for (let row = 0; row < mapGrid.length; row++) {
      const rowStr = mapGrid[row];
      for (let col = 0; col < rowStr.length; col++) {
        const char = rowStr[col];
        const x = col * TILE_SIZE;
        const y = row * TILE_SIZE;

        if (char === 'G') {
          // Auto-tiling Grass: check neighbors
          const leftChar = col > 0 ? rowStr[col - 1] : null;
          const rightChar = col < rowStr.length - 1 ? rowStr[col + 1] : null;
          const connectsLeft = (leftChar === 'G');
          const connectsRight = (rightChar === 'G');

          let img = '';
          if (connectsLeft && connectsRight) {
            img = 'asset/grass7.png'; // Middle (seamless)
          } else if (connectsLeft) {
            img = 'asset/grass6.png'; // Right Corner (flat left, rounded right)
          } else if (connectsRight) {
            img = 'asset/grass5.png'; // Left Corner (rounded left, flat right)
          } else {
            const grassIdx = Math.floor(Math.random() * 4) + 1; // 1-4
            img = `asset/grass${grassIdx}.png`; // Standalone block
          }

          this.tiles.push({ x, y, img });
          this.solids.push({ x, y, w: TILE_SIZE, h: TILE_SIZE });
        } else if (char === 'd') {
          // Auto-tiling Dirt: check neighbors
          const leftChar = col > 0 ? rowStr[col - 1] : null;
          const rightChar = col < rowStr.length - 1 ? rowStr[col + 1] : null;
          const connectsLeft = (leftChar === 'd' || leftChar === 'G');
          const connectsRight = (rightChar === 'd' || rightChar === 'G');

          let img = '';
          if (connectsLeft && connectsRight) {
            img = 'asset/dritmiddle7.png'; // Middle (seamless)
          } else if (connectsLeft) {
            img = 'asset/dritmiddle6.png'; // Right Edge
          } else if (connectsRight) {
            img = 'asset/dritmiddle5.png'; // Left Edge
          } else {
            const dirtMIdx = Math.floor(Math.random() * 4) + 1; // 1-4
            img = `asset/dritmiddle${dirtMIdx}.png`; // Standalone
          }

          this.tiles.push({ x, y, img });
          this.solids.push({ x, y, w: TILE_SIZE, h: TILE_SIZE });
        } else if (char === 'b') {
          // Dirt bottom
          const dirtBIdx = Math.floor(Math.random() * 5) + 1; // 1-5
          this.tiles.push({ x, y, img: `asset/dirtbottom${dirtBIdx}.png` });
          this.solids.push({ x, y, w: TILE_SIZE, h: TILE_SIZE });
        } else if (char === 'p') {
          // Wooden plank platform (One-way solid)
          this.tiles.push({ x, y, img: `asset/papankayu2.png`, w: 48, h: 48, isDecor: true });
          this.solids.push({ x, y, w: TILE_SIZE, h: 16, isPlank: true });
        } else if (char === 'P') {
          // Long Plank Platform (papankayu1) - spans 2 cols
          this.tiles.push({ x, y, img: `asset/papankayu1.png`, w: 96, h: 48, isDecor: true });
          this.solids.push({ x, y, w: 96, h: 16, isPlank: true });
        } else if (char === 'U') {
          // Large U-shaped ditch (lubang1) - spans 4 cols x 3 rows (192x144)
          this.tiles.push({ x, y, img: `asset/lubang1.png`, w: 192, h: 144, isDecor: true });
          this.solids.push({ x: x, y: y, w: 48, h: 144 });
          this.solids.push({ x: x + 144, y: y, w: 48, h: 144 });
          this.solids.push({ x: x, y: y + 96, w: 192, h: 48 });
        } else if (char === 'u') {
          // Curved U-shaped ditch (lubang3) - spans 4 cols x 3 rows (192x144)
          this.tiles.push({ x, y, img: `asset/lubang3.png`, w: 192, h: 144, isDecor: true });
          this.solids.push({ x: x, y: y, w: 48, h: 144 });
          this.solids.push({ x: x + 144, y: y, w: 48, h: 144 });
          this.solids.push({ x: x, y: y + 96, w: 192, h: 48 });
        } else if (char === 'L') {
          // Left Hay Platform with diagonal strut (jerami3) - spans 2 cols x 2 rows (96x96)
          this.tiles.push({ x, y, img: `asset/jerami3.png`, w: 96, h: 96, isDecor: true });
          this.solids.push({ x, y, w: 96, h: 16, isPlank: true });
        } else if (char === 'R') {
          // Right Hay Platform with diagonal strut (jerami4) - spans 2 cols x 2 rows (96x96)
          this.tiles.push({ x, y, img: `asset/jerami4.png`, w: 96, h: 96, isDecor: true });
          this.solids.push({ x, y, w: 96, h: 16, isPlank: true });
        } else if (char === 'H') {
          // Long Hay Platform (jeramipanjang1) - spans 4 cols x 1 row (192x48)
          this.tiles.push({ x, y, img: `asset/jeramipanjang1.png`, w: 192, h: 48, isDecor: true });
          this.solids.push({ x, y, w: 192, h: 16, isPlank: true });
        } else if (char === 'F') {
          // Wooden fence with diagonal strut (tiangkayu4) - spans 2 cols x 2 rows (96x96)
          this.tiles.push({ x, y, img: `asset/tiangkayu4.png`, w: 96, h: 96, isDecor: true });
        } else if (char === 'X') {
          // Wooden fence with crossed struts (tiangkayu5) - spans 2 cols x 2 rows (96x96)
          this.tiles.push({ x, y, img: `asset/tiangkayu5.png`, w: 96, h: 96, isDecor: true });
        } else if (char === '1') {
          // Single post short (tiangkayu1)
          this.tiles.push({ x, y, img: `asset/tiangkayu1.png`, w: 48, h: 48, isDecor: true });
        } else if (char === '2') {
          // Single post medium/tall (tiangkayu2) - starts 1 row above ground to align bottom
          this.tiles.push({ x, y: y - 48, img: `asset/tiangkayu2.png`, w: 48, h: 96, isDecor: true });
        } else if (char === '3') {
          // Single post tall (tiangkayu3) - starts 1 row above ground to align bottom
          this.tiles.push({ x, y: y - 48, img: `asset/tiangkayu3.png`, w: 48, h: 96, isDecor: true });
        } else if (char === 't') {
          // Wooden post (Backward compatibility for random post, using 1-3 to avoid fence sprites)
          const postIdx = Math.floor(Math.random() * 3) + 1;
          this.tiles.push({ x, y, img: `asset/tiangkayu${postIdx}.png`, isDecor: true });
        } else if (char === 'j') {
          // Haystack decoration (Backward compatibility for random hay, using 1-2 to avoid multi-tile hay)
          const hayIdx = Math.floor(Math.random() * 2) + 1;
          this.tiles.push({ x, y, img: `asset/jerami${hayIdx}.png`, isDecor: true });
        }
      }
    }

    // Spawn Player
    this.player.reset(lvlData.playerSpawn.x, lvlData.playerSpawn.y);

    // Spawn Exit Gate
    this.exitGate = new ExitGate(lvlData.exitGate.x, lvlData.exitGate.y);

    // Spawn Collectibles
    lvlData.collectibles.forEach(colData => {
      if (colData.type === 'gandum') {
        this.collectibles.push(new Gandum(colData.x, colData.y));
      } else if (colData.type === 'egg') {
        this.collectibles.push(new TelurKecil(colData.x, colData.y));
      }
    });

    // Spawn Enemies
    lvlData.enemies.forEach(eData => {
      if (eData.type === 'ulat') {
        this.enemies.push(new Caterpillar(eData.x, eData.y));
      } else if (eData.type === 'ayam') {
        this.enemies.push(new Chicken(eData.x, eData.y));
      }
    });

    // Spawn Obstacles
    lvlData.obstacles.forEach(oData => {
      if (oData.type === 'swing') {
        this.swingingBuckets.push(new SwingingBucket(oData.x, oData.y, oData.length));
      } else if (oData.type === 'door_system') {
        // Create door
        const door = new CoopDoor(oData.doorX, oData.yDr, oData.id);
        this.doors.push(door);
        // Create switch
        this.pressurePlates.push(new PressurePlate(oData.switchX, oData.ySw, oData.id));
      }
    });

    // Reset camera focus
    this.camera.x = this.player.x - CANVAS_WIDTH / 3;

    // Show screens HUD
    document.getElementById('game-hud').classList.remove('hidden');
    
    // Show mobile controls overlay
    document.getElementById('mobile-controls').classList.remove('hidden');

    this.state = 'PLAYING';
  }

  // HUD Update
  updateHUD() {
    const gatheredGandum = this.collectibles.filter(c => c.collected && c instanceof Gandum).length;
    const totalGandum = this.collectibles.filter(c => c instanceof Gandum).length;
    
    // Score string zero padded
    document.getElementById('hud-score').innerText = String(this.score).padStart(4, '0');
    
    const eggsCollected = this.collectibles.filter(c => c.collected && c instanceof TelurKecil).length;
    const totalEggs = this.collectibles.filter(c => c instanceof TelurKecil).length;
    document.getElementById('hud-eggs').innerText = `${eggsCollected}/${totalEggs}`;

    if (document.getElementById('hud-lives')) {
      document.getElementById('hud-lives').innerText = this.lives;
    }
  }

  // --- CONTROLS SETUP ---
  setupControls() {
    // Keyboard key listeners
    const handleKey = (e, isDown) => {
      // Prevent default page scrolling behavior for control keys
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.inputs.left = isDown;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') this.inputs.right = isDown;
      if (e.code === 'ArrowUp' || e.code === 'Space' || e.code === 'KeyW') this.inputs.jump = isDown;

      // Quick restart shortcut key
      if (isDown && e.code === 'KeyR' && this.state === 'PLAYING') {
        this.startLevel(this.currentLevelIndex);
      }
    };

    window.addEventListener('keydown', (e) => handleKey(e, true));
    window.addEventListener('keyup', (e) => handleKey(e, false));

    // Button controls click triggers
    document.getElementById('btn-hud-restart').onclick = () => {
      this.startLevel(this.currentLevelIndex);
    };

    document.getElementById('btn-retry').onclick = () => {
      document.getElementById('game-over-screen').classList.add('hidden');
      this.startLevel(this.currentLevelIndex);
    };

    document.getElementById('btn-next-level').onclick = () => {
      document.getElementById('level-clear-screen').classList.add('hidden');
      this.startLevel(2);
    };

    document.getElementById('btn-win-restart').onclick = () => {
      document.getElementById('win-screen').classList.add('hidden');
      this.showMainMenu();
    };

    // Mobile on-screen control listeners (touch & mouse click)
    const setupMobileBtn = (btnId, inputKey) => {
      const btn = document.getElementById(btnId);
      
      const press = (e) => {
        e.preventDefault();
        this.inputs[inputKey] = true;
      };
      
      const release = (e) => {
        e.preventDefault();
        this.inputs[inputKey] = false;
      };

      btn.addEventListener('touchstart', press);
      btn.addEventListener('touchend', release);
      btn.addEventListener('mousedown', press);
      btn.addEventListener('mouseup', release);
      btn.addEventListener('mouseleave', release);
    };

    setupMobileBtn('ctrl-left', 'left');
    setupMobileBtn('ctrl-right', 'right');
    setupMobileBtn('ctrl-jump', 'jump');
  }

  // --- GAME OVER & COMPLETION LOGIC ---
  triggerGameOver() {
    this.state = 'GAMEOVER';
    document.getElementById('game-hud').classList.add('hidden');
    document.getElementById('mobile-controls').classList.add('hidden');
    
    // Calculate stats
    const gandumCollected = this.collectibles.filter(c => c.collected && c instanceof Gandum).length;
    const eggsCollected = this.collectibles.filter(c => c.collected && c instanceof TelurKecil).length;
    const totalEggs = this.collectibles.filter(c => c instanceof TelurKecil).length;
    
    document.getElementById('game-over-score').innerText = this.score;
    document.getElementById('game-over-wheat').innerText = gandumCollected;
    document.getElementById('game-over-eggs').innerText = `${eggsCollected}/${totalEggs}`;
    
    document.getElementById('game-over-screen').classList.remove('hidden');
  }

  triggerLevelClear() {
    this.state = 'CLEAR';
    document.getElementById('game-hud').classList.add('hidden');
    document.getElementById('mobile-controls').classList.add('hidden');
    Sounds.playWin();

    const gandumCollected = this.collectibles.filter(c => c.collected && c instanceof Gandum).length;
    const eggsCollected = this.collectibles.filter(c => c.collected && c instanceof TelurKecil).length;
    const totalEggs = this.collectibles.filter(c => c instanceof TelurKecil).length;

    // Calculate level bonuses
    const wheatBonus = gandumCollected * 5;
    const eggBonus = eggsCollected * 100;
    const finalLevelScore = this.score + wheatBonus + eggBonus;
    this.totalScore += finalLevelScore;

    document.getElementById('clear-score').innerText = finalLevelScore;
    document.getElementById('clear-wheat').innerText = `+${wheatBonus} (Bonus)`;
    document.getElementById('clear-eggs').innerText = `${eggsCollected}/${totalEggs} (+${eggBonus} Bonus)`;

    // Level progression
    if (this.currentLevelIndex === 1) {
      this.unlockedLevelIndex = Math.max(this.unlockedLevelIndex, 2);
      localStorage.setItem('farmrush_unlocked', this.unlockedLevelIndex);
      document.getElementById('level-clear-screen').classList.remove('hidden');
    } else {
      // Completed Level 2 -> Trigger Full Game Completion screen
      setTimeout(() => {
        this.triggerGameWin();
      }, 500);
    }
  }

  triggerGameWin() {
    this.state = 'WIN';
    document.getElementById('level-clear-screen').classList.add('hidden');
    document.getElementById('game-hud').classList.add('hidden');
    document.getElementById('mobile-controls').classList.add('hidden');

    const totalEggs = LEVEL_MAPS[1].collectibles.filter(c => c.type === 'egg').length + 
                     LEVEL_MAPS[2].collectibles.filter(c => c.type === 'egg').length;
    
    // Read total collected
    // In real play we could sum egg collection, let's keep it simple
    document.getElementById('win-score').innerText = this.totalScore;
    document.getElementById('win-eggs').innerText = `Semua Level Selesai!`;
    
    document.getElementById('win-screen').classList.remove('hidden');
  }


  // --- MAIN GAME LOOP ---
  run() {
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  update() {
    this.frameCounter++;
    
    if (this.state !== 'PLAYING') {
      Particles.update();
      return;
    }

    // 1. Compile Solids Cache (Include Door states)
    let activeSolids = [...this.solids];
    this.doors.forEach(door => {
      door.update();
      const hitbox = door.getHitbox();
      if (hitbox) {
        // Solid wall parameters
        activeSolids.push({ x: hitbox.x, y: hitbox.y, w: hitbox.w, h: hitbox.h });
      }
    });

    // 2. Update Player
    const lvlWidth = LEVEL_MAPS[this.currentLevelIndex].width;
    this.player.update(this.inputs, activeSolids, lvlWidth, this);

    // 3. Update Swinging Buckets pendulum physics
    this.swingingBuckets.forEach(bucket => {
      bucket.update(this.frameCounter);
      
      // Check hazards collision with player
      if (!this.player.isDead && this.player.invulnerableTimer <= 0) {
        const pHit = this.player.getHitbox();
        const bHit = bucket.getHitbox();
        if (pHit.x < bHit.x + bHit.w && pHit.x + pHit.w > bHit.x && pHit.y < bHit.y + bHit.h && pHit.y + pHit.h > bHit.y) {
          this.player.die();
        }
      }
    });

    // 4. Update Pressure Switches
    this.pressurePlates.forEach(plate => {
      const pHit = this.player.getHitbox();
      const plHit = plate.getHitbox();
      
      // Check overlap
      if (!this.player.isDead && pHit.x < plHit.x + plHit.w && pHit.x + pHit.w > plHit.x && pHit.y + pHit.h >= plHit.y && pHit.y <= plHit.y + plHit.h) {
        plate.press();
        // Open matching door
        this.doors.forEach(d => {
          if (d.id === plate.doorId) {
            d.open();
          }
        });
      }
    });

    // 5. Update Enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(activeSolids, lvlWidth, this.player.x, this.player.y);
      
      if (enemy.shouldRemove) {
        this.enemies.splice(i, 1);
        continue;
      }

      // Collisions checking with player
      if (!enemy.isStomped && !this.player.isDead && this.player.invulnerableTimer <= 0) {
        const pHit = this.player.getHitbox();
        const eHit = enemy.getHitbox();

        if (pHit.x < eHit.x + eHit.w && pHit.x + pHit.w > eHit.x && pHit.y < eHit.y + eHit.h && pHit.y + pHit.h > eHit.y) {
          // Stomp Attack check: player is falling and his bottom overlaps enemy top
          const isStomp = (this.player.vy > 0) && (this.player.y + this.player.height - this.player.vy <= enemy.y + 15);
          if (isStomp) {
            enemy.stomp();
            this.player.vy = -8.5; // bounce player upwards
            this.score += 100;
            this.updateHUD();
          } else {
            // Player takes hit and dies
            this.player.die();
          }
        }
      }
    }

    // 6. Update Collectibles
    this.collectibles.forEach(col => {
      if (!col.collected && !this.player.isDead) {
        const pHit = this.player.getHitbox();
        const cHit = col.getHitbox();

        if (pHit.x < cHit.x + cHit.w && pHit.x + pHit.w > cHit.x && pHit.y < cHit.y + cHit.h && pHit.y + pHit.h > cHit.y) {
          col.collect();
          
          if (col instanceof Gandum) {
            this.score += 10;
          } else if (col instanceof TelurKecil) {
            this.score += 50;
          }
          this.updateHUD();
        }
      }
    });

    // 7. Update Exit Portal
    this.exitGate.update(this.player.x, this.player.y);
    if (!this.player.isDead && this.exitGate.state === 'open') {
      const pHit = this.player.getHitbox();
      const exHit = this.exitGate.getHitbox();
      if (pHit.x < exHit.x + exHit.w && pHit.x + pHit.w > exHit.x && pHit.y < exHit.y + exHit.h && pHit.y + pHit.h > exHit.y) {
        this.triggerLevelClear();
      }
    }

    // 8. Particles update
    Particles.update();

    // 9. Camera smooth follow
    const targetCamX = this.player.x - CANVAS_WIDTH / 3;
    this.camera.x += (targetCamX - this.camera.x) * 0.1;
    
    // Camera boundaries clamping
    if (this.camera.x < 0) this.camera.x = 0;
    const maxCamX = lvlWidth - CANVAS_WIDTH;
    if (this.camera.x > maxCamX) this.camera.x = maxCamX;
  }

  draw() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    if (this.state === 'LOADING' || this.state === 'START') {
      return; // Handled by HTML overlays
    }

    // 1. Draw Parallax Background
    const lvlBg = LEVEL_MAPS[this.currentLevelIndex].bg;
    const bgImg = this.images[lvlBg];
    if (bgImg) {
      // Parallax scroll math
      const scrollFactor = 0.25;
      const bgW = bgImg.width * (CANVAS_HEIGHT / bgImg.height); // stretch to fit canvas height
      const bgH = CANVAS_HEIGHT;
      const bgX = - (this.camera.x * scrollFactor) % bgW;
      
      this.ctx.drawImage(bgImg, bgX, 0, bgW, bgH);
      this.ctx.drawImage(bgImg, bgX + bgW, 0, bgW, bgH);
      if (bgX + bgW < CANVAS_WIDTH) {
        this.ctx.drawImage(bgImg, bgX + bgW * 2, 0, bgW, bgH);
      }
    }

    // 2. Draw Tiles (separated into decorative background tiles and solid blocks)
    // Draw decorative support tiles first
    this.tiles.forEach(tile => {
      if (tile.isDecor) {
        const img = this.images[tile.img];
        if (img) {
          const w = (tile.w || TILE_SIZE) + 0.5;
          const h = (tile.h || TILE_SIZE) + 0.5;
          this.ctx.drawImage(img, tile.x - this.camera.x, tile.y, w, h);
        }
      }
    });

    // Draw solid foreground tiles
    this.tiles.forEach(tile => {
      if (!tile.isDecor) {
        const img = this.images[tile.img];
        if (img) {
          const w = (tile.w || TILE_SIZE) + 0.5;
          const h = (tile.h || TILE_SIZE) + 0.5;
          this.ctx.drawImage(img, tile.x - this.camera.x, tile.y, w, h);
        }
      }
    });

    // 3. Draw Pressure Plates & Doors
    this.pressurePlates.forEach(plate => plate.draw(this.ctx, this.camera.x));
    this.doors.forEach(door => door.draw(this.ctx, this.images, this.camera.x));

    // 4. Draw Exit portal (represented by the exit door)
    this.exitGate.draw(this.ctx, this.images, this.camera.x);

    // 5. Draw Collectibles
    this.collectibles.forEach(col => col.draw(this.ctx, this.images, this.camera.x, this.frameCounter));

    // 6. Draw Enemies
    this.enemies.forEach(enemy => enemy.draw(this.ctx, this.images, this.camera.x));

    // 7. Draw swinging bucket traps
    this.swingingBuckets.forEach(bucket => bucket.draw(this.ctx, this.images, this.camera.x));

    // 8. Draw Player
    this.player.draw(this.ctx, this.images, this.camera.x);

    // 9. Draw Particle bursts
    Particles.draw(this.ctx, this.camera.x);
  }
}

// Instantiate and start running the game when document loads
window.onload = () => {
  const game = new Game();
  game.init();
  game.run();
};
