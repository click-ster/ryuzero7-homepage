// 入門書の各ページ画像(book/p01.webp 〜 p54.webp)
const PAGES = Array.from({length: 54}, function(_, n){
  return 'book/p' + String(n + 1).padStart(2, '0') + '.webp';
});
(function(){
  var i = 0;
  var $ = function(id){ return document.getElementById(id); };
  var img = $('page'), cur = $('cur'), slider = $('slider'), prev = $('prev'), next = $('next'),
      stage = $('stage'), zoom = $('zoom'), missing = $('book-missing');
  $('tot').textContent = PAGES.length; slider.max = PAGES.length;

  // ページを表示する
  function show(n){
    i = Math.min(Math.max(n, 0), PAGES.length - 1);
    img.src = PAGES[i]; img.alt = '入門書 ' + (i + 1) + 'ページ目';
    cur.textContent = i + 1; slider.value = i + 1;
    prev.disabled = i === 0; next.disabled = i === PAGES.length - 1;
    stage.scrollLeft = 0;
  }
  prev.addEventListener('click', function(){ show(i - 1); });
  next.addEventListener('click', function(){ show(i + 1); });
  slider.addEventListener('input', function(){ show(parseInt(slider.value, 10) - 1); });

  // 拡大して読む
  zoom.addEventListener('click', function(){
    var on = stage.classList.toggle('zoom');
    zoom.setAttribute('aria-pressed', on); zoom.textContent = on ? '全体を表示' : '拡大して読む';
  });

  // 左右の矢印キーでページ移動
  $('reader').addEventListener('keydown', function(e){
    if (e.target === slider) return;
    if (e.key === 'ArrowLeft') { show(i - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { show(i + 1); e.preventDefault(); }
  });

  // 画像が見つからないとき
  img.addEventListener('error', function(){ stage.hidden = true; missing.hidden = false; });
  img.addEventListener('load', function(){ stage.hidden = false; missing.hidden = true; });

  show(0);
})();
