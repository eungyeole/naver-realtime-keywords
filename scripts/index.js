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
    containerElement.appendChild(RealItemWordsList(data))
    const sliderViewport = document.getElementsByClassName("slider-viewport")[0];
    const sliderInterval = elementAdaptSlider(sliderViewport);
    sliderInterval();
})()


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
    const moreButton = MoreButton();
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

function MoreButton(text =  ""){
    const element = document.createElement("a");
    element.className="keywords_more";
    element.innerText=text;
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