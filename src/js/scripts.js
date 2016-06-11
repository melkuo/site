document.addEventListener('DOMContentLoaded', function() {
  var order = ["docscom", "connect", "tabbit", "beacon"],
    prevEl = document.querySelector("[role='prev-proj']"),
    nextEl = document.querySelector("[role='next-proj']"),
    path = (/\/([^]*)\.html/).exec(window.location.pathname)[1], /* 0 = match, 1 = capture */
    i = order.indexOf(path);

  document.querySelector("[role='to-index']").classList.remove("hide");

  if (order[i-1]) {
    prevEl.setAttribute("href", order[i-1].concat(".html"));
    prevEl.appendChild(document.createTextNode("Back to " + cmap[order[i-1]]));
    prevEl.classList.remove("hide");
  }

  if (order[i+1]) {
    nextEl.setAttribute("href", order[i+1].concat(".html"));
    nextEl.appendChild(document.createTextNode("Next to " + cmap[order[i+1]]));
    nextEl.classList.remove("hide");
  }

});
