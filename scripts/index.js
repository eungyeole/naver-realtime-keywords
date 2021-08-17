const containerElement = document.getElementById("NM_FAVORITE");
const weatherElement = document.getElementById("NM_WEATHER");
const url = "https://search.naver.com/search.naver?query=";
weatherElement.style.height="0px"; weatherElement.style.width="0px";

async function fetcher(){
   const { top10 } = await (await fetch("https://api.signal.bz/news/realtime")).json();
    return top10;
}


(async ()=>{
    const data = await fetcher();
    containerElement.appendChild(RealItemWordsList(data));
    containerElement.appendChild(DropDownMenu(data));
    const sliderViewport = document.getElementsByClassName("slider-viewport")[0];
    const sliderInterval = elementAdaptSlider(sliderViewport);
    sliderInterval();
})()


function onToggle(){
    const dropdownElement = document.getElementsByClassName("keywords-menu")[0];
    const state = dropdownElement.style.display==="none" ? "block" : "none";
    dropdownElement.style.display = state;
    console.log("test");
}

function elementAdaptSlider(element){
    const sliderInterval = () => setInterval(()=>{
        const length = element.childElementCount*100;
        const now = parseInt(element.style.transform.replace(/[^0-9]/g, ""));
        if(now+100 < length) element.style.transform=`translateY(-${now+100}%)`;
        else element.style.transform=`translateY(-0%)`
    },5000)
    return sliderInterval;
}

function RealItemWordsList(props = []){
    const element = document.createElement("div");
    const slider = Slider();
    const moreButton = MoreButton(onToggle);
    element.className="group_keywords"; 
    slider.append(...Object.keys(props).map((i)=>RealTimeWordsItem(props[i])))
    element.append(slider, moreButton);
    return element;
}


function Slider(){
    const slider = document.createElement("div");
    slider.className="slider-viewport"; 
    slider.style.transform="translateY(0%)";
    return slider;
}

function MoreButton(event){
    const element = document.createElement("a");
    element.className="keywords_more";
    event && element.addEventListener("click", event);
    return element;
}

function RealTimeWordsItem(props){
    const { rank, keyword, state } = props;
    const element = document.createElement("div");
    const aTag = document.createElement("a");
    aTag.href=url+keyword; aTag.className="rank-item";
    aTag.innerHTML = `
        <span class="rank-num">${rank}</span>
        <span class="rank-text">${keyword}</span>
    `
    element.appendChild(aTag);
    aTag.appendChild(RankIcon(state));
    return element;
}

function RankIcon(state){
    const element = document.createElement("span");
    element.className = 
        state==="+" ? "rate_up" 
        : state==="-" ? "rate_down" 
        : "rate_stable"; 
    return element;
}

function DropDownMenuItem(props){
    const { rank, keyword, state } = props;
    const element = document.createElement("div");
    const aTag = document.createElement("a");
    aTag.href=url+keyword; aTag.className="menu-item";
    aTag.innerHTML = `
        <span class="rank-num">${rank}</span>
        <span class="rank-text">${keyword}</span>
    `
    aTag.appendChild(RankIcon(state));
    element.appendChild(aTag);
    return element;
}

function DropDownMenuList(props = []){
    const element = document.createElement("div");
    element.className="menu-list";
    element.append(...Object.keys(props).map((i)=>DropDownMenuItem(props[i])))
    return element;
}

function DropDownHeader(){
    const element = document.createElement("div");
    element.className="menu-header";
    element.innerText = "급상승 검색어";
    return element;
}

function DropDownFooter(){
    const element = document.createElement("div");
    element.className="menu-footer";
    const now = new Date();
    element.innerText=koreandateFormat(now);
    return element;
}

function DropDownMenu(data){
    const element = document.createElement("div");
    element.className="keywords-menu";
    element.style.display = "none";
    element.appendChild(DropDownHeader());
    element.appendChild(DropDownMenuList(data));
    element.appendChild(DropDownFooter());
    return element;

}


function koreandateFormat(time = new Date()) {
    const days = [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ];
    const year = time.getFullYear();
    const month = time.getMonth();
    const date = time.getDate();
    const day = days[time.getDay()];
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${year}년 ${month}월 ${date}일 ${day} ${hours}:${minutes} 기준`
}