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

    // Hide form success message initially
    document.getElementById("formSuccess").classList.add("hidden");

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
  document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const formSuccess = document.getElementById("formSuccess");
      const response = await fetch("https://formsubmit.co/ajax/mar.hoepfler@icloud.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        }),
      });

      if (response.ok) {
        formSuccess.classList.remove("hidden");
        formSuccess.classList.add("visible");
        form.reset();
        setTimeout(() => {
          formSuccess.classList.remove("visible");
          formSuccess.classList.add("hidden");
        }, 5000);
      } else {
        console.error("Formularübermittlung fehlgeschlagen:", response.status);
      }
    } catch (error) {
      console.error("Fehler beim Formularversand:", error);
    }
  });
} catch (error) {
  console.error("Fehler im Formular-Handler:", error);
}
