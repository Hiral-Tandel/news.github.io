const API_KEY = "782c57a730274f9c833d50a79f6acbad";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load' ,()=>fetchNews("India") );

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res= await fetch(`${URL}${query}&apiKey=${API_KEY}`)  
    //fetch return promise which we make await

    const data = await res.json();
    //conver res to json data which also return promise and we make it too await

    console.log(data);

    binData(data.articles) 
}

function binData(articles){
    const cardsContainer = document.getElementById('cards-container');

    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "" ;  //whenever api call it fisrt clear the html so that 100-100 articles dont get overlap

    articles.forEach(article =>{
        if(!article.urlToImage) return; //in case any article dont have image so to avoid it

        const cardClone = newsCardTemplate.content.cloneNode(true);
        
        fillDataInCard(cardClone , article);

        cardsContainer.appendChild(cardClone);

    });
}

function  fillDataInCard(cardClone , article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-decs')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title  
    newsDesc.innerHTML = article.description 

    const date = new Date(article.publishedAt).toLocaleString("en-Us",{
        timeZone:"Asia/Jakarta"
    });

     newsSource.innerHTML = `${article.source.name} . ${date}`;

    //  all variable article .urlToImage .title . description .publishedAt .source.name  is from API url

    cardClone.firstElementChild.addEventListener('click' ,()=> {
        window.open(article.url , "_blank") // _blank means newTab
    });

}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button')

const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
    
});
