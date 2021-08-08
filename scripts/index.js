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
})()


function RealItemWordsList(props = []){
    const element = document.createElement("div");
    const keys = Object.keys(props);
    element.className="group_keywords";
    element.append(...keys.map((i)=>RealTimeWordsItem(props[i])))
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
    return element;
}