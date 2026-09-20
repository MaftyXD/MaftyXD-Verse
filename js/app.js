/* ───────────────────────────────────────────────────────────────
   APP — nav, burger, reveal on scroll, lore scroll, ticker, particles
   No lore animations (typewriter, s-why writing, profile card paper-stick)
   ─────────────────────────────────────────────────────────────── */
(function(){
  'use strict';

  /* ── Loader ── */
  var loader = document.getElementById('loader');
  var hideLoader = function(){ if (loader) loader.classList.add('hide'); };
  window.addEventListener('load', function(){ setTimeout(hideLoader, 1400); });
  setTimeout(hideLoader, 3200);

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ── Nav scroll ── */
  var nav = document.getElementById('nav');
  var navTick = false;
  var onNavScroll = function(){
    if (navTick) return;
    navTick = true;
    requestAnimationFrame(function(){
      nav.classList.toggle('scrolled', window.scrollY > 24);
      navTick = false;
    });
  };
  window.addEventListener('scroll', onNavScroll, {passive:true});
  onNavScroll();

  /* ── Burger menu ── */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function(){
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ── Reveal on scroll — handled by animations.js (GSAP) ── */

  /* ── Ticker — duplicate for seamless loop ── */
  var ticker = document.getElementById('ticker');
  if (ticker){
    var baseHTML = ticker.innerHTML;
    while (ticker.children.length < 4){
      ticker.insertAdjacentHTML('beforeend', baseHTML);
    }
  }

  /* ── Lore scroll tracking ── */
  var track = document.getElementById('loreTrack');
  var scenes = Array.from(document.querySelectorAll('.lore-scene'));
  var railDots = Array.from(document.querySelectorAll('.lore-rail i'));
  var counter = document.getElementById('loreNum');
  var total = scenes.length;
  var activeIndex = -1;

  function updateLore(){
    if (!track) return;
    var rect = track.getBoundingClientRect();
    var vh = window.innerHeight;
    var totalScroll = track.offsetHeight - vh;
    if (totalScroll <= 0) return;
    var scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
    var progress = scrolled / totalScroll;
    var idx = Math.floor(progress * total);
    if (idx >= total) idx = total - 1;
    if (idx < 0) idx = 0;
    if (idx !== activeIndex){
      activeIndex = idx;
      scenes.forEach(function(s, i){
        var isActive = i === idx;
        s.classList.toggle('active', isActive);
        if (isActive && window.MaftyAnim) window.MaftyAnim.activateScene(s);
      });
      railDots.forEach(function(d, i){ d.classList.toggle('on', i === idx); });
      counter.textContent = String(idx + 1).padStart(2, '0');
    }
  }

  var loreTick = false;
  window.addEventListener('scroll', function(){
    if (loreTick) return;
    loreTick = true;
    requestAnimationFrame(function(){ updateLore(); loreTick = false; });
  }, {passive:true});
  window.addEventListener('resize', updateLore);
  updateLore();

  /* ── Particles — deterministic spawn ── */
  var pWrap = document.getElementById('particles');
  if (pWrap){
    var count = window.innerWidth < 900 ? 16 : 28;
    var html = '';
    for (var i = 0; i < count; i++){
      var left = (i / count) * 100;
      var dur = 7 + (i % 5) * 2;
      var delay = (i % 7) * 1.3;
      var size = 2 + (i % 3) * 0.7;
      html += '<i style="left:' + left.toFixed(1) + '%;bottom:-10px;width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) + 'px;animation-duration:' + dur.toFixed(1) + 's;animation-delay:' + delay.toFixed(1) + 's"></i>';
    }
    pWrap.innerHTML = html;
  }

})();
