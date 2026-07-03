document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("is-open");
      menuToggle.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        menuToggle.classList.remove("active");
        
        // Active link highlight
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  // ==========================================
  // 2. DESIGN SWITCHER (LIVE THEME SWITCH)
  // ==========================================
  const htmlElement = document.documentElement;
  const btnCinematic = document.getElementById("btnCinematic");
  const btnEditorial = document.getElementById("btnEditorial");

  function switchTheme(themeName) {
    if (themeName === "theme-cinematic") {
      htmlElement.className = "theme-cinematic";
      btnCinematic.classList.add("active");
      btnEditorial.classList.remove("active");
    } else {
      htmlElement.className = "theme-editorial";
      btnEditorial.classList.add("active");
      btnCinematic.classList.remove("active");
    }
  }

  if (btnCinematic && btnEditorial) {
    btnCinematic.addEventListener("click", () => switchTheme("theme-cinematic"));
    btnEditorial.addEventListener("click", () => switchTheme("theme-editorial"));
  }

  // ==========================================
  // 3. SCROLL REVEAL (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 4. STATS COUNTER ANIMATION
  // ==========================================
  const statNumbers = document.querySelectorAll(".stat-num");

  const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endVal = parseInt(target.getAttribute("data-val"), 10);
        const suffix = target.getAttribute("data-suffix") || "";
        let startVal = 0;
        const duration = 1500; // ms
        const steps = 50;
        const stepTime = duration / steps;
        const increment = Math.ceil(endVal / steps);

        const timer = setInterval(() => {
          startVal += increment;
          if (startVal >= endVal) {
            target.textContent = endVal.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            target.textContent = startVal.toLocaleString() + suffix;
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  };

  const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5
  });

  statNumbers.forEach(stat => counterObserver.observe(stat));

  // ==========================================
  // 6. IDEARIO / VALUES QUOTE GENERATOR
  // ==========================================
  const quotes = [
    {
      text: "Patriotismo civico, servicio al ciudadano y defensa del interes publico.",
      author: "Principios Rectores del Plan de Gobierno PPP"
    },
    {
      text: "Transparencia, integridad, prevencion de la corrupcion y rendicion de cuentas.",
      author: "Principios Rectores del Plan de Gobierno PPP"
    },
    {
      text: "Seguridad ciudadana integral, con prevencion, tecnologia, articulacion interinstitucional y participacion vecinal.",
      author: "Principios Rectores del Plan de Gobierno PPP"
    },
    {
      text: "Desarrollo economico local basado en formalizacion, empleo digno, innovacion, MYPES y atraccion de inversiones.",
      author: "Principios Rectores del Plan de Gobierno PPP"
    },
    {
      text: "Sostenibilidad ambiental, economia circular, arbolado urbano, reduccion de residuos y adaptacion climatica.",
      author: "Principios Rectores del Plan de Gobierno PPP"
    }
  ];

  let currentQuoteIndex = 0;
  const quoteMain = document.getElementById("idearioQuote");
  const quoteAuthor = document.getElementById("idearioMeta");
  const btnNextQuote = document.getElementById("btnNextQuote");

  if (btnNextQuote && quoteMain && quoteAuthor) {
    btnNextQuote.addEventListener("click", () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      
      // Fade transition effect
      quoteMain.style.opacity = 0;
      quoteAuthor.style.opacity = 0;

      setTimeout(() => {
        quoteMain.textContent = `"${quotes[currentQuoteIndex].text}"`;
        quoteAuthor.textContent = `— ${quotes[currentQuoteIndex].author}`;
        quoteMain.style.opacity = 1;
        quoteAuthor.style.opacity = 1;
      }, 300);
    });

    // Initial transition setups
    quoteMain.style.transition = "opacity 0.3s ease";
    quoteAuthor.style.transition = "opacity 0.3s ease";
  }

  // ==========================================
  // 7. INTERACTIVE ZONE DIAGNOSIS DASHBOARD
  // ==========================================
  const zoneButtons = document.querySelectorAll(".zone-select-btn");
  const zoneNameEl = document.getElementById("zoneName");
  const zoneDescEl = document.getElementById("zoneDesc");
  const zoneActionBox = document.getElementById("zoneActionBox");
  const zoneProposedActionEl = document.getElementById("zoneProposedAction");

  // Real zones diagnostics and actions database
  const zoneData = {
    "Zona 1: Salamanca / Olimpo": {
      desc: "Congestion vial pesada en accesos, necesidad de mantenimiento preventivo de areas verdes en urbanizaciones y mejora de seguridad en paraderos comerciales.",
      action: "Instalacion de la Base N. 1 de Serenazgo, reordenamiento del transito en accesos principales e iluminacion LED completa de parques y paraderos."
    },
    "Zona 2: Valdiviezo / San Jacinto": {
      desc: "Baches viales en calles secundarias, necesidad de saneamiento de titulos prediales y delincuencia comun focalizada.",
      action: "Despliegue de mantenimiento asfaltico del programa Cero Baches, catastro digital acelerado y patrullaje integrado con la Policia Nacional."
    },
    "Zona 3: Vitarte Central / Ceres": {
      desc: "Comercio informal desordenado en Av. Nicolas Ayllon, alta incidencia de hurtos en paraderos de transporte publico y contaminacion acustica.",
      action: "Establecimiento del Plan regulador de vehiculos menores, instalacion de camaras inteligentes con analitica y reordenamiento de espacios comerciales."
    },
    "Zona 4: Santa Clara / Los Angeles": {
      desc: "Falta de iluminacion en el entorno de las estaciones de la Linea 2 del Metro de Lima, deterioro de veredas peatonales y baches.",
      action: "Plan de accesibilidad peatonal y veredas seguras en el entorno del Metro, y mantenimiento vial inmediato."
    },
    "Zona 5: Manylsa / Mayorazgo": {
      desc: "Falta de areas verdes y parques recreativos publicos en Manylsa, pistas sin pavimentar en las partes altas y delincuencia patrimonial.",
      action: "Reforestacion masiva del programa Ate Verde, pavimentacion de accesos del programa Pistas Seguras e incremento de patrullaje preventivo."
    },
    "Zona 6: Huaycán": {
      desc: "Acumulacion critica de basura y desmonte, falta de agua y areas verdes en zonas altas, y necesidad de patrullaje preventivo permanente.",
      action: "Rutas georreferenciadas de recoleccion de basura, erradicacion de quemas, instalacion de la Base N. 6 de Serenazgo y arborizacion."
    },
    "Zona 7: Pariachi / Horacio Zeballos": {
      desc: "Crecimiento urbano desordenado, falta de veredas seguras y rampas de accesibilidad en Horacio Zeballos, y puntos de vertido de desmonte en riberas.",
      action: "Recuperacion de la ribera del rio Rimac por tramos, pavimentacion de veredas seguras y fiscalizacion tributaria descentralizada."
    }
  };

  zoneButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Highlight active button
      zoneButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const zoneKey = btn.getAttribute("data-zone");
      const data = zoneData[zoneKey];

      if (data) {
        zoneNameEl.textContent = zoneKey;
        zoneDescEl.textContent = data.desc;
        zoneProposedActionEl.textContent = data.action;
        zoneActionBox.style.display = "block";
        zoneActionBox.style.animation = "fadeIn 0.3s ease";
      }
    });
  });

  // ==========================================
  // 8. CITIZEN MAILBOX FORM (BUZÓN VECINAL)
  // ==========================================
  const vecinoForm = document.getElementById("vecinoForm");
  const formSuccessMessage = document.getElementById("formSuccessMessage");
  const btnShareWhatsapp = document.getElementById("btnShareWhatsapp");
  const btnResetForm = document.getElementById("btnResetForm");

  if (vecinoForm) {
    vecinoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("repNombre").value.trim() || "Vecino Anonimo";
      const zona = document.getElementById("repZona").value;
      const tipo = document.getElementById("repTipo").value;
      const mensaje = document.getElementById("repMensaje").value.trim();

      // Form validation
      if (!zona || !tipo || !mensaje) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }

      // Hide form, show success
      vecinoForm.style.display = "none";
      formSuccessMessage.style.display = "block";

      // Prefill WhatsApp link with dynamic message
      const textMessage = encodeURIComponent(
        `Hola Gianmarco Tobalino,\n\nSoy ${nombre} de la zona de *${zona}*.\nQuiero reportar un problema de *${tipo}*:\n\n"${mensaje}"\n\nEnviado desde el Buzon Vecinal.`
      );
      btnShareWhatsapp.href = `https://wa.me/51999999999?text=${textMessage}`;
    });
  }

  if (btnResetForm && vecinoForm) {
    btnResetForm.addEventListener("click", () => {
      vecinoForm.reset();
      formSuccessMessage.style.display = "none";
      vecinoForm.style.display = "block";
    });
  }

  // ==========================================
  // 9. MULTI-STEP VOLUNTEER WIZARD
  // ==========================================
  const steps = document.querySelectorAll(".wizard-step");
  const indicators = document.querySelectorAll(".step-indicator");
  const btnNextList = document.querySelectorAll(".btn-next");
  const btnPrevList = document.querySelectorAll(".btn-prev");
  const btnSubmitWizard = document.getElementById("btnSubmitWizard");
  const wizardSummary = document.getElementById("wizardSummary");

  // Temporary wizard state storage
  let wizardData = {
    nombre: "",
    celular: "",
    zona: "",
    ayudas: []
  };

  // Next Step Action
  btnNextList.forEach(btn => {
    btn.addEventListener("click", () => {
      const nextStepId = btn.getAttribute("data-next");
      
      // Validation for Step 1
      if (nextStepId === "step2") {
        const nombreVal = document.getElementById("wizNombre").value.trim();
        const celularVal = document.getElementById("wizCelular").value.trim();
        const zonaVal = document.getElementById("wizZona").value;

        if (!nombreVal || !celularVal || !zonaVal) {
          alert("Por favor, completa todos tus datos personales.");
          return;
        }

        wizardData.nombre = nombreVal;
        wizardData.celular = celularVal;
        wizardData.zona = zonaVal;
      }

      // Validation for Step 2
      if (nextStepId === "step3") {
        const checkboxes = document.querySelectorAll('input[name="colaboracion"]:checked');
        const selectedAyudas = Array.from(checkboxes).map(cb => cb.parentNode.querySelector("strong").textContent);
        
        if (selectedAyudas.length === 0) {
          alert("Por favor, selecciona al menos una forma de colaborar.");
          return;
        }

        wizardData.ayudas = selectedAyudas;

        // Build Summary Box for Step 3
        if (wizardSummary) {
          wizardSummary.innerHTML = `
            <p><strong>Nombre:</strong> ${wizardData.nombre}</p>
            <p><strong>Telefono:</strong> ${wizardData.celular}</p>
            <p><strong>Zona:</strong> ${wizardData.zona}</p>
            <p><strong>Colaboracion:</strong> ${wizardData.ayudas.join(", ")}</p>
          `;
        }
      }

      // Transition steps
      goToStep(nextStepId);
    });
  });

  // Previous Step Action
  btnPrevList.forEach(btn => {
    btn.addEventListener("click", () => {
      const prevStepId = btn.getAttribute("data-prev");
      goToStep(prevStepId);
    });
  });

  // Switch display state helper
  function goToStep(stepId) {
    steps.forEach(step => {
      step.classList.remove("active");
      if (step.id === stepId) {
        step.classList.add("active");
      }
    });

    // Update indicator indicators classes
    let activeStepNum = 1;
    if (stepId === "step1") activeStepNum = 1;
    else if (stepId === "step2") activeStepNum = 2;
    else if (stepId === "step3") activeStepNum = 3;

    indicators.forEach(ind => {
      const indNum = parseInt(ind.getAttribute("data-step"), 10);
      ind.classList.remove("active", "done");
      if (indNum === activeStepNum) {
        ind.classList.add("active");
      } else if (indNum < activeStepNum) {
        ind.classList.add("done");
      }
    });
  }

  // Wizard Submit
  if (btnSubmitWizard) {
    btnSubmitWizard.addEventListener("click", () => {
      // Hide Step indicators
      const stepsIndicator = document.querySelector(".wizard-steps-indicator");
      if (stepsIndicator) stepsIndicator.style.display = "none";

      // Show Success Pane
      goToStep("stepSuccess");
    });
  }

  // ==========================================
  // 10. UNIFIED PROPOSALS AXIS SLIDER
  // ==========================================
  const proposalsTrack = document.getElementById("proposalsTrack");
  const proposalsSlides = document.querySelectorAll(".proposals-slide-pane");
  const btnPrevEje = document.getElementById("btnPrevEje");
  const btnNextEje = document.getElementById("btnNextEje");
  const proposalsDots = document.querySelectorAll("#proposalsSliderDots .dot");
  const proposalsTabButtons = document.querySelectorAll("#propuestasTabs .tab-btn");

  let currentEjeIndex = 0;
  const totalEjes = proposalsSlides.length;

  function updateEjeSlider() {
    // Translate the track horizontally
    if (proposalsTrack) {
      proposalsTrack.style.transform = `translateX(-${currentEjeIndex * 100}%)`;
    }

    // Update active tab buttons (shortcut indicator)
    proposalsTabButtons.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === currentEjeIndex);
    });

    // Update active dots
    proposalsDots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentEjeIndex);
    });
  }

  // Arrow button handlers
  if (btnPrevEje && btnNextEje) {
    btnPrevEje.addEventListener("click", () => {
      currentEjeIndex = (currentEjeIndex - 1 + totalEjes) % totalEjes;
      updateEjeSlider();
    });

    btnNextEje.addEventListener("click", () => {
      currentEjeIndex = (currentEjeIndex + 1) % totalEjes;
      updateEjeSlider();
    });
  }

  // Dot button click handlers
  proposalsDots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      currentEjeIndex = idx;
      updateEjeSlider();
    });
  });

  // Tab shortcut button click handlers
  proposalsTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-slide-index"), 10);
      currentEjeIndex = idx;
      updateEjeSlider();
    });
  });

});
