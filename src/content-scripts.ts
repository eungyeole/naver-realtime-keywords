import debounce from "lodash/debounce";

function loadWebComponent() {
  const componentScript = document.createElement("script");
  componentScript.src = "component.js"; // 웹 컴포넌트를 등록한 JavaScript 파일 경로
  document.head.appendChild(componentScript);
}

const booting = async () => {
  if (window.location.host !== "search.naver.com") {
    const initializeRealTimeWords = debounce(async () => {
      const containerElement = document.getElementById("right-content-area");

      if (containerElement) {
        loadWebComponent();
        const realTimeWordsElement = document.createElement("naver-popup");
        containerElement.prepend(realTimeWordsElement);

        window.removeEventListener("DOMNodeInserted", initializeRealTimeWords);
      }
    }, 1000);

    window.addEventListener("DOMNodeInserted", initializeRealTimeWords);
  }
};

booting();
