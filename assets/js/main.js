document.documentElement.classList.add("js");

/* ===== OneCreativity – Vanilla JS (DOM + Events + LocalStorage + Modal + Validation + Reveal + Theme + Skeleton) ===== */

function $(id){ 
  return document.getElementById(id); 
}

const LS_FAV = "onecreativity_favorites";
const LS_BOOKING = "onecreativity_booking";
const LS_THEME = "onecreativity_theme";
const LS_RECENT = "onecreativity_recent";

/* ---------- Data ---------- */
const services = [
  { id:"sv01", name:"Studio Booking (Hourly)", category:"Studio", price:2500, desc:"Book a professional studio with lighting setup and backdrop options." },
  { id:"sv02", name:"Event Photography", category:"Events", price:3500, desc:"Coverage for weddings, graduations, birthdays, corporate events." },
  { id:"sv03", name:"Event Videography", category:"Events", price:4500, desc:"Full video coverage with highlights, reels, and edited deliverables." },
  { id:"sv04", name:"Photo Editing / Retouch", category:"Editing", price:1200, desc:"Skin retouch, color correction, background cleanup, delivery-ready outputs." },
  { id:"sv05", name:"Video Editing", category:"Editing", price:2000, desc:"Cutting, transitions, color grading, subtitles, export in social formats." },
  { id:"sv06", name:"Brand Photoshoot", category:"Business", price:5000, desc:"Professional brand visuals for businesses, products, and social media." },
  { id:"sv07", name:"Product Photography", category:"Business", price:3800, desc:"Clean product shots for ecommerce with consistent lighting and backgrounds." },
  { id:"sv08", name:"Social Media Content Pack", category:"Business", price:4200, desc:"Monthly content package: short videos + photos optimized for platforms." },
  { id:"sv09", name:"Portrait Session", category:"Personal", price:1800, desc:"Studio or outdoor portrait session with retouched final images." },
  { id:"sv10", name:"Music Video Production", category:"Production", price:8000, desc:"Concept, shooting, editing, and delivery for music video projects." },
  { id:"sv11", name:"Drone Coverage", category:"Production", price:6000, desc:"Aerial shots for events, real estate, and cinematic scenes (demo listing)." },
  { id:"sv12", name:"Graphics / Poster Design", category:"Design", price:1500, desc:"Posters, flyers, album covers, simple brand design assets." }
];

const studios = [
  { id:"st01", name:"Addis Pixel Studio", city:"Addis Ababa", price:2500, tags:["Photo","Indoor","Fast Delivery"] },
  { id:"st02", name:"Ethio Visuals", city:"Addis Ababa", price:1800, tags:["Video","Editing","Commercial"] },
  { id:"st03", name:"Bole Creative Hub", city:"Addis Ababa", price:2200, tags:["Lighting","Portrait","Studio"] },
  { id:"st04", name:"Adama Lens House", city:"Adama", price:1400, tags:["Event","Outdoor","Affordable"] },
  { id:"st05", name:"Hawassa Media Lab", city:"Hawassa", price:1600, tags:["Video","Modern","Color Grading"] },
  { id:"st06", name:"Gondar Art Studio", city:"Gondar", price:1300, tags:["Portrait","Retouch","Classic"] }
];

const freelancers = [
  { id:"fr01", name:"Miki Tadesse", skill:"Photographer", city:"Addis Ababa", rate:1500, tags:["Portrait","Events","Retouch"] },
  { id:"fr02", name:"Hana Worku", skill:"Video Editor", city:"Addis Ababa", rate:1800, tags:["Color Grade","Subtitles","Reels"] },
  { id:"fr03", name:"Dawit Alemu", skill:"Videographer", city:"Adama", rate:2000, tags:["Events","Cinematic","Drone"] },
  { id:"fr04", name:"Sara Bekele", skill:"Graphic Designer", city:"Addis Ababa", rate:1200, tags:["Posters","Brand","Social Media"] },
  { id:"fr05", name:"Yonas Kebede", skill:"Photographer", city:"Hawassa", rate:1300, tags:["Outdoor","Travel","Portrait"] },
  { id:"fr06", name:"Liya Hailu", skill:"Content Creator", city:"Gondar", rate:1400, tags:["Short Video","Trends","UGC"] }
];

