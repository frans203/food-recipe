// const recipePlace = document.querySelector(".recipe");

import bookmarkView from "./output/bookmarkOut.js";
import PaginationView from "./output/paginationOut.js";
import SearchView from "./output/searchOut.js";
import ResultsView from "./output/resultsOut.js";
import AddRecipeView from "./output/addRecipeOut.js";
import menuView from "./output/menuOut.js";

import * as modelScript from "./modelScript.js";
import * as recipeOut from "./output/recipeOut.js";
import { MODAL_CLOSE_SEC } from "./help_config.js";
const recipeOutDe = recipeOut.default;

const loadRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //getting data
    ResultsView.update(modelScript.getSearchPerPage());
    bookmarkView.update(modelScript.state.bookmarks);
    recipeOutDe.renderLoading();
    await modelScript.toFetch(id);

    // const { recipe } = modelScript.state.recipe;

    //rendering recipes
    recipeOutDe.renderRecipe(modelScript.state.recipe);
  } catch (e) {
    console.error(e + "my error");
    bookmarkView.renderErrorMessage(bookmarkView.errorMessage);
    recipeOutDe.renderErrorMessage();
  }
};

const searchResults = async () => {
  // 1) get query
  const query = SearchView.getQuery();
  if (!query) return;

  //2) search with the query
  await modelScript.toSearch(query);

  //3) render the results

  ResultsView.renderRecipe(modelScript.getSearchPerPage(1));
  // 4) pagination
  PaginationView.renderRecipe(modelScript.state.search);
};
function paginationChange(value) {
  ResultsView.renderRecipe(modelScript.getSearchPerPage(value));
  PaginationView.renderRecipe(modelScript.state.search);
}
function servingsChange(value) {
  modelScript.updateServings(value);
  recipeOutDe.update(modelScript.state.recipe);
}
function bookmarksChange() {
  //add
  if (!modelScript.state.recipe.bookmarked)
    modelScript.addBookmark(modelScript.state.recipe);
  else modelScript.removeBookmark(modelScript.state.recipe.id); //remove
  //update view
  recipeOutDe.update(modelScript.state.recipe);
  //render Bookmarks

  if (modelScript.state.bookmarks.length === 0)
    bookmarkView.renderErrorMessage(bookmarkView.errorMessage);
  else {
    bookmarkView.renderRecipe(modelScript.state.bookmarks);
  }
}

function controlBookmarks() {
  if (modelScript.state.bookmarks.length === 0)
    bookmarkView.renderErrorMessage(bookmarkView.errorMessage);
  else {
    bookmarkView.renderRecipe(modelScript.state.bookmarks);
  }
}
async function controlAddRecipe(newRecipe) {
  try {
    AddRecipeView.renderLoading();
    //upload Recipe
    await modelScript.uploadRecipe(newRecipe);
    //render Recipe
    recipeOutDe.renderRecipe(modelScript.state.recipe);
    //render Message
    AddRecipeView.renderMessage();
    //render in bookmark
    bookmarkView.renderRecipe(modelScript.state.bookmarks);
    //change ID in URL
    window.history.pushState(null, "", `${modelScript.state.recipe.id}`);
    //close window after 'MODAL_CLOSE_SEC' secs
    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (e) {
    AddRecipeView.renderErrorMessage();
  }
}
const newFeature = function () {
  console.log("Welcome to the application");
};
function init() {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeOutDe.addHandlerRender(loadRecipe);
  recipeOutDe.addHandlerUpdateServings(servingsChange);
  recipeOutDe.addHandleraddBookmark(bookmarksChange);
  SearchView.addHandlerSearch(searchResults);
  PaginationView.addHandlerPagination(paginationChange);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
}
init();
