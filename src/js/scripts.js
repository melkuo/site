document.addEventListener('DOMContentLoaded', function() {
  // Table of contents
  // var toHeadingEls = document.querySelectorAll("[role='toHeading']");

  // for (var i = 0; i < toHeadingEls.length; i++) {
  //   toHeadingEls[i].addEventListener('click', function() {
  //     if (this.classList.contains('active')) { return; }

  //     for (var j = 0; j < toHeadingEls.length; j++) {
  //       toHeadingEls[j].classList.remove('active');
  //     }
  //     this.classList.add('active');
  //   });
  // }

  var spy = new ScrollSpy('#js-scrollspy', '#js-scrollspy-scroller', {
    nav: '.js-scrollspy-nav > li > a',
    className: 'active'
  });

  // Next / previous page
  var order = ["shopify", "docscom", "connect", "camabis"],
    prevEl = document.querySelector("[role='prev-proj']"),
    nextEl = document.querySelector("[role='next-proj']"),
    path = (/\/([^]*)\.html/).exec(window.location.pathname)[1], /* 0 = match, 1 = capture */
    i = order.indexOf(path);

  document.querySelector("[role='to-index']").classList.remove("hide");
  document.title = document.title + " | " + cmap[order[i]];

  if (order[i-1]) {
    prevEl.setAttribute("href", order[i-1].concat(".html"));
    prevEl.appendChild(document.createTextNode("Back to " + cmap[order[i-1]]));
    prevEl.classList.remove("hide");
  }

  if (i != -1 && order[i+1]) {
    nextEl.setAttribute("href", order[i+1].concat(".html"));
    nextEl.appendChild(document.createTextNode("Next to " + cmap[order[i+1]]));
    nextEl.classList.remove("hide");
  }

});
