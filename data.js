/* ============================================================
   KHATULISTARA — DATABASE UTAMA (data demo MVP)
   Ensiklopedia digital Indonesia: satu data, banyak hubungan.
   Data demografi/luas bersifat referensi (perlu pembaruan berkala).
   ============================================================ */
window.DB = (function () {
  'use strict';

  /* ---------- helper ---------- */
  function ent(id, name, category, subcategory, province, description, o) {
    o = o || {};
    return Object.assign({
      id: id, name: name, category: category, subcategory: subcategory,
      province: province, description: description,
      verificationStatus: 'REFERENCE', updatedAt: '2026-08-26', sources: [], facts: []
    }, o);
  }

  /* ============================================================
     PROVINSI (data referensi — populasi: estimasi 2023, BPS)
     ============================================================ */
  const provinces = {
    aceh: {
      id: 'aceh', name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatera',
      areaKm2: 57956, population: 5522000, timezone: 'WIB (UTC+7)',
      slogan: 'Pancacita', coordinates: '5.5483° N, 95.3232° E',
      established: '7 Desember 1956',
      description: 'Provinsi paling barat Indonesia yang dikenal dengan julukan "Serambi Mekah". Aceh memiliki sejarah panjang sebagai pusat penyebaran Islam di Nusantara serta kawasan Kesultanan Aceh Darussalam yang pernah menjadi kekuatan maritim utama Selat Malaka.',
      facts: [
        'Satu-satunya provinsi yang menerapkan syariat Islam secara formal (UU 11/2006, sebagaimana diatur dalam otonomi khusus).',
        'Kawasan Tsunami 2004; Masjid Raya Baiturrahman bertahan dari bencana tersebut.',
        'Rumah tradisional dan seni Tari Saman (dari Tanah Gayo) dikenal mendunia.'
      ],
      source: 'BPS, Pemerintah Provinsi Aceh'
    },
    'sumatera-barat': {
      id: 'sumatera-barat', name: 'Sumatera Barat', capital: 'Padang', island: 'Sumatera',
      areaKm2: 42012, population: 5757000, timezone: 'WIB (UTC+7)',
      slogan: 'Tuah Sakato', coordinates: '0.9101° S, 100.3569° E',
      established: '1 Oktober 1945',
      description: 'Ranah Minang, tanah kelahiran suku Minangkabau dengan adat matrilineal, rumah gadang, dan tradisi merantau. Sumatera Barat juga dikenal melalui kuliner rendang serta perjuangan Perang Padri dan Perang Paderi melawan kolonial.',
      facts: [
        'Rendang dinobatkan sebagai makanan terenak dunia versi CNN (2011, 2017).',
        'Sistem kekerabatan Minangkabau bersifat matrilineal — garis keturunan mengikuti ibu.',
        'Jam Gadang di Bukittinggi menjadi ikon arsitektur masa Hindia Belanda.'
      ],
      source: 'BPS, Pemerintah Provinsi Sumatera Barat'
    },
    'jawa-barat': {
      id: 'jawa-barat', name: 'Jawa Barat', capital: 'Bandung', island: 'Jawa',
      areaKm2: 35378, population: 49860000, timezone: 'WIB (UTC+7)',
      slogan: 'Gemah Ripah Répéh Rapih', coordinates: '6.9175° S, 107.6191° E',
      established: '19 Agustus 1945',
      description: 'Provinsi dengan populasi terbesar di Indonesia, tanah Tatar Sunda. Jawa Barat adalah pusat budaya Sunda dengan bahasa, aksara, kesenian angklung, tari jaipong, dan kuliner khasnya, sekaligus gerbang perjuangan kemerdekaan melalui Konferensi Asia-Afrika 1955 di Bandung.',
      facts: [
        'Angklung ditetapkan UNESCO sebagai Warisan Budaya Takbenda Dunia (2010).',
        'Kota Bandung pernah menjadi tuan rumah Konferensi Asia-Afrika 1955.',
        'Memiliki populasi terbesar di Indonesia (±49,9 juta jiwa, 2023).'
      ],
      source: 'BPS, Pemerintah Provinsi Jawa Barat'
    },
    'jawa-tengah': {
      id: 'jawa-tengah', name: 'Jawa Tengah', capital: 'Semarang', island: 'Jawa',
      areaKm2: 32800, population: 37542000, timezone: 'WIB (UTC+7)',
      slogan: 'Prasetya Ulah Sakti Bhakti Praja', coordinates: '7.1500° S, 110.1403° E',
      established: '15 Agustus 1950',
      description: 'Jantung kebudayaan Jawa dengan warisan Candi Borobudur dan Prambanan, bahasa Jawa, wayang kulit, gamelan, dan batik. Jawa Tengah merupakan wilayah inti kerajaan-kerajaan besar seperti Mataram Kuno hingga Kesultanan Mataram Islam.',
      facts: [
        'Candi Borobudur adalah candi Buddha terbesar di dunia dan Warisan Dunia UNESCO (1991).',
        'Candi Prambanan merupakan kompleks candi Hindu Siwa terbesar di Indonesia.',
        'Batik Indonesia ditetapkan UNESCO sebagai Warisan Budaya Takbenda (2009); Solo dan Pekalongan menjadi pusat batik.'
      ],
      source: 'BPS, Pemerintah Provinsi Jawa Tengah, UNESCO'
    },
    bali: {
      id: 'bali', name: 'Bali', capital: 'Denpasar', island: 'Bali',
      areaKm2: 5780, population: 4404000, timezone: 'WITA (UTC+8)',
      slogan: 'Bali Dwipa Jaya', coordinates: '8.3405° S, 115.0920° E',
      established: '14 Agustus 1958',
      description: 'Pulau Dewata, pusat peradaban Hindu-Buddha Nusantara yang masih hidup. Bali terkenal melalui sistem subak, upacara ngaben, tari kecak, gamelan, serta panorama sawah berundak dan pura yang menjadi destinasi dunia.',
      facts: [
        'Subak, sistem irigasi subak Bali, diakui UNESCO sebagai Warisan Budaya Dunia (2012).',
        'Pura Besakih di lereng Gunung Agung adalah pura terbesar dan tersuci di Bali.',
        'Kalender Saka Bali dan upacara Nyepi menjadi ciri khas perayaan keagamaan Bali.'
      ],
      source: 'BPS, Pemerintah Provinsi Bali, UNESCO'
    },
    'kalimantan-timur': {
      id: 'kalimantan-timur', name: 'Kalimantan Timur', capital: 'Samarinda', island: 'Kalimantan',
      areaKm2: 127347, population: 3909000, timezone: 'WITA (UTC+8)',
      slogan: 'Ruhui Rahayu', coordinates: '1.5071° S, 117.1459° E',
      established: '1 Januari 1957',
      description: 'Provinsi di Pulau Kalimantan yang menjadi lokasi Ibu Kota Nusantara (IKN). Kalimantan Timur adalah wilayah Kesultanan Kutai Kartanegara, salah satu kerajaan tertua di Nusantara, serta rumah bagi beragam sub-suku Dayak dan Sungai Mahakam.',
      facts: [
        'Kesultanan Kutai (abad ke-4 M) dikenal melalui Prasasti Mulawarman — bukti kerajaan Hindu tertua di Indonesia.',
        'Pesut Mahakam, mamalia air tawar langka, hidup di Sungai Mahakam.',
        'Ibu Kota Nusantara (IKN) dibangun di Kalimantan Timur sejak 2022.'
      ],
      source: 'BPS, Pemerintah Provinsi Kalimantan Timur'
    },
    'sulawesi-selatan': {
      id: 'sulawesi-selatan', name: 'Sulawesi Selatan', capital: 'Makassar', island: 'Sulawesi',
      areaKm2: 46717, population: 9362000, timezone: 'WITA (UTC+8)',
      slogan: 'Toddo Puli', coordinates: '4.3083° S, 120.1916° E',
      established: '19 Oktober 1669',
      description: 'Bumi Bugis-Makassar-Toraja dengan tradisi bahari yang kuat: kapal pinisi, pelaut ulung, dan Kerajaan Gowa-Tallo. Sulawesi Selatan juga dikenal melalui rumah tongkonan, upacara Rambu Solo, serta kuliner coto makassar.',
      facts: [
        'Pinisi ditetapkan UNESCO sebagai Warisan Budaya Takbenda (2017).',
        'Makassar pernah menjadi pusat perdagangan rempah dan pelabuhan utama Nusantara timur.',
        'Suku Toraja memiliki upacara pemakaman Rambu Solo yang monumental.'
      ],
      source: 'BPS, Pemerintah Provinsi Sulawesi Selatan, UNESCO'
    },
    maluku: {
      id: 'maluku', name: 'Maluku', capital: 'Ambon', island: 'Kepulauan Maluku',
      areaKm2: 46914, population: 1918000, timezone: 'WIT (UTC+9)',
      slogan: 'Siwa Lima', coordinates: '3.2385° S, 130.1453° E',
      established: '12 Oktober 1955',
      description: 'Kepulauan Rempah yang menjadi tujuan ekspedisi bangsa Eropa sejak abad ke-16. Maluku adalah tanah asal cengkih dan pala, pusat Jalur Rempah dunia, sekaligus rumah bagi tradisi laut, musik, dan tari yang kaya.',
      facts: [
        'Cengkih dan pala asli Maluku memicu ekspedisi Portugis, Spanyol, hingga VOC ke Nusantara.',
        'Kapitan Pattimura (Thomas Matulessy) memimpin perlawanan rakyat Maluku 1817.',
        'Kota Tua Ambon dan Benteng Victoria menyimpan jejak kolonialisme sejak 1576.'
      ],
      source: 'BPS, Pemerintah Provinsi Maluku'
    },
    papua: {
      id: 'papua', name: 'Papua', capital: 'Jayapura', island: 'Papua (Pulau Papua)',
      areaKm2: 319036, population: 4330000, timezone: 'WIT (UTC+9)',
      slogan: 'Karya Swadaya', coordinates: '2.5337° S, 140.7181° E',
      established: '1 Mei 1963',
      description: 'Provinsi paling timur Indonesia dengan kekayaan alam dan budaya yang luar biasa. Papua adalah rumah bagi ratusan suku dan bahasa, termasuk Asmat dan Dani, dengan seni ukir, tifa, serta lanskap Puncak Jaya dan hutan hujan tropisnya.',
      facts: [
        'Puncak Jaya (±4.884 m) adalah titik tertinggi di Indonesia dan satu-satunya puncak bersalju di khatulistiwa.',
        'Suku Asmat dikenal melalui seni ukir kayunya yang mendunia.',
        'Noken, tas rajut khas Papua, diakui UNESCO sebagai Warisan Budaya Takbenda (2012).'
      ],
      source: 'BPS, Pemerintah Provinsi Papua, UNESCO'
    }
  };

  /* ============================================================
     ENTITAS — ACEH
     ============================================================ */
  const items = [
    ent('tari-saman', 'Tari Saman', 'Seni', 'Tari Tradisional', 'aceh',
      'Tari Saman adalah tarian tradisional suku Gayo di Aceh Tengah yang dilakukan dengan duduk berlutut dan menepuk dada, paha, serta telapak tangan secara serempak. Tarian ini dikenal juga sebagai "Tari Seribu Tangan" karena kekompakan gerakannya yang memukau.',
      {
        localName: 'Saman', community: 'Suku Gayo', origin: 'Dataran Tinggi Gayo, Aceh Tengah',
        history: 'Konon diperkenalkan oleh Syekh Saman, seorang ulama penyebar Islam di Tanah Gayo, sehingga gerak dan syairnya sarat nilai dakwah. Awalnya berfungsi sebagai media syiar, kemudian berkembang menjadi seni pertunjukan.',
        function: 'Media dakwah Islam, hiburan, dan perekat solidaritas masyarakat Gayo.',
        meaning: 'Melambangkan kebersamaan, kedisiplinan, dan religiusitas. Syair berbahasa Gayo dan Arab memuat nasihat.',
        characteristics: 'Gerakan tepuk dada, tepuk paha, tepuk tangan, tepuk lantai dengan tempo semakin cepat; dipimpin seorang syekh (pembuka).',
        facts: ['UNESCO menetapkan Tari Saman sebagai Warisan Budaya Takbenda Dunia (2011).', 'Penari berjumlah ganjil (umumnya 10–17 orang).'],
        sources: ['UNESCO Intangible Heritage', 'Pemerintah Aceh']
      }),
    ent('suku-gayo', 'Suku Gayo', 'Suku & Masyarakat', 'Suku', 'aceh',
      'Suku Gayo adalah masyarakat asli Dataran Tinggi Gayo di Aceh Tengah, Bener Meriah, dan Gayo Lues. Mereka memiliki bahasa, adat, dan kesenian sendiri, termasuk Tari Saman dan alat musik canang.',
      {
        community: 'Dataran Tinggi Gayo', origin: 'Dataran tinggi bagian tengah Aceh',
        function: 'Komunitas adat dengan sistem pemerintahan adat (sarak opat) dan tradisi musyawarah.',
        facts: ['Kopi Gayo merupakan salah satu kopi arabika premium dunia yang dibudidayakan suku Gayo.', 'Kesenian Saman, Didong, dan guel berasal dari budaya Gayo.'],
        sources: ['Pemerintah Aceh', 'Buku "Gayo: Masyarakat dan Kebudayaannya" (C. Snouck Hurgronje)']
      }),
    ent('bahasa-aceh', 'Bahasa Aceh', 'Bahasa', 'Bahasa Daerah', 'aceh',
      'Bahasa Aceh (Basa Acèh) dituturkan oleh ±3,5 juta penutur di pesisir Aceh dan diaspora Aceh. Bahasa ini termasuk rumpun Melayik-Polinesia (Austronesia) dan memiliki sistem vokal serta ortografi khas (huruf eu, è).',
      {
        classification: 'Austronesia → Melayik-Polinesia',
        facts: ['Terdapat dialek pesisir dan pedalaman (Gayo dan Aceh berbeda bahasa).', 'Sapaan umum: "Peu haba?" (apa kabar).'],
        sources: ['Ethnologue', 'Balai Bahasa Aceh']
      }),
    ent('masjid-baiturrahman', 'Masjid Raya Baiturrahman', 'Tempat Ibadah', 'Masjid Bersejarah', 'aceh',
      'Masjid Raya Baiturrahman di pusat Banda Aceh adalah masjid kebanggaan rakyat Aceh yang berdiri sejak 1881 pada masa Sultan Alauddin Muhammad Daud Syah, lalu dibangun kembali oleh pemerintah Hindia Belanda. Masjid ini menjadi simbol ketangguhan karena selamat dari tsunami 2004.',
      {
        history: 'Awalnya dibangun untuk meredam perlawanan rakyat Aceh; kini menjadi pusat ibadah dan ikon kota.',
        architecture: 'Gaya arsitektur campuran Timur Tengah, India, dan kolonial dengan tujuh kubah hitam.',
        meaning: 'Simbol ketahanan dan identitas keislaman masyarakat Aceh.',
        facts: ['Memiliki tujuh kubah dan empat menara.', 'Menjadi tempat pengungsian dan bantuan saat tsunami 26 Desember 2004.'],
        coordinates: '5.5535° N, 95.3173° E',
        sources: ['Pemerintah Kota Banda Aceh']
      }),
    ent('kesultanan-aceh', 'Kesultanan Aceh Darussalam', 'Sejarah', 'Kerajaan Islam', 'aceh',
      'Kesultanan Aceh Darussalam (1496–1903) adalah kerajaan Islam terbesar di Nusantara barat pada abad ke-16 hingga ke-17. Dipimpin sultan-sultan seperti Alauddin Riayat Syah dan Iskandar Muda, Aceh menjadi pusat perdagangan, politik, dan keilmuan Islam di Selat Malaka.',
      {
        history: 'Berdiri setelah jatuhnya Kesultanan Samudra Pasai; mencapai puncak kejayaan pada masa Sultan Iskandar Muda (1607–1636).',
        function: 'Pusat perdagangan lada dan rempah, pusat dakwah Islam, serta kekuatan maritim penantang Portugis di Malaka.',
        facts: ['Hubungan diplomatik dengan Turki Utsmani dan kerajaan lain terjalin pada abad ke-16.', 'Akhir kesultanan ditandai penyerahan Sultan Muhammad Daud Syah kepada Belanda (1903).'],
        sources: ['Buku "Aceh dan Perang" (Denys Lombard)', 'Pemerintah Aceh']
      }),
    ent('mie-aceh', 'Mie Aceh', 'Kuliner', 'Makanan Berat', 'aceh',
      'Mie Aceh adalah mi kuning tebal yang dimasak dengan rempah khas (bumbu kari) dan disajikan dengan daging sapi/kambing atau seafood. Hidangan ini mencerminkan pengaruh kuliner India dan Timur Tengah dalam budaya Aceh.',
      {
        ingredients: 'Mi kuning tebal, daging/kepiting/udang, cabai, bawang, rempah kari, tomat.',
        origin: 'Diperkirakan berkembang dari adaptasi mi pedagang asing di pesisir Aceh.',
        function: 'Makanan utama sehari-hari sekaligus ikon kuliner Aceh.',
        facts: ['Varian: Mie Aceh Goreng, Mie Aceh Kuah, dan Mie Tarempa.'],
        sources: ['Dinas Kebudayaan dan Pariwisata Aceh']
      }),
    ent('kopi-gayo', 'Kopi Gayo', 'Kuliner', 'Minuman Tradisional', 'aceh',
      'Kopi Gayo adalah kopi arabika yang ditanam di Dataran Tinggi Gayo pada ketinggian 1.200–1.700 mdpl. Kopi ini dikenal karena keasaman rendah dan rasa khas, serta menjadi komoditas ekspor unggulan Aceh dengan sertifikasi organik.',
      {
        origin: 'Dikembangkan sejak masa kolonial; kini sentra produksi di Aceh Tengah dan Bener Meriah.',
        meaning: 'Kebanggaan ekonomi dan identitas budaya masyarakat Gayo.',
        facts: ['Gayo Coffee menjadi salah satu kopi arabika terbaik dunia.', 'Sebagian besar diekspor ke Amerika Serikat dan Eropa.'],
        sources: ['Kementerian Pertanian RI']
      }),
    ent('cut-nyak-dhien', 'Cut Nyak Dhien', 'Tokoh', 'Pahlawan Nasional', 'aceh',
      'Cut Nyak Dhien (1848–1908) adalah pahlawan nasional perempuan dari Aceh yang memimpin perlawanan gerilya terhadap Belanda setelah suaminya, Teuku Umar, gugur. Ia ditangkap pada 1905 dan diasingkan ke Sumedang, Jawa Barat, hingga wafat.',
      {
        field: 'Perjuangan kemerdekaan', period: '1848–1908',
        facts: ['Ditetapkan sebagai Pahlawan Nasional Indonesia (1964).', 'Gambarnya pernah tampil pada uang kertas Rp10.000 emisi 1998.'],
        sources: ['Kementerian Sosial RI']
      }),
    ent('teuku-umar', 'Teuku Umar', 'Tokoh', 'Pahlawan Nasional', 'aceh',
      'Teuku Umar (1854–1899) adalah panglima perang Aceh yang dikenal dengan strategi liciknya, termasuk berpura-pura bekerja sama dengan Belanda untuk memperoleh senjata. Ia gugur dalam pertempuran di Meulaboh pada 1899.',
      {
        field: 'Perjuangan kemerdekaan', period: '1854–1899',
        facts: ['Ditetapkan sebagai Pahlawan Nasional (1973).', 'Strateginya menginspirasi taktik gerilya perlawanan rakyat.'],
        sources: ['Kementerian Sosial RI']
      }),
    ent('pulau-weh', 'Pulau Weh', 'Pariwisata', 'Wisata Bahari', 'aceh',
      'Pulau Weh adalah pulau vulkanik di ujung barat laut Sumatra, terpisah dari daratan utama oleh Selat Benggala. Pulau ini terkenal dengan keindahan bawah laut Sabang, titik nol kilometer Indonesia, dan statusnya sebagai kawasan konservasi laut.',
      {
        coordinates: '5.8270° N, 95.3060° E',
        meaning: 'Titik paling barat Indonesia; Kota Sabang dikenal sebagai "Zero Kilometer".',
        facts: ['Taman Wisata Alam Laut Sabang menjadi kawasan konservasi sejak 1980-an.', 'Rumah singgah bawah laut dan spot diving kelas dunia.'],
        sources: ['Kementerian Pariwisata RI']
      }),
    ent('danau-laut-tawar', 'Danau Laut Tawar', 'Alam', 'Danau', 'aceh',
      'Danau Laut Tawar adalah danau vulkanik di Dataran Tinggi Gayo, Kabupaten Aceh Tengah, seluas ±5.472 hektare dengan panorama pegunungan di sekelilingnya. Danau ini menjadi pusat kehidupan masyarakat Gayo dan tujuan wisata alam.',
      {
        coordinates: '4.6136° N, 96.8756° E',
        function: 'Sumber air, perikanan, dan wisata alam Dataran Tinggi Gayo.',
        facts: ['Dikelilingi bukit dan hutan pinus.', 'Legenda lokal mengaitkan danau dengan kisah asal-usul masyarakat Gayo.'],
        sources: ['Pemerintah Kabupaten Aceh Tengah']
      }),
    ent('rumah-aceh', 'Rumah Aceh (Rumoh Aceh)', 'Budaya Fisik', 'Rumah Adat', 'aceh',
      'Rumoh Aceh adalah rumah panggung tradisional Aceh dengan tiang kayu, atap menyerong, dan ukiran yang menonjolkan bagian tengah. Rumah ini dibangun tanpa paku, menggunakan pasak, dan terbagi atas tiga ruang utama: seuramoe, tungai, dan seuramoe likot.',
      {
        structure: 'Panggung ±2,5–3 m; tiga ruang; serambi depan (seuramoe keu), tengah (tungai), belakang (seuramoe likot).',
        function: 'Tempat tinggal sekaligus ruang musyawarah dan upacara adat.',
        meaning: 'Menunjukkan struktur sosial dan keterbukaan masyarakat Aceh; tangga rumah mencerminkan strata sosial.',
        sources: ['Pemerintah Aceh', 'Kemendikbud RI']
      }),
    ent('rencong', 'Rencong', 'Budaya Fisik', 'Senjata Tradisional', 'aceh',
      'Rencong adalah senjata tradisional khas Aceh berbentuk belati dengan gagang melengkung menyerupai huruf L. Rencong melambangkan keberanian dan identitas keislaman masyarakat Aceh.',
      {
        function: 'Simbol kehormatan, alat pertahanan diri, dan kelengkapan busana adat.',
        meaning: 'Bentuknya diyakini mengandung nilai religius dan filosofi keteguhan.',
        facts: ['Rencong memiliki variasi bentuk: rencong meucugek, rencong pucok reubong, dan lainnya.'],
        sources: ['Kemendikbud RI']
      }),

    /* ============================================================
       ENTITAS — SUMATERA BARAT
       ============================================================ */
    ent('minangkabau', 'Suku Minangkabau', 'Suku & Masyarakat', 'Suku', 'sumatera-barat',
      'Minangkabau adalah kelompok etnis asli Sumatera Barat yang menganut sistem kekerabatan matrilineal — garis keturunan mengikuti ibu. Masyarakat Minang dikenal melalui tradisi merantau, adat "Adat Basandi Syarak, Syarak Basandi Kitabullah", serta rumah gadang.',
      {
        community: 'Sumatera Barat, pesisir barat Sumatra, sebagian Riau/Jambi',
        structure: 'Matrilineal; harta pusaka diwariskan melalui garis ibu; ninik mamak berperan dalam adat.',
        facts: ['Nama "Minangkabau" dikaitkan dengan legenda kemenangan kerbau (manang kabau).', 'Tradisi merantau melahirkan diaspora Minang di seluruh Indonesia.'],
        sources: ['Buku "Minangkabau: Sejarah Ringkas" (Taufik Abdullah)']
      }),
    ent('rumah-gadang', 'Rumah Gadang', 'Budaya Fisik', 'Rumah Adat', 'sumatera-barat',
      'Rumah Gadang adalah rumah adat Minangkabau dengan atap bergonjong runcing menyerupai tanduk kerbau. Rumah ini menjadi tempat tinggal bersama kaum matrilineal, ruang musyawarah adat, dan simbol identitas Minangkabau.',
      {
        history: 'Bentuknya berkembang dari arsitektur tradisional Sumatra; atap gonjong melambangkan tanduk kerbau pada legenda Minangkabau.',
        structure: 'Panggung dari kayu, atap ijuk/seng melengkung, tiang utama, ukiran bermotif alam (akar, daun, bunga).',
        function: 'Tempat tinggal kaum, pusat adat, dan penyelenggaraan upacara.',
        meaning: 'Gonjong melambangkan kemenangan dan kekeramatan; rumah menghadap arah matahari dengan tata ruang berjenjang.',
        facts: ['Rumah gadang memiliki ruang dalam yang luas tanpa sekat untuk seluruh anggota kaum.', 'Rangkiang (lumbung padi) menjadi bagian kompleks rumah gadang.'],
        sources: ['Kemendikbud RI', 'Buku "Arsitektur Tradisional Minangkabau"']
      }),
    ent('tari-piring', 'Tari Piring', 'Seni', 'Tari Tradisional', 'sumatera-barat',
      'Tari Piring adalah tarian Minangkabau yang dimainkan dengan piring di kedua telapak tangan, diiringi musik talempong dan saluang. Penari mengayunkan piring dengan lincah tanpa menjatuhkannya, melambangkan kegembiraan dan rasa syukur.',
      {
        history: 'Berasal dari tradisi syukur panen masyarakat Solok dan sekitarnya; berkembang menjadi seni pertunjukan.',
        function: 'Ungkapan syukur, hiburan, dan penyambutan tamu.',
        meaning: 'Kelincahan dan kebersamaan; piring melambangkan rezeki dan kemakmuran.',
        facts: ['Terdapat variasi dengan gerakan di atas pecahan kaca (Tari Piring Gelas).'],
        sources: ['Dinas Pariwisata Sumatera Barat']
      }),
    ent('rendang', 'Rendang', 'Kuliner', 'Makanan Berat', 'sumatera-barat',
      'Rendang adalah masakan daging yang dimasak perlahan dalam santan dan bumbu rempah hingga kering berwarna cokelat kehitaman. Proses memasaknya yang lama menjadikan rendang awet dan kaya rasa, sehingga menjadi hidangan upacara adat Minangkabau.',
      {
        history: 'Berkembang dari tradisi memasak Minangkabau; disebut dalam naskah "Hikayat Amir Hamzah" sejak abad ke-16.',
        ingredients: 'Daging sapi, santan kelapa, cabai, lengkuas, jahe, kunyit, serai, daun jeruk.',
        function: 'Hidangan upacara (baralek), simbol penghormatan kepada tamu, dan ikon kuliner Indonesia.',
        meaning: 'Proses memasak yang lama melambangkan kesabaran; dalam budaya Minang dikenal filosofi "rendang" sebagai simbol kebersamaan.',
        facts: ['Terpilih sebagai makanan terenak di dunia versi CNN (2011, 2017).', 'Rendang kering dapat bertahan berminggu-minggu tanpa pengawet.'],
        sources: ['CNN Travel', 'Dinas Pariwisata Sumatera Barat']
      }),
    ent('bahasa-minangkabau', 'Bahasa Minangkabau', 'Bahasa', 'Bahasa Daerah', 'sumatera-barat',
      'Bahasa Minangkabau (Baso Minangkabau) dituturkan oleh ±5,5 juta penutur di Sumatera Barat, pesisir barat Sumatra, dan diaspora Minang. Bahasa ini termasuk rumpun Melayik dan memiliki banyak dialek.',
      {
        classification: 'Austronesia → Melayik',
        facts: ['Sapaan umum: "Apo kaba?" (apa kabar).', 'Berkerabat dekat dengan bahasa Melayu dan Negeri Sembilan (Malaysia).'],
        sources: ['Ethnologue', 'Balai Bahasa Sumatera Barat']
      }),
    ent('jam-gadang', 'Jam Gadang', 'Situs Sejarah', 'Bangunan Bersejarah', 'sumatera-barat',
      'Jam Gadang adalah menara jam ikonik di pusat Kota Bukittinggi yang dibangun pada 1926 pada masa pemerintahan Hindia Belanda. Arsitekturnya memadukan gaya Minangkabau, Islam, dan kolonial; jam ini menjadi simbol Sumatera Barat.',
      {
        history: 'Dibangun atas prakarsa kontrolir Rookmaker; biaya berasal dari opzichter (mandor) Belanda.',
        architecture: 'Menara dengan atap gonjong, jam buatan pabrik Vortmann (Jerman).',
        meaning: 'Simbol identitas Kota Bukittinggi dan kebanggaan Sumatera Barat.',
        facts: ['Empat sisi jam memiliki angka Romawi; angka 4 ditulis "IIII".', 'Menjadi salah satu ikon wisata Sumatera Barat.'],
        coordinates: '0.3056° S, 100.3690° E',
        sources: ['Pemerintah Kota Bukittinggi']
      }),
    ent('kerajaan-pagaruyung', 'Kerajaan Pagaruyung', 'Sejarah', 'Kerajaan', 'sumatera-barat',
      'Kerajaan Pagaruyung (abad ke-14–1833) adalah kerajaan Minangkabau yang berpusat di Dataran Tinggi Pagaruyung, Tanah Datar. Kerajaan ini menjadi pusat adat dan politik Minangkabau hingga ditaklukkan dalam Perang Padri.',
      {
        history: 'Silsilahnya dihubungkan dengan Adityawarman; mencapai pengaruh luas di Sumatra barat dan tengah.',
        function: 'Pusat pemerintahan adat Minangkabau; sistem "tungku tigo sajarangan" membagi kekuasaan antara raja dan penghulu.',
        facts: ['Istana Pagaruyung (replika) di Batusangkar menjadi objek wisata budaya.', 'Kerajaan runtuh setelah Perang Padri (1821–1837).'],
        sources: ['Buku "Sejarah Minangkabau" (Umar Junus)']
      }),
    ent('nasi-kapau', 'Nasi Kapau', 'Kuliner', 'Makanan Berat', 'sumatera-barat',
      'Nasi Kapau adalah hidangan nasi khas Nagari Kapau, Bukittinggi, yang disajikan dengan banyak lauk-pauk kecil seperti rendang, gulai nangka, telur dadar, dan daun singkong. Penyajiannya di atas daun pisang dengan porsi lauk melimpah.',
      {
        origin: 'Nagari Kapau, Kabupaten Agam',
        function: 'Makanan sehari-hari sekaligus ikon kuliner Bukittinggi.',
        facts: ['Lauk disusun menyerupai kubah di atas nasi.', 'Salah satu kuliner legendaris Sumatra Barat.'],
        sources: ['Dinas Pariwisata Sumatera Barat']
      }),
    ent('danau-maninjau', 'Danau Maninjau', 'Alam', 'Danau', 'sumatera-barat',
      'Danau Maninjau adalah danau vulkanik kaldera di Kabupaten Agam, terbentuk dari letusan Gunung Maninjau purba sekitar 52.000 tahun lalu. Danau ini dikelilingi 19 nagari dan menjadi tujuan wisata alam serta kerajinan perak di sekitarnya.',
      {
        coordinates: '0.3299° S, 100.2066° E',
        meaning: 'Nama "Maninjau" dikaitkan dengan legenda Bujang Sembilan dan kisah "maninjau" (melihat).',
        facts: ['Keliling danau ±45 km dengan panorama Bukit Barisan.', 'Kawasan sekitar menjadi sentra budidaya ikan keramba.'],
        sources: ['Pemerintah Kabupaten Agam']
      }),
    ent('songket-pandai-sikek', 'Songket Pandai Sikek', 'Wastra', 'Tenun', 'sumatera-barat',
      'Songket Pandai Sikek adalah kain tenun khas Nagari Pandai Sikek, Tanah Datar, yang ditenun dengan benang emas/perak di atas benang dasar. Motifnya (pucuak rabuang, bungo cino) sarat makna dan menjadi busana kebanggaan Minangkabau.',
      {
        technique: 'Tenun tangan dengan benang emas/perak; satu kain dapat memakan waktu berminggu-minggu.',
        meaning: 'Motif melambangkan kesejahteraan, kesucian, dan adat Minangkabau.',
        function: 'Busana adat, kelengkapan upacara, dan identitas kebanggaan.',
        sources: ['Dinas Perindustrian Sumatera Barat']
      }),
    ent('mohammad-hatta', 'Mohammad Hatta', 'Tokoh', 'Pahlawan Nasional', 'sumatera-barat',
      'Mohammad Hatta (1902–1980), "Bapak Proklamator", adalah Wakil Presiden pertama Indonesia. Lahir di Bukittinggi, Hatta berjuang melalui pendidikan dan diplomasi, serta memproklamasikan kemerdekaan Indonesia bersama Soekarno pada 17 Agustus 1945.',
      {
        field: 'Politik, perekonomian, pendidikan', period: '1902–1980',
        facts: ['Merumuskan dan menandatangani Proklamasi Kemerdekaan 1945.', 'Dijuluki "Bapak Koperasi Indonesia".', 'Tokoh pada uang Rp100.000 emisi lama.'],
        sources: ['Kementerian Sosial RI']
      }),
    ent('tuanku-imam-bonjol', 'Tuanku Imam Bonjol', 'Tokoh', 'Pahlawan Nasional', 'sumatera-barat',
      'Tuanku Imam Bonjol (1772–1864) adalah pemimpin Perang Padri (1821–1837) yang mempertahankan kedaulatan Minangkabau melawan Belanda. Ia diasingkan hingga wafat di Minahasa.',
      {
        field: 'Perjuangan kemerdekaan, keagamaan', period: '1772–1864',
        facts: ['Ditetapkan sebagai Pahlawan Nasional (1973).', 'Namanya diabadikan pada bandara di Pasaman Barat dan uang Rp5.000 emisi lama.'],
        sources: ['Kementerian Sosial RI']
      })
  ];


    /* ============================================================
       ENTITAS — JAWA BARAT
       ============================================================ */
    items.push(
      ent('suku-sunda', 'Suku Sunda', 'Suku & Masyarakat', 'Suku', 'jawa-barat',
      'Suku Sunda adalah kelompok etnis asli Jawa Barat dengan budaya yang dikenal ramah dan halus (someah). Masyarakat Sunda memiliki bahasa, aksara, kesenian, dan sistem nilai "silih asah, silih asih, silih asuh".',
      {
        community: 'Jawa Barat, Banten, sebagian Jawa Tengah, diaspora',
        meaning: 'Filosofi hidup rukun dan menghormati alam serta sesama.',
        facts: ['Suku Sunda adalah etnis terbesar kedua di Indonesia.', 'Tradisi gotong royong dikenal dengan istilah "gugur gunung".'],
        sources: ['Kemendikbud RI']
      }),
    ent('bahasa-sunda', 'Bahasa Sunda', 'Bahasa', 'Bahasa Daerah', 'jawa-barat',
      'Bahasa Sunda dituturkan oleh ±32 juta penutur, terutama di Jawa Barat dan Banten. Bahasa ini memiliki tingkatan tutur (undak usuk): basa lemes (halus), loma (akrab), dan kasar, serta aksara tradisional Sunda.',
      {
        classification: 'Austronesia → Melayik-Polinesia',
        facts: ['Sapaan umum: "Kumaha damang?" (bagaimana kabar).', 'Memiliki aksara kuno Sunda (Aksara Sunda Kuno) dan aksara Sunda modern.'],
        sources: ['Ethnologue', 'Balai Bahasa Jawa Barat']
      }),
    ent('angklung', 'Angklung', 'Seni', 'Alat Musik', 'jawa-barat',
      'Angklung adalah alat musik tradisional Sunda yang terbuat dari tabung bambu dan dimainkan dengan digoyang sehingga menghasilkan nada. Angklung ditetapkan UNESCO sebagai Warisan Budaya Takbenda Dunia pada 2010.',
      {
        history: 'Telah dikenal masyarakat Sunda sejak zaman kerajaan Sunda; berkembang dalam berbagai fungsi dari ritual hingga pendidikan.',
        material: 'Bambu (awi wulung dan awi temen).',
        function: 'Pengiring upacara, hiburan, dan media pendidikan musik.',
        facts: ['Saung Angklung Udjo di Bandung menjadi pusat pelestarian angklung.', 'Angklung dapat dimainkan bersama oleh ratusan orang (angklung massal).'],
        sources: ['UNESCO Intangible Heritage', 'Pemerintah Jawa Barat']
      }),
    ent('tari-jaipong', 'Tari Jaipong', 'Seni', 'Tari Tradisional', 'jawa-barat',
      'Tari Jaipong adalah tarian kontemporer Sunda yang lahir pada 1970-an dari perpaduan tari tradisional Sunda (ketuk tilu) dengan gerakan modern dan musik gendang yang dinamis. Jaipong menjadi identitas seni pertunjukan Jawa Barat.',
      {
        history: 'Dipopulerkan seniman Gugum Gumbira di Bandung.',
        function: 'Hiburan, penyambutan, dan ekspresi identitas budaya Sunda.',
        meaning: 'Gerakannya yang energik melambangkan keceriaan dan keluwesan masyarakat Sunda.',
        facts: ['Jenis: Jaipong gaya kaler (utara) dan gaya kidul (selatan).'],
        sources: ['Dinas Pariwisata Jawa Barat']
      }),
    ent('rumah-sunda', 'Rumah Panggung Sunda (Julang Ngapak)', 'Budaya Fisik', 'Rumah Adat', 'jawa-barat',
      'Rumah adat Sunda berbentuk panggung dengan atap julang ngapak yang menyerupai sayap burung terbang. Rumah ini dibangun dengan bahan kayu dan bambu, tanpa paku, serta tata ruang yang mencerminkan filosofi kesederhanaan.',
      {
        structure: 'Panggung, atap julang ngapak; variasi: kasepuhan, badak heuay, parahu kumureb.',
        meaning: 'Atap julang ngapak melambangkan keterbukaan; panggung menjaga dari banjir dan binatang.',
        function: 'Tempat tinggal dengan pembagian ruang sesuai fungsi dan strata keluarga.',
        sources: ['Kemendikbud RI']
      }),
    ent('kujang', 'Kujang', 'Budaya Fisik', 'Senjata Tradisional', 'jawa-barat',
      'Kujang adalah senjata tradisional Sunda berbentuk unik menyerupai mata panah dengan lengkungan khas. Kujang bukan sekadar senjata, tetapi benda pusaka yang sarat makna spiritual dan simbol kehormatan masyarakat Sunda.',
      {
        meaning: 'Melambangkan keteguhan, keberanian, dan hubungan manusia dengan alam.',
        function: 'Alat kerja, senjata, dan pusaka adat.',
        facts: ['Jumlah lubang pada kujang memiliki makna filosofis tertentu.', 'Kujang menjadi ikon pada lambang daerah Jawa Barat.'],
        sources: ['Kemendikbud RI']
      }),
    ent('batik-sunda', 'Batik Sunda', 'Wastra', 'Batik', 'jawa-barat',
      'Batik Sunda adalah kain batik khas Jawa Barat dengan warna cerah dan motif alam (kawung, rereng, mega mendung, geometris). Pusat produksinya antara lain Cirebon (batik Trusmi), Garut, dan Tasikmalaya.',
      {
        technique: 'Tulis dan cap dengan pewarnaan alami/sintetis.',
        meaning: 'Motif mega mendung dari Cirebon melambangkan awan pembawa hujan dan kesuburan.',
        function: 'Busana adat, pakaian sehari-hari, dan identitas budaya.',
        sources: ['Dinas Pariwisata Jawa Barat']
      }),
    ent('nasi-timbel', 'Nasi Timbel', 'Kuliner', 'Makanan Berat', 'jawa-barat',
      'Nasi Timbel adalah nasi khas Sunda yang dibungkus daun pisang menyerupai timbel, disajikan dengan lauk seperti ayam goreng, tahu tempe, sambal, dan lalapan. Hidangan ini mencerminkan kearifan kuliner masyarakat Sunda.',
      {
        ingredients: 'Nasi, ayam goreng, tahu, tempe, sambal terasi, lalapan.',
        meaning: 'Penyajian dengan daun pisang menjaga aroma dan kehangatan nasi.',
        function: 'Makanan sehari-hari dan ikon kuliner Sunda.',
        sources: ['Dinas Pariwisata Jawa Barat']
      }),
    ent('gunung-tangkuban-perahu', 'Gunung Tangkuban Parahu', 'Alam', 'Gunung', 'jawa-barat',
      'Gunung Tangkuban Parahu adalah gunung api aktif di utara Bandung dengan kawah yang masih menunjukkan aktivitas. Namanya diambil dari legenda Sangkuriang, ketika perahu yang dibangunnya ditendang hingga tertelungkup menjadi gunung ini.',
      {
        height: '2.084 mdpl', type: 'Stratovolcano aktif',
        meaning: 'Nama "Tangkuban Parahu" berarti perahu tertelungkup, merujuk legenda Sangkuriang.',
        facts: ['Kawah Ratu menjadi tujuan wisata utama.', 'Terletak di kawasan Bandung Utara, ±30 km dari pusat kota.'],
        coordinates: '6.7703° S, 107.5990° E',
        sources: ['PVMBG (Pusat Vulkanologi dan Mitigasi Bencana Geologi)']
      }),
    ent('kerajaan-sunda', 'Kerajaan Sunda (Pakuan Pajajaran)', 'Sejarah', 'Kerajaan', 'jawa-barat',
      'Kerajaan Sunda berpusat di Pakuan Pajajaran (Bogor) dan berkembang dari abad ke-7 hingga ke-16. Kerajaan ini dikenal melalui Prasasti Kebon Kopi, kitab "Bujangga Manik", serta hubungan diplomatik dengan bangsa Eropa (Luso-Sundanese Treaty 1512).',
      {
        history: 'Mencapai puncak pada masa Sri Baduga Maharaja (Prabu Siliwangi, 1482–1521).',
        meaning: 'Warisan sejarah Tatar Sunda sebelum dominasi Kesultanan Banten dan Mataram.',
        facts: ['Perjanjian Sunda-Portugis 1512 menjadi naskah diplomatik penting.', 'Runtuh setelah direbut Kesultanan Banten (1579).'],
        sources: ['Buku "Sundakala" (Ayatrohaedi)', 'Arsip Nasional RI']
      }),
    ent('dewi-sartika', 'Dewi Sartika', 'Tokoh', 'Pahlawan Nasional', 'jawa-barat',
      'Dewi Sartika (1884–1947) adalah pejuang pendidikan perempuan dari Bandung yang mendirikan Sekolah Istri (1904), cikal bakal pendidikan bagi perempuan Sunda. Ia ditetapkan sebagai Pahlawan Nasional pada 1966.',
      {
        field: 'Pendidikan, perjuangan kemerdekaan', period: '1884–1947',
        facts: ['Pendiri Sekolah Istri pertama di Bandung.', 'Namanya diabadikan pada banyak sekolah dan jalan di Indonesia.'],
        sources: ['Kementerian Sosial RI']
      }),
    ent('wayang-golek', 'Wayang Golek', 'Seni', 'Wayang & Pertunjukan', 'jawa-barat',
      'Wayang golek adalah seni pertunjukan boneka kayu khas Sunda yang dimainkan oleh dalang dengan iringan gamelan. Ceritanya bersumber dari epos Mahabharata dan Ramayana serta lakon carangan khas Sunda.',
      {
        function: 'Hiburan, media dakwah, dan pendidikan moral.',
        meaning: 'Tokoh boneka melambangkan sifat manusia; pertunjukan berisi nilai filosofis.',
        facts: ['Dalang terkenal: Asep Sunandar Sunarya.', 'Wayang golek berbeda dengan wayang kulit (pipih) karena berbentuk tiga dimensi.'],
        sources: ['Dinas Pariwisata Jawa Barat']
      }),

    /* ============================================================
       ENTITAS — JAWA TENGAH
       ============================================================ */
    ent('candi-borobudur', 'Candi Borobudur', 'Situs Sejarah', 'Candi', 'jawa-tengah',
      'Borobudur adalah candi Buddha terbesar di dunia yang dibangun pada abad ke-8/9 M oleh Wangsa Syailendra di Magelang. Candi berundak sepuluh tingkat ini dihiasi 2.672 panel relief dan 504 arca Buddha, serta ditetapkan UNESCO sebagai Warisan Dunia pada 1991.',
      {
        history: 'Dibangun sekitar 780–840 M; ditinggalkan dan tertimbun abu vulkanik selama berabad-abad; ditemukan kembali pada abad ke-19; dipugar besar-besaran oleh UNESCO (1973–1983).',
        architecture: 'Struktur mandala dengan tiga zona: Kamadhatu (dunia nafsu), Rupadhatu (dunia bentuk), Arupadhatu (dunia tanpa bentuk).',
        function: 'Tempat ziarah dan meditasi Buddha, simbol kosmologi agama Buddha Mahayana.',
        meaning: 'Perjalanan spiritual dari dunia nafsu menuju pencerahan (Nirwana).',
        facts: ['Merupakan monumen Buddha terbesar di dunia.', 'Menjadi tujuan Waisak nasional setiap tahun.', 'Kawasan Candi Borobudur masuk Taman Wisata Candi Borobudur, Prambanan & Ratu Boko.'],
        coordinates: '7.6079° S, 110.2038° E',
        sources: ['UNESCO World Heritage Centre', 'Balai Konservasi Borobudur']
      }),
    ent('candi-prambanan', 'Candi Prambanan', 'Situs Sejarah', 'Candi', 'jawa-tengah',
      'Candi Prambanan (Candi Rara Jonggrang) adalah kompleks candi Hindu terbesar di Indonesia, dibangun sekitar abad ke-9 M oleh Rakai Pikatan dari Mataram Kuno. Kompleks ini didedikasikan untuk Trimurti: Brahma, Wisnu, dan Siwa.',
      {
        history: 'Dibangun ±856 M; ditinggalkan akibat letusan Merapi dan gempa; dipugar sejak abad ke-20.',
        architecture: 'Candi utama Siwa setinggi 47 m dengan relief Ramayana di pagar langkan.',
        function: 'Tempat ibadah Hindu dan pusat kegiatan keagamaan (kini digunakan kembali untuk upacara).',
        meaning: 'Terkait legenda Roro Jonggrang; simbol keagungan Hindu Mataram Kuno.',
        facts: ['Ditetapkan UNESCO sebagai Warisan Dunia (1991).', 'Wahyu? — reliefnya menceritakan Ramayana dan Krishnayana.'],
        coordinates: '7.7520° S, 110.4914° E',
        sources: ['UNESCO World Heritage Centre', 'Balai Pelestarian Cagar Budaya Jawa Tengah']
      }),
    ent('bahasa-jawa', 'Bahasa Jawa', 'Bahasa', 'Bahasa Daerah', 'jawa-tengah',
      'Bahasa Jawa dituturkan oleh lebih dari 68 juta penutur, menjadikannya bahasa daerah dengan penutur terbanyak di Indonesia. Bahasa ini memiliki tingkatan tutur (ngoko, krama madya, krama inggil) dan aksara Jawa (Hanacaraka).',
      {
        classification: 'Austronesia → Melayik-Polinesia',
        facts: ['Sapaan halus: "Sugeng enjing" (selamat pagi).', 'Aksara Jawa (Carakan) masih dipelajari dan digunakan dalam konteks budaya.', 'Menjadi bahasa ibu bagi masyarakat Jawa Tengah, DI Yogyakarta, dan Jawa Timur.'],
        sources: ['Ethnologue', 'Balai Bahasa Jawa Tengah']
      }),
    ent('suku-jawa', 'Suku Jawa', 'Suku & Masyarakat', 'Suku', 'jawa-tengah',
      'Suku Jawa adalah kelompok etnis terbesar di Indonesia dengan budaya yang kaya akan kesenian, adat, dan filosofi hidup (misalnya konsep "rukun" dan "unggah-ungguh"). Pusat kebudayaan Jawa berada di Jawa Tengah dan DI Yogyakarta.',
      {
        community: 'Jawa Tengah, DI Yogyakarta, Jawa Timur, diaspora',
        meaning: 'Nilai gotong royong, kesopanan berbahasa (unggah-ungguh), dan kearifan lokal.',
        facts: ['Mengembangkan wayang kulit, gamelan, batik, dan sastra Jawa.', 'Tradisi slametan menjadi wujud kebersamaan masyarakat Jawa.'],
        sources: ['Kemendikbud RI']
      }),
    ent('batik', 'Batik', 'Wastra', 'Batik', 'jawa-tengah',
      'Batik adalah kain bergambar yang dibuat dengan teknik lilin (malam) dan pewarnaan, ditetapkan UNESCO sebagai Warisan Budaya Takbenda Dunia pada 2009. Solo, Pekalongan, dan Yogyakarta menjadi pusat batik dengan motif khas masing-masing.',
      {
        history: 'Teknik membatik telah dikenal sejak era kerajaan Jawa; berkembang pesat di kawasan pesisir dan keraton.',
        technique: 'Batik tulis (canting), batik cap, dan batik printing.',
        meaning: 'Motif memiliki makna filosofis; beberapa motif (parang, sekar) memiliki aturan pemakaian.',
        facts: ['Tanggal 2 Oktober diperingati sebagai Hari Batik Nasional.', 'Motif khas: parang, kawung, mega mendung (Cirebon), sido mukti.'],
        sources: ['UNESCO Intangible Heritage', 'Museum Batik (Yogyakarta, Pekalongan)']
      }),
    ent('wayang-kulit', 'Wayang Kulit', 'Seni', 'Wayang & Pertunjukan', 'jawa-tengah',
      'Wayang kulit adalah seni pertunjukan boneka kulit pipih yang dimainkan dalang di balik layar (kelir) dengan iringan gamelan. Pertunjukan wayang kulit ditetapkan UNESCO sebagai Warisan Budaya Takbenda Dunia (2003, 2008) dan mengandung nilai moral, filosofis, dan religius.',
      {
        history: 'Berkembang sejak zaman Hindu-Buddha; diadaptasi dengan nilai Islam oleh Walisongo.',
        function: 'Hiburan, media dakwah, upacara adat, dan pendidikan moral.',
        meaning: 'Bayangan wayang di layar melambangkan kehidupan; dalang sebagai pengatur cerita.',
        facts: ['Lakon bersumber dari Mahabharata dan Ramayana serta carangan.', 'Wayang kulit ditetapkan UNESCO sebagai Masterpiece of Oral and Intangible Heritage (2003).'],
        sources: ['UNESCO', 'Institut Seni Indonesia Surakarta']
      }),
    ent('gamelan', 'Gamelan', 'Seni', 'Alat Musik', 'jawa-tengah',
      'Gamelan adalah ansambel musik tradisional Jawa (dan Bali/Sunda) yang terdiri atas instrumen perkusi seperti saron, bonang, gong, kendang, dan gambang. Gamelan menjadi pengiring wayang, tari, dan upacara.',
      {
        history: 'Berkembang pada masa kerajaan Mataram; gamelan Jawa memiliki laras slendro dan pelog.',
        material: 'Logam perunggu, kayu, dan kulit.',
        function: 'Pengiring seni pertunjukan dan upacara; media ekspresi rasa.',
        meaning: 'Dalam kosmologi Jawa, bunyi gong melambangkan keselarasan alam semesta.',
        facts: ['Gamelan Jawa (keraton) diakui UNESCO sebagai Warisan Budaya Takbenda (2021).', 'Instrumen: kendang, saron, demung, bonang, gambang, gender, gong.'],
        sources: ['UNESCO', 'Kemendikbud RI']
      }),
    ent('gudeg', 'Gudeg', 'Kuliner', 'Makanan Berat', 'jawa-tengah',
      'Gudeg adalah makanan khas Yogyakarta (DIY, berbatas langsung dengan Jawa Tengah) berupa nangka muda yang dimasak dengan santan dan gula aren hingga berwarna cokelat. Disajikan dengan ayam, telur, tempe, dan sambal krecek.',
      {
        history: 'Berkembang di lingkungan Keraton Yogyakarta; kini menjadi ikon kuliner Jawa Tengah–DIY.',
        ingredients: 'Nangka muda, santan, gula aren, daun jati, ayam, telur, krecek.',
        meaning: 'Proses memasak lama melambangkan kesabaran; warna cokelat dari daun jati.',
        facts: ['Varian gudeg basah dan gudeg kering (sering disebut gudeg jogja).'],
        sources: ['Dinas Pariwisata DIY']
      }),
    ent('kerajaan-mataram-kuno', 'Kerajaan Mataram Kuno', 'Sejarah', 'Kerajaan', 'jawa-tengah',
      'Mataram Kuno adalah kerajaan yang berkuasa di Jawa Tengah dan Jawa Timur pada abad ke-8 hingga ke-10 M, dengan dua dinasti: Sanjaya (Hindu Siwa) dan Syailendra (Buddha). Kerajaan ini membangun Candi Borobudur, Prambanan, dan banyak candi lainnya.',
      {
        history: 'Berpusat di sekitar Kedu (Magelang); kemudian pindah ke Jawa Timur.',
        function: 'Pusat pemerintahan, agama, dan budaya Jawa kuno.',
        facts: ['Prasasti Canggal (732 M) menyebut Raja Sanjaya.', 'Runtuh karena letusan Merapi dan pergeseran kekuasaan ke Jawa Timur.'],
        sources: ['Buku "Sejarah Nasional Indonesia" (Marwati Djoened Poesponegoro)']
      }),
    ent('gunung-merapi', 'Gunung Merapi', 'Alam', 'Gunung', 'jawa-tengah',
      'Gunung Merapi (±2.930 mdpl) adalah gunung api teraktif di Indonesia, terletak di perbatasan Jawa Tengah dan DI Yogyakarta. Erupsi besar terakhir terjadi pada 2010, dan gunung ini dijaga ketat oleh BPPTKG.',
      {
        height: '2.930 mdpl', type: 'Stratovolcano aktif',
        meaning: 'Nama "Merapi" berarti gunung api; dalam mitologi Jawa menjadi salah satu poros kosmologi.',
        facts: ['Kawasan Taman Nasional Gunung Merapi.', 'Pendakian dibatasi sesuai status aktivitas gunung.'],
        coordinates: '7.5404° S, 110.4458° E',
        sources: ['BPPTKG (Balai Penyelidikan dan Pengembangan Teknologi Kebencanaan Geologi)']
      }),
    ent('ra-kartini', 'Raden Ajeng Kartini', 'Tokoh', 'Pahlawan Nasional', 'jawa-tengah',
      'R.A. Kartini (1879–1904) adalah pejuang emansipasi perempuan dari Jepara yang memperjuangkan pendidikan bagi perempuan pribumi. Surat-suratnya diterbitkan sebagai "Habis Gelap Terbitlah Terang" dan tanggal lahirnya diperingati sebagai Hari Kartini.',
      {
        field: 'Pendidikan, emansipasi perempuan', period: '1879–1904',
        facts: ['Mendirikan sekolah untuk perempuan di Jepara dan Rembang.', 'Ditetapkan sebagai Pahlawan Nasional (1964).'],
        sources: ['Kementerian Sosial RI']
      }),
    ent('ki-hajar-dewantara', 'Ki Hajar Dewantara', 'Tokoh', 'Pahlawan Nasional', 'jawa-tengah',
      'Ki Hajar Dewantara (1889–1959) adalah Bapak Pendidikan Nasional, pendiri Taman Siswa (1922) dan tokoh pergerakan nasional. Semboyannya "Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani" menjadi dasar pendidikan Indonesia.',
      {
        field: 'Pendidikan, pergerakan nasional', period: '1889–1959',
        facts: ['Tanggal lahirnya (2 Mei) diperingati sebagai Hari Pendidikan Nasional.', 'Namanya diabadikan pada uang Rp20.000 emisi 1998–2022.'],
        sources: ['Kementerian Sosial RI']
      }),
    ent('tari-gambyong', 'Tari Gambyong', 'Seni', 'Tari Tradisional', 'jawa-tengah',
      'Tari Gambyong adalah tarian klasik Jawa dari Surakarta yang awalnya berupa tarian rakyat (tayub) dan kemudian diangkat menjadi tari istana. Gerakannya luwes dengan iringan gending gambyong.',
      {
        history: 'Berkembang di lingkungan Keraton Surakarta pada abad ke-19.',
        function: 'Penyambutan tamu dan pertunjukan istana.',
        meaning: 'Keluwesan dan keanggunan perempuan Jawa.',
        sources: ['ISI Surakarta', 'Dinas Pariwisata Jawa Tengah']
      }),

    /* ============================================================
       ENTITAS — BALI
       ============================================================ */
    ent('suku-bali', 'Suku Bali', 'Suku & Masyarakat', 'Suku', 'bali',
      'Suku Bali adalah masyarakat asli Pulau Bali yang memeluk agama Hindu dengan corak khas Nusantara. Kehidupan sosialnya terikat pada desa adat, banjar, dan sistem subak yang mengatur pengairan sawah.',
      {
        community: 'Pulau Bali dan diaspora (terutama Lombok)',
        meaning: 'Konsep "Tri Hita Karana" — keseimbangan hubungan manusia, alam, dan Tuhan.',
        facts: ['Terdapat komunitas Bali Aga (Bali asli) di Tenganan dan Trunyan.', 'Upacara dan seni menjadi bagian tak terpisahkan dari kehidupan sehari-hari.'],
        sources: ['Kemendikbud RI']
      }),
    ent('bahasa-bali', 'Bahasa Bali', 'Bahasa', 'Bahasa Daerah', 'bali',
      'Bahasa Bali dituturkan oleh ±3,3 juta penutur di Pulau Bali dan Nusa Penida. Bahasa ini memiliki tingkatan tutur (basa alus, madia, kasar) dan aksara Bali (Hanacaraka Bali) yang digunakan dalam prasasti dan lontar.',
      {
        classification: 'Austronesia → Melayik-Polinesia',
        facts: ['Sapaan umum: "Kenken kabare?" (bagaimana kabar).', 'Aksara Bali digunakan untuk menulis lontar dan sastra.'],
        sources: ['Ethnologue', 'Balai Bahasa Bali']
      }),
    ent('aksara-bali', 'Aksara Bali', 'Bahasa', 'Aksara', 'bali',
      'Aksara Bali adalah sistem tulisan turunan Brahmi yang digunakan untuk menulis bahasa Bali dan bahasa Jawa/Sanskerta dalam konteks keagamaan. Aksara ini masih dipakai pada prasasti, lontar, dan media budaya.',
      {
        function: 'Menulis sastra, lontar, dan sarana upacara keagamaan.',
        facts: ['Jenis: aksara wresastra (baku) dan aksara modre (sakral).', 'Masih diajarkan di sekolah-sekolah Bali.'],
        sources: ['Balai Bahasa Bali']
      }),
    ent('pura-besakih', 'Pura Besakih', 'Tempat Ibadah', 'Pura', 'bali',
      'Pura Besakih adalah kompleks pura terbesar dan tersuci di Bali, terletak di lereng Gunung Agung, Karangasem. Kompleks ini terdiri atas puluhan pura yang menjadi pusat kegiatan keagamaan umat Hindu Bali.',
      {
        history: 'Diperkirakan telah ada sejak abad ke-8; berkembang sebagai pura negara kerajaan Bali.',
        architecture: 'Pura Penataran Agung sebagai pusat; gerbang candi bentar dan meru bertingkat.',
        function: 'Pusat ibadah dan upacara keagamaan Hindu Bali.',
        meaning: 'Menghadap Gunung Agung yang disucikan; melambangkan hubungan manusia dan Tuhan.',
        facts: ['Terdiri dari ±86 pura/meru.', 'Selamat dari erupsi Gunung Agung 1963 yang mengalirkan lava di sekitarnya.'],
        coordinates: '8.3744° S, 115.4523° E',
        sources: ['Pemerintah Kabupaten Karangasem']
      }),
    ent('tari-kecak', 'Tari Kecak', 'Seni', 'Tari Tradisional', 'bali',
      'Tari Kecak adalah pertunjukan tari kolosal Bali yang diiringi teriakan "cak" oleh puluhan penari pria tanpa alat musik. Tari ini mengisahkan Ramayana dan dikembangkan pada 1930-an dari ritual sanghyang.',
      {
        history: 'Dipopulerkan oleh seniman Wayan Limbak dan pelukis Jerman Walter Spies (1930-an).',
        function: 'Pertunjukan seni dan ritual (akar dari tari sanghyang).',
        meaning: 'Menggambarkan kisah Rama melawan Rahwana; barisan penari melambangkan pasukan kera.',
        facts: ['Ditampilkan rutin di Pura Uluwatu dan Ubud.', 'Tanpa iringan gamelan — hanya vokal "cak cak cak".'],
        sources: ['Dinas Pariwisata Bali']
      }),
    ent('gamelan-bali', 'Gamelan Bali (Gamelan Gong Kebyar)', 'Seni', 'Alat Musik', 'bali',
      'Gamelan Bali adalah ansambel musik perkusi khas Bali dengan bunyi nyaring dan dinamis. Gamelan Gong Kebyar, yang lahir awal abad ke-20, menjadi gaya paling populer dengan tempo cepat dan variasi dramatis.',
      {
        material: 'Perunggu, bambu (rindik), kayu.',
        function: 'Pengiring tari, upacara, dan pertunjukan.',
        meaning: 'Bunyi gamelan dianggap bagian dari komunikasi dengan alam dan leluhur.',
        facts: ['Dua kelompok penalaan: slendro (kebyar) dan pelog.', 'Gamelan digunakan dalam upacara keagamaan dan festival.'],
        sources: ['ISI Denpasar']
      }),
    ent('ngaben', 'Upacara Ngaben', 'Tradisi', 'Upacara Adat', 'bali',
      'Ngaben adalah upacara pembakaran jenazah umat Hindu Bali yang bertujuan melepaskan roh dari ikatan duniawi menuju alam berikutnya. Prosesinya melibatkan wadah (bade) dan lembu sebagai simbol kendaraan roh.',
      {
        community: 'Umat Hindu Bali',
        function: 'Ritual keagamaan pelepasan roh; bagian dari siklus kehidupan menurut Hindu.',
        meaning: 'Api suci membersihkan unsur duniawi; roh menuju reinkarnasi atau moksa.',
        facts: ['Dapat dilakukan secara kolektif (ngaben massal) untuk menghemat biaya.', 'Bade berbentuk menara dan lembu kayu dibakar bersama jenazah.'],
        sources: ['Parisada Hindu Dharma Indonesia']
      }),
    ent('barong', 'Tari Barong', 'Seni', 'Seni Pertunjukan', 'bali',
      'Tari Barong adalah pertunjukan sakral Bali yang menampilkan makhluk mitologis Barong melawan Rangda, melambangkan pertarungan kebaikan dan kejahatan. Barong dianggap pelindung desa dari kekuatan negatif.',
      {
        function: 'Ritual perlindungan desa dan pertunjukan budaya.',
        meaning: 'Barong = kebaikan; Rangda = kejahatan; keseimbangan kosmik.',
        facts: ['Barong ket (singa) paling umum di Bali.', 'Ditarikan dalam upacara dan festival budaya.'],
        sources: ['Dinas Pariwisata Bali']
      }),
    ent('ayam-betutu', 'Ayam Betutu', 'Kuliner', 'Makanan Berat', 'bali',
      'Ayam betutu adalah ayam utuh yang dibumbui "base genep" (bumbu lengkap) lalu dibungkus daun dan dipanggang/dikukus hingga empuk. Hidangan ini menjadi ikon kuliner Bali, terutama dari Gilimanuk.',
      {
        ingredients: 'Ayam, base genep (bawang, cabai, kemiri, kunyit, lengkuas, serai).',
        origin: 'Gilimanuk, Bali Barat',
        meaning: 'Penyajian utuh melambangkan kebersamaan dan kemeriahan.',
        function: 'Hidangan upacara dan kuliner khas Bali.',
        sources: ['Dinas Pariwisata Bali']
      }),
    ent('subak', 'Subak', 'Tradisi', 'Kearifan Lokal', 'bali',
      'Subak adalah sistem irigasi sawah tradisional Bali yang diatur oleh organisasi petani (krama subak) berdasarkan filosofi Tri Hita Karana. Sistem ini diakui UNESCO sebagai Warisan Budaya Dunia (2012).',
      {
        history: 'Berkembang sejak abad ke-11; diatur dalam prasasti dan lontar.',
        function: 'Pengaturan air irigasi, musyawarah petani, dan upacara Dewi Sri.',
        meaning: 'Keseimbangan hubungan petani dengan Tuhan, alam, dan sesama.',
        facts: ['Lanskap sawah berundak (Jatiluwih) menjadi bagian warisan subak.', 'Setiap subak memiliki pura ulun suwi (pura air).'],
        sources: ['UNESCO World Heritage Centre', 'Pemerintah Provinsi Bali']
      }),
    ent('ngurah-rai', 'I Gusti Ngurah Rai', 'Tokoh', 'Pahlawan Nasional', 'bali',
      'I Gusti Ngurah Rai (1917–1946) adalah pahlawan nasional Bali yang memimpin Perang Puputan Margarana melawan Belanda pada 20 November 1946. Ia gugur dalam pertempuran tersebut dan namanya diabadikan pada bandara internasional Bali.',
      {
        field: 'Perjuangan kemerdekaan', period: '1917–1946',
        facts: ['Perang Puputan Margarana berakhir dengan gugurnya seluruh pasukan.', 'Ditetapkan sebagai Pahlawan Nasional (1975).'],
        sources: ['Kementerian Sosial RI']
      }),
    ent('gunung-batur', 'Gunung & Danau Batur', 'Alam', 'Gunung', 'bali',
      'Gunung Batur (±1.717 mdpl) adalah gunung api aktif di Kintamani dengan kaldera dan Danau Batur di sekitarnya. Pemandangan kawah dan danau menjadikannya tujuan wisata alam dan pendakian terkenal di Bali.',
      {
        height: '1.717 mdpl', type: 'Stratovolcano aktif',
        meaning: 'Bagian dari kawasan geopark Batur yang diakui UNESCO Global Geopark (2012).',
        facts: ['Pendakian matahari terbit menjadi atraksi populer.', 'Desa Trunyan (Bali Aga) berada di tepi Danau Batur.'],
        coordinates: '8.2423° S, 115.3753° E',
        sources: ['UNESCO Global Geoparks', 'PVMBG']
      })
    );


    /* ============================================================
       ENTITAS — KALIMANTAN TIMUR
       ============================================================ */
    items.push(
      ent('suku-dayak', 'Suku Dayak', 'Suku & Masyarakat', 'Suku', 'kalimantan-timur',
        'Dayak adalah sebutan bagi ratusan sub-suku asli Kalimantan yang mendiami pedalaman, termasuk di Kalimantan Timur (Dayak Kenyah, Kayan, Bahau, Benuaq, dan lainnya). Mereka memiliki sistem adat, seni ukir, dan kearifan lokal dalam menjaga hutan.',
        {
          community: 'Pedalaman Kalimantan; di Kaltim: Mahakam Hulu dan sekitarnya',
          meaning: 'Konsep hidup selaras dengan alam; upacara adat (mis. Kwangkay, belian) menghormati leluhur.',
          facts: ['Seni ukir dan mandau menjadi ciri khas budaya Dayak.', 'Tari Kancet Ledo dan Kancet Papatai berasal dari Dayak Kenyah.'],
          sources: ['Kemendikbud RI', 'Pemerintah Provinsi Kalimantan Timur']
        }),
      ent('kerajaan-kutai', 'Kerajaan Kutai', 'Sejarah', 'Kerajaan', 'kalimantan-timur',
        'Kerajaan Kutai Martadipura (abad ke-4 M) adalah kerajaan Hindu tertua di Indonesia yang diketahui melalui Prasasti Yupa (Prasasti Mulawarman) di Muara Kaman. Warisannya dilanjutkan Kesultanan Kutai Kartanegara ing Martadipura hingga kini.',
        {
          history: 'Raja Mulawarman disebut dalam prasasti yupa; kemudian berkembang Kesultanan Kutai Kartanegara (beragama Islam).',
          function: 'Pusat pemerintahan dan agama Hindu-Buddha awal di Kalimantan Timur.',
          facts: ['Prasasti Yupa ditulis dengan aksara Pallawa dan bahasa Sanskerta.', 'Sultan Kutai masih berperan dalam budaya hingga masa kini.'],
          sources: ['Buku "Sejarah Nasional Indonesia"', 'Museum Mulawarman']
        }),
      ent('sungai-mahakam', 'Sungai Mahakam', 'Alam', 'Sungai', 'kalimantan-timur',
        'Sungai Mahakam (±980 km) adalah sungai terbesar di Kalimantan Timur yang mengalir dari Pegunungan Muller ke Selat Makassar. Sungai ini menjadi urat nadi transportasi, ekonomi, dan kehidupan masyarakat Kutai dan Dayak.',
        {
          function: 'Transportasi, perikanan, dan sumber kehidupan; pusat kota Samarinda dan Tenggarong berada di tepiannya.',
          meaning: 'Rumah bagi Pesut Mahakam dan kawasan Danau Mahakam (Semayang, Melintang, Jempang).',
          facts: ['Setiap tahun diadakan Festival Erau dan lomba dayung di sekitar Mahakam.', 'Panjang ±980 km dengan daerah aliran seluas ±77.000 km².'],
          sources: ['BBWS Kalimantan Timur']
        }),
      ent('rumah-lamin', 'Rumah Lamin', 'Budaya Fisik', 'Rumah Adat', 'kalimantan-timur',
        'Rumah Lamin adalah rumah panjang tradisional suku Dayak di Kalimantan Timur yang dapat dihuni banyak keluarga sekaligus. Rumah panggung dari kayu ulin ini menjadi simbol kebersamaan masyarakat Dayak.',
        {
          structure: 'Panggung dari kayu ulin (besi), panjang puluhan meter, berderet kamar dengan ruang bersama (lamin).',
          function: 'Tempat tinggal bersama dan ruang upacara adat.',
          meaning: 'Melambangkan gotong royong dan kesatuan komunitas Dayak.',
          facts: ['Rumah Lamin tradisional terdapat di Pampang, Samarinda (budaya Dayak Kenyah).', 'Ornamen ukiran dan lukisan motif Dayak menghiasi dinding.'],
          sources: ['Pemerintah Provinsi Kalimantan Timur']
        }),
      ent('mandau', 'Mandau', 'Budaya Fisik', 'Senjata Tradisional', 'kalimantan-timur',
        'Mandau adalah senjata tradisional suku Dayak berupa parang panjang dengan ukiran pada bilah dan gagang. Selain sebagai senjata, mandau berfungsi sebagai alat kerja dan benda pusaka dalam budaya Dayak.',
        {
          meaning: 'Melambangkan keberanian dan status sosial; mandau dianggap memiliki kekuatan spiritual.',
          function: 'Senjata, alat berkebun, dan kelengkapan upacara adat.',
          facts: ['Mandau dihiasi ukiran dan rambut manusia/tumbuhan pada gagang (pepakul).'],
          sources: ['Kemendikbud RI']
        }),
      ent('tari-kancet', 'Tari Kancet Papatai', 'Seni', 'Tari Tradisional', 'kalimantan-timur',
        'Tari Kancet Papatai adalah tari perang suku Dayak Kenyah yang menggambarkan keperkasaan pahlawan. Gerakannya energik dengan properti mandau dan perisai, diiringi alat musik sampe dan gong.',
        {
          function: 'Pertunjukan kebesaran dan penyambutan tamu adat.',
          meaning: 'Menggambarkan semangat kepahlawanan dan keberanian Dayak Kenyah.',
          facts: ['Tari Kancet Ledo (tari gong) juga terkenal dari suku yang sama.'],
          sources: ['Dinas Pariwisata Kalimantan Timur']
        }),
      ent('pesut-mahakam', 'Pesut Mahakam', 'Alam', 'Fauna', 'kalimantan-timur',
        'Pesut Mahakam (Orcaella brevirostris) adalah lumba-lumba air tawar yang hanya ditemukan di Sungai Mahakam. Populasinya diperkirakan hanya puluhan ekor dan terancam punah, sehingga menjadi fauna identitas Kalimantan Timur.',
        {
          habitat: 'Sungai Mahakam dan danau sekitarnya',
          status: 'Kritis (Critically Endangered) menurut IUCN',
          meaning: 'Maskot dan kebanggaan Kalimantan Timur.',
          facts: ['Terdapat suaka pesut (kawasan konservasi) di Mahakam.', 'Ancaman: polusi, tabrakan kapal, dan berkurangnya habitat.'],
          sources: ['IUCN Red List', 'WWF Indonesia']
        }),
      ent('anggrek-hitam', 'Anggrek Hitam', 'Alam', 'Flora', 'kalimantan-timur',
        'Anggrek hitam (Coelogyne pandurata) adalah anggrek endemik Kalimantan dengan labellum hitam khas dan kelopak hijau. Anggrek ini menjadi flora identitas Kalimantan Timur namun kini langka di alam liar.',
        {
          habitat: 'Hutan dataran rendah Kalimantan Timur dan Kalimantan Barat',
          status: 'Terancam akibat perusakan habitat dan perburuan liar',
          meaning: 'Simbol kekayaan flora Kalimantan; sering ditampilkan dalam acara budaya.',
          facts: ['Menjadi maskot flora Provinsi Kalimantan Timur.'],
          sources: ['Kementerian Lingkungan Hidup dan Kehutanan']
        }),
      ent('kepulauan-derawan', 'Kepulauan Derawan', 'Pariwisata', 'Wisata Bahari', 'kalimantan-timur',
        'Kepulauan Derawan di Kabupaten Berau terdiri atas pulau-pulau seperti Derawan, Maratua, Kakaban, dan Sangalaki. Kawasan ini terkenal dengan penyu hijau, ubur-ubur tanpa sengat di Danau Kakaban, dan terumbu karang kelas dunia.',
        {
          function: 'Destinasi wisata bahari dan kawasan konservasi penyu.',
          facts: ['Danau Kakaban adalah danau ubur-ubur terbesar di dunia.', 'Kawasan ini merupakan Taman Wisata Alam Laut.'],
          sources: ['Kementerian Pariwisata RI', 'Balai Konservasi Sumber Daya Alam Kaltim']
        }),
      ent('amplang', 'Amplang', 'Kuliner', 'Makanan Ringan', 'kalimantan-timur',
        'Amplang adalah kerupuk ikan khas Samarinda yang terbuat dari daging ikan tenggiri, tepung sagu, dan bumbu. Amplang menjadi oleh-oleh khas Kalimantan Timur yang digoreng hingga renyah.',
        {
          ingredients: 'Daging ikan tenggiri, tepung sagu, telur, bumbu.',
          origin: 'Samarinda, Kalimantan Timur',
          function: 'Makanan ringan dan oleh-oleh khas.',
          sources: ['Dinas Pariwisata Kalimantan Timur']
        }),

      /* ============================================================
         ENTITAS — SULAWESI SELATAN
         ============================================================ */
      ent('suku-bugis', 'Suku Bugis', 'Suku & Masyarakat', 'Suku', 'sulawesi-selatan',
        'Suku Bugis adalah kelompok etnis terbesar di Sulawesi Selatan yang dikenal sebagai pelaut dan pedagang ulung. Budaya Bugis diatur oleh nilai "siri" (harga diri) dan "pesse" (solidaritas), serta tradisi bahari kapal pinisi.',
        {
          community: 'Sulawesi Selatan (Bone, Wajo, Soppeng), diaspora di seluruh Nusantara',
          meaning: 'Nilai siri na pesse menjadi pedoman kehidupan sosial.',
          facts: ['Pelaut Bugis menjelajah hingga Australia Utara sejak abad ke-17.', 'Bahasa Bugis memiliki aksara Lontara.'],
          sources: ['Kemendikbud RI', 'Buku "The Bugis" (Christian Pelras)']
        }),
      ent('suku-makassar', 'Suku Makassar', 'Suku & Masyarakat', 'Suku', 'sulawesi-selatan',
        'Suku Makassar mendiami pesisir barat daya Sulawesi Selatan (Gowa, Takalar, Jeneponto) dan menjadi pusat Kerajaan Gowa-Tallo. Mereka dikenal sebagai pelaut, pedagang, dan pejuang yang tangguh.',
        {
          community: 'Pesisir barat daya Sulawesi Selatan',
          meaning: 'Nilai "siri" dan "pacce" mengikat kehidupan sosial.',
          facts: ['Makassar menjadi pelabuhan internasional penting sejak abad ke-16.', 'Bahasa Makassar menggunakan aksara Lontara.'],
          sources: ['Kemendikbud RI']
        }),
      ent('suku-toraja', 'Suku Toraja', 'Suku & Masyarakat', 'Suku', 'sulawesi-selatan',
        'Suku Toraja adalah masyarakat pegunungan di Tana Toraja dan Toraja Utara yang terkenal dengan rumah tongkonan, upacara Rambu Solo, dan tebing kuburan. Budaya Toraja menjadi daya tarik budaya dunia.',
        {
          community: 'Pegunungan Tana Toraja, Sulawesi Selatan',
          meaning: 'Aluk Todolo (kepercayaan leluhur) bercampur dengan Kristen dalam praktik adat.',
          facts: ['Upacara Rambu Solo dapat berlangsung berhari-hari dengan penyembelihan kerbau.', 'Tongkonan menghadap utara sebagai simbol asal-usul.'],
          sources: ['Kemendikbud RI']
        }),
      ent('bahasa-bugis', 'Bahasa Bugis', 'Bahasa', 'Bahasa Daerah', 'sulawesi-selatan',
        'Bahasa Bugis dituturkan oleh ±5 juta penutur di Sulawesi Selatan dan diaspora. Bahasa ini memiliki aksara tradisional Lontara dan tradisi sastra lisan seperti La Galigo, epos terpanjang di dunia.',
        {
          classification: 'Austronesia → Melayik-Polinesia',
          facts: ['Sapaan umum: "Aga kareba?" (apa kabar).', 'Sureq Galigo adalah epos sastra Bugis yang monumental.'],
          sources: ['Ethnologue', 'Balai Bahasa Sulawesi Selatan']
        }),
      ent('pinisi', 'Kapal Pinisi', 'Budaya Fisik', 'Perahu Tradisional', 'sulawesi-selatan',
        'Pinisi adalah kapal layar tradisional Bugis-Makassar yang menjadi simbol kebanggaan bahari Nusantara. Pembuatan dan pelayaran pinisi diakui UNESCO sebagai Warisan Budaya Takbenda Dunia (2017).',
        {
          history: 'Dikembangkan para pelaut Bulukumba (Tanjung Bira) sejak berabad-abad lalu.',
          technique: 'Kayu (jati/ulin), tujuh hingga delapan layar, tanpa cetak biru — berdasarkan tradisi lisan.',
          function: 'Kapal dagang antar-pulau dan simbol identitas maritim.',
          meaning: 'Pelayaran perdana (mappalayar) diiringi ritual adat.',
          facts: ['UNESCO mengakui "Pinisi: seni pembuatan kapal layar Sulawesi Selatan" (2017).', 'Museum Kapal Pinisi berada di Makassar.'],
          sources: ['UNESCO Intangible Heritage', 'Pemerintah Sulawesi Selatan']
        }),
      ent('rumah-tongkonan', 'Rumah Tongkonan', 'Budaya Fisik', 'Rumah Adat', 'sulawesi-selatan',
        'Tongkonan adalah rumah adat Toraja dengan atap melengkung menyerupai perahu. Rumah ini menjadi pusat kehidupan sosial, adat, dan keagamaan keluarga Toraja, sering dihiasi ukiran dan tanduk kerbau.',
        {
          structure: 'Panggung kayu, atap melengkung (menyerupai perahu), ukiran motif geometris.',
          function: 'Tempat tinggal, pusat upacara adat, dan simbol status keluarga.',
          meaning: 'Tongkonan menghadap utara (asal leluhur); ukiran melambangkan kesejahteraan.',
          facts: ['Tongkonan diwariskan secara turun-temurun.', 'Area Tana Toraja menjadi destinasi wisata budaya dunia.'],
          sources: ['Kemendikbud RI']
        }),
      ent('coto-makassar', 'Coto Makassar', 'Kuliner', 'Makanan Berat', 'sulawesi-selatan',
        'Coto Makassar adalah sup daging sapi dengan kuah kental dari kacang tanah dan rempah, disajikan dengan ketupat atau buras. Hidangan ini menjadi ikon kuliner Makassar yang digemari sejak pagi hari.',
        {
          ingredients: 'Daging dan jeroan sapi, kacang tanah, rempah (ketumbar, jintan, lengkuas).',
          origin: 'Makassar, Sulawesi Selatan',
          meaning: 'Kuah kental melambangkan kekayaan rasa kuliner Makassar.',
          function: 'Makanan utama dan kuliner khas Sulawesi Selatan.',
          sources: ['Dinas Pariwisata Sulawesi Selatan']
        }),
      ent('konro', 'Konro', 'Kuliner', 'Makanan Berat', 'sulawesi-selatan',
        'Konro adalah sup iga sapi khas Makassar dengan kuah hitam pekat dari kluwek dan rempah. Hidangan ini biasanya disajikan dengan nasi dan menjadi menu khas warung makan Makassar.',
        {
          ingredients: 'Iga sapi, kluwek, kelapa sangrai, rempah.',
          origin: 'Makassar, Sulawesi Selatan',
          meaning: 'Warna hitam dari kluwek memberikan cita rasa khas yang kuat.',
          function: 'Makanan utama khas Sulawesi Selatan.',
          sources: ['Dinas Pariwisata Sulawesi Selatan']
        }),
      ent('tari-pakarena', 'Tari Pakarena', 'Seni', 'Tari Tradisional', 'sulawesi-selatan',
        'Tari Pakarena adalah tarian tradisional Gowa (Makassar) yang lembut dan anggun, diiringi gendang dan serunai. Tarian ini melambangkan kesopanan dan kelembutan perempuan Makassar.',
        {
          history: 'Berkembang di lingkungan Kerajaan Gowa.',
          function: 'Penyambutan, upacara, dan hiburan.',
          meaning: 'Gerakan melingkar melambangkan keharmonisan hidup; sikap tubuh tegak mencerminkan harga diri (siri).',
          facts: ['Terdapat pakarena 7 suku kata gerakan dasar.', 'Busana adat lengkap dengan perhiasan emas.'],
          sources: ['Dinas Pariwisata Sulawesi Selatan']
        }),
      ent('kerajaan-gowa', 'Kerajaan Gowa-Tallo', 'Sejarah', 'Kerajaan', 'sulawesi-selatan',
        'Kerajaan Gowa-Tallo adalah kerajaan kembar (Kesultanan Makassar) yang mencapai puncak kejayaan pada abad ke-16–17 di bawah Sultan Hasanuddin. Makassar menjadi pusat perdagangan rempah Nusantara timur.',
        {
          history: 'Islam masuk pada awal abad ke-17; kerajaan bersaing dengan VOC dan akhirnya takluk melalui Perjanjian Bongaya (1667).',
          function: 'Pusat perdagangan maritim dan penyebaran Islam di Sulawesi Selatan.',
          facts: ['Benteng Rotterdam dibangun oleh Belanda di jantung Makassar.', 'Sultan Hasanuddin dijuluki "Ayam Jantan dari Timur".'],
          sources: ['Buku "Sejarah Nasional Indonesia"']
        }),
      ent('sultan-hasanuddin', 'Sultan Hasanuddin', 'Tokoh', 'Pahlawan Nasional', 'sulawesi-selatan',
      'Sultan Hasanuddin (1631–1670) adalah raja Gowa-Tallo ke-16 yang memimpin perlawanan terhadap monopoli VOC. Ia dijuluki "Ayam Jantan dari Timur" dan ditetapkan sebagai Pahlawan Nasional (1973).',
        {
          field: 'Perjuangan, pemerintahan', period: '1631–1670',
          facts: ['Memimpin Perang Makassar (1660–1669) melawan VOC.', 'Namanya diabadikan pada bandara dan universitas di Makassar.'],
          sources: ['Kementerian Sosial RI']
        }),
      ent('rambu-solo', 'Upacara Rambu Solo', 'Tradisi', 'Upacara Adat', 'sulawesi-selatan',
        'Rambu Solo adalah upacara pemakaman adat Toraja yang menghormati dan mengantarkan roh orang meninggal menuju alam leluhur. Upacara ini melibatkan penyembelihan kerbau, prosesi adat, dan berlangsung berhari-hari.',
        {
          community: 'Masyarakat Toraja',
          function: 'Ritual penghormatan terakhir dan pengantar roh (menuju puya).',
          meaning: 'Kerbau yang disembelih melambangkan kendaraan roh; skala upacara menunjukkan status sosial.',
          facts: ['Upacara dilakukan sesuai status (dipengaruhi kepercayaan Aluk Todolo dan Kristen).', 'Tau-tau (patung) menggambarkan orang yang wafat.'],
          sources: ['Pemerintah Kabupaten Tana Toraja']
        }),
      ent('pantai-losari', 'Pantai Losari', 'Pariwisata', 'Wisata Bahari', 'sulawesi-selatan',
        'Pantai Losari adalah kawasan tepi laut ikonik di pusat Kota Makassar yang terkenal dengan matahari terbenamnya. Sepanjang pantai terdapat promenade, kuliner, dan pusat kegiatan warga.',
        {
          function: 'Ruang publik, wisata kota, dan pusat kuliner Makassar.',
          meaning: 'Menjadi simbol wajah Kota Makassar.',
          facts: ['Lokasi Anjungan Pantai Losari menjadi destinasi utama.', 'Terkenal dengan pemandangan sunset dan jajanan pisang epe.'],
          coordinates: '5.1455° S, 119.4100° E',
          sources: ['Pemerintah Kota Makassar']
        })
    );


    /* ============================================================
       ENTITAS — MALUKU
       ============================================================ */
    items.push(
      ent('jalur-rempah', 'Jalur Rempah Maluku', 'Sejarah', 'Jalur Rempah', 'maluku',
        'Jalur Rempah adalah jaringan perdagangan cengkih, pala, dan lada yang menghubungkan Maluku dengan Asia, Timur Tengah, hingga Eropa. Rempah Maluku menjadi komoditas paling bernilai di dunia dan memicu era kolonialisme.',
        {
          history: 'Pedagang Arab, India, dan Tiongkok telah datang sejak awal Masehi; bangsa Eropa (Portugis 1512, Spanyol, kemudian VOC) memperebutkan monopoli.',
          function: 'Jalur perdagangan, pertukaran budaya, dan penyebaran agama.',
          meaning: 'Maluku disebut "Kepulauan Rempah" (Spice Islands) oleh bangsa Eropa.',
          facts: ['Banda menjadi pusat pala dunia; Ternate dan Tidore pusat cengkih.', 'Kementerian Pendidikan RI menetapkan Jalur Rempah sebagai bagian dari sejarah maritim nasional.'],
          sources: ['Buku "Nusantara: Sejarah Indonesia" (Bernard Vlekke)', 'Kemendikbud RI']
        }),
      ent('cengkih', 'Cengkih', 'Alam', 'Flora', 'maluku',
        'Cengkih (Syzygium aromaticum) adalah rempah asli Kepulauan Maluku yang berupa kuncup bunga kering. Sejak zaman kuno, cengkih menjadi komoditas termahal dunia dan inti dari Jalur Rempah.',
        {
          habitat: 'Maluku Utara (Ternate, Tidore) dan Maluku',
          function: 'Bumbu masak, bahan obat tradisional, dan rokok kretek.',
          meaning: 'Simbol kekayaan alam Nusantara yang mengubah peta dunia.',
          facts: ['Pohon cengkih tertua di dunia konon berada di Ternate.', 'Cengkih menjadi salah satu pemicu kedatangan bangsa Eropa ke Nusantara.'],
          sources: ['Kementerian Pertanian RI']
        }),
      ent('pala', 'Pala', 'Alam', 'Flora', 'maluku',
        'Pala (Myristica fragrans) adalah rempah asli Kepulauan Banda yang menghasilkan biji dan fuli (bunga pala). Pala dan cengkih menjadi alasan utama VOC membangun monopoli perdagangan di Maluku.',
        {
          habitat: 'Kepulauan Banda, Maluku',
          function: 'Bumbu, minyak atsiri, dan obat tradisional.',
          meaning: 'Banda disebut "Kepulauan Pala"; sejarahnya erat dengan kolonialisme dan perlawanan.',
          facts: ['Pala diekspor ke Eropa sejak abad ke-16.', 'Kebun pala Banda menjadi warisan sejarah rempah dunia.'],
          sources: ['Kementerian Pertanian RI']
        }),
      ent('tari-cakalele', 'Tari Cakalele', 'Seni', 'Tari Tradisional', 'maluku',
        'Cakalele adalah tarian perang tradisional Maluku yang dibawakan penari pria dengan parang (pedang) dan salawaku (perisai). Tarian ini melambangkan keberanian dan kejantanan masyarakat Maluku.',
        {
          function: 'Penyambutan tamu, upacara adat, dan ekspresi kepahlawanan.',
          meaning: 'Gerakan tegas melambangkan semangat juang; dahulu dipakai untuk mengobarkan semangat perang.',
          facts: ['Diiringi musik tifa dan gong.', 'Terdapat pula cakalele perempuan yang lebih lembut.'],
          sources: ['Dinas Pariwisata Maluku']
        }),
      ent('papeda', 'Papeda', 'Kuliner', 'Makanan Berat', 'maluku',
        'Papeda adalah bubur sagu khas Maluku dan Papua yang dimakan bersama ikan kuah kuning serta sayur. Papeda menjadi makanan pokok masyarakat Maluku dan simbol kebersamaan.',
        {
          ingredients: 'Tepung sagu, ikan (cakalang/kuah kuning), sayur ganemo.',
          meaning: 'Proses mengaduk papeda melambangkan kebersamaan dan kesabaran.',
          function: 'Makanan pokok dan hidangan adat.',
          facts: ['Papeda juga menjadi makanan pokok masyarakat Papua.', 'Cara makan: dipulung dengan sumpit (gata-gata).'],
          sources: ['Dinas Pariwisata Maluku']
        }),
      ent('masjid-wapauwe', 'Masjid Tua Wapauwe', 'Tempat Ibadah', 'Masjid Bersejarah', 'maluku',
        'Masjid Tua Wapauwe di Kaitetu, Maluku Tengah, adalah masjid tertua di Maluku yang dibangun pada 1414 M. Masjid ini menjadi bukti awal masuknya Islam di Nusantara timur.',
        {
          history: 'Berdiri pada 1414 M di era Kesultanan Islam Maluku; bangunan kayu asli masih dipertahankan.',
          architecture: 'Konstruksi kayu tanpa paku, atap rumbia, dengan mimbar ukiran.',
          function: 'Tempat ibadah dan situs sejarah Islam Maluku.',
          facts: ['Salinan Al-Qur\'an tua tersimpan di masjid ini.', 'Masjid tetap digunakan hingga kini.'],
          sources: ['Kementerian Agama RI', 'Pemerintah Provinsi Maluku']
        }),
      ent('benteng-victoria', 'Benteng Victoria (Amsterdam)', 'Situs Sejarah', 'Benteng', 'maluku',
        'Benteng Victoria di pusat Kota Ambon adalah benteng peninggalan kolonial yang dibangun Portugis pada 1576 dan direbut Belanda (menjadi Benteng Amsterdam). Benteng ini menjadi saksi sejarah kolonialisme di Maluku.',
        {
          history: 'Dibangun Portugis 1576; VOC mengambil alih 1605; kini berfungsi sebagai kantor dan museum.',
          function: 'Pertahanan militer kolonial; kini situs cagar budaya.',
          meaning: 'Simbol sejarah panjang pertarungan bangsa Eropa atas rempah Maluku.',
          facts: ['Kapitan Pattimura dihukum gantung di benteng ini pada 1817.', 'Lokasi: pusat Kota Ambon.'],
          coordinates: '3.6886° S, 128.1745° E',
          sources: ['Balai Pelestarian Cagar Budaya Maluku']
        }),
      ent('pattimura', 'Kapitan Pattimura', 'Tokoh', 'Pahlawan Nasional', 'maluku',
        'Kapitan Pattimura (Thomas Matulessy, 1783–1817) adalah pahlawan nasional asal Saparua, Maluku, yang memimpin perlawanan rakyat Maluku terhadap Belanda pada 1817. Ia gugur di tiang gantungan Benteng Victoria.',
        {
          field: 'Perjuangan kemerdekaan', period: '1783–1817',
          facts: ['Perlawanan melawan monopoli dan kerja paksa Belanda.', 'Ditetapkan sebagai Pahlawan Nasional (1973).', 'Namanya diabadikan pada bandara Ambon dan uang Rp1.000 emisi lama.'],
          sources: ['Kementerian Sosial RI']
        }),
      ent('kepulauan-banda', 'Kepulauan Banda', 'Pariwisata', 'Wisata Sejarah & Bahari', 'maluku',
        'Kepulauan Banda adalah kelompok pulau vulkanik di Maluku Tengah yang menjadi pusat pala dunia. Kini Banda menjadi destinasi wisata sejarah, bahari, dan budaya dengan benteng kolonial serta kebun pala tua.',
        {
          history: 'Pusat monopoli pala VOC pada abad ke-17; saksi Perang Banda (perlawanan rakyat Banda 1621).',
          function: 'Destinasi wisata dan kawasan sejarah rempah.',
          facts: ['Gunung Banda Api (±640 m) masih aktif.', 'Benteng Belgica dan Nassau menjadi peninggalan VOC.'],
          sources: ['Kementerian Pariwisata RI']
        }),
      ent('rasa-sayange', 'Lagu "Rasa Sayange"', 'Seni', 'Lagu Daerah', 'maluku',
        '"Rasa Sayange" adalah lagu daerah dari Maluku yang dikenal luas sebagai lagu hiburan dan kebersamaan. Lagu ini berstatus lagu tradisional/folklor Nusantara (publik domain secara tradisional), sehingga metadata dan konteksnya dapat disajikan tanpa melanggar hak cipta.',
        {
          origin: 'Maluku (kawasan Ambon dan sekitarnya)',
          meaning: 'Liriknya mengungkapkan rasa sayang dan kerinduan dalam suasana santai.',
          facts: ['Sering dinyanyikan sebagai lagu penyambutan dan perkenalan budaya Indonesia.', 'Kontroversi klaim kepemilikan pernah muncul dari Malaysia (2007); Pemerintah Indonesia menegaskan statusnya sebagai lagu tradisional Indonesia.'],
          sources: ['Kemendikbud RI (Direktorat Jenderal Kebudayaan)']
        }),

      /* ============================================================
         ENTITAS — PAPUA
         ============================================================ */
      ent('suku-asmat', 'Suku Asmat', 'Suku & Masyarakat', 'Suku', 'papua',
        'Suku Asmat adalah masyarakat adat pesisir selatan Papua (Kabupaten Asmat) yang dikenal melalui seni ukir kayu kelas dunia. Kehidupan mereka lekat dengan hutan, sungai, dan tradisi leluhur.',
        {
          community: 'Pesisir selatan Papua (Agats, Asmat)',
          meaning: 'Ukiran dan patung (bisj) memiliki makna spiritual dan genealogis.',
          facts: ['Seni ukir Asmat diakui dunia; Museum Asmat di Agats menyimpan koleksi ukiran.', 'Festival Asmat digelar setiap tahun untuk melestarikan budaya.'],
          sources: ['Pemerintah Kabupaten Asmat', 'Kemendikbud RI']
        }),
      ent('suku-dani', 'Suku Dani', 'Suku & Masyarakat', 'Suku', 'papua',
        'Suku Dani adalah masyarakat adat Lembah Baliem, Jayawijaya, yang dikenal melalui tradisi perang-perangan adat, pesta babi, dan Honai (rumah bulat). Festival Lembah Baliem menampilkan budaya Dani secara terbuka.',
        {
          community: 'Lembah Baliem, Kabupaten Jayawijaya',
          meaning: 'Tradisi membakar mumi (pengawetan leluhur) dan upacara perang adat menjadi identitas.',
          facts: ['Pesta babi (pesta penutup duka) menjadi ritual penting.', 'Festival Lembah Baliem diadakan setiap Agustus.'],
          sources: ['Pemerintah Kabupaten Jayawijaya']
        }),
      ent('honai', 'Honai', 'Budaya Fisik', 'Rumah Adat', 'papua',
        'Honai adalah rumah adat suku Dani berbentuk bulat beratap jerami dengan dinding kayu, tanpa jendela. Honai berfungsi sebagai tempat tinggal sekaligus ruang musyawarah adat, melindungi penghuni dari dinginnya pegunungan.',
        {
          structure: 'Bentuk kubah, kayu + jerami, pintu rendah; honai pria dan wanita terpisah.',
          function: 'Tempat tinggal, musyawarah adat, dan perlindungan dari suhu dingin.',
          meaning: 'Melambangkan kesederhanaan dan keselarasan hidup dengan alam.',
          facts: ['Honai menjadi ikon budaya Papua pegunungan.', 'Api di tengah honai dijaga untuk kehangatan dan memasak.'],
          sources: ['Kemendikbud RI']
        }),
      ent('ukiran-asmat', 'Ukiran Asmat', 'Seni', 'Seni Rupa', 'papua',
        'Ukiran Asmat adalah seni pahat kayu masyarakat Asmat yang menghasilkan patung bisj (patung leluhur), perisai, dan tiang ukir. Ukiran ini menjadi salah satu seni primitif paling dihargai di dunia.',
        {
          technique: 'Pahatan kayu merbau/gaharu dengan motif spiral dan figur manusia.',
          function: 'Ritual adat, penghormatan leluhur, dan kini komoditas seni.',
          meaning: 'Figur melambangkan leluhur dan siklus kehidupan.',
          facts: ['Koleksi ukiran Asmat tersimpan di museum dunia (mis. Museum Tropen Amsterdam).', 'Diukir dengan kapak batu dan pisau pada masa lalu.'],
          sources: ['Pemerintah Kabupaten Asmat']
        }),
      ent('tifa', 'Tifa', 'Seni', 'Alat Musik', 'papua',
        'Tifa adalah alat musik pukul berbentuk tabung dari kayu dengan selaput kulit, khas Papua dan Maluku. Tifa mengiringi tarian perang, upacara adat, dan lagu daerah Papua.',
        {
          material: 'Kayu (tunggul pohon) + kulit rusa/kadal sebagai membran.',
          function: 'Pengiring tari dan upacara; alat komunikasi tradisional.',
          meaning: 'Bunyi tifa melambangkan denyut kehidupan masyarakat Papua.',
          facts: ['Tifa memiliki ukiran khas sesuai daerah asal.', 'Dimainkan bersama dengan tifa lain dalam ansambel.'],
          sources: ['Kemendikbud RI']
        }),
      ent('noken', 'Noken', 'Budaya Fisik', 'Kerajinan', 'papua',
        'Noken adalah tas anyaman rajut khas Papua yang dibuat dari serat kulit kayu atau daun. Noken diakui UNESCO sebagai Warisan Budaya Takbenda Dunia (2012) dan menjadi simbol identitas serta alat kehidupan sehari-hari.',
        {
          technique: 'Rajut/anyam serat (kulit kayu, anggrek hutan, daun) — tanpa jarum pada metode tradisional.',
          function: 'Tas belanja, wadah hasil bumi, dan kelengkapan upacara.',
          meaning: 'Melambangkan kehidupan dan keterampilan perempuan Papua.',
          facts: ['UNESCO menetapkan "Noken: tas anyam rajut masyarakat Papua" (2012).', 'Noken digunakan sebagai media pengganti tas belanja dan alat bantu menggendong.'],
          sources: ['UNESCO Intangible Heritage', 'Pemerintah Provinsi Papua']
        }),
      ent('danau-sentani', 'Danau Sentani', 'Alam', 'Danau', 'papua',
        'Danau Sentani adalah danau terbesar di Papua yang terletak di kaki Pegunungan Cycloop, dekat Jayapura. Danau ini menjadi pusat kehidupan masyarakat Sentani yang terkenal dengan keramik gerabah kuno dan lukisan kulit kayu.',
        {
          coordinates: '2.6126° S, 140.5540° E',
          function: 'Sumber air, perikanan, dan wisata alam-budaya.',
          meaning: 'Legenda masyarakat Sentani mengaitkan danau dengan asal-usul kehidupan.',
          facts: ['Festival Danau Sentani digelar setiap tahun.', 'Kawasan ini berada di dekat Cagar Alam Pegunungan Cycloop.'],
          sources: ['Pemerintah Kabupaten Jayapura']
        }),
      ent('puncak-jaya', 'Puncak Jaya', 'Alam', 'Gunung', 'papua',
        'Puncak Jaya (±4.884 mdpl) di Pegunungan Sudirman, Papua, adalah titik tertinggi di Indonesia dan bagian dari rangkaian pegunungan yang masih memiliki salju abadi di khatulistiwa. Kawasan ini berada di Taman Nasional Lorentz.',
        {
          height: '±4.884 mdpl', type: 'Puncak pegunungan (Cartenz Pyramid)',
          function: 'Kawasan lindung, penelitian glasial, dan tujuan pendakian kelas dunia (terbatas).',
          meaning: 'Simbol kebanggaan geografis Indonesia; es di puncaknya mencair akibat perubahan iklim.',
          facts: ['Bagian dari Taman Nasional Lorentz — Warisan Dunia UNESCO (1999).', 'Salju abadi Puncak Jaya diperkirakan akan hilang dalam beberapa dekade.'],
          coordinates: '4.0839° S, 137.1846° E',
          sources: ['UNESCO World Heritage Centre', 'BMKG/BMG']
        }),
      ent('cenderawasih', 'Burung Cenderawasih', 'Alam', 'Fauna', 'papua',
        'Cenderawasih adalah keluarga burung (Paradisaeidae) endemik Papua yang terkenal karena bulunya yang indah. Burung ini menjadi simbol keindahan alam Indonesia dan dilindungi undang-undang.',
        {
          habitat: 'Hutan hujan dataran rendah dan pegunungan Papua',
          status: 'Dilindungi; beberapa spesies terancam',
          meaning: 'Dijuluki "Burung Surga" (bird of paradise); menjadi maskot dan simbol Papua.',
          facts: ['Cenderawasih terdapat pada lambang negara bagian Papua.', 'Bulu cenderawasih pernah menjadi komoditas perdagangan dunia.'],
          sources: ['Kementerian Lingkungan Hidup dan Kehutanan']
        }),
      ent('frans-kaisiepo', 'Frans Kaisiepo', 'Tokoh', 'Pahlawan Nasional', 'papua',
        'Frans Kaisiepo (1921–1979) adalah tokoh perjuangan asal Biak, Papua, yang memperjuangkan persatuan Papua dalam Negara Kesatuan Republik Indonesia. Ia ditetapkan sebagai Pahlawan Nasional (1993).',
        {
          field: 'Perjuangan, pemerintahan', period: '1921–1979',
          facts: ['Mengusulkan nama "Irian" pada Kongres Indonesia Raya (1946).', 'Menjadi Gubernur Papua (1964–1973).', 'Namanya diabadikan pada bandara Biak.'],
          sources: ['Kementerian Sosial RI']
        })
    );

    /* ============================================================
       ENTITAS — NASIONAL (Kewarganegaraan, Pramuka, Numismatik,
       Simbol Negara, Sejarah Kebangsaan, Data Praktis)
       ============================================================ */
    items.push(
      ent('pancasila', 'Pancasila', 'Kewarganegaraan', 'Pancasila', null,
        'Pancasila adalah dasar negara dan pandangan hidup bangsa Indonesia yang terdiri atas lima sila. Pancasila dirumuskan dalam sidang BPUPKI (1945) dan disahkan pada 18 Agustus 1945 sebagai bagian dari Pembukaan UUD 1945.',
        {
          history: 'Soekarno menyampaikan gagasan lima dasar (Pancasila) pada 1 Juni 1945; disempurnakan Panitia Sembilan dalam Piagam Jakarta, lalu disahkan 18 Agustus 1945.',
          meaning: 'Lima sila: (1) Ketuhanan Yang Maha Esa, (2) Kemanusiaan yang Adil dan Beradab, (3) Persatuan Indonesia, (4) Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan, (5) Keadilan Sosial bagi Seluruh Rakyat Indonesia.',
          function: 'Dasar negara, ideologi, dan sumber dari segala sumber hukum.',
          facts: ['1 Juni diperingati sebagai Hari Lahir Pancasila.', 'Lambang Pancasila: Garuda Pancasila dengan perisai lima sila.'],
          sources: ['UUD 1945', 'Badan Pembinaan Ideologi Pancasila (BPIP)']
        }),
      ent('uud-1945', 'UUD 1945', 'Kewarganegaraan', 'Konstitusi', null,
        'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 adalah konstitusi tertulis Indonesia. UUD 1945 telah diamandemen empat kali (1999–2002) dan menjadi hukum tertinggi dalam tatanan hukum nasional.',
        {
          history: 'Disahkan 18 Agustus 1945; berlaku (dengan penyimpangan pada masa tertentu) hingga era Reformasi; amandemen 1999–2002 memperkuat checks and balances.',
          structure: 'Pembukaan (4 alinea), Batang Tubuh, dan Penjelasan (kini digantikan Naskah Akademik).',
          meaning: 'Pembukaan memuat tujuan negara dan dasar negara Pancasila.',
          facts: ['Lembaga negara: MPR, DPR, DPD, Presiden, BPK, MA, MK, KY.', 'Amandemen ke-4 (2002) mengatur pemilihan presiden langsung.'],
          sources: ['Setjen MPR RI']
        }),
      ent('sumpah-pemuda', 'Sumpah Pemuda', 'Sejarah', 'Pergerakan Nasional', null,
        'Sumpah Pemuda adalah ikrar pemuda Indonesia pada Kongres Pemuda II, 28 Oktober 1928, yang menegaskan satu tanah air, satu bangsa, dan satu bahasa: Indonesia. Peristiwa ini menjadi tonggak persatuan nasional.',
        {
          history: 'Kongres Pemuda II di Jakarta (27–28 Oktober 1928) dihadiri organisasi pemuda dari berbagai daerah.',
          meaning: 'Tiga ikrar: bertumpah darah satu (tanah air Indonesia), berbangsa satu (bangsa Indonesia), berbahasa satu (bahasa Indonesia).',
          facts: ['28 Oktober diperingati sebagai Hari Sumpah Pemuda.', 'Lagu "Indonesia Raya" pertama kali diperdengarkan pada kongres ini (versi instrumental).'],
          sources: ['Kemendikbud RI', 'Museum Sumpah Pemuda']
        }),
      ent('proklamasi', 'Proklamasi Kemerdekaan Indonesia', 'Sejarah', 'Kemerdekaan', null,
        'Proklamasi Kemerdekaan Indonesia dibacakan Soekarno pada 17 Agustus 1945 pukul 10.00 WIB di Jalan Pegangsaan Timur 56, Jakarta. Peristiwa ini menandai lahirnya negara Republik Indonesia.',
        {
          history: 'Penyusunan teks oleh Soekarno, Hatta, dan Ahmad Soebardjo di rumah Laksamana Maeda; dikumandangkan setelah perdebatan golongan muda-golongan tua (peristiwa Rengasdengklok).',
          meaning: 'Puncak perjuangan bangsa dan awal berdirinya NKRI.',
          facts: ['Teks ditandatangani Soekarno dan Hatta atas nama bangsa Indonesia.', 'Bendera Merah Putih dijahit oleh Fatmawati dikibarkan pertama kali.', '17 Agustus ditetapkan sebagai Hari Kemerdekaan.'],
          sources: ['Arsip Nasional RI']
        }),
      ent('garuda-pancasila', 'Garuda Pancasila', 'Kewarganegaraan', 'Simbol Negara', null,
        'Garuda Pancasila adalah lambang negara Indonesia: burung Garuda dengan perisai berlambang lima sila dan pita bertuliskan "Bhinneka Tunggal Ika". Lambang ini ditetapkan pada 1950.',
        {
          history: 'Dirancang oleh Sultan Hamid II; diresmikan 11 Februari 1950.',
          meaning: 'Garuda melambangkan kekuatan; bulu (17 helai sayap, 8 ekor, 19 pangkal ekor, 45 leher) merepresentasikan tanggal proklamasi; "Bhinneka Tunggal Ika" berarti berbeda-beda tetapi tetap satu.',
          facts: ['Jumlah bulu Garuda mencerminkan 17-8-1945.', 'Perisai memuat simbol kelima sila Pancasila.'],
          sources: ['UU 24/2009 tentang Bendera, Bahasa, dan Lambang Negara']
        }),
      ent('bendera-merah-putih', 'Bendera Merah Putih', 'Kewarganegaraan', 'Simbol Negara', null,
        'Bendera Negara Kesatuan Republik Indonesia adalah Sang Merah Putih: merah di atas, putih di bawah, dengan rasio 2:3. Merah melambangkan keberanian, putih melambangkan kesucian.',
        {
          history: 'Bendera pertama dijahit Fatmawati dan dikibarkan saat Proklamasi 1945; bendera pusaka kini disimpan di Istana Merdeka.',
          meaning: 'Merah = keberanian; putih = kesucian.',
          facts: ['Diatur dalam UU 24/2009.', 'Pengibaran dilakukan dalam upacara kenegaraan.'],
          sources: ['UU 24/2009']
        }),
      ent('indonesia-raya', 'Lagu "Indonesia Raya"', 'Kewarganegaraan', 'Simbol Negara', null,
        '"Indonesia Raya" adalah lagu kebangsaan Indonesia yang diciptakan Wage Rudolf Soepratman pada 1924 dan pertama kali diperdengarkan pada Kongres Pemuda II (1928).',
        {
          history: 'Diciptakan W.R. Soepratman; dijadikan lagu kebangsaan secara resmi melalui PP 44/1958.',
          meaning: 'Menggambarkan semangat persatuan dan kebangsaan Indonesia.',
          facts: ['Saat ini lagu tersebut dalam domain publik (hak cipta W.R. Soepratman telah berakhir).', 'Diperdengarkan dalam upacara resmi.'],
          sources: ['Kemendikbud RI']
        }),
      ent('pramuka', 'Gerakan Pramuka Indonesia', 'Pramuka', 'Organisasi', null,
        'Gerakan Pramuka (Praja Muda Karana) adalah organisasi pendidikan kepanduan nasional yang didirikan pada 14 Agustus 1961. Pramuka mendidik karakter, kemandirian, dan kecakapan hidup melalui kegiatan kepanduan.',
        {
          history: 'Berakar dari kepanduan Hindia Belanda (Nederlandsche Padvinders Organisatie, 1912); Indonesia menjadi anggota World Organization of the Scout Movement (WOSM).',
          function: 'Pendidikan nonformal pembentukan karakter generasi muda.',
          facts: ['14 Agustus diperingati sebagai Hari Pramuka.', 'Motto: "Satyaku Kudarmakan, Darmaku Kubaktikan".'],
          sources: ['Kwartir Nasional Gerakan Pramuka']
        }),
      ent('tri-satya', 'Tri Satya', 'Pramuka', 'Janji Pramuka', null,
        'Tri Satya adalah janji anggota Pramuka yang diucapkan pada saat pelantikan dan kenaikan tingkat. Tri Satya berisi kewajiban terhadap Tuhan, negara, dan sesama.',
        {
          function: 'Janji dan komitmen moral anggota Pramuka.',
          meaning: 'Tiga janji: (1) menjalankan kewajiban terhadap Tuhan, negara, dan Pancasila; (2) menolong sesama dan mempersiapkan diri membangun masyarakat; (3) menepati Dasa Darma.',
          facts: ['Diucapkan dengan sikap hormat oleh anggota yang dilantik.'],
          sources: ['Kwartir Nasional Gerakan Pramuka']
        }),
      ent('dasa-darma', 'Dasa Darma Pramuka', 'Pramuka', 'Kode Kehormatan', null,
        'Dasa Darma adalah sepuluh kebajikan yang menjadi kode etik anggota Pramuka. Nilai-nilainya menjadi pedoman perilaku sehari-hari.',
        {
          meaning: 'Sepuluh darma: takwa, cinta alam, patriot, patuh, rela menolong, rajin, hemat, disiplin, bertanggung jawab, dan suci dalam pikiran/perkataan/perbuatan.',
          function: 'Kode etik dan pedoman moral anggota Pramuka.',
          sources: ['Kwartir Nasional Gerakan Pramuka']
        }),
      ent('sandi-morse', 'Sandi Morse', 'Pramuka', 'Sandi', null,
        'Sandi Morse adalah sistem pengkodean huruf dan angka dengan titik (.) dan garis (–), ditemukan oleh Samuel Morse. Dalam Pramuka, Morse dipelajari untuk komunikasi jarak jauh dan ujian kecakapan.',
        {
          function: 'Komunikasi jarak jauh (radio, lampu, peluit).',
          meaning: 'Huruf A = .–, B = –..., C = –.–.; nomor 1 = .----, dst.',
          facts: ['Diperkenalkan dalam kegiatan kepramukaan sebagai keterampilan dasar.', 'Dapat dikirim dengan peluit, lampu, atau kode ketukan.'],
          sources: ['Kwartir Nasional Gerakan Pramuka']
        }),
      ent('semaphore', 'Semaphore', 'Pramuka', 'Sandi', null,
        'Semaphore adalah sistem komunikasi menggunakan dua bendera yang diposisikan membentuk sudut tertentu untuk mewakili huruf dan angka. Semaphore menjadi materi kecakapan Pramuka.',
        {
          function: 'Komunikasi visual jarak menengah.',
          meaning: 'Setiap posisi tangan membentuk sudut tertentu yang mewakili abjad.',
          facts: ['Bendera semaphore berukuran 45×45 cm.', 'Dapat menyampaikan pesan tanpa suara.'],
          sources: ['Kwartir Nasional Gerakan Pramuka']
        }),
      ent('ori', 'Oeang Republik Indonesia (ORI)', 'Numismatik', 'Sejarah Uang', null,
        'Oeang Republik Indonesia (ORI) adalah mata uang pertama Republik Indonesia yang diterbitkan pada 30 Oktober 1946 untuk menggantikan uang Jepang dan Hindia Belanda. Penerbitan ORI menjadi simbol kedaulatan ekonomi.',
        {
          history: 'Diterbitkan berdasarkan UU 17/1946; peredaran pertama 30 Oktober 1946.',
          function: 'Alat pembayaran sah pertama RI.',
          facts: ['Terdapat seri ORI I, II, dan seterusnya; dicetak di Percetakan Republik Indonesia.', 'Tanggal 30 Oktober diperingati sebagai Hari Oeang.'],
          sources: ['Bank Indonesia', 'Museum Bank Indonesia']
        }),
      ent('rupiah', 'Rupiah', 'Numismatik', 'Mata Uang', null,
        'Rupiah adalah mata uang resmi Republik Indonesia (ISO 4217: IDR). Bank Indonesia menerbitkan uang kertas dan logam dengan pecahan, desain, serta tokoh pahlawan nasional sebagai gambar utama.',
        {
          history: 'Rupiah menggantikan ORI pada 1950; mengalami berbagai seri (SRG, seri 1968, 1975, 1992, 1998, 2004, 2016, 2020, 2022).',
          function: 'Alat tukar dan satuan hitung resmi.',
          facts: ['Pecahan uang kertas saat ini: Rp1.000–Rp100.000.', 'Desain uang TE 2022 menampilkan pahlawan nasional dan kekayaan budaya Indonesia.', 'Rp100.000 (Soekarno–Hatta), Rp50.000 (I Gusti Ngurah Rai), Rp20.000 (Ki Hajar Dewantara), Rp10.000 (Frans Kaisiepo), dst.'],
          sources: ['Bank Indonesia']
        }),
      ent('kode-pos', 'Kode Pos Indonesia', 'Data Praktis', 'Kode Wilayah', null,
        'Kode pos Indonesia terdiri atas lima digit yang dikelompokkan per wilayah: dua digit pertama menunjukkan provinsi/wilayah, digit ketiga kabupaten/kota, dua digit terakhir kecamatan dan kelurahan.',
        {
          function: 'Mempercepat penyortiran pengiriman surat dan paket.',
          meaning: 'Digit 1–2: kode wilayah/provinsi; digit 3: kabupaten/kota; digit 4: kecamatan; digit 5: desa/kelurahan.',
          facts: ['Contoh: 10110 (Jakarta Pusat), 50131 (Semarang), 65119 (Malang).', 'Dikelola Pos Indonesia dan dapat dicek daring.'],
          sources: ['Pos Indonesia']
        }),
      ent('zona-waktu', 'Zona Waktu Indonesia', 'Data Praktis', 'Waktu', null,
        'Indonesia terbagi atas tiga zona waktu: WIB (UTC+7), WITA (UTC+8), dan WIT (UTC+9), sesuai Keputusan Presiden 41/1987.',
        {
          meaning: 'WIB: Sumatra, Jawa, Kalimantan Barat/Tengah; WITA: Kalimantan Timur/Selatan/Utara, Bali, Nusa Tenggara, Sulawesi; WIT: Maluku dan Papua.',
          function: 'Penyeragaman waktu administrasi dan aktivitas harian.',
          facts: ['WIB = UTC+7, WITA = UTC+8, WIT = UTC+9.', 'Tidak menerapkan daylight saving.'],
          sources: ['BIG (Badan Informasi Geospasial)']
        }),
      ent('bhinneka-tunggal-ika', 'Bhinneka Tunggal Ika', 'Kewarganegaraan', 'Sejarah Kebangsaan', null,
        'Bhinneka Tunggal Ika ("Berbeda-beda tetapi tetap satu") adalah semboyan negara Indonesia yang berasal dari Kakawin Sutasoma karya Mpu Tantular pada abad ke-14. Semboyan ini menjadi perekat keberagaman bangsa.',
        {
          meaning: 'Keberagaman suku, agama, bahasa, dan budaya tetap dalam satu kesatuan bangsa.',
          history: 'Kutipan dari Kakawin Sutasoma (Kerajaan Majapahit); ditetapkan sebagai semboyan negara dalam UUD 1945.',
          facts: ['Tertulis pada pita yang dicengkeram Garuda Pancasila.', 'Mencerminkan semangat toleransi Nusantara.'],
          sources: ['UUD 1945', 'Museum Nasional']
        }),
      ent('kerajaan-majapahit', 'Kerajaan Majapahit', 'Sejarah', 'Kerajaan', null,
        'Majapahit adalah kerajaan Hindu-Buddha terbesar di Nusantara yang berpusat di Jawa Timur (1293–±1527 M). Di bawah Hayam Wuruk dan Gajah Mada, Majapahit mempersatukan sebagian besar Nusantara.',
        {
          history: 'Didirikan Raden Wijaya (1293); puncak kejayaan pada Hayam Wuruk (1350–1389) dengan Sumpah Palapa Gajah Mada.',
          function: 'Pusat politik, ekonomi, dan budaya Nusantara.',
          facts: ['Kitab Negarakertagama (Mpu Prapanca) menggambarkan wilayah Majapahit.', 'Runtuh akibat perang saudara dan munculnya kerajaan Islam pesisir.'],
          sources: ['Buku "Sejarah Nasional Indonesia"', 'Kakawin Negarakertagama']
        }),
      ent('kerajaan-sriwijaya', 'Kerajaan Sriwijaya', 'Sejarah', 'Kerajaan', null,
        'Sriwijaya adalah kemaharajaan maritim Buddha terbesar di Asia Tenggara yang berpusat di Palembang (abad ke-7 hingga ke-13 M). Sriwijaya menguasai Selat Malaka dan menjadi pusat pembelajaran agama Buddha.',
        {
          history: 'Dikenal melalui Prasasti Kedukan Bukit (683 M); mencapai puncak pada abad ke-8–10 M.',
          function: 'Kekuatan maritim penguasa jalur perdagangan Asia.',
          facts: ['I Tsing (pendeta Tiongkok) mencatat kunjungannya ke Sriwijaya (671 M).', 'Runtuh akibat serangan Cola (1025) dan melemahnya perdagangan.'],
          sources: ['Buku "Sejarah Nasional Indonesia"']
        })
    );


    /* ============================================================
       ENTITAS — TRADISI, PERMAINAN, SASTRA (pelengkap kategori)
       ============================================================ */
    items.push(
      ent('gotong-royong', 'Gotong Royong', 'Tradisi', 'Tradisi Sosial', null,
        'Gotong royong adalah tradisi kerja sama sukarela antarwarga untuk kepentingan bersama, seperti membangun rumah, panen, atau kerja bakti. Tradisi ini menjadi salah satu nilai dasar kehidupan bermasyarakat Indonesia dan tercermin dalam sila keempat dan kelima Pancasila.',
        {
          meaning: 'Melambangkan kebersamaan, solidaritas, dan kesetaraan.',
          function: 'Menyelesaikan pekerjaan bersama secara sukarela tanpa pamrih.',
          facts: ['Gotong royong diangkat Bung Karno sebagai salah satu pilar "Trisakti" pemikiran bangsa.', 'Konsep ini dikenal dengan nama berbeda di tiap daerah (gugur gunung di Sunda, sambatan di Jawa, mapalus di Minahasa).'],
          sources: ['Kemendikbud RI']
        }),
      ent('mudik', 'Mudik', 'Tradisi', 'Tradisi Sosial', null,
        'Mudik adalah tradisi pulang ke kampung halaman menjelang hari raya (terutama Idulfitri dan Natal/Tahun Baru). Mudik menjadi fenomena sosial tahunan terbesar di Indonesia yang memperkuat ikatan keluarga dan kampung halaman.',
        {
          meaning: 'Pulang ke "asal usul" untuk bersilaturahmi dengan keluarga.',
          function: 'Memperkuat hubungan sosial dan identitas daerah asal.',
          facts: ['Puncak arus mudik dapat melibatkan puluhan juta pemudik.', 'Kementerian Perhubungan menyediakan program mudik gratis setiap tahun.'],
          sources: ['Kementerian Perhubungan RI']
        }),
      ent('kejawen', 'Kejawen', 'Tradisi', 'Kepercayaan Lokal', 'jawa-tengah',
        'Kejawen adalah sistem kepercayaan dan praktik spiritual masyarakat Jawa yang memadukan unsur animisme, Hindu-Buddha, dan Islam. Praktiknya meliputi slametan, meditasi, dan penghormatan terhadap alam serta leluhur.',
        {
          meaning: 'Mencari keseimbangan hidup (memayu hayuning bawana) antara manusia, alam, dan Tuhan.',
          function: 'Pedoman etika dan spiritualitas masyarakat Jawa.',
          facts: ['Slametan menjadi ritual utama Kejawen.', 'Penyajian konten Kejawen bersifat informatif dan menghormati komunitas penganutnya.'],
          sources: ['Buku "Abangan, Santri, Priyayi" (Clifford Geertz)']
        }),
      ent('sundawiwitan', 'Sunda Wiwitan', 'Tradisi', 'Kepercayaan Lokal', 'jawa-barat',
        'Sunda Wiwitan adalah sistem kepercayaan asli masyarakat Sunda yang menekankan penghormatan kepada alam, leluhur, dan kekuatan tertinggi (Sang Hyang Kersa). Komunitas adat Baduy di Banten adalah salah satu penganutnya yang masih lestari.',
        {
          meaning: 'Hidup selaras dengan alam; aturan adat (pikukuh) menjaga keseimbangan.',
          function: 'Panduan hidup, adat, dan hubungan dengan alam.',
          facts: ['Baduy Dalam menjaga larangan adat secara ketat.', 'Penyajian bersifat informatif dan menghormati komunitas.'],
          sources: ['Kemendikbud RI', 'Buku "Orang Baduy" (Judistira Garna)']
        }),
      ent('legenda-sangkuriang', 'Legenda Sangkuriang', 'Tradisi', 'Legenda', 'jawa-barat',
        'Legenda Sangkuriang mengisahkan pemuda yang tidak sengaja menikahi ibunya sendiri, Dayang Sumbi, lalu murka dan menendang perahu yang dibangunnya hingga menjadi Gunung Tangkuban Parahu. Cerita ini termasuk tradisi lisan Sunda, bukan fakta sejarah.',
        {
          nature: 'TRADISI LISAN — bukan fakta sejarah; sarat nilai dan pesan moral.',
          meaning: 'Melambangkan akibat dari kesombongan dan pelanggaran norma.',
          facts: ['Terkait langsung dengan nama Gunung Tangkuban Parahu.', 'Terdapat versi lain di daerah berbeda dengan tokoh serupa.'],
          sources: ['Kemendikbud RI']
        }),
      ent('congklak', 'Congklak', 'Seni', 'Permainan Tradisional', null,
        'Congklak adalah permainan tradisional dengan papan berlubang dan biji (biasanya kerang atau biji sawo). Dua pemain bergiliran mengambil dan mengisi biji; permainan ini melatih hitung, strategi, dan kesabaran.',
        {
          function: 'Permainan anak dan keluarga; melatih kecerdasan.',
          meaning: 'Mengajarkan kejujuran, strategi, dan berbagi.',
          facts: ['Dikenal dengan nama dakon di Jawa dan congklak di Sumatra.', 'Papan congklak umumnya berjumlah 16 lubang.'],
          sources: ['Kemendikbud RI']
        }),
      ent('pencak-silat', 'Pencak Silat', 'Seni', 'Olahraga Tradisional', null,
        'Pencak silat adalah seni bela diri tradisional Nusantara yang memadukan gerak, irama, dan nilai spiritual. Silat ditetapkan UNESCO sebagai Warisan Budaya Takbenda Dunia (2019) dan menjadi olahraga nasional Indonesia.',
        {
          history: 'Berkembang di berbagai daerah dengan gaya khas (Minangkabau silek, Jawa, Betawi, dll.).',
          function: 'Bela diri, olahraga, seni pertunjukan, dan pembentukan karakter.',
          meaning: 'Mengajarkan keselarasan, kesabaran, dan harga diri.',
          facts: ['UNESCO mengakui "Pencak Silat: tradisi olahraga bela diri Nusantara" (2019).', 'Dipertandingkan di SEA Games dan PON.'],
          sources: ['UNESCO Intangible Heritage', 'PB IPSI']
        }),
      ent('keroncong', 'Keroncong', 'Seni', 'Musik', null,
        'Keroncong adalah genre musik khas Indonesia yang lahir dari perpaduan musik Portugis dan tradisi lokal, dengan instrumen utama ukulele, cak, cuk, dan seruling. Keroncong berkembang di Jakarta, Solo, dan Yogyakarta.',
        {
          history: 'Berasal dari musik Portugis (abad ke-16) yang diadaptasi; langgam keroncong dipopulerkan Gesang melalui "Bengawan Solo".',
          function: 'Hiburan dan ekspresi budaya.',
          meaning: 'Melodi lembut melambangkan ketenangan dan romantisme.',
          facts: ['Lagu "Bengawan Solo" karya Gesang dikenal hingga Jepang.', 'Ada beberapa gaya: keroncong asli, langgam, dan stambul.'],
          sources: ['Kemendikbud RI']
        }),
      ent('pantun', 'Pantun', 'Sastra', 'Puisi Lama', null,
        'Pantun adalah puisi lama Nusantara bersajak a-b-a-b dengan sampiran dan isi. Pantun berkembang dalam tradisi lisan Melayu, Minangkabau, dan daerah lain sebagai sarana komunikasi dan hiburan.',
        {
          history: 'Tradisi lisan Melayu; pantun juga dikenal di Jawa, Sunda, dan Banjar.',
          meaning: 'Sampiran mengantar isi; pantun mengajarkan budi bahasa dan sindiran halus.',
          function: 'Sarana komunikasi, pendidikan moral, dan hiburan.',
          facts: ['Pantun ditetapkan UNESCO sebagai Warisan Budaya Takbenda bersama Malaysia (2020).', 'Terdapat pantun jenaka, nasihat, teka-teki, dan agama.'],
          sources: ['UNESCO Intangible Heritage']
        }),
      ent('prasasti-yupa', 'Prasasti Yupa (Mulawarman)', 'Situs Sejarah', 'Prasasti', 'kalimantan-timur',
        'Prasasti Yupa adalah tujuh tiang batu (yupa) dari Kerajaan Kutai yang ditemukan di Muara Kaman, ditulis dengan aksara Pallawa dan bahasa Sanskerta. Prasasti ini menjadi bukti kerajaan Hindu tertua di Indonesia (abad ke-4 M).',
        {
          history: 'Menuliskan tentang Raja Mulawarman, wangsa Kundungga, dan upacara persembahan.',
          meaning: 'Dasar penanggalan sejarah Indonesia kuno; bukti awal pengaruh India di Nusantara.',
          function: 'Prasasti peringatan dan dokumen sejarah.',
          facts: ['Ditemukan pada abad ke-19 dan kini tersimpan di Museum Nasional, Jakarta.', 'Salah satu isinya menyebut sedekah 20.000 ekor sapi kepada brahmana.'],
          sources: ['Museum Nasional RI']
        })
    );

    /* ============================================================
       RELATIONSHIP (Knowledge Graph)
       ============================================================ */
    const relations = [
      // Aceh
      ['tari-saman', 'suku-gayo', 'cultural_related_to'],
      ['tari-saman', 'bahasa-aceh', 'associated_with'],
      ['tari-saman', 'masjid-baiturrahman', 'related_to'],
      ['kesultanan-aceh', 'masjid-baiturrahman', 'historically_related_to'],
      ['kesultanan-aceh', 'cut-nyak-dhien', 'person_related_to'],
      ['kesultanan-aceh', 'teuku-umar', 'person_related_to'],
      ['cut-nyak-dhien', 'teuku-umar', 'person_related_to'],
      ['kopi-gayo', 'suku-gayo', 'cultural_related_to'],
      ['mie-aceh', 'kesultanan-aceh', 'food_related_to'],
      ['pulau-weh', 'danau-laut-tawar', 'geographical_related_to'],
      ['bahasa-aceh', 'suku-gayo', 'language_related_to'],
      // Sumatera Barat
      ['rumah-gadang', 'minangkabau', 'cultural_related_to'],
      ['rumah-gadang', 'tari-piring', 'art_related_to'],
      ['rendang', 'minangkabau', 'food_related_to'],
      ['rendang', 'rumah-gadang', 'food_related_to'],
      ['tari-piring', 'minangkabau', 'cultural_related_to'],
      ['bahasa-minangkabau', 'minangkabau', 'language_related_to'],
      ['kerajaan-pagaruyung', 'minangkabau', 'historically_related_to'],
      ['jam-gadang', 'kerajaan-pagaruyung', 'related_to'],
      ['mohammad-hatta', 'minangkabau', 'person_related_to'],
      ['tuanku-imam-bonjol', 'kerajaan-pagaruyung', 'person_related_to'],
      ['songket-pandai-sikek', 'rumah-gadang', 'cultural_related_to'],
      ['nasi-kapau', 'rendang', 'food_related_to'],
      // Jawa Barat
      ['bahasa-sunda', 'suku-sunda', 'language_related_to'],
      ['angklung', 'suku-sunda', 'cultural_related_to'],
      ['tari-jaipong', 'suku-sunda', 'cultural_related_to'],
      ['wayang-golek', 'suku-sunda', 'art_related_to'],
      ['kujang', 'suku-sunda', 'cultural_related_to'],
      ['batik-sunda', 'suku-sunda', 'cultural_related_to'],
      ['rumah-sunda', 'suku-sunda', 'cultural_related_to'],
      ['gunung-tangkuban-perahu', 'kerajaan-sunda', 'geographical_related_to'],
      ['kerajaan-sunda', 'suku-sunda', 'historically_related_to'],
      ['dewi-sartika', 'suku-sunda', 'person_related_to'],
      // Jawa Tengah
      ['candi-borobudur', 'candi-prambanan', 'architectural_related_to'],
      ['candi-borobudur', 'kerajaan-mataram-kuno', 'historically_related_to'],
      ['candi-prambanan', 'kerajaan-mataram-kuno', 'historically_related_to'],
      ['candi-borobudur', 'kerajaan-majapahit', 'historically_related_to'],
      ['bahasa-jawa', 'suku-jawa', 'language_related_to'],
      ['wayang-kulit', 'gamelan', 'art_related_to'],
      ['wayang-kulit', 'suku-jawa', 'cultural_related_to'],
      ['batik', 'wayang-kulit', 'cultural_related_to'],
      ['tari-gambyong', 'gamelan', 'art_related_to'],
      ['gunung-merapi', 'candi-borobudur', 'geographical_related_to'],
      ['ra-kartini', 'ki-hajar-dewantara', 'person_related_to'],
      ['ki-hajar-dewantara', 'proklamasi', 'historical_event_related_to'],
      // Bali
      ['bahasa-bali', 'aksara-bali', 'language_related_to'],
      ['pura-besakih', 'suku-bali', 'religious_related_to'],
      ['tari-kecak', 'barong', 'art_related_to'],
      ['ngaben', 'suku-bali', 'cultural_related_to'],
      ['subak', 'suku-bali', 'cultural_related_to'],
      ['gamelan-bali', 'tari-kecak', 'art_related_to'],
      ['ayam-betutu', 'suku-bali', 'food_related_to'],
      ['gunung-batur', 'pura-besakih', 'geographical_related_to'],
      ['ngurah-rai', 'proklamasi', 'historical_event_related_to'],
      // Kalimantan Timur
      ['kerajaan-kutai', 'sungai-mahakam', 'geographical_related_to'],
      ['suku-dayak', 'rumah-lamin', 'cultural_related_to'],
      ['suku-dayak', 'mandau', 'cultural_related_to'],
      ['suku-dayak', 'tari-kancet', 'art_related_to'],
      ['pesut-mahakam', 'sungai-mahakam', 'geographical_related_to'],
      ['anggrek-hitam', 'suku-dayak', 'associated_with'],
      ['kerajaan-kutai', 'kerajaan-majapahit', 'historically_related_to'],
      // Sulawesi Selatan
      ['pinisi', 'suku-bugis', 'cultural_related_to'],
      ['pinisi', 'suku-makassar', 'cultural_related_to'],
      ['rumah-tongkonan', 'suku-toraja', 'cultural_related_to'],
      ['rambu-solo', 'suku-toraja', 'cultural_related_to'],
      ['coto-makassar', 'suku-makassar', 'food_related_to'],
      ['tari-pakarena', 'kerajaan-gowa', 'art_related_to'],
      ['kerajaan-gowa', 'sultan-hasanuddin', 'person_related_to'],
      ['sultan-hasanuddin', 'suku-makassar', 'person_related_to'],
      ['bahasa-bugis', 'suku-bugis', 'language_related_to'],
      ['pantai-losari', 'coto-makassar', 'associated_with'],
      // Maluku
      ['jalur-rempah', 'cengkih', 'food_related_to'],
      ['jalur-rempah', 'pala', 'food_related_to'],
      ['jalur-rempah', 'kepulauan-banda', 'geographical_related_to'],
      ['pattimura', 'benteng-victoria', 'historical_event_related_to'],
      ['tari-cakalele', 'papeda', 'cultural_related_to'],
      ['masjid-wapauwe', 'jalur-rempah', 'historically_related_to'],
      ['rasa-sayange', 'tari-cakalele', 'cultural_related_to'],
      // Papua
      ['suku-asmat', 'ukiran-asmat', 'cultural_related_to'],
      ['suku-dani', 'honai', 'cultural_related_to'],
      ['tifa', 'tari-cakalele', 'art_related_to'],
      ['danau-sentani', 'puncak-jaya', 'geographical_related_to'],
      ['noken', 'suku-asmat', 'cultural_related_to'],
      ['frans-kaisiepo', 'puncak-jaya', 'person_related_to'],
      // Nasional
      ['pancasila', 'uud-1945', 'associated_with'],
      ['pancasila', 'garuda-pancasila', 'associated_with'],
      ['garuda-pancasila', 'bhinneka-tunggal-ika', 'associated_with'],
      ['sumpah-pemuda', 'proklamasi', 'historical_event_related_to'],
      ['proklamasi', 'indonesia-raya', 'associated_with'],
      ['bendera-merah-putih', 'proklamasi', 'historical_event_related_to'],
      ['tri-satya', 'dasa-darma', 'associated_with'],
      ['sandi-morse', 'semaphore', 'associated_with'],
      ['ori', 'rupiah', 'historically_related_to'],
      ['kode-pos', 'zona-waktu', 'associated_with'],
      ['gotong-royong', 'pancasila', 'cultural_related_to'],
      ['mudik', 'gotong-royong', 'associated_with'],
      ['kejawen', 'suku-jawa', 'cultural_related_to'],
      ['kejawen', 'wayang-kulit', 'cultural_related_to'],
      ['legenda-sangkuriang', 'gunung-tangkuban-perahu', 'cultural_related_to'],
      ['sundawiwitan', 'suku-sunda', 'cultural_related_to'],
      ['sundawiwitan', 'kerajaan-sunda', 'historically_related_to'],
      ['congklak', 'pencak-silat', 'related_to'],
      ['pencak-silat', 'suku-sunda', 'cultural_related_to'],
      ['keroncong', 'indonesia-raya', 'art_related_to'],
      ['pantun', 'bahasa-minangkabau', 'language_related_to'],
      ['prasasti-yupa', 'kerajaan-kutai', 'historically_related_to']
    ].map(function (r) {
      return { from: r[0], to: r[1], relationshipType: r[2] };
    });

    /* ============================================================
       TIMELINE (Peristiwa Sejarah)
       ============================================================ */
    const events = [
      { id: 'ev-manusia-purba', year: -1000000, date: '±1 juta tahun lalu', period: 'Prasejarah', title: 'Manusia purba di Nusantara', location: 'Sangiran, Jawa Tengah', province: 'jawa-tengah', description: 'Fosil Homo erectus ditemukan di Sangiran, Sragen, yang kini menjadi Warisan Dunia UNESCO. Manusia purba menghuni Nusantara sejak era Paleolitikum.', sources: ['UNESCO', 'Balai Pelestarian Situs Manusia Purba Sangiran'] },
      { id: 'ev-kutai', year: 400, date: '± abad ke-4 M', period: 'Kerajaan', title: 'Kerajaan Kutai: kerajaan tertua di Indonesia', location: 'Muara Kaman, Kalimantan Timur', province: 'kalimantan-timur', description: 'Prasasti Yupa (Mulawarman) menandai kerajaan Hindu tertua di Nusantara.', sources: ['Buku "Sejarah Nasional Indonesia"'] },
      { id: 'ev-sriwijaya', year: 683, date: '683 M', period: 'Kerajaan', title: 'Prasasti Kedukan Bukit — Sriwijaya', location: 'Palembang', province: null, description: 'Bukti tertulis kemaharajaan maritim Sriwijaya yang menguasai Selat Malaka.', sources: ['Museum Nasional'] },
      { id: 'ev-borobudur', year: 800, date: '± abad ke-8–9 M', period: 'Kerajaan', title: 'Pembangunan Candi Borobudur', location: 'Magelang, Jawa Tengah', province: 'jawa-tengah', description: 'Wangsa Syailendra dari Mataram Kuno membangun candi Buddha terbesar di dunia.', sources: ['UNESCO'] },
      { id: 'ev-majapahit', year: 1293, date: '1293 M', period: 'Kerajaan', title: 'Berdirinya Kerajaan Majapahit', location: 'Jawa Timur', province: null, description: 'Raden Wijaya mendirikan Majapahit yang kemudian mempersatukan Nusantara di bawah Gajah Mada.', sources: ['Buku "Sejarah Nasional Indonesia"'] },
      { id: 'ev-aceh', year: 1496, date: '±1496 M', period: 'Kerajaan', title: 'Berdirinya Kesultanan Aceh Darussalam', location: 'Banda Aceh', province: 'aceh', description: 'Kesultanan Aceh tumbuh menjadi kekuatan Islam dan maritim utama di Selat Malaka.', sources: ['Pemerintah Aceh'] },
      { id: 'ev-portugis', year: 1512, date: '1512', period: 'Kolonialisme', title: 'Kedatangan Portugis di Maluku', location: 'Kepulauan Maluku', province: 'maluku', description: 'Ekspedisi Portugis mencapai Kepulauan Rempah, mengawali era kolonialisme dan monopoli rempah.', sources: ['Buku "Nusantara: Sejarah Indonesia"'] },
      { id: 'ev-voc', year: 1602, date: '1602', period: 'Kolonialisme', title: 'Berdirinya VOC', location: 'Batavia (Jakarta)', province: null, description: 'Vereenigde Oostindische Compagnie didirikan untuk monopoli perdagangan rempah; menjadi cikal bakal kekuasaan kolonial Belanda.', sources: ['Buku "Sejarah Nasional Indonesia"'] },
      { id: 'ev-diponegoro', year: 1825, date: '1825–1830', period: 'Perlawanan', title: 'Perang Diponegoro', location: 'Jawa Tengah & DIY', province: 'jawa-tengah', description: 'Perlawanan terbesar abad ke-19 melawan Belanda yang dipimpin Pangeran Diponegoro; berakhir dengan penangkapannya di Magelang.', sources: ['Buku "Sejarah Nasional Indonesia"'] },
      { id: 'ev-padri', year: 1803, date: '1803–1837', period: 'Perlawanan', title: 'Perang Padri', location: 'Sumatera Barat', province: 'sumatera-barat', description: 'Perang antara kaum Padri dan adat yang kemudian melibatkan Belanda; Tuanku Imam Bonjol menjadi tokoh utamanya.', sources: ['Kementerian Sosial RI'] },
      { id: 'ev-aceh-war', year: 1873, date: '1873–1904', period: 'Perlawanan', title: 'Perang Aceh', location: 'Aceh', province: 'aceh', description: 'Perlawanan panjang rakyat Aceh terhadap Belanda, dengan tokoh seperti Teuku Umar dan Cut Nyak Dhien.', sources: ['Buku "Aceh dan Perang"'] },
      { id: 'ev-budi-utomo', year: 1908, date: '20 Mei 1908', period: 'Pergerakan Nasional', title: 'Berdirinya Budi Utomo', location: 'Jakarta', province: null, description: 'Organisasi modern pertama yang menandai kebangkitan nasional; 20 Mei diperingati sebagai Hari Kebangkitan Nasional.', sources: ['Kemendikbud RI'] },
      { id: 'ev-sumpah-pemuda', year: 1928, date: '28 Oktober 1928', period: 'Pergerakan Nasional', title: 'Sumpah Pemuda', location: 'Jakarta', province: null, description: 'Ikrar satu tanah air, satu bangsa, satu bahasa: Indonesia.', sources: ['Museum Sumpah Pemuda'] },
      { id: 'ev-proklamasi', year: 1945, date: '17 Agustus 1945', period: 'Kemerdekaan', title: 'Proklamasi Kemerdekaan Indonesia', location: 'Jakarta', province: null, description: 'Soekarno-Hatta memproklamasikan kemerdekaan Republik Indonesia.', sources: ['Arsip Nasional RI'] },
      { id: 'ev-kaiserdam', year: 1949, date: '27 Desember 1949', period: 'Kemerdekaan', title: 'Pengakuan Kedaulatan (KMB)', location: 'Den Haag & Jakarta', province: null, description: 'Konferensi Meja Bundar mengakhiri konflik bersenjata dan mengakui kedaulatan RI.', sources: ['Arsip Nasional RI'] },
      { id: 'ev-orde-baru', year: 1966, date: '1966', period: 'Pasca Kemerdekaan', title: 'Awal Orde Baru', location: 'Indonesia', province: null, description: 'Transisi politik dari Orde Lama ke Orde Baru melalui Supersemar; pemerintahan berlangsung hingga 1998.', sources: ['Buku "Sejarah Nasional Indonesia"'] },
      { id: 'ev-reformasi', year: 1998, date: 'Mei 1998', period: 'Pasca Kemerdekaan', title: 'Reformasi 1998', location: 'Jakarta dan seluruh Indonesia', province: null, description: 'Gerakan mahasiswa dan rakyat mengakhiri Orde Baru; awal era Reformasi dengan amandemen konstitusi dan desentralisasi.', sources: ['Buku "Sejarah Nasional Indonesia"'] },
      { id: 'ev-tsunami', year: 2004, date: '26 Desember 2004', period: 'Indonesia Modern', title: 'Tsunami Aceh', location: 'Aceh', province: 'aceh', description: 'Gempa dan tsunami Samudra Hindia menghantam Aceh; memicu perdamaian Aceh (MoU Helsinki 2005).', sources: ['BNPB'] },
      { id: 'ev-ikn', year: 2022, date: '2022–sekarang', period: 'Indonesia Modern', title: 'Pembangunan Ibu Kota Nusantara', location: 'Kalimantan Timur', province: 'kalimantan-timur', description: 'Pemindahan ibu kota negara ke IKN di Penajam Paser Utara, Kalimantan Timur.', sources: ['Otorita IKN'] }
    ];

    /* ============================================================
       STRUKTUR 7 MENU UTAMA
       ============================================================ */
    const menus = [
      { id: 'provinsi', name: 'Provinsi Indonesia', tagline: 'Ensiklopedia wilayah, alam, masyarakat & identitas daerah', categories: ['Wilayah & Administrasi', 'Geografi', 'Alam', 'Konservasi', 'Pariwisata', 'Situs Sejarah', 'Tempat Ibadah', 'Budaya Fisik', 'Flora', 'Fauna', 'Suku & Masyarakat', 'Seni', 'Bahasa', 'Wastra', 'Kuliner', 'Jalur Rempah', 'Tokoh', 'Data Praktis'] },
      { id: 'lorong-waktu', name: 'Lorong Waktu', tagline: 'Ensiklopedia sejarah Nusantara', categories: ['Prasejarah', 'Kerajaan', 'Kolonialisme', 'Perlawanan', 'Pergerakan Nasional', 'Kemerdekaan', 'Pasca Kemerdekaan', 'Prasasti & Manuskrip', 'Sejarah Agama', 'Tokoh'] },
      { id: 'panggung-kesenian', name: 'Panggung Kesenian', tagline: 'Seni, musik, wastra, permainan & olahraga tradisional', categories: ['Tari', 'Wayang & Pertunjukan', 'Alat Musik', 'Lagu', 'Musik', 'Wastra', 'Permainan', 'Olahraga Tradisional', 'Seni Rupa', 'Kerajinan'] },
      { id: 'pustaka-nusantara', name: 'Pustaka Nusantara', tagline: 'Cerita, suku, adat, tradisi & kepercayaan', categories: ['Folklore', 'Legenda', 'Mitologi', 'Suku & Masyarakat', 'Upacara Adat', 'Kepercayaan Lokal', 'Tradisi Sosial', 'Hukum Adat', 'Kearifan Lokal'] },
      { id: 'bilik-sastra-bahasa', name: 'Bilik Sastra & Bahasa', tagline: 'Pusat bahasa, sastra & aksara Nusantara', categories: ['Bahasa', 'Kamus', 'Sastra', 'Peribahasa & Ungkapan', 'Aksara'] },
      { id: 'balai-pandu-warga', name: 'Balai Pandu & Warga', tagline: 'Kewarganegaraan, Pancasila & Pramuka', categories: ['Pancasila', 'Konstitusi', 'Sejarah Kebangsaan', 'Simbol Negara', 'Kewarganegaraan', 'Pramuka', 'Sandi', 'Tali-temali', 'Tanda Kecakapan'] },
      { id: 'pusat-kode-info', name: 'Pusat Kode & Info', tagline: 'Data praktis Indonesia', categories: ['Kode Wilayah', 'Transportasi', 'Nomor Penting', 'Mata Uang & Numismatik', 'Waktu', 'Administrasi', 'Informasi Geografis', 'Pendidikan', 'Singkatan & Istilah'] }
    ];

    /* ---------- indeks & utilitas ---------- */
    const itemMap = {};
    items.forEach(function (it) { itemMap[it.id] = it; });

    function itemsByProvince(pid) {
      return items.filter(function (it) { return it.province === pid; });
    }
    function itemsByCategory(cat) {
      return items.filter(function (it) { return it.category === cat; });
    }
    /* Kategori menu dapat cocok dengan kategori ATAU subkategori entitas
       (dua arah: "Mata Uang & Numismatik" cocok dengan subkategori "Mata Uang") */
    function itemsForCategory(cat) {
      return items.filter(function (it) {
        if (it.category === cat) return true;
        if (it.subcategory === cat) return true;
        if (it.subcategory && it.subcategory.indexOf(cat) === 0) return true;
        if (it.subcategory && cat.indexOf(it.subcategory) === 0) return true;
        return false;
      });
    }
    function provinceOf(item) {
      return item.province ? provinces[item.province] : null;
    }
    function relatedOf(id) {
      const out = [];
      relations.forEach(function (r) {
        if (r.from === id && itemMap[r.to]) out.push({ item: itemMap[r.to], type: r.relationshipType });
        if (r.to === id && itemMap[r.from]) out.push({ item: itemMap[r.from], type: r.relationshipType });
      });
      return out;
    }
    function allCategories() {
      const c = {};
      items.forEach(function (it) {
        if (!c[it.category]) c[it.category] = [];
        c[it.category].push(it.id);
      });
      return c;
    }

    return {
      provinces: provinces, items: items, itemMap: itemMap, relations: relations,
      events: events, menus: menus,
      itemsByProvince: itemsByProvince, itemsByCategory: itemsByCategory, itemsForCategory: itemsForCategory,
      provinceOf: provinceOf, relatedOf: relatedOf, allCategories: allCategories
    };
  })();
