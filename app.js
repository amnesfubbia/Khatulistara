/* ============================================================
   KHATULISTARA — APP (router, halaman, search, filter, timeline)
   ============================================================ */
(function () {
  'use strict';

  var DB = window.DB;
  var app = document.getElementById('app');

  /* ---------- util ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function ic(name, w, h) {
    w = w || 16; h = h || 16;
    return '<svg width="' + w + '" height="' + h + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }
  function num(n) {
    return n == null ? '—' : Number(n).toLocaleString('id-ID');
  }
  function compact(n) {
    if (n == null) return '—';
    if (n >= 1000000) return (n / 1000000).toFixed(2).replace('.', ',') + ' juta';
    return num(n);
  }
  var CAT_ICON = {
    'Sejarah': 'clock', 'Situs Sejarah': 'flag', 'Tempat Ibadah': 'star',
    'Alam': 'leaf', 'Pariwisata': 'pin', 'Budaya Fisik': 'home',
    'Suku & Masyarakat': 'user', 'Seni': 'music', 'Bahasa': 'pen',
    'Wastra': 'star', 'Kuliner': 'leaf', 'Tokoh': 'user',
    'Kewarganegaraan': 'shield', 'Pramuka': 'flag', 'Numismatik': 'coin',
    'Data Praktis': 'db', 'Tradisi': 'cal', 'Flora': 'leaf', 'Fauna': 'leaf',
    'Geografi': 'pin', 'Sastra': 'pen', 'Konservasi': 'leaf', 'Wilayah & Administrasi': 'db'
  };
  function catIcon(cat) { return CAT_ICON[cat] || 'book'; }
  function badge(verif) {
    var m = { 'VERIFIED': ['badge-verified', 'Terverifikasi'], 'REFERENCE': ['badge-reference', 'Referensi'], 'NEEDS_REVIEW': ['badge-review', 'Perlu Ditinjau'], 'NEEDS_UPDATE': ['badge-review', 'Perlu Pembaruan'] };
    var b = m[verif] || ['badge-reference', verif || 'Referensi'];
    return '<span class="badge ' + b[0] + '">' + b[1] + '</span>';
  }
  function dayOfYear() {
    var n = new Date();
    return Math.floor((n - new Date(n.getFullYear(), 0, 0)) / 86400000);
  }
  function pickByDay(list, offset) {
    if (!list || !list.length) return null;
    return list[(dayOfYear() + (offset || 0)) % list.length];
  }
  function link(path, label, cls) {
    return '<a href="#/' + path + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + label + '</a>';
  }
  function entryRow(it) {
    var prov = DB.provinceOf(it);
    return '<div class="entry">' +
      '<div class="entry-ic">' + ic(catIcon(it.category), 18, 18) + '</div>' +
      '<div class="entry-body">' +
      '<h3>' + link('item/' + it.id, esc(it.name)) + '</h3>' +
      '<div class="meta"><span class="badge badge-cat">' + esc(it.category) + '</span>' +
      (prov ? '<span>' + link('provinsi/' + prov.id, esc(prov.name)) + '</span>' : '<span>Nasional</span>') +
      '<span>' + esc(it.subcategory) + '</span>' + badge(it.verificationStatus) + '</div>' +
      '<div class="desc">' + esc(it.description) + '</div>' +
      '</div></div>';
  }
  function emptyState(title, tips) {
    return '<div class="state-box"><div class="ic">' + ic('search', 34, 34) + '</div>' +
      '<h3>' + esc(title) + '</h3><p>' + esc(tips) + '</p>' +
      link('home', 'Kembali ke Beranda', 'btn btn-sm') + '</div>';
  }
  function errorState() {
    return '<div class="state-box"><div class="ic">' + ic('close', 34, 34) + '</div>' +
      '<h3>Tidak dapat memuat data</h3><p>Terjadi kesalahan saat memuat halaman ini. Silakan coba lagi.</p>' +
      '<button class="btn btn-primary btn-sm" onclick="location.reload()">Coba Lagi</button></div>';
  }
  function loadingState() {
    return '<div class="loading-box"><div class="spinner"></div><span>Memuat data...</span></div>';
  }
  function breadcrumb(parts) {
    var html = '<nav class="breadcrumb" aria-label="Jalur navigasi">' + link('home', 'Home') + '<span class="sep">/</span>';
    parts.forEach(function (p, i) {
      if (i) html += '<span class="sep">/</span>';
      html += p.html;
    });
    return html + '</nav>';
  }
  function setTitle(t) { document.title = (t ? t + ' — ' : '') + 'KHATULISTARA'; }

  /* ---------- render helpers ---------- */
  function section(title, bodyHtml, cls) {
    return '<section class="detail-section' + (cls ? ' ' + cls : '') + '"><h2>' + esc(title) + '</h2>' + bodyHtml + '</section>';
  }
  function provHeader(prov) {
    return '<div class="province-hero"><div class="container">' +
      '<div class="eyebrow">' + esc(prov.island) + ' · Provinsi</div>' +
      '<h1>' + esc(prov.name) + '</h1>' +
      '<p>' + esc(prov.description) + '</p>' +
      '<div class="meta">' +
      '<span class="pmeta">Ibu kota: <b>' + esc(prov.capital) + '</b></span>' +
      '<span class="pmeta">Luas: <b>' + num(prov.areaKm2) + ' km²</b></span>' +
      '<span class="pmeta">Populasi: <b>' + compact(prov.population) + '</b></span>' +
      '<span class="pmeta">Zona waktu: <b>' + esc(prov.timezone) + '</b></span>' +
      '<span class="pmeta">Semboyan: <b>' + esc(prov.slogan) + '</b></span>' +
      (prov.established ? '<span class="pmeta">Hari jadi: <b>' + esc(prov.established) + '</b></span>' : '') +
      '</div></div></div>';
  }

  /* ============================================================
     HOME
     ============================================================ */
  function pageHome() {
    setTitle(null);
    var provs = Object.keys(DB.provinces).map(function (k) { return DB.provinces[k]; });
    var tokohList = DB.items.filter(function (i) { return i.category === 'Tokoh'; });
    var budayaList = DB.items.filter(function (i) { return ['Seni', 'Tradisi', 'Kuliner', 'Wastra', 'Bahasa'].indexOf(i.category) >= 0; });
    var faktaList = DB.items.filter(function (i) { return i.facts && i.facts.length; });

    var tokoh = pickByDay(tokohList, 3);
    var budaya = pickByDay(budayaList, 5);
    var peristiwa = pickByDay(DB.events, 7);
    var faktaItem = pickByDay(faktaList, 11);
    var fakta = faktaItem && faktaItem.facts ? pickByDay(faktaItem.facts.map(function (f) { return { f: f, item: faktaItem }; }), 2) : null;

    var featuredIds = ['candi-borobudur', 'tari-saman', 'rendang', 'rumah-gadang', 'pinisi', 'pancasila', 'subak', 'noken', 'candi-prambanan', 'tari-kecak'];
    var featured = featuredIds.map(function (id) { return DB.itemMap[id]; }).filter(Boolean).slice(0, 6);

    var temas = [
      ['Sejarah Indonesia', 'kerajaan majapahit'], ['Budaya Nusantara', 'wayang'], ['Bahasa Daerah', 'bahasa jawa'],
      ['Kuliner Nusantara', 'rendang'], ['Alam Indonesia', 'gunung'], ['Tokoh Indonesia', 'pahlawan'],
      ['Seni Tradisional', 'tari'], ['Wastra', 'batik'], ['Pramuka', 'pramuka'], ['Kewarganegaraan', 'pancasila'], ['Numismatik', 'rupiah']
    ];

    var h = '';

    /* hero */
    h += '<section class="hero"><div class="hero-inner">' +
      '<div><p class="eyebrow">Ensiklopedia Digital Indonesia</p>' +
      '<h1>Jelajahi Indonesia dalam <em>satu jaringan</em> pengetahuan.</h1>' +
      '<p class="lead">Wilayah, sejarah, alam, budaya, bahasa, masyarakat, seni, tradisi, tokoh, kewarganegaraan, Pramuka, dan data praktis Nusantara — saling terhubung.</p>' +
      '<div class="hero-search"><input type="search" id="homeSearchInput" placeholder="Cari provinsi, sejarah, budaya, bahasa, tokoh, tempat, kuliner..." aria-label="Pencarian global">' +
      '<button class="search-go" id="homeSearchBtn" aria-label="Cari">' + ic('search', 19, 19) + '</button></div></div>' +
      '<div class="hero-art"><img src="logo.svg" alt="Logo KHATULISTARA"></div>' +
      '</div></section>';

    /* jelajahi provinsi */
    h += '<section style="margin-top:34px"><h2 class="section-title">Jelajahi Indonesia</h2>' +
      '<div class="grid grid-3">' + provs.map(function (p) {
        return '<a href="#/provinsi/' + p.id + '" class="card card-link"><h3>' + esc(p.name) + '</h3>' +
          '<p>' + esc(p.capital) + ' · ' + esc(p.island) + ' · ' + compact(p.population) + ' jiwa</p></a>';
      }).join('') + '</div></section>';

    /* 7 menu utama */
    h += '<section style="margin-top:38px"><h2 class="section-title">7 Menu Utama</h2>' +
      '<div class="grid grid-3">' + DB.menus.map(function (m) {
        return '<a href="#/menu/' + m.id + '" class="cat-tile"><span class="ci">' + ic(catIcon(m.name), 20, 20) + '</span>' +
          '<span class="cn">' + esc(m.name) + '</span><span class="cc">' + esc(m.tagline) + '</span></a>';
      }).join('') + '</div></section>';

    /* hari ini */
    h += '<section style="margin-top:38px"><h2 class="section-title">Nusantara Hari Ini</h2><div class="grid grid-2">';

    if (fakta) {
      h += '<div class="card"><span class="eyebrow">Fakta Nusantara Hari Ini</span>' +
        '<h3 style="margin-top:6px">' + link('item/' + fakta.item.id, esc(fakta.item.name)) + '</h3>' +
        '<p>' + esc(fakta.f) + '</p></div>';
    }
    if (tokoh) {
      h += '<div class="card"><span class="eyebrow">Tokoh Hari Ini</span>' +
        '<h3 style="margin-top:6px">' + link('item/' + tokoh.id, esc(tokoh.name)) + '</h3>' +
        '<p>' + (tokoh.field ? esc(tokoh.field) + ' · ' : '') + (tokoh.period ? esc(tokoh.period) : '') + '<br>' +
        (DB.provinceOf(tokoh) ? link('provinsi/' + DB.provinceOf(tokoh).id, esc(DB.provinceOf(tokoh).name)) : '') + '</p></div>';
    }
    if (peristiwa) {
      h += '<div class="card"><span class="eyebrow">Peristiwa Sejarah Hari Ini</span>' +
        '<h3 style="margin-top:6px">' + esc(peristiwa.title) + '</h3>' +
        '<p><b>' + esc(peristiwa.date) + '</b> · ' + esc(peristiwa.location) + '</p>' +
        '<p class="small">' + esc(peristiwa.description) + '</p></div>';
    }
    if (budaya) {
      h += '<div class="card"><span class="eyebrow">Budaya Hari Ini</span>' +
        '<h3 style="margin-top:6px">' + link('item/' + budaya.id, esc(budaya.name)) + '</h3>' +
        '<p>' + esc(budaya.category) + ' · ' + esc(budaya.subcategory) + '</p>' +
        '<p class="small">' + esc(budaya.description) + '</p></div>';
    }
    h += '</div></section>';

    /* tema eksplorasi */
    h += '<section style="margin-top:38px"><h2 class="section-title">Tema Eksplorasi</h2>' +
      '<div class="chip-group">' + temas.map(function (t) {
        return '<a class="chip" href="#/search?q=' + encodeURIComponent(t[1]) + '">' + esc(t[0]) + '</a>';
      }).join('') + '</div></section>';

    /* artikel pilihan */
    h += '<section style="margin-top:38px"><h2 class="section-title">Artikel Pilihan</h2>' +
      '<div class="entry-list">' + featured.map(entryRow).join('') + '</div></section>';

    /* data praktis */
    h += '<section style="margin-top:38px"><h2 class="section-title">Data Praktis</h2>' +
      '<div class="chip-group">' +
      '<a class="chip" href="#/item/kode-pos">Kode Pos</a>' +
      '<a class="chip" href="#/item/zona-waktu">Zona Waktu</a>' +
      '<a class="chip" href="#/item/rupiah">Rupiah</a>' +
      '<a class="chip" href="#/item/ori">ORI</a>' +
      '<a class="chip" href="#/item/sandi-morse">Sandi Morse</a>' +
      '<a class="chip" href="#/item/indonesia-raya">Indonesia Raya</a>' +
      '</div></section>';

    return h;
  }

  /* ============================================================
     PROVINSI
     ============================================================ */
  function pageProvinsiList() {
    setTitle('Provinsi Indonesia');
    var provs = Object.keys(DB.provinces).map(function (k) { return DB.provinces[k]; });
    var h = breadcrumb([{ html: '<span>Provinsi Indonesia</span>' }]);
    h += '<h1>Provinsi Indonesia</h1>';
    h += '<p class="muted">Pintu masuk utama berdasarkan wilayah. Pilih provinsi untuk menjelajahi seluruh pengetahuan yang terhubung dengannya.</p>';

    h += '<div class="table-wrap" style="margin-top:18px"><table class="tbl"><thead><tr>' +
      '<th>Provinsi</th><th>Ibu Kota</th><th>Pulau</th><th>Zona Waktu</th><th>Luas (km²)</th><th>Populasi</th><th>Semboyan</th>' +
      '</tr></thead><tbody>';
    provs.forEach(function (p) {
      h += '<tr><td><b>' + link('provinsi/' + p.id, esc(p.name)) + '</b></td><td>' + esc(p.capital) + '</td><td>' + esc(p.island) + '</td>' +
        '<td>' + esc(p.timezone) + '</td><td>' + num(p.areaKm2) + '</td><td>' + compact(p.population) + '</td><td>' + esc(p.slogan) + '</td></tr>';
    });
    h += '</tbody></table></div>';

    h += '<p class="small muted" style="margin-top:10px">Data luas dan populasi bersifat referensi (estimasi 2023, BPS) dan dapat diperbarui berkala tanpa mengubah struktur aplikasi.</p>';

    h += '<h2 class="section-title" style="margin-top:34px">Kartu Wilayah</h2><div class="grid grid-3">';
    provs.forEach(function (p) {
      var n = DB.itemsByProvince(p.id).length;
      h += '<a href="#/provinsi/' + p.id + '" class="card card-link"><h3>' + esc(p.name) + '</h3>' +
        '<p>' + esc(p.capital) + ' · ' + esc(p.island) + '<br>' + n + ' entri pengetahuan · ' + compact(p.population) + ' jiwa</p></a>';
    });
    h += '</div>';
    return h;
  }

  function pageProvinsiDetail(id) {
    var prov = DB.provinces[id];
    if (!prov) return pageNotFound();
    setTitle(prov.name);
    var its = DB.itemsByProvince(id);
    var groups = {};
    its.forEach(function (it) {
      (groups[it.category] = groups[it.category] || []).push(it);
    });
    var order = ['Suku & Masyarakat', 'Sejarah', 'Situs Sejarah', 'Tempat Ibadah', 'Geografi', 'Alam', 'Pariwisata', 'Seni', 'Budaya Fisik', 'Wastra', 'Bahasa', 'Kuliner', 'Tradisi', 'Tokoh', 'Data Praktis'];

    var provEvents = DB.events.filter(function (e) { return e.province === id; });

    var h = provHeader(prov);
    h += '<div class="container">';
    h += breadcrumb([{ html: link('provinsi', 'Provinsi Indonesia') }, { html: '<span>' + esc(prov.name) + '</span>' }]);

    /* statistik */
    h += '<div class="stat-row">' +
      '<div class="stat"><div class="v">' + num(prov.areaKm2) + ' km²</div><div class="l">Luas wilayah</div></div>' +
      '<div class="stat"><div class="v">' + compact(prov.population) + '</div><div class="l">Populasi</div></div>' +
      '<div class="stat"><div class="v">' + esc(prov.timezone) + '</div><div class="l">Zona waktu</div></div>' +
      '<div class="stat"><div class="v">' + its.length + '</div><div class="l">Entri terkait</div></div>' +
      '</div>';

    /* fakta */
    if (prov.facts && prov.facts.length) {
      h += section('Fakta Penting', '<ul class="fact-list">' + prov.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>');
    }

    /* koordinat */
    h += section('Lokasi', '<p>' + esc(prov.coordinates) + ' · ' + esc(prov.capital) + ', ' + esc(prov.name) + '</p>' +
      '<p class="small muted">Peta interaktif tersedia pada tahap pengembangan berikutnya (data geospasial Point/Line/Polygon).</p>');

    /* kategori */
    order.forEach(function (cat) {
      var list = groups[cat];
      if (!list || !list.length) return;
      h += '<section class="detail-section"><h2>' + esc(cat) + '</h2><div class="entry-list">' +
        list.map(entryRow).join('') + '</div></section>';
    });

    /* kategori lain yang tidak ada di daftar urutan */
    Object.keys(groups).forEach(function (cat) {
      if (order.indexOf(cat) >= 0) return;
      h += '<section class="detail-section"><h2>' + esc(cat) + '</h2><div class="entry-list">' + groups[cat].map(entryRow).join('') + '</div></section>';
    });

    /* timeline provinsi */
    if (provEvents.length) {
      h += section('Peristiwa di ' + esc(prov.name), '<div class="timeline">' + provEvents.map(function (e) {
        return '<div class="tl-item"><div class="tl-date">' + esc(e.date) + '</div><h3>' + esc(e.title) + '</h3><p>' + esc(e.description) + '</p></div>';
      }).join('') + '</div><p style="margin-top:12px">' + link('timeline?prov=' + prov.id, 'Lihat semua timeline →') + '</p>');
    }

    /* provinsi lain */
    h += section('Provinsi Lainnya', '<div class="chip-group">' + Object.keys(DB.provinces).map(function (k) {
      var p = DB.provinces[k];
      if (k === id) return '';
      return '<a class="chip" href="#/provinsi/' + p.id + '">' + esc(p.name) + '</a>';
    }).join('') + '</div>');

    h += '<p class="small muted" style="margin:14px 0 30px">Sumber: ' + esc(prov.source) + ' · Data referensi, diperbarui ' + esc(prov.updatedAt || '—') + '.</p>';
    h += '</div>';
    return h;
  }

  /* ============================================================
     MENU & KATEGORI
     ============================================================ */
  function pageMenu() {
    setTitle('Menu Utama');
    var h = breadcrumb([{ html: '<span>Menu Utama</span>' }]);
    h += '<h1>Menu Utama</h1><p class="muted">Tujuh pintu eksplorasi KHATULISTARA. Seluruh menu berbagi satu database utama yang saling terhubung.</p>';
    h += '<div class="grid grid-3" style="margin-top:20px">' + DB.menus.map(function (m) {
      return '<a href="#/menu/' + m.id + '" class="cat-tile"><span class="ci">' + ic(catIcon(m.name), 22, 22) + '</span>' +
        '<span class="cn">' + esc(m.name) + '</span><span class="cc">' + esc(m.tagline) + '</span>' +
        '<span class="cc">' + m.categories.length + ' kategori</span></a>';
    }).join('') + '</div>';
    return h;
  }

  function pageMenuDetail(menuId) {
    var menu = DB.menus.filter(function (m) { return m.id === menuId; })[0];
    if (!menu) return pageNotFound();
    setTitle(menu.name);

    var h = breadcrumb([{ html: link('menu', 'Menu Utama') }, { html: '<span>' + esc(menu.name) + '</span>' }]);
    h += '<p class="eyebrow">Menu</p><h1>' + esc(menu.name) + '</h1>';
    h += '<p class="muted">' + esc(menu.tagline) + '</p>';
    h += '<div class="cat-grid" style="margin-top:20px">';
    menu.categories.forEach(function (cat) {
      var n = DB.itemsForCategory(cat).length;
      var ev = DB.events.filter(function (e) { return e.period === cat; }).length;
      var count = n || ev;
      h += '<a href="#/kategori/' + menu.id + '/' + encodeURIComponent(cat) + '" class="cat-tile">' +
        '<span class="ci">' + ic(catIcon(cat), 20, 20) + '</span>' +
        '<span class="cn">' + esc(cat) + '</span>' +
        '<span class="cc">' + (count ? count + ' entri' : 'Sedang disiapkan') + '</span></a>';
    });
    h += '</div>';
    return h;
  }

  function pageKategori(menuId, cat) {
    var menu = DB.menus.filter(function (m) { return m.id === menuId; })[0];
    var items = DB.itemsForCategory(cat);
    var events = DB.events.filter(function (e) { return e.period === cat; });
    if (!menu) return pageNotFound();
    setTitle(cat);
    var h = breadcrumb([
      { html: link('menu', 'Menu Utama') },
      { html: link('menu/' + menuId, esc(menu.name)) },
      { html: '<span>' + esc(cat) + '</span>' }
    ]);
    h += '<p class="eyebrow">Kategori</p><h1>' + esc(cat) + '</h1>';
    h += '<p class="muted">' + (items.length + events.length) + ' entri ensiklopedia</p>';

    if (!items.length && !events.length) {
      h += emptyState('Kategori ini sedang disiapkan',
        'Data untuk "' + esc(cat) + '" belum tersedia pada MVP demonstrasi. Coba kategori lain pada menu ' + esc(menu.name) + '.');
      return h;
    }

    /* filter provinsi */
    var provsWith = {};
    items.forEach(function (it) { if (it.province) provsWith[it.province] = true; });
    var provKeys = Object.keys(provsWith);
    if (provKeys.length > 1) {
      h += '<div class="search-filters"><label for="catProvFilter" style="font-size:.82rem;color:var(--ink-soft)">Filter provinsi:</label>' +
        '<select id="catProvFilter"><option value="">Semua provinsi</option>' +
        provKeys.map(function (k) { return '<option value="' + k + '">' + esc(DB.provinces[k].name) + '</option>'; }).join('') +
        '</select></div>';
    }

    if (events.length) {
      h += '<div class="timeline" style="margin-top:8px">' + events.map(function (e) {
        var prov = e.province ? DB.provinces[e.province] : null;
        return '<div class="tl-item"><div class="tl-date">' + esc(e.date) + '</div><h3>' + esc(e.title) + '</h3>' +
          '<p>' + esc(e.description) + '</p>' +
          '<div class="tl-loc">' + (prov ? link('provinsi/' + prov.id, esc(prov.name)) + ' · ' : '') + esc(e.location) + '</div></div>';
      }).join('') + '</div>';
    }

    /* subkategori */
    var subs = {};
    items.forEach(function (it) { (subs[it.subcategory] = subs[it.subcategory] || []).push(it); });
    var subKeys = Object.keys(subs);
    h += '<div class="entry-list" id="catList" data-cat="' + esc(cat) + '">';
    if (subKeys.length > 1) {
      subKeys.forEach(function (sk) {
        h += '<div style="margin:6px 0 2px"><h3 style="color:var(--gold);text-transform:uppercase;letter-spacing:.08em;font-size:.78rem;margin:14px 0 0">' + esc(sk) + '</h3></div>';
        h += subs[sk].map(entryRow).join('');
      });
    } else {
      h += items.map(entryRow).join('');
    }
    h += '</div>';
    return h;
  }

  /* ============================================================
     DETAIL ITEM
     ============================================================ */
  function pageItem(id) {
    var it = DB.itemMap[id];
    if (!it) return pageNotFound();
    setTitle(it.name);
    var prov = DB.provinceOf(it);

    var h = '<div class="detail-head">' + breadcrumb([
      { html: link('menu', 'Menu Utama') },
      { html: '<span>' + esc(it.category) + '</span>' }
    ]);
    h += '<p class="eyebrow">' + esc(it.category) + ' · ' + esc(it.subcategory) + '</p>';
    h += '<h1>' + esc(it.name) + '</h1>';
    if (it.localName || it.alternativeName) {
      h += '<p class="muted" style="font-style:italic">' +
        (it.localName ? 'Nama lokal: ' + esc(it.localName) + ' · ' : '') +
        (it.alternativeName ? 'Nama lain: ' + esc(it.alternativeName) : '') + '</p>';
    }
    h += '<div class="meta" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
      badge(it.verificationStatus) +
      '<span class="badge badge-cat">' + esc(it.category) + '</span>' +
      (prov ? '<a class="chip" href="#/provinsi/' + prov.id + '">' + esc(prov.name) + '</a>' : '<span class="chip">Nasional</span>') +
      '</div></div>';

    /* ringkasan */
    h += section('Ringkasan', '<div class="prose"><p>' + esc(it.description) + '</p></div>');

    /* riwayat */
    if (it.history) h += section('Sejarah', '<div class="prose"><p>' + esc(it.history) + '</p></div>');
    if (it.origin) h += section('Asal', '<div class="prose"><p>' + esc(it.origin) + '</p></div>');
    if (it.characteristics) h += section('Karakteristik', '<div class="prose"><p>' + esc(it.characteristics) + '</p></div>');
    if (it.function) h += section('Fungsi', '<div class="prose"><p>' + esc(it.function) + '</p></div>');
    if (it.meaning) h += section('Makna', '<div class="prose"><p>' + esc(it.meaning) + '</p></div>');

    /* fakta */
    if (it.facts && it.facts.length) {
      h += section('Fakta Penting', '<ul class="fact-list">' + it.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>');
    }

    /* lokasi */
    var locBits = [];
    if (prov) locBits.push(link('provinsi/' + prov.id, esc(prov.name)));
    if (it.coordinates) locBits.push('<span>' + esc(it.coordinates) + '</span>');
    if (locBits.length) h += section('Lokasi', '<div class="prose"><p>' + locBits.join(' · ') + '</p></div>');

    /* media */
    h += section('Media', '<p class="small muted">Galeri, audio, dan video akan ditambahkan pada tahap pengembangan media. Semua media wajib menyertakan sumber dan lisensi.</p>');

    /* related knowledge */
    var rel = DB.relatedOf(id);
    var sameProv = prov ? DB.itemsByProvince(prov.id).filter(function (x) { return x.id !== id; }).slice(0, 3) : [];
    var sameCat = DB.itemsByCategory(it.category).filter(function (x) { return x.id !== id; }).slice(0, 2);
    var seen = {};
    var relAll = [];
    rel.forEach(function (r) { if (!seen[r.item.id]) { seen[r.item.id] = true; relAll.push({ item: r.item, label: r.type.replace(/_/g, ' ') }); } });
    sameProv.forEach(function (x) { if (!seen[x.id]) { seen[x.id] = true; relAll.push({ item: x, label: 'Provinsi ' + prov.name }); } });
    sameCat.forEach(function (x) { if (!seen[x.id]) { seen[x.id] = true; relAll.push({ item: x, label: 'Kategori ' + it.category }); } });

    if (relAll.length) {
      h += section('Pengetahuan Terkait', '<div class="related-grid">' + relAll.slice(0, 9).map(function (r) {
        return '<a class="rel-item" href="#/item/' + r.item.id + '"><div class="rt">' + esc(r.label) + '</div><div class="rn">' + esc(r.item.name) + '</div></a>';
      }).join('') + '</div>');
    } else {
      h += section('Pengetahuan Terkait', '<p class="muted">Tidak ada item terkait yang tersedia.</p>');
    }

    /* sumber & verifikasi */
    var srcs = (it.sources && it.sources.length) ? it.sources : ['Data referensi — sumber menyusul'];
    h += section('Sumber', '<ol class="src-list">' + srcs.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>');
    h += section('Verifikasi & Pembaruan',
      '<p>' + badge(it.verificationStatus) + '</p>' +
      '<p class="small muted">Status verifikasi: ' + esc(it.verificationStatus) + '<br>' +
      'Terakhir diperbarui: ' + esc(it.updatedAt || '—') + '<br>' +
      'ID entitas: ' + esc(it.id) + '</p>');

    return h;
  }

  /* ============================================================
     SEARCH
     ============================================================ */
  function normalize(s) { return s.toLowerCase().replace(/\s+/g, ' ').trim(); }

  function searchScore(item, q) {
    var n = normalize(q);
    var hay = [item.name, item.localName, item.alternativeName, item.category, item.subcategory,
      item.description, item.history, item.function, item.meaning]
      .filter(Boolean).map(normalize).join(' ');
    if (hay.indexOf(n) >= 0) return 1;
    var words = n.split(' ');
    var hit = 0;
    words.forEach(function (w) { if (hay.indexOf(w) >= 0) hit++; });
    return hit / words.length;
  }

  function pageSearch(q) {
    setTitle('Pencarian');
    var h = '<div style="margin-top:20px">';
    h += '<h1>Pencarian</h1>';
    h += '<div class="hero-search" style="max-width:620px"><input type="search" id="searchInput" value="' + esc(q || '') + '" placeholder="Cari provinsi, sejarah, budaya, bahasa, tokoh, tempat, kuliner..." aria-label="Pencarian global">' +
      '<button class="search-go" id="searchBtn" aria-label="Cari">' + ic('search', 19, 19) + '</button></div>';

    if (!q || !normalize(q)) {
      h += '<div style="margin-top:22px">' + emptyState('Mulai pencarian', 'Ketik kata kunci untuk mencari seluruh database KHATULISTARA: nama, nama lokal, provinsi, kategori, tokoh, tempat, tahun, atau periode.') + '</div></div>';
      return h;
    }

    var nq = normalize(q);
    var results = [];
    DB.items.forEach(function (it) {
      var s = searchScore(it, nq);
      if (s > 0.25) results.push({ item: it, score: s });
    });
    var provHits = Object.keys(DB.provinces).map(function (k) { return DB.provinces[k]; })
      .filter(function (p) { return normalize(p.name).indexOf(nq) >= 0 || normalize(p.capital).indexOf(nq) >= 0; });
    var evHits = DB.events.filter(function (e) {
      return normalize(e.title).indexOf(nq) >= 0 || normalize(e.description).indexOf(nq) >= 0 || normalize(e.location).indexOf(nq) >= 0;
    });

    results.sort(function (a, b) { return b.score - a.score; });

    h += '<p class="search-summary">Ditemukan <b>' + (results.length + provHits.length + evHits.length) + '</b> hasil untuk "<b>' + esc(q) + '</b>"</p>';

    /* filter */
    h += '<div class="search-filters"><label style="font-size:.82rem;color:var(--ink-soft)">Provinsi:</label>' +
      '<select id="sfProv"><option value="">Semua</option>' + Object.keys(DB.provinces).map(function (k) {
        return '<option value="' + k + '">' + esc(DB.provinces[k].name) + '</option>';
      }).join('') + '</select>' +
      '<label style="font-size:.82rem;color:var(--ink-soft)">Kategori:</label>' +
      '<select id="sfCat"><option value="">Semua</option>' + Object.keys(DB.allCategories()).map(function (c) {
        return '<option value="' + esc(c) + '">' + esc(c) + '</option>';
      }).join('') + '</select></div>';

    if (!results.length && !provHits.length && !evHits.length) {
      h += emptyState('Tidak ditemukan data yang sesuai.', 'Periksa ejaan, gunakan kata kunci lain, pilih kategori, atau gunakan filter provinsi.');
    }

    if (provHits.length) {
      h += '<h2 class="section-title" style="margin-top:26px">Provinsi</h2><div class="entry-list">' + provHits.map(function (p) {
        return '<div class="entry"><div class="entry-ic">' + ic('pin', 18, 18) + '</div><div class="entry-body"><h3>' + link('provinsi/' + p.id, esc(p.name)) + '</h3>' +
          '<div class="meta"><span>' + esc(p.capital) + '</span><span>' + esc(p.island) + '</span></div></div></div>';
      }).join('') + '</div>';
    }

    if (evHits.length) {
      h += '<h2 class="section-title" style="margin-top:26px">Peristiwa Sejarah</h2><div class="entry-list">' + evHits.map(function (e) {
        return '<div class="entry"><div class="entry-ic">' + ic('clock', 18, 18) + '</div><div class="entry-body"><h3>' + link('timeline', esc(e.title)) + '</h3>' +
          '<div class="meta"><span>' + esc(e.date) + '</span><span>' + esc(e.location) + '</span></div>' +
          '<div class="desc">' + esc(e.description) + '</div></div></div>';
      }).join('') + '</div>';
    }

    /* grup per kategori */
    var byCat = {};
    results.forEach(function (r) {
      var k = r.item.category;
      if (k === 'Provinsi') return;
      (byCat[k] = byCat[k] || []).push(r);
    });
    Object.keys(byCat).forEach(function (cat) {
      h += '<h2 class="section-title" style="margin-top:26px">' + esc(cat) + '</h2><div class="entry-list" data-cat-group>' +
        byCat[cat].map(function (r) { return entryRow(r.item); }).join('') + '</div>';
    });

    h += '</div>';
    return h;
  }

  /* ============================================================
     TIMELINE
     ============================================================ */
  function pageTimeline(provFilter) {
    setTitle('Timeline Indonesia');
    var periods = ['Prasejarah', 'Kerajaan', 'Kolonialisme', 'Perlawanan', 'Pergerakan Nasional', 'Kemerdekaan', 'Pasca Kemerdekaan', 'Indonesia Modern'];
    var evs = DB.events.slice().sort(function (a, b) { return a.year - b.year; });
    if (provFilter) evs = evs.filter(function (e) { return e.province === provFilter; });

    var h = breadcrumb([{ html: '<span>Timeline Indonesia</span>' }]);
    h += '<p class="eyebrow">Lorong Waktu</p><h1>Timeline Indonesia</h1>';
    h += '<p class="muted">Perjalanan Nusantara: prasejarah hingga Indonesia modern.</p>';

    /* filter */
    h += '<div class="search-filters"><label style="font-size:.82rem;color:var(--ink-soft)">Periode:</label>' +
      '<select id="tlPeriod"><option value="">Semua periode</option>' + periods.map(function (p) {
        return '<option value="' + esc(p) + '">' + esc(p) + '</option>';
      }).join('') + '</select>' +
      '<label style="font-size:.82rem;color:var(--ink-soft)">Provinsi:</label>' +
      '<select id="tlProv"><option value="">Semua</option>' + Object.keys(DB.provinces).map(function (k) {
        return '<option value="' + k + '"' + (provFilter === k ? ' selected' : '') + '>' + esc(DB.provinces[k].name) + '</option>';
      }).join('') + '</select></div>';

    if (!evs.length) {
      h += emptyState('Tidak ditemukan peristiwa untuk filter ini.', 'Gunakan periode atau provinsi lain.');
    } else {
      h += '<div class="timeline" id="tlList">' + evs.map(function (e) {
        var prov = e.province ? DB.provinces[e.province] : null;
        return '<div class="tl-item" data-period="' + esc(e.period) + '">' +
          '<div class="tl-date">' + esc(e.date) + ' · ' + esc(e.period) + '</div>' +
          '<h3>' + esc(e.title) + '</h3>' +
          '<p>' + esc(e.description) + '</p>' +
          '<div class="tl-loc">' + (prov ? link('provinsi/' + prov.id, esc(prov.name)) + ' · ' : '') + esc(e.location) + '</div></div>';
      }).join('') + '</div>';
    }
    return h;
  }

  /* ============================================================
     404
     ============================================================ */
  function pageNotFound() {
    setTitle('Halaman tidak ditemukan');
    return '<div style="margin-top:40px">' + emptyState('Halaman tidak ditemukan', 'Tautan mungkin salah atau item belum tersedia. Periksa ejaan atau kembali ke beranda.') + '</div>';
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  function parseHash() {
    var raw = location.hash.replace(/^#\/?/, '');
    var query = {};
    var parts = raw.split('?');
    var segs = parts[0].split('/').filter(Boolean);
    if (parts[1]) {
      parts[1].split('&').forEach(function (kv) {
        var p = kv.split('=');
        query[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
      });
    }
    return { segs: segs, query: query };
  }

  function route() {
    var r = parseHash();
    var segs = r.segs;
    var view;

    try {
      if (!segs.length || segs[0] === 'home') view = pageHome();
      else if (segs[0] === 'provinsi' && segs[1]) view = pageProvinsiDetail(segs[1]);
      else if (segs[0] === 'provinsi') view = pageProvinsiList();
      else if (segs[0] === 'menu' && segs[1]) view = pageMenuDetail(segs[1]);
      else if (segs[0] === 'kategori' && segs[1] && segs[2]) view = pageKategori(segs[1], decodeURIComponent(segs[2]));
      else if (segs[0] === 'menu') view = pageMenu();
      else if (segs[0] === 'item' && segs[1]) view = pageItem(segs[1]);
      else if (segs[0] === 'search') view = pageSearch(r.query.q || '');
      else if (segs[0] === 'timeline') view = pageTimeline(r.query.prov || '');
      else view = pageNotFound();
    } catch (e) {
      view = errorState();
    }

    /* tampilkan loading lalu konten */
    app.innerHTML = loadingState();
    setTimeout(function () { app.innerHTML = view; }, 120);

    /* highlight navigasi */
    var activeKey = null;
    if (!segs.length || segs[0] === 'home') activeKey = 'home';
    else if (segs[0] === 'provinsi') activeKey = 'provinsi';
    else if (segs[0] === 'timeline') activeKey = 'timeline';
    else if (segs[0] === 'search') activeKey = 'search';
    else if (segs[0] === 'menu' || segs[0] === 'kategori') activeKey = 'menu:' + (segs[1] || '');
    highlightNav(activeKey);
    window.scrollTo(0, 0);
  }

  /* ---------- navigasi global ---------- */
  function navItems() {
    return DB.menus.map(function (m) {
      return { id: m.id, name: m.name, icon: catIcon(m.name) };
    });
  }
  function renderNav() {
    var items = navItems();
    var nav = document.getElementById('mainNav');
    nav.innerHTML = items.map(function (m) {
      return '<a href="#/menu/' + m.id + '" class="nav-link" data-nav="menu:' + m.id + '">' + ic(m.icon, 15, 15) + esc(m.name) + '</a>';
    }).join('');

    var drawerNav = document.getElementById('drawerNav');
    drawerNav.innerHTML = items.map(function (m) {
      var menu = DB.menus.filter(function (x) { return x.id === m.id; })[0];
      return '<a href="#/menu/' + m.id + '" class="drawer-link" data-nav="menu:' + m.id + '">' + ic(m.icon, 18, 18) +
        '<span>' + esc(m.name) + '<small>' + esc(menu ? menu.tagline : '') + '</small></span></a>';
    }).join('');

    var foot = document.getElementById('footerNav');
    if (foot) {
      foot.innerHTML = items.map(function (m) {
        return '<li><a href="#/menu/' + m.id + '">' + esc(m.name) + '</a></li>';
      }).join('');
    }
  }

  function highlightNav(key) {
    document.querySelectorAll('[data-nav]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-nav') === key);
    });
    document.querySelectorAll('[data-bn]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-bn') === key);
    });
  }

  /* ---------- drawer ---------- */
  function openDrawer() {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('drawerBackdrop').classList.add('open');
  }
  function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawerBackdrop').classList.remove('open');
  }

  /* ---------- event bindings ---------- */
  function bindGlobal() {
    document.getElementById('drawerOpenBtn').addEventListener('click', openDrawer);
    document.getElementById('drawerCloseBtn').addEventListener('click', closeDrawer);
    document.getElementById('drawerBackdrop').addEventListener('click', closeDrawer);
    document.getElementById('bnMenuBtn').addEventListener('click', function (e) { e.preventDefault(); openDrawer(); });

    document.getElementById('headerSearchInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && this.value.trim()) location.hash = '#/search?q=' + encodeURIComponent(this.value.trim());
    });
    document.getElementById('headerSearchBtn').addEventListener('click', function () {
      location.hash = '#/search';
    });

    /* delegasi: tombol pencarian dinamis + filter */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('#homeSearchBtn, #searchBtn');
      if (btn) {
        var inp = document.getElementById('homeSearchInput') || document.getElementById('searchInput');
        if (inp && inp.value.trim()) location.hash = '#/search?q=' + encodeURIComponent(inp.value.trim());
        else if (btn.id === 'searchBtn') { /* tetap di halaman */ }
        return;
      }
      var accHead = e.target.closest('.acc-head');
      if (accHead) { accHead.parentElement.classList.toggle('open'); return; }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var inp = e.target;
        if (inp && inp.id === 'searchInput' && inp.value.trim()) {
          location.hash = '#/search?q=' + encodeURIComponent(inp.value.trim());
        }
      }
    });

    /* filter kategori (delegasi) */
    document.addEventListener('change', function (e) {
      if (e.target.id === 'catProvFilter') {
        var cat = document.getElementById('catList').getAttribute('data-cat');
        var pv = e.target.value;
        var list = DB.itemsForCategory(cat).filter(function (it) { return !pv || it.province === pv; });
        renderCatList(list);
      }
      if (e.target.id === 'tlPeriod' || e.target.id === 'tlProv') {
        var period = document.getElementById('tlPeriod').value;
        var prov = document.getElementById('tlProv').value;
        document.querySelectorAll('#tlList .tl-item').forEach(function (el) {
          var show = (!period || el.getAttribute('data-period') === period) && (true);
          el.style.display = show ? '' : 'none';
        });
        var any = Array.prototype.some.call(document.querySelectorAll('#tlList .tl-item'), function (el) { return el.style.display !== 'none'; });
        var es = document.getElementById('tlEmpty');
        if (!any && !es) {
          var div = document.createElement('div');
          div.id = 'tlEmpty';
          div.innerHTML = emptyState('Tidak ditemukan peristiwa untuk filter ini.', 'Gunakan periode atau provinsi lain.');
          document.getElementById('tlList').insertAdjacentElement('afterend', div);
        } else if (any && es) { es.remove(); }
      }
      if (e.target.id === 'sfProv' || e.target.id === 'sfCat') {
        applySearchFilters();
      }
    });
  }

  function renderCatList(list) {
    var el = document.getElementById('catList');
    el.innerHTML = list.length ? list.map(entryRow).join('') :
      emptyState('Tidak ditemukan data yang sesuai.', 'Ubah filter provinsi atau gunakan kata kunci lain.');
  }

  function applySearchFilters() {
    var pv = document.getElementById('sfProv').value;
    var cat = document.getElementById('sfCat').value;
    document.querySelectorAll('#app [data-cat-group]').forEach(function (group) {
      group.querySelectorAll('.entry').forEach(function (row) {
        var show = true;
        if (pv) {
          var provLink = row.querySelector('.meta a[href^="#/provinsi/"]');
          var match = provLink && provLink.getAttribute('href').indexOf('/' + pv) >= 0;
          if (!match) show = false;
        }
        if (cat) {
          var badgeEl = row.querySelector('.badge-cat');
          if (!badgeEl || badgeEl.textContent !== cat) show = false;
        }
        row.style.display = show ? '' : 'none';
      });
    });
  }

  /* ---------- init ---------- */
  function init() {
    renderNav();
    bindGlobal();
    window.addEventListener('hashchange', route);
    route();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
