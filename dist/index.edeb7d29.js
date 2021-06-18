!function(){class e{recipeData;renderRecipe(e,n=!0){if(!e||Array.isArray(e&&0===e.lenght))return this.renderErrorMessage();this.recipeData=e;const r=this.generateMarkup();if(!n)return r;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",r)}update(e){this.recipeData=e;const n=this.generateMarkup(),r=document.createRange().createContextualFragment(n).querySelectorAll("*"),t=this.parentElement.querySelectorAll("*");r.forEach(((e,n)=>{const r=t[n];r&&(r.isEqualNode(e)||""===e.firstChild?.nodeValue?.trim?.()||(r.textContent=e.textContent),r.isEqualNode(e)||Array.from(e.attributes).forEach((e=>{r.setAttribute(e.name,e.value)})))}))}renderLoading(){this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",'\n      <div class="spinner">\n      <svg>\n        <use href="./icons.b4f53cee.svg#icon-loader"></use>\n      </svg>\n    </div>')}clear(){this.parentElement.innerHTML=""}renderErrorMessage(e="Error with loading this feature! Try again"){this.clear();const n=`\n    <div class="error">\n      <div>\n          <svg>\n            <use href="./img/icons.svg#icon-alert-triangle"></use>\n          </svg>\n        </div>\n        <span>${e}</span>\n      </div>`;this.parentElement.insertAdjacentHTML("beforeend",n)}renderMessage(e=this.message){const n=`\n    <div class="error">\n      <div>\n          <svg>\n            <use href="./img/icons.svg#icon-smile"></use>\n          </svg>\n        </div>\n        <span>${e}</span>\n      </div>`;this.clear(),this.parentElement.insertAdjacentHTML("beforeend",n)}}var n=new class extends e{parentElement=document.querySelector("*");generateMarkup(){return`\n      <li class="preview ${window.location.hash.slice(1)===this.recipeData.id?"preview-link--active":""}">\n          <a class="preview-link" href='#${this.recipeData.id}'>\n          <figure class="preview-fig">\n              <img src="${this.recipeData.imageUrl}" alt="${this.recipeData.title}" />\n          </figure>\n\n          <div class="preview-data">\n              <h4 class='preview-title'>${this.recipeData.title}</h4>\n              <p class='preview-publisher'>${this.recipeData.publisher}</p>\n               \n              <div class="preview-user-generated ${this.recipeData.key?"":"hidden"}">\n                <svg>\n                  <use href="./icons.b4f53cee.svg#icon-user"></use>\n                </svg>\n              </div>\n        \n            </div>\n          </div>\n          </a>\n      </li>`}};var r=new class extends e{parentElement=document.querySelector(".bookmarks-list");errorMessage="No bookmarks yet . Find a recipe and bookmark it!";addHandlerRender(e){window.addEventListener("load",e)}generateMarkup(){return this.recipeData.map((e=>n.renderRecipe(e,!1))).join("")}};var t=new class extends e{parentElement=document.querySelector(".pagination");addHandlerPagination(e){this.parentElement.addEventListener("click",(function(n){n.preventDefault();const r=+n.target.closest(".btn--inline").dataset.go;e(r)}))}generateMarkup(){const e=this.recipeData.page,n=Math.ceil(this.recipeData.results.length/this.recipeData.resultsPerPage);return n>1&&1===e?`<button data-go= "${e+1}" class="btn--inline btn-next">\n        <svg class="search-icon">\n          <use href="./img/icons.svg#icon-arrow-right"></use>\n        </svg>\n        <span>Page ${e+1}</span>\n      </button>`:n>1&&e===n?`<button data-go= "${e-1}" class="btn--inline btn-prev">\n    <svg class="search__icon">\n      <use href="src/img/icons.svg#icon-arrow-left"></use>\n    </svg>\n    <span>Page ${e-1}</span>\n  </button>`:n>1&&e<n?`\n        <button data-go= "${e-1}" class="btn--inline btn-prev">\n            <svg class="search__icon">\n            <use href="src/img/icons.svg#icon-arrow-left"></use>\n            </svg>\n            <span>Page ${e-1}</span>\n        </button>\n        \n        <button data-go= "${e+1}" class="btn--inline btn-next">\n                <svg class="search-icon">\n                <use href="./img/icons.svg#icon-arrow-right"></use>\n                </svg>\n                <span>Page ${e+1}</span>\n        </button>`:""}};var i=new class{parentElement=document.querySelector(".search");clearInput(){this.parentElement.querySelector(".field_search").value=""}getQuery(){const e=this.parentElement.querySelector(".field_search").value;return this.clearInput(),e}addHandlerSearch(e){addEventListener("submit",(function(n){n.preventDefault(),e()}))}};var s=new class extends e{parentElement=document.querySelector(".results");generateMarkup(){return this.recipeData.map((e=>n.renderRecipe(e,!1))).join("")}};var a=new class extends e{parentElement=document.querySelector(".upload");window=document.querySelector(".add-recipe-window");overlay=document.querySelector(".overlay");btnOpen=document.querySelector(".btn-ar");btnClose=document.querySelector(".close-modal");message="Successfully add recipe!";constructor(){super(),this.addHandlerShowWindow(),this.addHandlerCloseWindow()}toggleWindow(){this.window.classList.toggle("hidden"),this.overlay.classList.toggle("hidden")}addHandlerShowWindow(){this.btnOpen.addEventListener("click",this.toggleWindow.bind(this))}addHandlerCloseWindow(){this.btnClose.addEventListener("click",this.toggleWindow.bind(this)),this.overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUpload(e){this.parentElement.addEventListener("submit",(function(n){n.preventDefault();const r=[...new FormData(this)],t=Object.fromEntries(r);e(t)}))}generateMarkup(){}};new class extends e{hambMenu=document.querySelector(".menu-btn");navItems=document.querySelectorAll(".nav-item");btnBookmark=document.querySelector(".btn-bm");bookmarks=document.querySelector(".bookmarks");searchResults=document.querySelector(".search-results");recipe=document.querySelector(".recipe");all=document.querySelector(".all");constructor(){super(),this.toggleMenuItems(),this.changeStyleBookmarks()}toggleMenuItemsFunction(){this.navItems.forEach((e=>{e.classList.toggle("menu-tog")})),this.searchResults.classList.toggle("menu-tog")}styleBookmarks(){this.bookmarks.classList.toggle("changeBookmarks")}toggleMenuItems(){this.hambMenu.addEventListener("click",this.toggleMenuItemsFunction.bind(this))}changeStyleBookmarks(){this.btnBookmark.addEventListener("click",this.styleBookmarks.bind(this))}};const o=async function(e,n){try{const t=n?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}):fetch(e),i=await Promise.race([t,(r=25,new Promise((function(e,n){setTimeout((function(){n(new Error(`Take too long! Time: ${r}`))}),1e3*r)})))]),s=await i.json();if(!i.ok)throw new Error(`${s.message} (${i.status})`);return s}catch(e){throw console.error(e),e}var r};let c={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:12},bookmarks:[]};const d=e=>{let{recipe:n}=e.data;return c.recipe={cookingTime:n.cooking_time,id:n.id,imageUrl:n.image_url,ingredients:n.ingredients,publisher:n.publisher,servings:n.servings,sourceUrl:n.source_url,title:n.title,bookmarked:!1,...n.key&&{key:n.key}}},l=(e=1)=>{c.search.page=e;const n=(e-1)*c.search.resultsPerPage,r=e*c.search.resultsPerPage;return c.search.results.slice(n,r)},u=()=>{localStorage.setItem("bookmarks",JSON.stringify(c.bookmarks))},p=e=>{c.bookmarks.push(e),e.id===c.recipe.id&&(c.recipe.bookmarked=!0),u()};localStorage.getItem("bookmarks")&&(c.bookmarks=JSON.parse(localStorage.getItem("bookmarks")));var h,m;Fraction=function(e,n){if(void 0!==e&&n)"number"==typeof e&&"number"==typeof n?(this.numerator=e,this.denominator=n):"string"==typeof e&&"string"==typeof n&&(this.numerator=parseInt(e),this.denominator=parseInt(n));else if(void 0===n)if(num=e,"number"==typeof num)this.numerator=num,this.denominator=1;else if("string"==typeof num){var r,t,i=num.split(" ");if(i[0]&&(r=i[0]),i[1]&&(t=i[1]),r%1==0&&t&&t.match("/"))return new Fraction(r).add(new Fraction(t));if(!r||t)return;if("string"==typeof r&&r.match("/")){var s=r.split("/");this.numerator=s[0],this.denominator=s[1]}else{if("string"==typeof r&&r.match("."))return new Fraction(parseFloat(r));this.numerator=parseInt(r),this.denominator=1}}this.normalize()},Fraction.prototype.clone=function(){return new Fraction(this.numerator,this.denominator)},Fraction.prototype.toString=function(){if("NaN"===this.denominator)return"NaN";var e=this.numerator/this.denominator>0?Math.floor(this.numerator/this.denominator):Math.ceil(this.numerator/this.denominator),n=this.numerator%this.denominator,r=this.denominator,t=[];return 0!=e&&t.push(e),0!=n&&t.push((0===e?n:Math.abs(n))+"/"+r),t.length>0?t.join(" "):0},Fraction.prototype.rescale=function(e){return this.numerator*=e,this.denominator*=e,this},Fraction.prototype.add=function(e){var n=this.clone();return e=e instanceof Fraction?e.clone():new Fraction(e),td=n.denominator,n.rescale(e.denominator),e.rescale(td),n.numerator+=e.numerator,n.normalize()},Fraction.prototype.subtract=function(e){var n=this.clone();return e=e instanceof Fraction?e.clone():new Fraction(e),td=n.denominator,n.rescale(e.denominator),e.rescale(td),n.numerator-=e.numerator,n.normalize()},Fraction.prototype.multiply=function(e){var n=this.clone();if(e instanceof Fraction)n.numerator*=e.numerator,n.denominator*=e.denominator;else{if("number"!=typeof e)return n.multiply(new Fraction(e));n.numerator*=e}return n.normalize()},Fraction.prototype.divide=function(e){var n=this.clone();if(e instanceof Fraction)n.numerator*=e.denominator,n.denominator*=e.numerator;else{if("number"!=typeof e)return n.divide(new Fraction(e));n.denominator*=e}return n.normalize()},Fraction.prototype.equals=function(e){e instanceof Fraction||(e=new Fraction(e));var n=this.clone().normalize();e=e.clone().normalize();return n.numerator===e.numerator&&n.denominator===e.denominator},Fraction.prototype.normalize=(h=function(e){return"number"==typeof e&&(e>0&&e%1>0&&e%1<1||e<0&&e%-1<0&&e%-1>-1)},m=function(e,n){if(n){var r=Math.pow(10,n);return Math.round(e*r)/r}return Math.round(e)},function(){if(h(this.denominator)){var e=m(this.denominator,9),n=Math.pow(10,e.toString().split(".")[1].length);this.denominator=Math.round(this.denominator*n),this.numerator*=n}h(this.numerator)&&(e=m(this.numerator,9),n=Math.pow(10,e.toString().split(".")[1].length),this.numerator=Math.round(this.numerator*n),this.denominator*=n);var r=Fraction.gcf(this.numerator,this.denominator);return this.numerator/=r,this.denominator/=r,(this.numerator<0&&this.denominator<0||this.numerator>0&&this.denominator<0)&&(this.numerator*=-1,this.denominator*=-1),this}),Fraction.gcf=function(e,n){var r=[],t=Fraction.primeFactors(e),i=Fraction.primeFactors(n);return t.forEach((function(e){var n=i.indexOf(e);n>=0&&(r.push(e),i.splice(n,1))})),0===r.length?1:function(){var e,n=r[0];for(e=1;e<r.length;e++)n*=r[e];return n}()},Fraction.primeFactors=function(e){for(var n=Math.abs(e),r=[],t=2;t*t<=n;)n%t==0?(r.push(t),n/=t):t++;return 1!=n&&r.push(n),r};var g=Fraction;const v=new class extends e{parentElement=document.querySelector(".recipe");message;errorMessage;generateMarkup(){return`<figure class="recipe-fig">\n    <img src="${this.recipeData.imageUrl}" alt="" />\n    <h1 class="recipe-fig-h"><span>${this.recipeData.title}<span></h1>\n  </figure>\n\n  <div class="recipe-details">\n    <div class="recipe-info">\n      <svg class="recipe__info-icon">\n        <use href="./icons.b4f53cee.svg#icon-clock"></use>\n      </svg>\n      <span class="recipe-info--time">${this.recipeData.cookingTime}</span>\n      <span class="recipe-info-minutes">minutes</span>\n    </div>\n\n    <div class="recipe-info">\n      <svg class="recipe-info--icon">\n        <use href="./icons.b4f53cee.svg#icon-users"></use>\n      </svg>\n\n      <span class="recipe-info--number-serving">${this.recipeData.servings}</span>\n      <span class="recipe-info-servings">Servings</span>\n      <div class="recipe-info-btns">\n        <button data-serv-to="${this.recipeData.servings-1}" class="recipe-serv recipe-minus-serv">\n          <svg>\n            <use href="./icons.b4f53cee.svg#icon-minus-circle"></use>\n          </svg>\n        </button>\n\n        <button data-serv-to="${this.recipeData.servings+1}" class="recipe-serv recipe-plus-serv">\n          <svg>\n            <use href="./icons.b4f53cee.svg#icon-plus-circle"></use>\n          </svg>\n        </button>\n      </div>\n    </div>\n\n    <div class="recipe-user-genereted ${this.recipeData.key?"":"hidden"}">\n        <svg>\n         <use href="./icons.b4f53cee.svg#icon-user"></use>\n        </svg>\n    </div>\n\n    <button class="recipe-serv btn-round btn-bookmark">\n      <svg class="">\n        <use href="./icons.b4f53cee.svg#icon-bookmark${this.recipeData.bookmarked?"-fill":""}"></use>\n      </svg>\n    </button>\n  </div>\n\n  <div class="recipe-ingredients">\n    <h2 class="h-ingredients">Recipe ingredients</h2>\n\n    <ul class="recipe-ingredient-list">\n    ${this.recipeData.ingredients.map((e=>this.renderIngredients(e))).join(" ")}\n      \n\n    \n    </ul>\n  </div>\n\n  <div class="recipe-directions">\n    <h2 class="h-ingredients">How to cook it</h2>\n    <p>\n      This recipe was carefully designed and tested by ${this.recipeData.publisher}.\n      Please check out directions at their website.\n    </p>\n     \n    <a class="btn recipe-btn" href="${this.recipeData.sourceUrl}" target="_blank">\n      <span>Directions</span>\n      <svg class="search-icon">\n        <use href="./icons.b4f53cee.svg#icon-arrow-right"></use>\n      </svg>\n    </a>\n  </div> `}renderIngredients(e){return`\n    <li class="recipe-ingredient">\n    <svg class="recipe-icon">\n      <use href="./icons.b4f53cee.svg#icon-check"></use>\n    </svg>\n    <div class="recipe-quantity">${e.quantity?new g(e.quantity).toString():""}  </div>\n\n    <div class="recipe-description">\n      <span class="recipe-unit">${e.unit} </span>\n\n      <span class="recipe-text">${e.description} </span>\n    </div>\n  </li>`}addHandlerRender(e){["hashchange","load"].forEach((n=>window.addEventListener(n,e)))}addHandlerUpdateServings(e){this.parentElement.addEventListener("click",(function(n){n.preventDefault();const r=n.target.closest(".recipe-serv");if(!r)return;const t=+r.dataset.servTo;t>0&&e(t)}))}addHandleraddBookmark(e){this.parentElement.addEventListener("click",(function(n){n.target.closest(".btn-bookmark")&&e()}))}},f=async function(){try{const e=window.location.hash.slice(1);if(!e)return;s.update(l()),r.update(c.bookmarks),v.renderLoading(),await(async e=>{try{const n=await o(`https://forkify-api.herokuapp.com/api/v2/recipes/${e}?key=cc89b79b-47eb-4468-9287-4ad159b7ad73`);c.recipe=d(n),c.bookmarks.some((n=>n.id===e))?c.recipe.bookmarked=!0:c.recipe.bookmarked=!1}catch(e){throw e}})(e),v.renderRecipe(c.recipe)}catch(e){console.error(e+"my error"),r.renderErrorMessage(r.errorMessage),v.renderErrorMessage()}},b=async()=>{const e=i.getQuery();e&&(await(async e=>{try{const n=await o(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${e}&key=cc89b79b-47eb-4468-9287-4ad159b7ad73`);c.search.results=n.data.recipes.map((e=>({id:e.id,title:e.title,publisher:e.publisher,sourceUrl:e.source_url,imageUrl:e.image_url,bookmarked:!1,...e.key&&{key:e.key}})))}catch(e){throw e}})(e),s.renderRecipe(l(1)),t.renderRecipe(c.search))};function k(e){s.renderRecipe(l(e)),t.renderRecipe(c.search)}function y(e){var n;n=e,c.recipe.ingredients.forEach((e=>{e.quantity=e.quantity*n/c.recipe.servings})),c.recipe.servings=n,v.update(c.recipe)}function w(){c.recipe.bookmarked?(e=>{const n=c.bookmarks.findIndex((n=>n.id===e));c.bookmarks.splice(n,1),e===c.recipe.id&&(c.recipe.bookmarked=!1),u()})(c.recipe.id):p(c.recipe),v.update(c.recipe),0===c.bookmarks.length?r.renderErrorMessage(r.errorMessage):r.renderRecipe(c.bookmarks)}function E(){0===c.bookmarks.length?r.renderErrorMessage(r.errorMessage):r.renderRecipe(c.bookmarks)}async function M(e){try{a.renderLoading(),await(async e=>{const n=Object.entries(e).filter((e=>e[0].startsWith("ingredient")&&""!==e[1])).map((e=>{const n=e[1].split(",").map((e=>e.trim()));if(3!==n.length)throw new Error("Wrong ingredient format! Please use Correct format!");const[r,t,i]=n;return{quantity:r?+r:null,unit:t,description:i}})),r={title:e.title,source_url:e.url,image_url:e.image,cooking_time:+e.prep,servings:+e.servings,publisher:e.publisher,ingredients:n,bookmarked:!1},t=await o("https://forkify-api.herokuapp.com/api/v2/recipes?key=cc89b79b-47eb-4468-9287-4ad159b7ad73",r);c.recipe=d(t),p(c.recipe)})(e),v.renderRecipe(c.recipe),a.renderMessage(),r.renderRecipe(c.bookmarks),window.history.pushState(null,"",`${c.recipe.id}`),setTimeout((function(){a.toggleWindow()}),2e3)}catch(e){a.renderErrorMessage()}}r.addHandlerRender(E),v.addHandlerRender(f),v.addHandlerUpdateServings(y),v.addHandleraddBookmark(w),i.addHandlerSearch(b),t.addHandlerPagination(k),a.addHandlerUpload(M)}();
//# sourceMappingURL=index.edeb7d29.js.map
