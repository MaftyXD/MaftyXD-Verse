/* ───────────────────────────────────────────────────────────────
   HERO ANIMATIONS — GSAP handles all hero visual animations
   ─────────────────────────────────────────────────────────────── */
(function(){
  'use strict';
  if (typeof gsap === 'undefined') return;

  const heroRings = document.querySelectorAll('.hero-rings .ring');
  const heroHalo = document.querySelector('.hero-halo');
  const heroChar = document.querySelector('.hero-char');
  const heroChips = document.querySelectorAll('.chip');

  /* ── Rings — continuous rotation + glow pulse ── */
  heroRings.forEach(function(ring, i){
    var speeds = [42, 30, 20];
    var dirs = [1, -1, 1];
    gsap.to(ring, {
      rotation: 360 * dirs[i],
      duration: speeds[i],
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center'
    });
    gsap.to(ring, {
      borderColor: 'rgba(10,132,255,.55)',
      filter: 'drop-shadow(0 0 8px rgba(10,132,255,.3))',
      duration: 3 + i,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 1
    });
  });

  /* ── Halo — breathing + rotation ── */
  if (heroHalo){
    gsap.to(heroHalo, {
      scale: 1.15,
      rotation: 360,
      opacity: 0.8,
      duration: 7,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'center center'
    });
  }

  /* ── Character — floating + glow ── */
  if (heroChar){
    gsap.to(heroChar, {
      y: -14,
      rotation: 0.5,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
    gsap.to(heroChar, {
      filter: 'drop-shadow(0 40px 80px rgba(10,132,255,.32)) drop-shadow(0 0 20px rgba(10,132,255,.15))',
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }

  /* ── Chips — entrance pop THEN orbit ── */
  heroChips.forEach(function(chip, i){
    gsap.set(chip, { opacity: 0, scale: 0.7, y: 12 });

    var entranceTl = gsap.timeline({ delay: 0.8 + i * 0.2 });
    entranceTl.to(chip, {
      opacity: 1, scale: 1, y: 0,
      duration: 0.8, ease: 'back.out(1.7)'
    });

    var orbitPaths = [
      { keyframes: [
        { x: 18, y: -10, rotation: 2, duration: 3.6, ease: 'sine.inOut' },
        { x: 28, y: -22, rotation: 0, duration: 3.6, ease: 'sine.inOut' },
        { x: 10, y: -30, rotation: -2, duration: 3.6, ease: 'sine.inOut' },
        { x: -12, y: -18, rotation: -1, duration: 3.6, ease: 'sine.inOut' },
        { x: 0, y: 0, rotation: 0, duration: 3.6, ease: 'sine.inOut' }
      ]},
      { keyframes: [
        { x: -14, y: -8, scale: 1.04, rotation: 1, duration: 2.25, ease: 'sine.inOut' },
        { x: -6, y: -18, scale: 1.02, rotation: -1, duration: 2.25, ease: 'sine.inOut' },
        { x: 8, y: -10, scale: 1.03, rotation: 0.5, duration: 2.25, ease: 'sine.inOut' },
        { x: 0, y: 0, scale: 1, rotation: 0, duration: 2.25, ease: 'sine.inOut' }
      ]},
      { keyframes: [
        { x: 14, y: -8, rotation: -1.5, duration: 2.75, ease: 'sine.inOut' },
        { x: 20, y: 4, rotation: 1, duration: 2.75, ease: 'sine.inOut' },
        { x: 10, y: 8, rotation: -0.5, duration: 2.75, ease: 'sine.inOut' },
        { x: 0, y: 0, rotation: 0, duration: 2.75, ease: 'sine.inOut' }
      ]}
    ];

    if (orbitPaths[i]){
      entranceTl.to(chip, {
        keyframes: orbitPaths[i].keyframes,
        repeat: -1
      });
    }
  });

})();
