import debounce from "lodash/debounce";
import "@webcomponents/custom-elements";
import "lit/polyfill-support.js";
import "./elements/naver";

const booting = async () => {
  if (window.location.host !== "search.naver.com") {
    const initializeRealTimeWords = debounce(async () => {
      const containerElement = document.getElementById("right-content-area");
      const naverRealTimeKeywordsElement = document.querySelector(
        "naver-realtime-keywords"
      );

      if (containerElement && !naverRealTimeKeywordsElement) {
        const realTimeWordsElement = document.createElement(
          "naver-realtime-keywords"
        );
        containerElement.prepend(realTimeWordsElement);

        window.removeEventListener("DOMNodeInserted", initializeRealTimeWords);
      }
    }, 1000);

    window.addEventListener("DOMNodeInserted", initializeRealTimeWords);
  }
};

booting();
