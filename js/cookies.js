(function () {
  var CONSENT_KEY = "maca_cookies_consent";

  function initCookieConsent() {
    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent) {
      // Preferences already saved, do not show modal
      return;
    }

    // Build the modal HTML
    var overlay = document.createElement("div");
    overlay.className = "maca-cookie-overlay";
    overlay.id = "macaCookieOverlay";

    var html = `
      <div class="maca-cookie-modal">
        <div class="maca-cookie-header">
          <h3 class="maca-cookie-title">Nastavenia súborov cookie</h3>
          <p class="maca-cookie-desc">
            Na tejto stránke si môžete prispôsobiť, ktoré súbory cookie naša stránka používa. Svoj súhlas môžete kedykoľvek zmeniť alebo odvolať.
          </p>
          <a href="/registracny-formular-zakaznika.html" class="maca-cookie-link" target="_blank">
            Zásady ochrany osobných údajov ↗
          </a>
        </div>
        
        <div class="maca-cookie-options">
          <!-- Necessary Cookies -->
          <div class="maca-cookie-row">
            <div class="maca-cookie-info">
              <div class="maca-cookie-option-title-wrap">
                <h4 class="maca-cookie-option-title">Nevyhnutné</h4>
                <span class="maca-cookie-badge">Vždy aktívne</span>
              </div>
              <p class="maca-cookie-option-desc">
                Tieto súbory cookie sú potrebné pre základné fungovanie webu (napr. ukladanie vášho súhlasu). Bez nich nemôže webová stránka správne fungovať, a preto ich nie je možné zakázať.
              </p>
            </div>
            <label class="maca-cookie-toggle">
              <input type="checkbox" id="macaCookieNecessary" checked disabled>
              <span class="maca-cookie-slider"></span>
            </label>
          </div>

          <!-- Analytical Cookies -->
          <div class="maca-cookie-row">
            <div class="maca-cookie-info">
              <div class="maca-cookie-option-title-wrap">
                <h4 class="maca-cookie-option-title">Analytické</h4>
              </div>
              <p class="maca-cookie-option-desc">
                Pomáhajú nám pochopiť, ako návštevníci používajú našu stránku (napr. ktoré sekcie sú populárne). Tieto dáta nám umožňujú neustále zlepšovať web.
              </p>
            </div>
            <label class="maca-cookie-toggle">
              <input type="checkbox" id="macaCookieAnalytical">
              <span class="maca-cookie-slider"></span>
            </label>
          </div>

          <!-- Marketing Cookies -->
          <div class="maca-cookie-row">
            <div class="maca-cookie-info">
              <div class="maca-cookie-option-title-wrap">
                <h4 class="maca-cookie-option-title">Marketingové</h4>
              </div>
              <p class="maca-cookie-option-desc">
                Používajú sa na zobrazovanie relevantných reklám a meranie efektivity reklamných kampaní na našich stránkach aj mimo nich.
              </p>
            </div>
            <label class="maca-cookie-toggle">
              <input type="checkbox" id="macaCookieMarketing">
              <span class="maca-cookie-slider"></span>
            </label>
          </div>
        </div>

        <div class="maca-cookie-actions">
          <button class="maca-cookie-btn btn-outline" id="macaCookieBtnNecessary">Iba nevyhnutné</button>
          <button class="maca-cookie-btn btn-outline" id="macaCookieBtnSave">Uložiť výber</button>
          <button class="maca-cookie-btn btn-gold" id="macaCookieBtnAcceptAll">Prijať všetko</button>
        </div>
      </div>
    `;

    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    // Fade-in animation hook
    setTimeout(function () {
      overlay.classList.add("is-visible");
    }, 100);

    // Setup action listeners
    var btnNecessary = document.getElementById("macaCookieBtnNecessary");
    var btnSave = document.getElementById("macaCookieBtnSave");
    var btnAcceptAll = document.getElementById("macaCookieBtnAcceptAll");
    
    var checkAnalytical = document.getElementById("macaCookieAnalytical");
    var checkMarketing = document.getElementById("macaCookieMarketing");

    function savePreferences(prefs) {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
      
      // Hide modal
      overlay.classList.remove("is-visible");
      setTimeout(function () {
        overlay.remove();
      }, 400);

      // Trigger custom event for other scripts if needed
      var event = new CustomEvent("macaCookieConsentSaved", { detail: prefs });
      window.dispatchEvent(event);
    }

    btnNecessary.addEventListener("click", function () {
      savePreferences({
        necessary: true,
        analytical: false,
        marketing: false
      });
    });

    btnSave.addEventListener("click", function () {
      savePreferences({
        necessary: true,
        analytical: checkAnalytical.checked,
        marketing: checkMarketing.checked
      });
    });

    btnAcceptAll.addEventListener("click", function () {
      savePreferences({
        necessary: true,
        analytical: true,
        marketing: true
      });
    });
  }

  // Run on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
