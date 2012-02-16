document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var gallery,
  el,
  i,
  page,
  dots = document.querySelectorAll('#nav li'),
  slides = [
    {
      img: 'images/pic01.jpg',
      width: 300,
      height: 164,
      desc: '马家龙2012农村演唱会！（最多20个字）'
    },
    {
      img: 'images/pic02.jpg',
      width: 300,
      height: 164,
      desc: '马家龙2012农村演唱会！（最多20个字）'
    },
    {
      img: 'images/pic03.jpg',
      width: 300,
      height: 164,
      desc: '马家龙2012农村演唱会！（最多20个字）'
    },
    {
      img: 'images/pic04.jpg',
      width: 300,
      height: 164,
      desc: '马家龙2012农村演唱会！（最多20个字）'
    },
    {
      img: 'images/pic05.jpg',
      width: 300,
      height: 164,
      desc: '马家龙2012农村演唱会！（最多20个字）'
    },
    {
      img: 'images/pic06.jpg',
      width: 300,
      height: 164,
      desc: '马家龙2012农村演唱会！（最多20个字）'
    }
  ];

gallery = new SwipeView('#photoWrapper', { numberOfPages: slides.length });

// Load initial data
for (i=0; i<3; i++) {
  page = i==0 ? slides.length-1 : i-1;
  el = document.createElement('img');
  el.className = 'loading';
  el.src = slides[page].img;
  el.width = slides[page].width;
  el.height = slides[page].height;
  el.onload = function () { this.className = ''; }
  gallery.masterPages[i].appendChild(el);

  el = document.createElement('span');
  el.innerHTML = slides[page].desc;
  gallery.masterPages[i].appendChild(el)
}

gallery.onFlip(function () {
  var el,
    upcoming,
    i;

  for (i=0; i<3; i++) {
    upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;

    if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
      el = gallery.masterPages[i].querySelector('img');
      el.className = 'loading';
      el.src = slides[upcoming].img;
      el.width = slides[upcoming].width;
      el.height = slides[upcoming].height;
      
      el = gallery.masterPages[i].querySelector('span');
      el.innerHTML = slides[upcoming].desc;
    }
  }
  
  document.querySelector('#nav .selected').className = '';
  dots[gallery.pageIndex+1].className = 'selected';
});

gallery.onMoveOut(function () {
  gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
});

gallery.onMoveIn(function () {
  var className = gallery.masterPages[gallery.currentMasterPage].className;
  /(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
});