/* ---------- LocalStorage helpers ---------- */
function getJSON(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function setJSON(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------- Safe text ---------- */


function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ---------- Theme toggle ---------- */
function applyTheme(theme){
  const body = document.body;
  if (!body) return;

  body.classList.toggle("theme-light", theme === "light");
  setJSON(LS_THEME, theme);

  const icon = $("themeIcon");
  if (icon) icon.textContent = (theme === "light") ? "☀️" : "🌙";
}

function initTheme(){
  const saved = getJSON(LS_THEME, "dark");
  applyTheme(saved);

  const btn = $("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("theme-light");
    applyTheme(isLight ? "dark" : "light");
  });
}

/* ---------- Active nav highlight (auto) ---------- */
function initActiveNav(){
  const links = document.querySelectorAll(".nav a.nav-link");
  if (!links.length) return;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    const isActive =
      (currentPath === "" && href === "index.html") ||
      (currentPath === href) ||
      (currentPath === "index.html" && href === "index.html");

    if (isActive){
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove("is-active");
      if (a.getAttribute("aria-current") === "page") a.removeAttribute("aria-current");
    }
  });
}

/* ---------- Stats ---------- */
function updateStats(){
  const favs = getJSON(LS_FAV, []);
  if ($("statStudios")) $("statStudios").textContent = String(studios.length);
  if ($("statFreelancers")) $("statFreelancers").textContent = String(freelancers.length);
  if ($("statFavorites")) $("statFavorites").textContent = String(favs.length);
}

/* ---------- Modal ---------- */
function openModal(title, html){
  const modal = $("modal");
  const mt = $("modalTitle");
  const body = $("modalBody");
  if (!modal  !mt  !body) return;

  mt.textContent = title;
  body.innerHTML = html;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  const closeBtn = $("modalClose");
  if (closeBtn) closeBtn.focus();
}
function closeModal(){
  const modal = $("modal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
function initModal(){
  const modal = $("modal");
  if (!modal) return;

  const closeBtn = $("modalClose");
  const cancelBtn = $("modalCancel");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target && e.target.dataset && e.target.dataset.close === "true") closeModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

/* ---------- Scroll reveal ---------- */
let revealObserver = null;
function initScrollReveal(){
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if ("IntersectionObserver" in window) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
    }
    items.forEach(el => {
      if (!el.classList.contains("is-visible")) revealObserver.observe(el);
    });
  } else {
    items.forEach(el => el.classList.add("is-visible"));
  }
}

