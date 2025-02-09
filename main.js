/* Preloading */

document.addEventListener("DOMContentLoaded", () => {
    const preload = document.querySelector(".preload");
    const content = document.querySelector(".content");

    if(preload && content) {
        setTimeout(() => {
            preload.style.opacity = "0";

            setTimeout(()=>{
                preload.style.display = "none";
                content.style.opacity = "1";
            }, 1000)
        })
    }
})


/* Content */

const projectsHolder = document.querySelector(".projectsHolder");

//draggable slider
let isDown;
let startX;
let scrollLeft;

const onDown = (e) => {
  isDown = true;
  startX = e.pageX - projectsHolder.offsetLeft;
  scrollLeft = projectsHolder.scrollLeft;
};

const onLeaveAndUp = () => {
  isDown = false;
};

const onMove = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - projectsHolder.offsetLeft;
  const walk = (x - startX) * 3;
  projectsHolder.scrollLeft = scrollLeft - walk;
};

projectsHolder.addEventListener("mousedown", (e) => onDown(e));
projectsHolder.addEventListener("mouseup", onLeaveAndUp);
projectsHolder.addEventListener("mouseleave", onLeaveAndUp);
projectsHolder.addEventListener("mousemove", (e) => onMove(e));

//moving by buttons
const leftButton = document.querySelector(".prev");
const rightButton = document.querySelector(".next");
const project = document.querySelector(".project");

let scrollLeftMax = projectsHolder.scrollWidth - projectsHolder.clientWidth;
let projectWidth = project.offsetWidth;

const checkControlls = () => {
  projectsHolder.scrollLeft === 0
    ? leftButton.classList.add("hide")
    : leftButton.classList.remove("hide");

  projectsHolder.scrollLeft === scrollLeftMax
    ? rightButton.classList.add("hide")
    : rightButton.classList.remove("hide");
};

checkControlls();

window.onresize = () => {
  scrollLeftMax = projectsHolder.scrollWidth - projectsHolder.clientWidth;

  projectWidth = project.offsetWidth;

  checkControlls();
};

projectsHolder.addEventListener("scroll", (e) => {
  const element = e.target;

  element.scrollLeft === 0
    ? leftButton.classList.add("hide")
    : leftButton.classList.remove("hide");

  Math.ceil(element.scrollLeft) >= scrollLeftMax
    ? rightButton.classList.add("hide")
    : rightButton.classList.remove("hide");
});

leftButton.onclick = () => {
  projectsHolder.scrollLeft -= projectWidth + 10;
};

rightButton.onclick = () => {
  projectsHolder.scrollLeft += projectWidth + 10;
};
