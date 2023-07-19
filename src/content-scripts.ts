import debounce from "lodash/debounce";
import "@webcomponents/custom-elements";
import "lit/polyfill-support.js";
import "./elements/naver/popup";

const booting = async () => {
  if (window.location.host !== "search.naver.com") {
    const initializeRealTimeWords = debounce(async () => {
      const containerElement = document.getElementById("right-content-area");

      if (containerElement) {
        const realTimeWordsElement = document.createElement("naver-popup");
        containerElement.prepend(realTimeWordsElement);

        window.removeEventListener("DOMNodeInserted", initializeRealTimeWords);
      }
    }, 1000);

    window.addEventListener("DOMNodeInserted", initializeRealTimeWords);
  }
};

booting();