/* ---------- To Top ---------- */
function initToTop(){
  const btn = $("toTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) btn.classList.add("show");
    else btn.classList.remove("show");
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ---------- Footer year ---------- */
function initYear(){
  const y = $("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

/* ---------- Skeleton helpers ---------- */
function skeletonBlock(count){
  const one = `
    <div class="skeleton">
      <div class="skel-line skel-shimmer w-70"></div>
      <div class="skel-line skel-shimmer w-50"></div>
      <div class="skel-line skel-shimmer w-90"></div>
      <div class="skel-line skel-shimmer w-70"></div>
    </div>
  `;
  return Array.from({length: count}, () => one).join("");
}

/* ---------- Recent Viewed ---------- */
function getRecent(){ return getJSON(LS_RECENT, []); }

function saveRecent(item){
  const list = getRecent();
  const filtered = list.filter(x => !(x.type === item.type && x.id === item.id));
  filtered.unshift({ ...item, ts: Date.now() });
  setJSON(LS_RECENT, filtered.slice(0, 3));
}

function recentLink(x){
  if (x.type === "service") return "pages/services.html";
  if (x.type === "studio") return "pages/studios.html";
  if (x.type === "freelancer") return "pages/freelancers.html";
  return "index.html";
}

function renderRecent(){
  const grid = $("recentGrid");
  const clearBtn = $("clearRecent");
  if (!grid) return;

  const list = getRecent();

  if (clearBtn){
    clearBtn.onclick = () => {
      localStorage.removeItem(LS_RECENT);
      renderRecent();
      updateStats();
    };
  }

  if (!list.length){
    grid.innerHTML = `
      <div class="card card--soft reveal">
        <h3>No recent previews yet</h3>
        <p class="muted">Go preview a service, studio, or freelancer. It will appear here.</p>
      </div>
    `;
    initScrollReveal();
    return;
  }

  grid.innerHTML = list.map(x => `
    <article class="card card--soft reveal">
      <h3>${escapeHTML(x.title)}</h3>
      <div class="meta">${escapeHTML(x.subtitle)}</div>
      <p style="margin-top:10px;">${escapeHTML(x.desc)}</p>
      <div class="hero-actions" style="margin-top:12px;">
        <a class="btn btn-outline" href="${recentLink(x)}">Open Page</a>
      </div>
    </article>
  `).join("");

  initScrollReveal();
}

/* ---------- Favorites ---------- */
function getFavs(){ return getJSON(LS_FAV, []); }
function toggleFav(id){
  const favs = getFavs();
  const updated = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
  setJSON(LS_FAV, updated);
  updateStats();
}

/* ---------- Home: Services preview ---------- */
function initHomeServices(){
  const box = $("homeServices");
  if (!box) return;

  box.innerHTML = skeletonBlock(3);

  setTimeout(() => {
    const top = services.slice(0, 6);
    box.innerHTML = top.map(s => `
      <article class="card card--soft reveal">
        <h3>${escapeHTML(s.name)}</h3>
        <p class="muted">${escapeHTML(s.category)} • from <strong>${s.price} ETB</strong></p>
        <p>${escapeHTML(s.desc)}</p>
        <div class="hero-actions" style="margin-top:12px;">
          <button class="btn btn-outline" type="button" data-preview-service="${s.id}">Preview</button>
          <a class="btn" href="pages/booking.html" data-pick-service="${s.id}">Book</a>
        </div>
      </article>
    `).join("");

    box.querySelectorAll("[data-preview-service]").forEach(btn => {
      btn.addEventListener("click", () => {
        const s = services.find(x => x.id === btn.dataset.previewService);

        saveRecent({
          type: "service",
          id: s.id,
          title: s.name,
          subtitle: Service • ${s.category} • from ${s.price} ETB,
          desc: s.desc
        });

        openModal("Service Preview", `
          <p><strong>${escapeHTML(s.name)}</strong></p>
          <p>Category: ${escapeHTML(s.category)}</p>
          <p>Starting price: <strong>${s.price} ETB</strong></p>
          <p class="muted">${escapeHTML(s.desc)}</p>
        `);

        renderRecent();
      });
    });

    box.querySelectorAll("[data-pick-service]").forEach(a => {
      a.addEventListener("click", () => {
        setJSON(LS_BOOKING, { ...(getJSON(LS_BOOKING, {})), serviceId: a.dataset.pickService });
      });


});

    initScrollReveal();
  }, 450);
}

/* ---------- Services page ---------- */
function initServicesPage(){
  const grid = $("servicesGrid");
  const catSelect = $("serviceCategory");
  if (!grid || !catSelect) return;

  grid.innerHTML = skeletonBlock(6);

  const cats = Array.from(new Set(services.map(s => s.category))).sort();
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    catSelect.appendChild(opt);
  });

  function render(){
    const cat = catSelect.value;
    const list = cat === "all" ? services : services.filter(s => s.category === cat);

    grid.innerHTML = skeletonBlock(6);

    setTimeout(() => {
      grid.innerHTML = list.map(s => `
        <article class="card card--soft reveal">
          <h3>${escapeHTML(s.name)}</h3>
          <p class="muted">${escapeHTML(s.category)} • from <strong>${s.price} ETB</strong></p>
          <p>${escapeHTML(s.desc)}</p>
          <div class="hero-actions" style="margin-top:12px;">
            <button class="btn btn-outline" type="button" data-service-preview="${s.id}">Preview</button>
            <button class="btn" type="button" data-service-pick="${s.id}">Select</button>
          </div>
        </article>
      `).join("");

      grid.querySelectorAll("[data-service-preview]").forEach(btn => {
        btn.addEventListener("click", () => {
          const s = services.find(x => x.id === btn.dataset.servicePreview);

          saveRecent({
            type: "service",
            id: s.id,
            title: s.name,
            subtitle: Service • ${s.category} • from ${s.price} ETB,
            desc: s.desc
          });

          openModal("Service Preview", `
            <p><strong>${escapeHTML(s.name)}</strong></p>
            <p>Category: ${escapeHTML(s.category)}</p>
            <p>Starting price: <strong>${s.price} ETB</strong></p>
            <p class="muted">${escapeHTML(s.desc)}</p>
          `);
        });
      });

      grid.querySelectorAll("[data-service-pick]").forEach(btn => {
        btn.addEventListener("click", () => {
          const data = getJSON(LS_BOOKING, {});
          setJSON(LS_BOOKING, { ...data, serviceId: btn.dataset.servicePick });
          openModal("Selected ✅", `<p class="muted">Service saved. Go to <strong>Booking</strong> to complete your request.</p>`);
        });
      });

      initScrollReveal();
    }, 450);
  }

  catSelect.addEventListener("change", render);
  render();
}

/* ---------- Studios page ---------- */
function initStudiosPage(){
  const grid = $("studiosGrid");
  const search = $("searchStudio");
  const city = $("cityStudio");
  if (!grid  !search  !city) return;

  grid.innerHTML = skeletonBlock(6);

  const cities = Array.from(new Set(studios.map(s => s.city))).sort();
  cities.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    city.appendChild(opt);
  });

  function render(){
    const q = search.value.trim().toLowerCase();
    const c = city.value;

    const list = studios.filter(s => {
      const matchQ = s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q);
      const matchC = c === "all" ? true : s.city === c;
      return matchQ && matchC;
    });

    grid.innerHTML = skeletonBlock(6);

    setTimeout(() => {
      const favs = getFavs();
      grid.innerHTML = (list.length ? list : []).map(s => {
        const isFav = favs.includes(s.id);
        return `
          <article class="card card--soft reveal">
            <h3>${escapeHTML(s.name)}</h3>
            <p class="muted">${escapeHTML(s.city)} • from <strong>${s.price} ETB</strong></p>
            <div class="pills">
              ${isFav ? <span class="pill" title="Saved">★ Favorite</span> : ""}
              ${s.tags.map(t => `<span class="pill">${escapeHTML(t)}</span>`).join("")}
            </div>
            <div class="hero-actions">
              <button class="btn btn-outline" type="button" data-fav="${s.id}">${isFav ? "Unfavorite" : "Favorite"}</button>


<button class="btn" type="button" data-preview-studio="${s.id}">Preview</button>
              <button class="btn btn-outline" type="button" data-select-studio="${s.id}">Select</button>
            </div>
          </article>
        `;
      }).join("") || <div class="card"><h3>No results</h3><p class="muted">Try another search or city.</p></div>;

      grid.querySelectorAll("[data-fav]").forEach(btn => {
        btn.addEventListener("click", () => { toggleFav(btn.dataset.fav); render(); });
      });

      grid.querySelectorAll("[data-preview-studio]").forEach(btn => {
        btn.addEventListener("click", () => {
          const s = studios.find(x => x.id === btn.dataset.previewStudio);

          saveRecent({
            type: "studio",
            id: s.id,
            title: s.name,
            subtitle: Studio • ${s.city} • from ${s.price} ETB,
            desc: Tags: ${s.tags.join(", ")}
          });

          openModal("Studio Preview", `
            <p><strong>${escapeHTML(s.name)}</strong></p>
            <p>City: ${escapeHTML(s.city)}</p>
            <p>Starting price: <strong>${s.price} ETB</strong></p>
            <p class="muted">Go to Booking to choose service + date/location.</p>
          `);
        });
      });

      grid.querySelectorAll("[data-select-studio]").forEach(btn => {
        btn.addEventListener("click", () => {
          const data = getJSON(LS_BOOKING, {});
          setJSON(LS_BOOKING, { ...data, providerType:"studio", providerId: btn.dataset.selectStudio });
          openModal("Selected ✅", `<p class="muted">Studio saved. Continue on the Booking page.</p>`);
        });
      });

      initScrollReveal();
    }, 450);
  }

  search.addEventListener("input", render);
  city.addEventListener("change", render);
  render();
}

