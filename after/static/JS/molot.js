/*!
 * AUTO HEFASTOS — молот + наковальня, минимализм
 */
(function () {
  "use strict";

  var CSS = [
    ".hf-ov{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:2147483647;background:rgba(180,178,174,0);backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);transition:background .35s ease,backdrop-filter .35s ease,-webkit-backdrop-filter .35s ease}",
    ".hf-ov.hf-active{background:rgba(180,178,174,0.45);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);pointer-events:all}",
    ".hf-sc{position:relative;width:80px;height:48px;pointer-events:none;animation:hf-in .3s cubic-bezier(.34,1.56,.64,1) both}",
    ".hf-sc.hf-out{animation:hf-ex .25s ease-in forwards}",
    ".hf-sp{position:absolute;border-radius:50%;background:#888;pointer-events:none;animation-fill-mode:forwards;animation-timing-function:ease-out}",
    "@keyframes hf-in{0%{opacity:0;transform:scale(.3)}100%{opacity:1;transform:scale(1)}}",
    "@keyframes hf-ex{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.2)}}",
    "@keyframes hf-swing{0%{transform:rotate(35deg)}40%{transform:rotate(-8deg)}50%{transform:rotate(-8deg)}100%{transform:rotate(35deg)}}",
    "@keyframes hf-sp1{0%{opacity:1;transform:translate(0,0)}100%{opacity:0;transform:translate(-18px,-12px)}}",
    "@keyframes hf-sp2{0%{opacity:1;transform:translate(0,0)}100%{opacity:0;transform:translate(16px,-14px)}}",
    "@keyframes hf-sp3{0%{opacity:1;transform:translate(0,0)}100%{opacity:0;transform:translate(-10px,-20px)}}",
    "@keyframes hf-sp4{0%{opacity:1;transform:translate(0,0)}100%{opacity:0;transform:translate(20px,-8px)}}",
    "@keyframes hf-sp5{0%{opacity:1;transform:translate(0,0)}100%{opacity:0;transform:translate(-22px,-4px)}}",
  ].join("");

  var SVG = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 48" width="80" height="48">',
    '<rect x="6" y="28" width="20" height="6" rx="1.5" fill="#555"/>',
    '<rect x="4" y="24" width="24" height="5" rx="1" fill="#666"/>',
    '<path d="M4,26 Q-1,27 -2,30 Q2,31 4,29 Z" fill="#555"/>',
    '<rect x="10" y="34" width="12" height="3" rx="1" fill="#444"/>',
    '<g style="transform-origin:68px 16px;animation:hf-swing .6s ease-in-out infinite">',
    '<line x1="68" y1="16" x2="24" y2="16" stroke="#555" stroke-width="4" stroke-linecap="round"/>',
    '<rect x="14" y="10" width="14" height="12" rx="2" fill="#777"/>',
    '<rect x="16" y="11" width="5" height="4" rx="1" fill="rgba(255,255,255,.18)"/>',
    "</g>",
    "</svg>",
  ].join("");

  var overlay, scene, hideTimer;
  var showing = false;
  var SPARK_ANIMS = ["hf-sp1","hf-sp2","hf-sp3","hf-sp4","hf-sp5"];

  function build() {
    if (document.getElementById("hf-ov")) return;
    overlay = document.createElement("div");
    overlay.className = "hf-ov"; overlay.id = "hf-ov";
    scene = document.createElement("div");
    scene.className = "hf-sc";
    scene.innerHTML = SVG;
    overlay.appendChild(scene);
    overlay.addEventListener("click", function(e){ if(e.target===overlay) hide(); });
    document.body.appendChild(overlay);
    overlay.style.display = "none";
  }

  function spawnSparks() {
    var count = 3 + Math.floor(Math.random() * 2);
    for (var i = 0; i < count; i++) {
      var sp = document.createElement("div");
      sp.className = "hf-sp";
      var sz = 2 + Math.random() * 2.5;
      var anim = SPARK_ANIMS[i % SPARK_ANIMS.length];
      var dur = 0.35 + Math.random() * 0.25;
      sp.style.cssText = [
        "width:"+sz+"px","height:"+sz+"px",
        "left:21px","top:24px",
        "animation-name:"+anim,
        "animation-duration:"+dur+"s",
      ].join(";");
      scene.appendChild(sp);
      (function(el){ setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, (dur+0.1)*1000); })(sp);
    }
  }

  var impactTimer;
  function startImpact() {
    function tick() {
      if (!showing) return;
      spawnSparks();
      impactTimer = setTimeout(tick, 600);
    }
    impactTimer = setTimeout(tick, 240);
  }
  function stopImpact() { clearTimeout(impactTimer); impactTimer = null; }

  function show() {
    if (!overlay) build();
    if (showing) { reset(); return; }
    showing = true;
    scene.classList.remove("hf-out");
    overlay.style.display = "flex";
    setTimeout(function(){ overlay.classList.add("hf-active"); }, 10);
    startImpact();
    reset();
  }
  function reset() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 2200);
  }
  function hide() {
    if (!showing) return;
    showing = false;
    clearTimeout(hideTimer);
    stopImpact();
    overlay.classList.remove("hf-active");
    scene.classList.add("hf-out");
    setTimeout(function(){
      if (overlay) overlay.style.display = "none";
      scene.classList.remove("hf-out");
      var sparks = scene.querySelectorAll(".hf-sp");
      for (var i = 0; i < sparks.length; i++) sparks[i].parentNode.removeChild(sparks[i]);
    }, 350);
  }

  var s = document.createElement("style");
  s.textContent = CSS;
  document.head.appendChild(s);

  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", build);
  else build();

  window.Hefastos = { show:show, hide:hide };
})();
