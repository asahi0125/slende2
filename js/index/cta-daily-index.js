document.addEventListener("DOMContentLoaded", () => {
  const ctaContainer = document.getElementById("cta-container");

  const ctaPatterns = [
    `<div class="cta-block"><p>あなたにぴったりの一皿は？</p><a class="daily-cta-button" href="lp.html#menu">メニューを見る</a></div>`,
    `<div class="cta-block"><p>あなたにぴったりの一皿は？</p><a class="daily-cta-button" href="lp.html#menu?type=lunch">ランチを楽しむ</a></div>`,
    `<div class="cta-block"><p>あなたにぴったりの一皿は？</p><a class="daily-cta-button" href="lp.html#menu?type=dinner">ディナーで味わう</a></div>`,
    `<div class="cta-block"><p>あなたにぴったりの一皿は？</p><a class="daily-cta-button" href="lp.html#menu?type=course">贅沢なコースを選ぶ</a></div>`,
    `<div class="cta-block"><p>あなたにぴったりの一皿は？</p><a class="daily-cta-button" href="lp.html#menu">今日は何食べる？</a></div>`,
    `<div class="cta-block"><p>気分で選ぼう、今夜のご褒美</p><a class="daily-cta-button" href="lp.html#menu">メニューをチェック</a></div>`,
    `<div class="cta-block"><p>週末の贅沢、一皿から</p><a class="daily-cta-button" href="lp.html#menu?type=course">ディナーコースを見る</a></div>`
  ];

  const today = new Date().getDay();
  if (ctaContainer) {
    ctaContainer.innerHTML = ctaPatterns[today];
  }
});