/* ---------- Freelancers page ---------- */
function initFreelancersPage(){
  const grid = $("freelancersGrid");
  const search = $("searchFree");
  const skill = $("skillFree");
  if (!grid  !search  !skill) return;

  grid.innerHTML = skeletonBlock(6);

  const skills = Array.from(new Set(freelancers.map(f => f.skill))).sort();
  skills.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    skill.appendChild(opt);
  });

  function render(){
    const q = search.value.trim().toLowerCase();
    const sk = skill.value;

    const list = freelancers.filter(f => {
      const matchQ = f.name.toLowerCase().includes(q) || f.skill.toLowerCase().includes(q);
      const matchS = sk === "all" ? true : f.skill === sk;
      return matchQ && matchS;
    });

    grid.innerHTML = skeletonBlock(6);

    setTimeout(() => {
      const favs = getFavs();
      grid.innerHTML = (list.length ? list : []).map(f => {
        const isFav = favs.includes(f.id);
        return `
          <article class="card card--soft reveal">
            <h3>${escapeHTML(f.name)}</h3>
            <p class="muted">${escapeHTML(f.skill)} • ${escapeHTML(f.city)} • from <strong>${f.rate} ETB</strong></p>
            <div class="pills">
              ${isFav ? <span class="pill" title="Saved">★ Favorite</span> : ""}
              ${f.tags.map(t => `<span class="pill">${escapeHTML(t)}</span>`).join("")}
            </div>
            <div class="hero-actions">
              <button class="btn btn-outline" type="button" data-fav="${f.id}">${isFav ? "Unfavorite" : "Favorite"}</button>
              <button class="btn" type="button" data-preview-free="${f.id}">Preview</button>
              <button class="btn btn-outline" type="button" data-select-free="${f.id}">Select</button>
            </div>
          </article>
        `;
      }).join("") || <div class="card"><h3>No results</h3><p class="muted">Try another search or skill.</p></div>;

      grid.querySelectorAll("[data-fav]").forEach(btn => {
        btn.addEventListener("click", () => { toggleFav(btn.dataset.fav); render(); });
      });

      grid.querySelectorAll("[data-preview-free]").forEach(btn => {
        btn.addEventListener("click", () => {


const f = freelancers.find(x => x.id === btn.dataset.previewFree);

          saveRecent({
            type: "freelancer",
            id: f.id,
            title: f.name,
            subtitle: Freelancer • ${f.skill} • ${f.city} • from ${f.rate} ETB,
            desc: Tags: ${f.tags.join(", ")}
          });

          openModal("Freelancer Preview", `
            <p><strong>${escapeHTML(f.name)}</strong></p>
            <p>Skill: ${escapeHTML(f.skill)}</p>
            <p>City: ${escapeHTML(f.city)}</p>
            <p>Starting rate: <strong>${f.rate} ETB</strong></p>
            <p class="muted">Go to Booking to choose service + date/location.</p>
          `);
        });
      });

      grid.querySelectorAll("[data-select-free]").forEach(btn => {
        btn.addEventListener("click", () => {
          const data = getJSON(LS_BOOKING, {});
          setJSON(LS_BOOKING, { ...data, providerType:"freelancer", providerId: btn.dataset.selectFree });
          openModal("Selected ✅", `<p class="muted">Freelancer saved. Continue on the Booking page.</p>`);
        });
      });

      initScrollReveal();
    }, 450);
  }

  search.addEventListener("input", render);
  skill.addEventListener("change", render);
  render();
}

