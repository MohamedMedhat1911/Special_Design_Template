// Handle Active Function
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
}
document.documentElement.style.setProperty("scroll-behavior", "smooth");
// Landing Page
let backgroundImgs = [
  "imgs/01.jpg",
  "imgs/02.jpg",
  "imgs/03.jpg",
  "imgs/04.jpg",
  "imgs/05.jpg",
];
let backgroundOption = true;
let backgroundInterval;
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * backgroundImgs.length);
      document.querySelector(".landing-page").style.backgroundImage =
        "url('" + backgroundImgs[randomNum] + "')";
    }, 5000);
  }
}
randomizeImgs();
// Local Storage Color Check
if (localStorage.getItem("color_option") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${localStorage.getItem("color_option")}"]`)
    .classList.add("active");
}
// Local Storage Background Check
if (localStorage.getItem("background_option") !== null) {
  document
    .querySelectorAll(".settings-box .random-background span")
    .forEach((ele) => {
      ele.classList.remove("active");
    });
  if (localStorage.getItem("background_option") == "yes") {
    document.querySelector(".random-background .yes").classList.add("active");
    backgroundOption = true;
    randomizeImgs();
  } else {
    document.querySelector(".random-background .no").classList.add("active");
    backgroundOption = false;
    clearInterval(backgroundInterval);
  }
}
// Local Storage Show Bullets Check
if (localStorage.getItem("bullet-option") != null) {
  document.querySelectorAll(".bullets-option span").forEach((span) => {
    span.classList.remove("active");
  });
  if (localStorage.getItem("bullet-option") == "show") {
    document.querySelector(".nav-bullets").style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    document.querySelector(".nav-bullets").style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
// Settings Box
let gear = document.querySelector(".fa-gear");
let settingsBox = document.querySelector(".settings-box");
gear.onclick = function () {
  settingsBox.classList.toggle("open");
  this.classList.toggle("fa-spin");
};
// Switch Colors
let colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((el) => {
  el.addEventListener("click", (e) => {
    // colorsLi.forEach((ele) => {
    //   ele.classList.remove("active");
    // });
    // e.target.classList.add("active");
    handleActive(e);
    localStorage.setItem("color_option", e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
  });
});
// Random Background
let backgroundSpan = document.querySelectorAll(
  ".settings-box .random-background span"
);
backgroundSpan.forEach((el) => {
  el.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background == "yes") {
      backgroundOption = true;
      randomizeImgs();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
    localStorage.setItem("background_option", e.target.dataset.background);
  });
});
// Progress Load On Scroll
let skills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsHeight = skills.offsetHeight;
  let skillsTop = skills.offsetTop;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;
  if (windowScrollTop > skillsHeight + skillsTop - windowHeight) {
    let progressElements = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    progressElements.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};
// Gallery Popup Box
let ourGallery = document.querySelectorAll(".gallery .imgs-box img");
ourGallery.forEach((e) => {
  e.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    popupBox.onclick = function (e) {
      e.stopPropagation();
    };
    let imgHeading = document.createElement("h3");
    let imgText = document.createTextNode(e.alt);
    imgHeading.appendChild(imgText);
    popupBox.appendChild(imgHeading);
    let popupImage = document.createElement("img");
    popupImage.src = e.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
    closeButton.addEventListener("click", function () {
      popupBox.remove();
      overlay.remove();
    });
  });
});
document.querySelector(".imgs-box").onclick = function (e) {
  e.stopPropagation();
};
document.addEventListener("click", (ele) => {
  if (document.body.contains(document.querySelector(".popup-box"))) {
    if (ele.target !== document.querySelector(".popup-box")) {
      document.querySelector(".popup-box").remove();
      document.querySelector(".popup-overlay").remove();
    }
  }
});
// Another Solution ####################################
// document.addEventListener("click", (ele) => {
//   if (ele.target.className == "close-button") {
//     ele.target.parentNode.remove();
//     document.querySelector(".popup-overlay").remove();
//   }
// });
// Another Solution ####################################
// Scrolling Between Sections
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView();
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);
// Show Or Hide Bullets Option
let bulletOptions = document.querySelectorAll(".bullets-option span");
let navBullets = document.querySelector(".nav-bullets");
bulletOptions.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    localStorage.setItem("bullet-option", e.target.dataset.display);
    if (e.target.dataset.display === "show") {
      navBullets.style.display = "block";
    } else {
      navBullets.style.display = "none";
    }
  });
});
// Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// Responsive Menu
let toggleBtn = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".header .links");
let allButtonSpan = document.querySelectorAll(".toggle-menu span");
toggleBtn.onclick = (e) => {
  e.stopPropagation();
  toggleBtn.classList.toggle("menu-active");
  theLinks.classList.toggle("open");
  allButtonSpan.forEach((span) => {
    span.classList.toggle("close");
  });
};
theLinks.onclick = function (e) {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== theLinks) {
    if (theLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      theLinks.classList.toggle("open");
      allButtonSpan.forEach((span) => {
        span.classList.toggle("close");
      });
    }
  }
});
