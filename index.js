import{a as w,S,i as c}from"./assets/vendor-CIu9XFSi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&u(h)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}})();const q="52813503-cb7190d9096228e90c42c3654",v="https://pixabay.com/api/",P=15;async function p(o,r=1){try{return(await w.get(v,{params:{key:q,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:P}})).data}catch(e){throw e}}const d=document.querySelector(".gallery"),i=document.querySelector(".loader"),s=document.querySelector(".js-load-more");let a=null;function b(o){if(!d){console.warn("Gallery element not found in DOM");return}const r=o.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}">
            <img
              src="${e.webformatURL}"
              alt="${e.tags}"
              loading="lazy"
              width="300"
            />
          </a>
          <ul class="info">
            <li><b>Likes:</b> ${e.likes}</li>
            <li><b>Views:</b> ${e.views}</li>
            <li><b>Comments:</b> ${e.comments}</li>
            <li><b>Downloads:</b> ${e.downloads}</li>
          </ul>
        </li>
      `).join("");d.insertAdjacentHTML("beforeend",r),a?a.refresh():a=new S(".gallery a",{captionsData:"alt",captionDelay:250})}function R(){d&&(d.innerHTML="",a&&(a.destroy(),a=null))}function E(){i&&(i.classList.remove("hidden"),i.setAttribute("aria-hidden","false"))}function M(){i&&(i.classList.add("hidden"),i.setAttribute("aria-hidden","true"))}function $(){s&&(s.classList.remove("hidden"),s.disabled=!1)}function f(){s&&(s.classList.add("hidden"),s.disabled=!0)}const y=document.querySelector(".form"),m=document.querySelector(".js-load-more");document.querySelector(".gallery");let L="",l=1;const O=15;let g=0;y==null||y.addEventListener("submit",A);m==null||m.addEventListener("click",B);async function A(o){o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(r){L=r,l=1,R(),E();try{const{hits:e,totalHits:u}=await p(r,l);if(g=Math.ceil(u/O),!e.length){c.warning({message:"Sorry, no images match your search query. Please try again!",position:"topRight"}),f();return}b(e),l<g?$():f()}catch(e){c.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)}finally{M()}}}async function B(){l+=1;try{const{hits:o}=await p(L,l);if(!o.length){f(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}b(o);const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),l>=g&&(f(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(o){c.error({message:"Error loading more images.",position:"topRight"}),console.error(o)}}
//# sourceMappingURL=index.js.map
