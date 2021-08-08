const weatherElement = document.getElementById("NM_WEATHER");

async function fetcher(){
   const { top10 } = await (await fetch("https://api.signal.bz/news/realtime")).json();
    return top10;
}

weatherElement.innerHTML="";

fetcher().then((res)=>{
    const keys = Object.keys(res);
    const items = keys.map((i)=>RealTimeWordsItem(res[i]));
    console.log(items);
    RealItemWordsList(items);

})


function RealItemWordsList(props = []){
    weatherElement.append(...props)
}

function RealTimeWordsItem(props){
    const { rank, keyword, state } = props;
    const url = "https://search.naver.com/search.naver?query=";
    const item = document.createElement("li");
    const aTag = document.createElement("a");
    aTag.href=url+keyword; aTag.className="rank-item";
    aTag.innerHTML = `
        <span class="rank-num">${rank}</span>
        <span class="rank-text">${keyword}</span>
    `
    item.appendChild(aTag);
    return item;
}