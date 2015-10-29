document.addEventListener('DOMContentLoaded', function() {
  var order = ["connect", "tabbit", "contrave", "robot", "thread", "red"],
    prevEl = document.querySelector("[role='prev-proj']"),
    nextEl = document.querySelector("[role='next-proj']"),
    path = (/\/([^]*)\.html/).exec(window.location.pathname)[1],
      /* 0 = match, 1 = capture */
    i = order.indexOf(path);

  if (order[i-1]) {
    prevEl.setAttribute("href", order[i-1].concat(".html"));
    prevEl.classList.remove("hide");
  }

  if (order[i+1]){
    nextEl.setAttribute("href", order[i+1].concat(".html"));
    nextEl.classList.remove("hide");
  }
});