/* ---------- Booking page ---------- */
function initBookingPage(){
  const form = $("bookingForm");
  const selService = $("bkService");
  const selType = $("bkProviderType");
  const selProvider = $("bkProvider");
  const date = $("bkDate");
  const city = $("bkCity");
  const notes = $("bkNotes");
  const summary = $("bkSummary");
  const clearBtn = $("bkClear");
  const status = $("bkStatus");

  if (!form  !selService  !selType  !selProvider  !date  !city  !notes  !summary  !clearBtn) return;

  services.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = ${s.name} (${s.price} ETB);
    selService.appendChild(opt);
  });

  function fillProviders(){
    selProvider.innerHTML = <option value="">Select provider</option>;
    const t = selType.value;
    const list = (t === "studio") ? studios : (t === "freelancer") ? freelancers : [];
    list.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = (t === "studio") ? ${p.name} - ${p.city} : ${p.name} (${p.skill});
      selProvider.appendChild(opt);
    });
  }

  function renderSummary(){
    const data = getJSON(LS_BOOKING, null);
    if (!data || (!data.serviceId && !data.providerId)) {
      summary.innerHTML = <p class="muted">No saved booking yet. Fill the form and save.</p>;
      return;
    }

    const s = services.find(x => x.id === data.serviceId);
    const provider =
      data.providerType === "studio" ? studios.find(x => x.id === data.providerId) :
      data.providerType === "freelancer" ? freelancers.find(x => x.id === data.providerId) : null;

    summary.innerHTML = `
      <p><strong>Service:</strong> ${s ? escapeHTML(s.name) : "—"}</p>
      <p><strong>Provider:</strong> ${
        provider
          ? (data.providerType === "studio"
              ? ${escapeHTML(provider.name)} (${escapeHTML(provider.city)})
              : `${escapeHTML(provider.name)} (${escapeHTML(provider.skill)})`)
          : "—"
      }</p>
      <p><strong>Date:</strong> ${escapeHTML(data.date || "—")}</p>
      <p><strong>City:</strong> ${escapeHTML(data.city || "—")}</p>
      <p><strong>Notes:</strong> ${escapeHTML(data.notes || "—")}</p>
      <p class="muted">Saved in LocalStorage (refresh the page — it stays).</p>
    `;
  }

  const saved = getJSON(LS_BOOKING, {});
  if (saved.serviceId) selService.value = saved.serviceId;
  if (saved.providerType) { selType.value = saved.providerType; fillProviders(); }
  if (saved.providerId) selProvider.value = saved.providerId;

  selType.addEventListener("change", fillProviders);

  function setErr(id, msg){ if ($(id)) $(id).textContent = msg; }
  function clearErrs(){
    setErr("errBkService","");
    setErr("errBkType","");
    setErr("errBkProvider","");
    setErr("errBkDate","");

setErr("errBkCity","");
    setErr("errBkNotes","");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrs();
    if (status) status.textContent = "";

    let ok = true;
    if (!selService.value) { setErr("errBkService","Please choose a service."); ok = false; }
    if (!selType.value) { setErr("errBkType","Please choose provider type."); ok = false; }
    if (!selProvider.value) { setErr("errBkProvider","Please select a provider."); ok = false; }
    if (!date.value) { setErr("errBkDate","Please choose a date."); ok = false; }
    if (city.value.trim().length < 2) { setErr("errBkCity","Enter a valid city."); ok = false; }
    if (notes.value.trim().length < 10) { setErr("errBkNotes","Notes must be at least 10 characters."); ok = false; }
    if (!ok) return;

    const data = {
      serviceId: selService.value,
      providerType: selType.value,
      providerId: selProvider.value,
      date: date.value,
      city: city.value.trim(),
      notes: notes.value.trim()
    };

    setJSON(LS_BOOKING, data);
    if (status) status.textContent = "✅ Booking summary saved successfully.";
    renderSummary();
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(LS_BOOKING);
    if (status) status.textContent = "🗑️ Saved booking cleared.";
    renderSummary();
  });

  renderSummary();
  initScrollReveal();
}

