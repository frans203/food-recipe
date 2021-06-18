import Output from "./Output.js";
const icons = "./icons.b4f53cee.svg";
class PreviewView extends Output {
  parentElement = document.querySelector("*");

  generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview ${
        id === this.recipeData.id ? "preview-link--active" : ""
      }">
          <a class="preview-link" href='#${this.recipeData.id}'>
          <figure class="preview-fig">
              <img src="${this.recipeData.imageUrl}" alt="${
      this.recipeData.title
    }" />
          </figure>

          <div class="preview-data">
              <h4 class='preview-title'>${this.recipeData.title}</h4>
              <p class='preview-publisher'>${this.recipeData.publisher}</p>
               
              <div class="preview-user-generated ${
                this.recipeData.key ? "" : "hidden"
              }">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
        
            </div>
          </div>
          </a>
      </li>`;
  }
}

export default new PreviewView();
