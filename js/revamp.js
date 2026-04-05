(function () {
  function onReady(fn) {
    if (document.readyState !== "loading") {
      fn();
      return;
    }
    document.addEventListener("DOMContentLoaded", fn);
  }

  function trackEvent(name, payload) {
    var data = payload || {};
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: name }, data));
    }
  }

  var cfg = window.__CONFIG || {};

  function getApiBaseUrl() {
    return cfg.API_BASE_URL || "";
  }

  function getAuthToken() {
    return cfg.API_KEY || "";
  }

  function ensureRevampStyles() {
    if (document.querySelector('link[href$="css/revamp.css"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/revamp.css";
    document.head.appendChild(link);
  }

  function activeMenuKey(pathname) {
    var p = (pathname || "").split("/").pop() || "index.html";

    var ownPages = [
      "own-electric.html",
      "vehicle-financing.html",
      "vehicle-financing-v2.html",
      "battery-subscription-baas.html",
      "buyback-guarantee.html",
      "services.html",
      "for-customers.html",
      "lead-gen.html"
    ];
    var vehiclePages = [
      "electric-vehicles.html",
      "commercial-vehicles.html",
      "commercial-3w.html",
      "commercial-4w.html",
      "personal-vehicles.html",
      "personal-4w.html"
    ];
    var nextRidePages = ["nextride.html", "pre-owned.html"];
    var aboutPages = ["about-us.html", "detail_team.html", "detail_careers.html"];
    var contactPages = ["contact.html", "customer-support.html", "faqs.html"];

    if (p === "index.html") return "home";
    if (ownPages.indexOf(p) >= 0) return "own";
    if (vehiclePages.indexOf(p) >= 0) return "vehicles";
    if (nextRidePages.indexOf(p) >= 0) return "nextride";
    if (aboutPages.indexOf(p) >= 0) return "about";
    if (p === "careers.html") return "careers";
    if (contactPages.indexOf(p) >= 0) return "contact";
    return "";
  }

  function navLink(label, href, key, active) {
    var isActive = key === active;
    var cls = isActive ? ' class="active"' : "";
    var aria = isActive ? ' aria-current="page"' : "";
    var external = key === "nextride" ? ' target="_blank" rel="noopener"' : "";
    return '<a' + cls + aria + ' href="' + href + '"' + external + ">" + label + "</a>";
  }

  function navButton(label, key, active) {
    var cls = key === active ? "nav-link-button is-active" : "nav-link-button";
    return '<button class="' + cls + '" type="button" aria-expanded="false">' + label + "</button>";
  }

  function renderGlobalMenu() {
    ensureRevampStyles();
    var active = activeMenuKey(window.location.pathname);
    var navMarkup =
      '<div class="container nav-inner">' +
        '<a class="brand-mark" href="index.html" aria-label="Vidyut Home"><img src="images/Horizontal_Full-Colour_-Dark_FullLogo-1-1.svg" alt="Vidyut"></a>' +
        '<button class="mobile-toggle" aria-label="Toggle menu" aria-expanded="false">Menu</button>' +
        '<nav class="nav-links" aria-label="Primary Navigation">' +
          navLink("Home", "index.html", "home", active) +
          navLink("Own Electric", "own-electric.html", "own", active) +
          navLink("Vehicles", "electric-vehicles.html", "vehicles", active) +
          navLink("NextRide ↗", "https://www.vidyutnextride.com/", "nextride", active) +
          navLink("About Us", "about-us.html", "about", active) +
          navLink("Careers", "careers.html", "careers", active) +
          navLink("Contact Us", "contact.html", "contact", active) +
        "</nav>" +
      "</div>";

    var header = document.querySelector(".site-header");
    if (header) {
      header.innerHTML = navMarkup;
      applyActiveFallback();
      return;
    }

    var oldHeaderShell = document.querySelector(".header-transparent");
    if (oldHeaderShell) {
      oldHeaderShell.style.display = "none";
    }

    var anyHeader = document.querySelector("header");
    if (anyHeader) {
      anyHeader.className = "site-header";
      anyHeader.innerHTML = navMarkup;
      applyActiveFallback();
      return;
    }

    header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = navMarkup;
    if (document.body.firstChild) {
      document.body.insertBefore(header, document.body.firstChild);
    } else {
      document.body.appendChild(header);
    }
    applyActiveFallback();
  }

  function applyActiveFallback() {
    var current = (window.location.pathname || "").split("/").pop() || "index.html";
    var links = document.querySelectorAll(".nav-links a[href]");
    var hasActive = Array.prototype.some.call(links, function (a) { return a.classList.contains("active"); });
    if (hasActive) return;

    Array.prototype.forEach.call(links, function (a) {
      var href = a.getAttribute("href") || "";
      if (!href || href.indexOf("http") === 0 || href.indexOf("#") === 0) return;
      var target = href.split("?")[0].replace(/^\//, "");
      if (target === current) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });

    // Keep NextRide nav behavior consistent even on hardcoded legacy headers.
    var nextRideNavLinks = document.querySelectorAll('.nav-links a[href="https://www.vidyutnextride.com/"]');
    Array.prototype.forEach.call(nextRideNavLinks, function (a) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  function renderGlobalFooter() {
    var year = new Date().getFullYear();
    var footerMarkup =
      '<div class="container footer-main">' +
        '<div class="footer-brand-row">' +
          '<a class="brand-mark" href="index.html" aria-label="Vidyut Home">' +
            '<img src="images/Horizontal_Full-Colour_-Dark_FullLogo-1-1.svg" alt="Vidyut">' +
          "</a>" +
        "</div>" +
        '<div class="footer-columns">' +
          '<div class="footer-col">' +
            "<h4>Quick Links</h4>" +
            '<a href="about-us.html">About Us</a>' +
            '<a href="electric-vehicles.html">Vehicles</a>' +
            '<a href="careers.html">Careers</a>' +
            '<a href="https://www.vidyuttech.com/policies/" target="_blank" rel="noopener">Policies</a>' +
            '<a href="https://www.vidyuttech.com/terms/" target="_blank" rel="noopener">Terms and Conditions</a>' +
            '<a href="https://www.vidyuttech.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>' +
          "</div>" +
          '<div class="footer-col footer-col-links-continued">' +
            '<h4 class="sr-only">Quick Links Continued</h4>' +
            '<a href="https://www.vidyuttech.com/withdraw-consent/" target="_blank" rel="noopener">Withdraw Bureau Consent</a>' +
            '<a href="https://www.vidyuttech.com/Grievance-Redressal-Policy/" target="_blank" rel="noopener">Grievance Redressal Policy</a>' +
            '<a href="https://consumer.experian.in/ECSINDIA-DCE/view/angular/" target="_blank" rel="noopener">Raise Experian Dispute</a>' +
          "</div>" +
          '<div class="footer-col footer-contact">' +
            "<h4>Contact Us</h4>" +
            "<p>2nd Floor, 2nd Building, Hustlehub Techpark, 27th Main Road End, HSR Layout Sector 1, Bangalore, Karnataka, India - 560102</p>" +
            '<a href="tel:+917027024496">+91-702-702-4496</a>' +
            '<a href="mailto:support@vidyuttech.com">support@vidyuttech.com</a>' +
            '<div class="footer-socials" aria-label="Vidyut social links">' +
              '<a class="footer-social-link" href="https://www.facebook.com/vidyuttechservices/" target="_blank" rel="noopener" aria-label="Facebook">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.5v8h3Z" fill="currentColor"/></svg>' +
              '</a>' +
              '<a class="footer-social-link" href="https://www.instagram.com/vidyut.tech/" target="_blank" rel="noopener" aria-label="Instagram">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.45 1.35a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" fill="currentColor"/></svg>' +
              '</a>' +
              '<a class="footer-social-link" href="https://www.linkedin.com/company/vidyuttech/" target="_blank" rel="noopener" aria-label="LinkedIn">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.4 8.3A1.4 1.4 0 1 1 6.4 5.5a1.4 1.4 0 0 1 0 2.8ZM5 19V9.8h2.8V19H5Zm4.5 0V9.8h2.7v1.3h.1c.4-.7 1.3-1.6 2.8-1.6 3 0 3.5 1.9 3.5 4.5V19h-2.8v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H9.5Z" fill="currentColor"/></svg>' +
              '</a>' +
              '<a class="footer-social-link" href="https://www.youtube.com/channel/UCPXG6zF87boPDexvm4YJsCg" target="_blank" rel="noopener" aria-label="YouTube">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.93C18.26 5.6 12 5.6 12 5.6s-6.26 0-7.86.47A2.75 2.75 0 0 0 2.2 8.001 28.7 28.7 0 0 0 1.75 12a28.7 28.7 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.94 1.93c1.6.47 7.86.47 7.86.47s6.26 0 7.86-.47a2.75 2.75 0 0 0 1.94-1.93A28.7 28.7 0 0 0 22.25 12a28.7 28.7 0 0 0-.45-3.999ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" fill="currentColor"/></svg>' +
              '</a>' +
              '<a class="footer-social-link" href="https://twitter.com/vidyut_tech" target="_blank" rel="noopener" aria-label="Twitter">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/></svg>' +
              '</a>' +
            '</div>' +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="container footer-bottom">' +
        "<span>&copy; " + year + " VidyutTech. All rights reserved.</span>" +
      "</div>";

    var footer = document.querySelector("footer.site-footer");
    if (!footer) {
      footer = document.createElement("footer");
      footer.className = "site-footer";
      if (document.body.lastChild) {
        document.body.appendChild(footer);
      } else {
        document.body.appendChild(footer);
      }
    }

    footer.innerHTML = footerMarkup;
  }

  function initNav() {
    var header = document.querySelector(".site-header");
    var button = document.querySelector(".mobile-toggle");
    if (!header || !button) return;
    button.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      button.setAttribute("aria-expanded", String(open));
    });
  }

  function initDropdownNav() {
    var items = document.querySelectorAll(".nav-item.has-dropdown");
    if (!items.length) return;

    function closeAll() {
      items.forEach(function (item) {
        item.classList.remove("open");
        var trigger = item.querySelector(".nav-link-button");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }

    items.forEach(function (item) {
      var trigger = item.querySelector(".nav-link-button");
      if (!trigger) return;
      trigger.addEventListener("click", function (event) {
        var isMobile = window.matchMedia("(max-width: 47.99rem)").matches;
        if (!isMobile) return;
        event.preventDefault();
        var willOpen = !item.classList.contains("open");
        closeAll();
        if (willOpen) {
          item.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".nav-item.has-dropdown")) {
        closeAll();
      }
    });
  }

  function initVideoLazy() {
    var sources = document.querySelectorAll("video[data-src]");
    if (!sources.length) return;

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var video = entry.target;
        var src = video.getAttribute("data-src");
        if (src) {
          video.src = src;
          if (video.hasAttribute("autoplay")) {
            // Autoplay is only allowed reliably when muted/inline.
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute("muted", "");
            video.setAttribute("playsinline", "");
          }
          video.load();
          if (video.hasAttribute("autoplay")) {
            video.play().catch(function () {
              var retry = function () {
                video.play().catch(function () {});
                video.removeEventListener("canplay", retry);
              };
              video.addEventListener("canplay", retry);
            });
          }
        }
        observer.unobserve(video);
      });
    }, { rootMargin: "240px 0px" });

    sources.forEach(function (video) { io.observe(video); });
  }

  function initScrollDepth() {
    var fired = { 25: false, 50: false, 75: false, 100: false };
    function onScroll() {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) return;
      var percent = Math.round((scrollTop / max) * 100);
      [25, 50, 75, 100].forEach(function (mark) {
        if (!fired[mark] && percent >= mark) {
          fired[mark] = true;
          trackEvent("scroll_depth", { percent: mark, page: location.pathname });
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initClickTracking() {
    document.addEventListener("click", function (event) {
      var target = event.target.closest("[data-track]");
      if (!target) return;
      trackEvent("cta_click", {
        cta_name: target.getAttribute("data-track"),
        cta_text: (target.textContent || "").trim(),
        page: location.pathname
      });
    });

    document.querySelectorAll("a[data-nextride='outbound']").forEach(function (link) {
      link.addEventListener("click", function () {
        trackEvent("nextride_outbound_click", {
          destination: link.href,
          page: location.pathname
        });
      });
    });
  }

  function getUtmMap() {
    var params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || getCookie("utm_source") || "",
      utm_medium: params.get("utm_medium") || getCookie("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || getCookie("utm_campaign") || "",
      utm_term: params.get("utm_term") || getCookie("utm_term") || "",
      utm_content: params.get("utm_content") || getCookie("utm_content") || ""
    };
  }

  function getFormErrorNode(form) {
    var existing = form.parentElement.querySelector(".form-submit-error");
    if (existing) return existing;

    var error = document.createElement("div");
    error.className = "form-submit-error";
    error.setAttribute("role", "alert");
    error.setAttribute("aria-live", "polite");
    form.insertAdjacentElement("afterend", error);
    return error;
  }

  function setFormError(form, message) {
    var errorNode = getFormErrorNode(form);
    if (!errorNode) return;
    errorNode.textContent = message || "";
    errorNode.classList.toggle("show", !!message);
  }

  function submitFormToLMS(form, formData) {
    var utm = getUtmMap();
    var payload = {
      name: formData.get("full_name") || formData.get("name") || "",
      mobileNumber: formData.get("phone") || formData.get("mobile") || "",
      city: formData.get("city") || "",
      vehicleBrand: formData.get("vehicle_brand") || formData.get("vehicle_type") || null,
      vehicleModel: formData.get("vehicle_model") || formData.get("vehicle_name") || null,
      variant: null,
      utmSource: utm.utm_source || null,
      utmMedium: utm.utm_medium || null,
      utmCampaign: utm.utm_campaign || null
    };

    return fetch(getApiBaseUrl() + "/lms/api/v1/externalLead/ONLINE/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-api-key": getAuthToken()
      },
      mode: "cors",
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      return response.json().catch(function () { return {}; });
    });
  }

  function initForms() {
    var utm = getUtmMap();
    var forms = document.querySelectorAll("form[data-form='emi']");
    forms.forEach(function (form) {
      Object.keys(utm).forEach(function (key) {
        var input = form.querySelector("input[name='" + key + "']");
        if (input) input.value = utm[key];
      });

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var required = form.querySelectorAll("[required]");
        var valid = true;
        required.forEach(function (field) {
          if (!field.value.trim()) {
            valid = false;
            field.setAttribute("aria-invalid", "true");
          } else {
            field.removeAttribute("aria-invalid");
          }
        });

        if (!valid) return;

        var formData = new FormData(form);
        setFormError(form, "");
        var persistedValues = {};
        var persistedFields = form.querySelectorAll("[data-preserve='true']");
        persistedFields.forEach(function (field) {
          if (field.name) persistedValues[field.name] = field.value;
        });
        trackEvent("emi_form_submit", {
          page: location.pathname,
          city: formData.get("city") || "",
          vehicle_type: formData.get("vehicle_type") || "",
          inquiry_type: formData.get("inquiry_type") || "",
          partner_type: formData.get("partner_type") || "",
          ownership_use: formData.get("ownership_use") || ""
        });
        if (form.dataset.submitting === "true") return;
        form.dataset.submitting = "true";

        var submitButton = form.querySelector("button[type='submit']");
        var originalButtonText = submitButton ? submitButton.textContent : "";
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Submitting...";
        }

        submitFormToLMS(form, formData)
          .then(function () {
            var success = form.parentElement.querySelector(".form-success");
            if (success) {
              success.classList.add("show");
              success.setAttribute("aria-hidden", "false");
            }
            form.reset();
            Object.keys(persistedValues).forEach(function (key) {
              var field = form.querySelector("[name='" + key + "']");
              if (field) field.value = persistedValues[key];
            });
            Object.keys(utm).forEach(function (key) {
              var input = form.querySelector("input[name='" + key + "']");
              if (input) input.value = utm[key];
            });
          })
          .catch(function () {
            setFormError(
              form,
              "We could not submit your request right now. Please try again, or email support@vidyuttech.com."
            );
          })
          .finally(function () {
            form.dataset.submitting = "false";
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = originalButtonText;
            }
          });
      });
    });
  }

  function initFacebookPixel() {
    if (window.fbq) return;
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0";
      n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", cfg.FB_PIXEL_ID || "PIXEL_ID_TO_BE_ADDED");
    window.fbq("track", "PageView");
    var noscript = document.createElement("noscript");
    var img = document.createElement("img");
    img.height = 1; img.width = 1; img.style.display = "none";
    img.src = "https://www.facebook.com/tr?id=" + (cfg.FB_PIXEL_ID || "PIXEL_ID_TO_BE_ADDED") + "&ev=PageView&noscript=1";
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }

  function getCookieDomain() {
    return cfg.COOKIE_DOMAIN || "";
  }

  function getCookie(name) {
    var cookies = {};
    document.cookie.split(";").forEach(function (el) {
      var parts = el.split("=");
      cookies[parts[0].trim()] = parts[1] ? parts[1].trim() : "";
    });
    return cookies[name] || "";
  }

  function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    var domain = getCookieDomain();
    var domainStr = domain ? ";domain=" + domain : "";
    document.cookie = name + "=" + value + domainStr + ";" + expires + ";path=/";
  }

  function persistUtmParams() {
    var params = new URLSearchParams(window.location.search);
    var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    var hasAny = keys.some(function (k) { return params.get(k); });
    if (!hasAny) return;
    keys.forEach(function (k) {
      var val = params.get(k);
      if (val) setCookie(k, val, 30);
    });
  }

  function initPincodeLookup() {
    var pincodeFields = document.querySelectorAll("input[name='pincode']");
    pincodeFields.forEach(function (field) {
      field.addEventListener("input", function () {
        var val = field.value.replace(/\D/g, "");
        if (val.length !== 6) return;
        var form = field.closest("form");
        var cityField = form ? form.querySelector("input[name='city'], select[name='city']") : null;
        fetch(getApiBaseUrl() + "/lms/api/v1/location/pin/" + val, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors"
        }).then(function (r) { return r.ok ? r.json() : null; })
          .then(function (data) {
            if (data && data.city && cityField) {
              if (cityField.tagName === "SELECT") {
                for (var i = 0; i < cityField.options.length; i++) {
                  if (cityField.options[i].value.toLowerCase() === data.city.toLowerCase()) {
                    cityField.value = cityField.options[i].value;
                    break;
                  }
                }
              } else {
                cityField.value = data.city;
              }
            }
          }).catch(function () {});
      });
    });
  }

  onReady(function () {
    renderGlobalMenu();
    renderGlobalFooter();
    initNav();
    initDropdownNav();
    initVideoLazy();
    initScrollDepth();
    initClickTracking();
    persistUtmParams();
    initForms();
    initFacebookPixel();
    initPincodeLookup();
  });
})();
