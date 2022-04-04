const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get('query');

const postKeyword = (keyword) => {
    fetch("", {
        method: "post",
    });
}