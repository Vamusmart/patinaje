/////// COOKIE START ///////

const cookieStorage = {
  getItem: (item) => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce((acc, [key, value]) => {
        acc[key.trim()] = value;
        return acc;
      }, {});
    return cookies[item];
  },

  setItem: (item, value) => {
    document.cookie = `${item}=${value}; path=/`;
  },
};

const storageType = cookieStorage;
const consentPropertyName = "Playground-HelloCookie";

const shouldShowPopup = () => !storageType.getItem(consentPropertyName);

const saveToStorage = () => storageType.setItem(consentPropertyName, true);

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add("loaded");
    });
  });

  const consentPopup = document.getElementById("consent-popup");
  const acceptBtn = document.getElementById("accept");

  if (acceptBtn && consentPopup) {
    const acceptFn = () => {
      saveToStorage();
      consentPopup.classList.add("hidden");
    };

    acceptBtn.addEventListener("click", acceptFn);

    if (shouldShowPopup()) {
      setTimeout(() => {
        consentPopup.classList.remove("hidden");
      }, 2000);
    }
  }
});

/////// COOKIE END ///////

document.querySelectorAll('.mySlides img').forEach(img => {
  img.onload = () => img.classList.add('loaded');
});


///// NAVBAR START /////

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const navbar = document.getElementById("navbar");

  if (!burger || !nav || !navbar) return;

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");

    navLinks.forEach((link, index) => {
      link.style.animation = link.style.animation
        ? ""
        : `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`;
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
      navLinks.forEach((l) => (l.style.animation = ""));
    });
  });

  // window.addEventListener("scroll", () => {
  //   navbar.classList.toggle("scrolled", window.scrollY > 0);
  // });
});

///// NAVBAR END /////


///// SLIDER START /////

let slideIndex = 1;
let timer = null;
// Memorizziamo i riferimenti agli elementi attivi
let currentActiveSlide = null;
let currentActiveDot = null;

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  
  if (slides.length > 0) {
    currentActiveSlide = slides[0];
  }
  if (dots.length > 0) {
    currentActiveDot = dots[0];
  }
  
  showSlides(slideIndex);
});

function showSlides(n) {
  // 1. Cancella SEMPRE il timer precedente per evitare conflitti e loop infiniti
  if (timer) {
    clearTimeout(timer);
  }

  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (!slides.length) return;

  // 2. Rimuovi la classe active in modo ultra-specifico
  const activeSlide = document.querySelector(".mySlides.active");
  const activeDot = document.querySelector(".dot.active");

  if (activeSlide) activeSlide.classList.remove("active");
  if (activeDot) activeDot.classList.remove("active");

  // Calcolo dell'indice
  if (n === undefined) {
    slideIndex++;
  } else {
    slideIndex = n;
  }

  if (slideIndex > slides.length) slideIndex = 1;
  if (slideIndex < 1) slideIndex = slides.length;

  // 3. Applica la classe active alla slide e al dot corrente
  slides[slideIndex - 1].classList.add("active");
  
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  }

  // 4. Salva il nuovo timer
  timer = setTimeout(() => showSlides(), 4000);
}

///// SLIDER END /////


///// CONTACT START /////

const fields = {};

document.addEventListener("DOMContentLoaded", () => {
  fields.firstName = document.getElementById("firstName");
  fields.lastName = document.getElementById("lastName");
  fields.email = document.getElementById("email");
  fields.message = document.getElementById("message");
});

const isNotEmpty = (value) => value && value.trim().length > 0;

const isEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(String(email).toLowerCase());
};

const fieldValidation = (field, validationFunction) => {
  if (!field) return false;

  const valid = validationFunction(field.value);

  if (!valid) {
    if (typeof display_message !== "undefined") {
      display_message.innerHTML = "Controlla email e messaggio";
    }
    field.style.borderColor = "red";
  } else {
    field.style.borderColor = "";
  }

  return valid;
};

const isValid = () => {
  let valid = true;

  valid &= fieldValidation(fields.email, isEmail);
  valid &= fieldValidation(fields.message, isNotEmpty);

  return valid;
};

class User {
  constructor(firstName, lastName, email, message) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.message = message;
  }
}

const sendContact = () => {
  const display_message = document.getElementById("display_message");

  if (isValid()) {
    const usr = new User(
      fields.firstName?.value,
      fields.lastName?.value,
      fields.email?.value,
      fields.message?.value
    );

    if (display_message) {
      display_message.innerHTML = "Grazie per il messaggio.";
    }

    if (fields.email) fields.email.style.display = "none";
    if (fields.message) fields.message.style.display = "none";
  } else {
    if (display_message) {
      display_message.innerHTML = "Ricontrolla email e messaggio";
    }
  }
};

///// CONTACT END /////