/* ==========================================================
   script.js  |  Kişisel web sitesi için JavaScript
   Özellikler:
   1. Karanlık / aydınlık tema (seçim hatırlanır)
   2. Yukarı çık butonu
   3. İletişim formu doğrulaması
   4. Yazı makinesi efekti
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  temaKur();
  yukariButonuKur();
  formKur();
  yaziMakinesiKur();
});

/* ---------- 1. Tema ---------- */
function temaKur() {
  const html = document.documentElement;
  const buton = document.getElementById("tema-butonu");

  // Daha önce seçilmiş tema varsa uygula
  let kayitli = null;
  try {
    kayitli = localStorage.getItem("tema");
  } catch (e) {

  }
  if (kayitli === "dark" || kayitli === "light") {
    html.setAttribute("data-bs-theme", kayitli);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {

    html.setAttribute("data-bs-theme", "dark");
  }

  butonYaziGuncelle();

  buton.addEventListener("click", function () {
    const yeni = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-bs-theme", yeni);
    try {
      localStorage.setItem("tema", yeni);
    } catch (e) {}
    butonYaziGuncelle();
  });

  function butonYaziGuncelle() {
    const koyu = html.getAttribute("data-bs-theme") === "dark";
    buton.textContent = koyu ? "Aydınlık tema" : "Karanlık tema";
  }
}

/* ---------- 2. Yukarı çık butonu ---------- */
function yukariButonuKur() {
  const buton = document.getElementById("yukari-butonu");

  window.addEventListener("scroll", function () {
    
    if (window.scrollY > 300) {
      buton.classList.remove("d-none");
    } else {
      buton.classList.add("d-none");
    }
  });

  buton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- 3. İletişim formu ---------- */
function formKur() {
  const form = document.getElementById("iletisim-formu");
  const sonuc = document.getElementById("form-sonuc");

  form.addEventListener("submit", function (olay) {
    olay.preventDefault(); // sayfanın yenilenmesini engelle

    const ad = document.getElementById("ad");
    const eposta = document.getElementById("eposta");
    const mesaj = document.getElementById("mesaj");

    const adGecerli = ad.value.trim().length >= 2;
    const epostaGecerli = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta.value.trim());
    const mesajGecerli = mesaj.value.trim().length >= 10;

    alanIsaretle(ad, adGecerli);
    alanIsaretle(eposta, epostaGecerli);
    alanIsaretle(mesaj, mesajGecerli);

    if (adGecerli && epostaGecerli && mesajGecerli) {
      sonuc.innerHTML =
        '<div class="alert alert-success" role="alert">Mesajınız alındı, teşekkürler ' +
        guvenliMetin(ad.value.trim()) +
        "!</div>";
      form.reset();
      [ad, eposta, mesaj].forEach(function (alan) {
        alan.classList.remove("is-valid", "is-invalid");
      });
    } else {
      sonuc.innerHTML =
        '<div class="alert alert-danger" role="alert">Lütfen işaretli alanları düzeltin. Mesaj en az 10 karakter olmalı.</div>';
    }
  });

  // Kullanıcı yazarken hata işaretini kaldır
  ["ad", "eposta", "mesaj"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function (olay) {
      olay.target.classList.remove("is-invalid");
    });
  });

  function alanIsaretle(alan, gecerli) {
    alan.classList.toggle("is-invalid", !gecerli);
    alan.classList.toggle("is-valid", gecerli);
  }

  // Kullanıcının yazdığı metni HTML olarak yorumlanmasın diye temizle
  function guvenliMetin(metin) {
    const div = document.createElement("div");
    div.textContent = metin;
    return div.innerHTML;
  }
}

/* ---------- 4. Yazı makinesi efekti ---------- */
function yaziMakinesiKur() {
  const alan = document.getElementById("slogan");

 
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;


  const cumleler = [
    "Bilgisayar Mühendisliği öğrencisiyim.",
    "Web geliştirmeyi öğreniyorum.",
    "Yeni projeler yapmayı seviyorum."
  ];

  let cumleNo = 0;
  let harfNo = 0;
  let siliyor = false;

  alan.classList.add("imlec");
  alan.textContent = "";
  yaz();

  function yaz() {
    const cumle = cumleler[cumleNo];

    if (!siliyor) {
      harfNo++;
      alan.textContent = cumle.slice(0, harfNo);
      if (harfNo === cumle.length) {
        siliyor = true;
        setTimeout(yaz, 1800); 
        return;
      }
      setTimeout(yaz, 70);
    } else {
      harfNo--;
      alan.textContent = cumle.slice(0, harfNo);
      if (harfNo === 0) {
        siliyor = false;
        cumleNo = (cumleNo + 1) % cumleler.length;
        setTimeout(yaz, 400);
        return;
      }
      setTimeout(yaz, 35);
    }
  }
}
