// Contador simple, configurable desde el atributo data-target (ISO 8601)
(function () {
  const el = document.getElementById('countdown');
  if (!el) return;

  const targetIso = el.getAttribute('data-target');
  const target = targetIso ? new Date(targetIso) : new Date('2025-12-20T20:00:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function update() {
    const now = new Date();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    el.innerHTML = `
      <div class="item"><span class="value">${days}</span><span class="label">Días</span></div>
      <div class="item"><span class="value">${pad(hours)}</span><span class="label">Hs</span></div>
      <div class="item"><span class="value">${pad(minutes)}</span><span class="label">Min</span></div>
      <div class="item"><span class="value">${pad(seconds)}</span><span class="label">Seg</span></div>
    `;

    if (target - now <= 0) {
      clearInterval(timer);
      // Mensaje cuando llega la fecha
      el.innerHTML = `<div class="item" style="min-width:unset"><span class="value">¡Hoy!</span><span class="label">La boda</span></div>`;
    }
  }

  update();
  const timer = setInterval(update, 1000);
})();