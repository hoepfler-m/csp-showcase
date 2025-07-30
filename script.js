// -----------------------------------
// Initialize Page
// -----------------------------------
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize Lucide Icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    } else {
      console.error("Lucide-Bibliothek nicht geladen!");
    }

    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Ensure form success message is hidden
    const formSuccess = document.getElementById("formSuccess");
    if (formSuccess) {
      formSuccess.classList.add("hidden");
      formSuccess.classList.remove("visible");
    } else {
      console.error("formSuccess-Element nicht gefunden!");
    }

    console.log("Seite initialisiert");
  } catch (error) {
    console.error("Fehler bei der Initialisierung:", error);
  }
});

// Fallback for older browsers
window.onload = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// -----------------------------------
// Section Visibility Observer
// -----------------------------------
try {
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((section) => observer.observe(section));
} catch (error) {
  console.error("Fehler im Intersection Observer:", error);
}

// -----------------------------------
// Scroll Progress and Back to Top
// -----------------------------------
window.addEventListener("scroll", () => {
  try {
    requestAnimationFrame(() => {
      // Progress Bar
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.querySelector(".progress-bar").style.width = `${scrollPercent}%`;

      // Back to Top Visibility
      const backToTop = document.querySelector(".back-to-top");
      backToTop.classList.toggle("visible", scrollTop > 300);
    });
  } catch (error) {
    console.error("Fehler im Scroll-Handler:", error);
  }
});

// -----------------------------------
// Contact Form Submission
// -----------------------------------
try {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const formSuccess = document.getElementById("formSuccess");
        const response = await fetch("https://formsubmit.co/ajax/mar.hoepfler@icloud.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
          }),
        });

        if (response.ok) {
          formSuccess.classList.remove("hidden");
          formSuccess.classList.add("visible");
          e.target.reset();
          setTimeout(() => {
            formSuccess.classList.remove("visible");
            formSuccess.classList.add("hidden");
          }, 5000);
        } else {
          console.error("Formularübermittlung fehlgeschlagen:", response.status);
          alert("Fehler beim Senden der Nachricht. Bitte versuche es erneut.");
        }
      } catch (error) {
        console.error("Fehler beim Formularversand:", error);
        alert("Ein Fehler ist aufgetreten. Bitte überprüfe deine Internetverbindung.");
      }
    });
  } else {
    console.error("contactForm-Element nicht gefunden!");
  }
} catch (error) {
  console.error("Fehler im Formular-Handler:", error);
}
