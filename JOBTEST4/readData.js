const RQ = new XMLhttpRQ("data/data.json");
let searchStr = document.querySelector("#searchStr");
let minScore = document.querySelector("#minScore");
let orderby = document.querySelector("#orderby");
let toggleSort = document.querySelector("#toggleSort");
let clearBtn = document.querySelector("#clear");
let page1 = document.querySelector("#page1");
let page2 = document.querySelector("#page2");
let menu1 = document.querySelector("#menu1");
let menu2 = document.querySelector("#menu2");
let sortDirection=0;
const clear = ()=>{
    document.querySelector("#searchStr").value ="";
    document.querySelector("#minScore").value ="";
    document.querySelector("#orderby").value ="";
    document.querySelector("#toggleSort").innerHTML ='&uArr;';
    score = false;
    filterString = false;
    sortType = false;
    RQ.getURLData(score,filterString, sortType);
}
clear();


searchStr.addEventListener("keyup", () => {
    filterString = searchStr.value;
    RQ.getURLData(score,filterString, sortType);
    console.log(filterString);
});

minScore.addEventListener("change", () => {
    score = minScore.value;
    RQ.getURLData(score,filterString, sortType);
    console.log(score);
});

orderby.addEventListener("select", () => {
    sortStr = orderby.value;
    switch (sortStr) {
        case "Release Date": {
            sortType = 10 + sortDirection;
            break;
        }
        case "Score": {
            sortType = 20 + sortDirection;
            break;
        }
        case "Name": {
            sortType = 30 + sortDirection;
            break;
        }
    }
    RQ.getURLData(score,filterString, sortType);
    console.log(sortStr);
});
toggleSort.addEventListener("click", () => {
    sortType=(sortType%2==0)?sortType +=1:sortType -=1;
    sortDirection=(sortDirection==0)?1:0;
    if((sortDirection==0))
    document.querySelector("#toggleSort").innerHTML ='&uArr;';
    else
    document.querySelector("#toggleSort").innerHTML ='&dArr;';
    RQ.getURLData(score,filterString, sortType);
    console.log(sortType);
});
clearBtn.addEventListener("click", () => {
    clear();
});
menu1.addEventListener("click", () => {
    clear();
    // page2.style.animation = "hidePage";
    // page2.style.animationPlayState = "running";
    page2.style.opacity = 0;
    window.setTimeout(page2.style.zIndex=1,1500);
    // page2.style.animation = "showPage";
    // page2.style.animationPlayState = "running";

    page1.style.opacity = 1;
    window.setTimeout(page1.style.zIndex=249,1500);

    console.log("Z: ",page1.style.zIndex);
});

menu2.addEventListener("click", () => {
    clear();
    page1.style.opacity = 0;
    window.setTimeout(page1.style.zIndex=1,1500);

    page2.style.opacity = 1;
    window.setTimeout(page2.style.zIndex=249,1500);

    console.log("Z: ",page2.style.zIndex);
});

