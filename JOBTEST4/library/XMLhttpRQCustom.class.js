class XMLhttpRQ {

    constructor(url) {
        this.url = url;
    }
    sendHttpRQ() {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this.url);
            xhr.responseType = 'json';
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                if (xhr.status >= 400) {
                    reject(xhr.response);
                    console.log('1. Somthing went wrong...');
                } else {
                    resolve(xhr.response);
                }
            };
            xhr.onerror = () => {
                reject('2. Somthing went wrong...')
            };
            xhr.send();
        });
        return promise;
    }
    getURLData(score, filterString, sortType) {
        this.sendHttpRQ().then(responseData => {
            this.processData(responseData, score, filterString, sortType)
        }).catch(err => {
            console.log(err);
        });
    }

    async displayInfo(res, score, filterString, sortType) {
        console.log("I am running\nscore: ",score,"\nfilterString: ",filterString,"\nsortType: ",sortType);
        let data = res;
        if (filterString) {
            data = data.filter(element => {
                let i = element.name.search(filterString);
                if (i < 0) return false;
                else return true;
            });
        }
        if (score) {
            score *= 10;
            data = data.filter(element => {
                return (element.rating >= score)
            });
        }
        if (sortType) {
            switch (sortType) {
                case 10: {
                    data = data.sort((a, b) => {
                        return a.first_release_date - b.first_release_date;
                    });
                    break;
                }
                case 11: {
                    data = data.sort((a, b) => {
                        return b.first_release_date - a.first_release_date;
                    });
                    break;
                }
                case 20: {
                    data = data.sort((a, b) => {
                        return a.rating - b.rating;
                    });
                    break;
                }
                case 21: {
                    data = data.sort((a, b) => {
                        return b.rating - a.rating;
                    });
                    break;
                }
                case 30: {
                    data = data.sort((a, b) => {
                        return a.name - b.name;
                    });
                    break;
                }
                case 31: {
                    data = data.sort((a, b) => {
                        return b.name - a.name;
                    });
                    break;
                }
            }
        }
        document.getElementsByTagName("main")[0].innerHTML="";
        data.forEach(element => {
            let card = document.createElement("section");
            let thumb = document.createElement("div");
            let article = document.createElement("article");
            let rating = document.createElement("span");
            let title = document.createElement("h3");
            let releaseDate = document.createElement("h4");
            let summary = document.createElement("p");
            let thumbImg = document.createElement("img");
            thumbImg.src = "images/AH.png";
            thumb.classList.add("thumb");
            thumb.append(thumbImg);
            rating.classList.add("rating");
            rating.append(Math.floor(element.rating / 10));
            title.append(element.name);
            releaseDate.append(((new Date(element.first_release_date)).toDateString()));
            summary.append(element.summary);
            article.appendChild(rating);
            article.appendChild(title);
            article.appendChild(releaseDate);
            article.appendChild(summary);
            card.appendChild(thumb);
            card.appendChild(article);
            document.getElementsByTagName("main")[0].appendChild(card);
        });
    }
    async processData(data,score, filterString, sortType) {
        return await this.displayInfo(data,score, filterString, sortType);
    }
}