/* ---------- Contact form ---------- */
function initContactForm(){
  const form = $("contactForm");
  if (!form) return;

  function setErr(id, msg){ if ($(id)) $(id).textContent = msg; }
  function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("fullName").value.trim();
    const email = $("email").value.trim();
    const type = $("service").value;
    const msg = $("message").value.trim();
    const status = $("formStatus");

    setErr("errName","");
    setErr("errEmail","");
    setErr("errService","");
    setErr("errMessage","");
    if (status) status.textContent = "";

    let ok = true;
    if (name.length < 3) { setErr("errName","Name must be at least 3 characters."); ok = false; }
    if (!validEmail(email)) { setErr("errEmail","Enter a valid email address."); ok = false; }
    if (!type) { setErr("errService","Please choose request type."); ok = false; }
    if (msg.length < 10) { setErr("errMessage","Message must be at least 10 characters."); ok = false; }
    if (!ok) return;

    if (status) status.textContent = "✅ Request prepared successfully (demo).";
    form.reset();
  });

  initScrollReveal();
}

/* ---------- Boot ---------- */
(function init(){
  initYear();
  initTheme();
  initActiveNav();
  updateStats();
  initModal();
  initToTop();

  initScrollReveal();
  initHomeServices();
  renderRecent();

  initServicesPage();
  initStudiosPage();
  initFreelancersPage();
  initBookingPage();
  initContactForm();
})();