const coffeeUrl = "https://toss.me/eungyeole";
const url = "https://search.naver.com/search.naver?query=";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

async function fetcher() {
  const { top10 } = await (
    await fetch("https://api.signal.bz/news/realtime")
  ).json();
  return top10;
}

const initializeRealTimeWords = async () => {
  const containerElement = document.getElementById("right-content-area");
  const realtimeKeywordElement = document.getElementById("realtime_keyword");

  if (containerElement && !realtimeKeywordElement) {
    const data = await fetcher();

    const wrapper = document.createElement("div");
    wrapper.id = "realtime_keyword";
    wrapper.appendChild(RealItemWordsList(data));
    wrapper.appendChild(DropDownMenu(data));

    containerElement.prepend(wrapper);
    const sliderViewport =
      document.getElementsByClassName("slider-viewport")[0];
    const sliderInterval = elementAdaptSlider(sliderViewport);
    sliderInterval();
  }
};

const waitRightContentArea = setInterval(() => {
  const containerElement = document.getElementById("right-content-area");
  if (containerElement) {
    clearInterval(waitRightContentArea);
    initializeRealTimeWords();
  }
}, 1000);

if (window.location.host === "search.naver.com") {
  waitRightContentArea();
}

function onToggle() {
  const dropdownElement = document.getElementsByClassName("keywords-menu")[0];
  const state = dropdownElement.style.display === "none" ? "flex" : "none";
  dropdownElement.style.display = state;
}

function elementAdaptSlider(element) {
  const sliderInterval = () =>
    setInterval(() => {
      const length = element.childElementCount * 100;
      const now = parseInt(element.style.transform.replace(/[^0-9]/g, ""));
      if (now + 100 < length)
        element.style.transform = `translateY(-${now + 100}%)`;
      else element.style.transform = `translateY(-0%)`;
    }, 5000);
  return sliderInterval;
}

function RealItemWordsList(props = []) {
  const element = document.createElement("div");
  const slider = Slider();
  const moreButton = MoreButton(onToggle);
  element.className = "group_keywords";
  slider.append(...Object.keys(props).map((i) => RealTimeWordsItem(props[i])));
  element.append(slider, moreButton);
  return element;
}

function Slider() {
  const slider = document.createElement("div");
  slider.className = "slider-viewport";
  slider.style.transform = "translateY(0%)";
  return slider;
}

function MoreButton(event) {
  const element = document.createElement("a");
  element.className = "keywords_more";
  event && element.addEventListener("click", event);
  return element;
}

function RealTimeWordsItem(props) {
  const { rank, keyword, state } = props;
  const element = document.createElement("div");
  const aTag = document.createElement("a");
  aTag.href = url + keyword;
  aTag.className = "rank-item";
  aTag.innerHTML = `
        <span class="rank-num">${rank}</span>
        <span class="rank-text">${keyword}</span>
    `;
  element.appendChild(aTag);
  aTag.appendChild(RankIcon(state));
  return element;
}

function RankIcon(state) {
  const element = document.createElement("span");
  element.className =
    state === "+" ? "rate_up" : state === "-" ? "rate_down" : "rate_stable";
  return element;
}

function DropDownMenuItem(props) {
  const { rank, keyword, state } = props;
  const element = document.createElement("div");
  const aTag = document.createElement("a");
  aTag.href = url + keyword;
  aTag.className = "menu-item";
  aTag.innerHTML = `
        <span class="rank-num">${rank}</span>
        <span class="rank-text">${keyword}</span>
    `;
  aTag.appendChild(RankIcon(state));
  element.appendChild(aTag);
  return element;
}

function DropDownMenuList(props = []) {
  const element = document.createElement("div");
  element.className = "menu-list";
  element.append(...Object.keys(props).map((i) => DropDownMenuItem(props[i])));
  return element;
}

function DropDownHeader() {
  const element = document.createElement("div");
  element.className = "menu-header";

  const title = document.createElement("h1");
  title.className = "menu-header_title";
  title.innerText = "급상승 검색어";

  const update = document.createElement("span");
  update.className = "menu-header_update";
  const now = new Date();
  update.innerText = koreandateFormat(now);

  element.appendChild(title);
  element.appendChild(update);
  return element;
}

function DropDownMenu(data) {
  const ads = [];

  const element = document.createElement("div");
  element.className = "keywords-menu";
  element.style.display = "none";
  element.appendChild(DropDownHeader());
  ads.length > 0 &&
    element.appendChild(
      AdsBanner({
        ads,
      })
    );

  element.appendChild(DropDownMenuList(data));
  element.appendChild(DropDownFooter());

  return element;
}

function DropDownFooter() {
  const element = document.createElement("div");
  element.className = "menu-footer";

  const versionTag = document.createElement("span");
  versionTag.className = "menu-footer_text";
  versionTag.innerText = "1.2.0";

  element.appendChild(versionTag);

  return element;
}

function AdsBanner(data) {
  const element = document.createElement("div");
  element.className = "ads_banner";

  const createBannerItem = (src, href) => {
    const bannerItem = document.createElement("a");
    bannerItem.href = href;
    bannerItem.target = "_blank";

    const bannerImage = document.createElement("img");
    bannerImage.src = src;

    bannerItem.appendChild(bannerImage);
    return bannerItem;
  };

  data.ads.forEach((item) => {
    const bannerItem = createBannerItem(item.imageUrl, item.href);
    element.appendChild(bannerItem);
  });

  return element;
}

function koreandateFormat(time = new Date()) {
  const isUnder10 = (num) => (num < 10 ? `0${num}` : num);

  const month = isUnder10(time.getMonth() + 1);
  const date = isUnder10(time.getDate());
  const hours = isUnder10(time.getHours());
  const minutes = isUnder10(time.getMinutes());
  return `${month}. ${date}. ${hours}:${minutes}`;
}
