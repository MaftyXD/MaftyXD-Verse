/* ───────────────────────────────────────────────────────────────
   ANIMATIONS — GSAP handles ALL scroll/scene animations
   (hero animations stay in hero.js)
   ─────────────────────────────────────────────────────────────── */
(function(){
  'use strict';
  if (typeof gsap === 'undefined') return;

  var ease = 'power2.out';
  var easeBack = 'back.out(1.7)';
  var T = 'none'; /* transition:none — prevent CSS transition interference */

  /* ═══════════════════════════════════════════════════════════════
     1. REVEAL ON SCROLL — replaces [data-reveal] CSS transitions
     ═══════════════════════════════════════════════════════════════ */
  var revealEls = document.querySelectorAll('[data-reveal]');
  var maskReveals = document.querySelectorAll('.reveal .mask > span');

  revealEls.forEach(function(el){ gsap.set(el, {opacity:0, y:24, transition:T}); });
  maskReveals.forEach(function(el){ gsap.set(el, {transform:'translateY(105%)', transition:T}); });

  if ('IntersectionObserver' in window){
    var revealIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = 0;
        var ds = el.getAttribute('style');
        if (ds){
          var m = ds.match(/--delay:\s*([\d.]+)s/);
          if (m) delay = parseFloat(m[1]);
        }
        if (el.classList.contains('reveal')){
          var spans = el.querySelectorAll('.mask > span');
          gsap.to(el, {opacity:1, y:0, duration:.9, ease:ease, delay:delay});
          gsap.fromTo(spans, {transform:'translateY(105%)'}, {transform:'translateY(0%)', duration:.9, ease:ease, stagger:.1, delay:delay});
        } else {
          gsap.to(el, {opacity:1, y:0, duration:.9, ease:ease, delay:delay});
        }
        revealIO.unobserve(el);
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    revealEls.forEach(function(el){ revealIO.observe(el); });
  } else {
    revealEls.forEach(function(el){ gsap.set(el, {opacity:1, y:0}); });
    maskReveals.forEach(function(el){ gsap.set(el, {transform:'translateY(0%)'}); });
  }

  /* ═══════════════════════════════════════════════════════════════
     2. LORE SCENE ANIMATIONS — GSAP timelines per scene
     ═══════════════════════════════════════════════════════════════ */
  var scenes = Array.from(document.querySelectorAll('.lore-scene'));

  function $(sel, ctx){ return (ctx || document).querySelector(sel); }
  function $$(sel, ctx){ return Array.from((ctx || document).querySelectorAll(sel)); }

  /* helper: set initial hidden state, disable CSS transitions */
  function hide(el, vars){
    vars.transition = T;
    gsap.set(el, vars);
  }

  /* helper: build a tween that clears transform after entrance
     (prevents inline transform from killing CSS @keyframes like spin) */
  function revealTween(tl, sel, vars, pos, ctx){
    var targets = $$(sel, ctx);
    if (!targets.length) return;
    vars.clearProps = 'transform';
    tl.to(targets, vars, pos);
  }
  function revealTween1(tl, sel, vars, pos, ctx){
    var t = $(sel, ctx);
    if (!t) return;
    vars.clearProps = 'transform';
    tl.to(t, vars, pos);
  }

  /* ── set hidden states per scene ── */
  function setSceneHidden(sceneEl){
    var idx = parseInt(sceneEl.getAttribute('data-scene'), 10);
    var inner = $('.scene-inner', sceneEl) || sceneEl;

    var h = function(sel, vars){
      var nodes = $$(sel, inner);
      nodes.forEach(function(n){ hide(n, vars); });
    };

    switch (idx){
      case 0: /* Identitas */
        h('.title-row span', {yPercent:110});
        h('.s-id .lede', {opacity:0, y:14});
        h('.s-id-art', {opacity:0, scale:.9, rotation:-3});
        break;
      case 1: /* Neovara */
        h('h3', {opacity:0, y:34, scale:.97});
        h('p', {opacity:0, y:14});
        break;
      case 2: /* Institute */
        h('.inst-title', {opacity:0, y:26, scale:.98});
        h('.inst-sub', {opacity:0, y:14});
        h('.term', {opacity:0, y:20, scale:.97});
        break;
      case 3: /* AEGIS */
        h('h3', {opacity:0, y:26});
        h('p', {opacity:0, y:14});
        h('.aegis-q', {opacity:0, y:14, scale:.97});
        break;
      case 4: /* Eksperimen */
        h('h3', {opacity:0, y:26});
        h('.s-experiment p', {opacity:0, y:14});
        h('.exp-sub', {opacity:0, y:10});
        h('.exp-fill', {scaleX:0, transformOrigin:'left center'});
        h('.exp-label', {opacity:0});
        break;
      case 5: /* Incident */
        h('.mark', {opacity:0, y:10});
        h('q span', {yPercent:110, rotation:2});
        h('.after', {opacity:0, y:14});
        break;
      case 6: /* MYRE Core */
        h('.core-orbit i', {opacity:0, scale:.35});
        h('.core-sym', {opacity:0, scale:.6, rotation:-25});
        h('.s-core h3', {opacity:0, y:22});
        h('.s-core p', {opacity:0, y:14});
        break;
      case 7: /* Kelahiran */
        h('.birth-title', {opacity:0, scale:.4});
        h('.s-birth p', {opacity:0, y:14});
        h('.birth-q', {opacity:0, y:10});
        h('.birth-line', {opacity:0, scaleY:0});
        break;
      case 8: /* External Link */
        h('.gate-ring', {opacity:0});
        h('.gate-core', {opacity:0, scale:.3});
        h('.s-link h3', {opacity:0, y:22});
        h('.s-link p', {opacity:0, y:14});
        break;
      case 9: /* Journey */
        h('.final-q', {opacity:0, y:30});
        h('.final-body', {opacity:0, y:14});
        h('.final-tagline span', {opacity:0, y:20});
        break;
    }
  }

  /* ── build timeline per scene ── */
  function buildTimeline(sceneEl){
    var idx = parseInt(sceneEl.getAttribute('data-scene'), 10);
    var inner = $('.scene-inner', sceneEl) || sceneEl;
    var tl = gsap.timeline({paused:true});

    switch (idx){
      case 0: /* Identitas */
        revealTween(tl, '.title-row span', {yPercent:0, duration:1, ease:ease, stagger:.12}, 0, inner);
        revealTween1(tl, '.s-id .lede', {opacity:1, y:0, duration:.9, ease:ease}, .5, inner);
        revealTween1(tl, '.s-id-art', {opacity:1, scale:1, rotation:0, duration:1.1, ease:ease}, .2, inner);
        break;
      case 1: /* Neovara */
        revealTween1(tl, 'h3', {opacity:1, y:0, scale:1, duration:1, ease:ease}, .15, inner);
        revealTween1(tl, 'p', {opacity:1, y:0, duration:.9, ease:ease}, .45, inner);
        break;
      case 2: /* Institute */
        revealTween1(tl, '.inst-title', {opacity:1, y:0, scale:1, duration:1, ease:ease}, .14, inner);
        revealTween1(tl, '.inst-sub', {opacity:1, y:0, duration:.9, ease:ease}, .4, inner);
        revealTween1(tl, '.term', {opacity:1, y:0, scale:1, duration:1.05, ease:ease}, .62, inner);
        break;
      case 3: /* AEGIS */
        revealTween1(tl, 'h3', {opacity:1, y:0, duration:.9, ease:ease}, .2, inner);
        revealTween1(tl, 'p', {opacity:1, y:0, duration:.9, ease:ease}, .45, inner);
        revealTween1(tl, '.aegis-q', {opacity:1, y:0, scale:1, duration:1, ease:ease}, .6, inner);
        break;
      case 4: /* Eksperimen */
        revealTween1(tl, 'h3', {opacity:1, y:0, duration:.9, ease:ease}, .2, inner);
        revealTween(tl, '.s-experiment p', {opacity:1, y:0, duration:.9, ease:ease}, .45, inner);
        revealTween1(tl, '.exp-fill', {scaleX:1, duration:2.4, ease:ease}, .6, inner);
        revealTween1(tl, '.exp-label', {opacity:1, duration:.8, ease:ease}, 1.2, inner);
        break;
      case 5: /* Incident */
        revealTween1(tl, '.mark', {opacity:1, y:0, duration:.8, ease:ease}, 0, inner);
        revealTween(tl, 'q span', {yPercent:0, rotation:0, duration:1.1, ease:ease, stagger:.16}, 0, inner);
        revealTween1(tl, '.after', {opacity:1, y:0, duration:.9, ease:ease}, .5, inner);
        break;
      case 6: /* MYRE Core */
        revealTween(tl, '.core-orbit i', {opacity:1, scale:1, duration:1, ease:easeBack, stagger:.15}, 0, inner);
        revealTween1(tl, '.core-sym', {opacity:1, scale:1, rotation:0, duration:1.1, ease:easeBack}, .15, inner);
        revealTween1(tl, '.s-core h3', {opacity:1, y:0, duration:.9, ease:ease}, .3, inner);
        revealTween1(tl, '.s-core p', {opacity:1, y:0, duration:.9, ease:ease}, .48, inner);
        break;
      case 7: /* Kelahiran */
        revealTween1(tl, '.birth-title', {opacity:1, scale:1, duration:.95, ease:easeBack}, .15, inner);
        revealTween1(tl, '.s-birth p', {opacity:1, y:0, duration:.9, ease:ease}, .4, inner);
        revealTween1(tl, '.birth-q', {opacity:1, y:0, duration:.9, ease:ease}, .6, inner);
        revealTween1(tl, '.birth-line', {opacity:.6, scaleY:1, duration:1, ease:ease}, .8, inner);
        break;
      case 8: /* External Link */
        revealTween(tl, '.gate-ring', {opacity:1, duration:.8, ease:ease, stagger:.15}, .3, inner);
        revealTween1(tl, '.gate-core', {opacity:1, scale:1, duration:.9, ease:easeBack}, .7, inner);
        revealTween1(tl, '.s-link h3', {opacity:1, y:0, duration:.9, ease:ease}, .3, inner);
        revealTween1(tl, '.s-link p', {opacity:1, y:0, duration:.9, ease:ease}, .48, inner);
        break;
      case 9: /* Journey */
        revealTween1(tl, '.final-q', {opacity:1, y:0, duration:1, ease:ease}, .15, inner);
        revealTween1(tl, '.final-body', {opacity:1, y:0, duration:.9, ease:ease}, .4, inner);
        revealTween(tl, '.final-tagline span', {opacity:1, y:0, duration:.9, ease:ease, stagger:.15}, .8, inner);
        break;
    }

    return tl;
  }

  /* ── activate / reset ── */
  var activeTL = null;
  var prevIndex = -1;

  function activateScene(sceneEl){
    var idx = parseInt(sceneEl.getAttribute('data-scene'), 10);
    if (idx === prevIndex) return;
    prevIndex = idx;
    if (activeTL){ activeTL.kill(); activeTL = null; }
    var tl = buildTimeline(sceneEl);
    activeTL = tl;
    tl.play(0);
  }

  function resetScene(sceneEl){
    prevIndex = -1;
    if (activeTL){ activeTL.kill(); activeTL = null; }
    setSceneHidden(sceneEl);
  }

  /* set all scenes to hidden on load */
  scenes.forEach(function(s){ setSceneHidden(s); });

  /* ═══════════════════════════════════════════════════════════════
     3. PUBLIC API — called by app.js lore scroll tracking
     ═══════════════════════════════════════════════════════════════ */
  window.MaftyAnim = {
    activateScene: activateScene,
    resetScene: resetScene
  };

})();
