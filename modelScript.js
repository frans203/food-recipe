import { API_URL } from "./help_config.js";
import { AJAX } from "./help_helper.js";
import { RES_PER_PAGE } from "./help_config.js";
import { KEY } from "./help_config.js";
// import { updateServings } from "../18-forkify/starter/src/js/model.js";
export let state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};
const generateRecipeObject = (resJson) => {
  let { recipe } = resJson.data;

  return (state.recipe = {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  });
};
export const toFetch = async (id) => {
  try {
    const resJson = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    state.recipe = generateRecipeObject(resJson);

    if (state.bookmarks.some((bm) => bm.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (e) {
    throw e;
  }
};

export const toSearch = async (query) => {
  try {
    const dataReceived = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = dataReceived.data.recipes.map((res) => {
      return {
        id: res.id,
        title: res.title,

        publisher: res.publisher,
        sourceUrl: res.source_url,
        imageUrl: res.image_url,
        bookmarked: false,
        ...(res.key && { key: res.key }),
      };
    });
  } catch (e) {
    throw e;
  }
};

export const getSearchPerPage = (page = 1) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
const persistBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};
export const removeBookmark = (id) => {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = () => {
  if (localStorage.getItem("bookmarks")) {
    state.bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else return;
};
init();
export const uploadRecipe = async (newRecipe) => {
  const ingredients = Object.entries(newRecipe)
    .filter((ing) => ing[0].startsWith("ingredient") && ing[1] !== "")
    .map((ing) => {
      const ingArr = ing[1].split(",").map((item) => item.trim());
      if (ingArr.length !== 3)
        throw new Error("Wrong ingredient format! Please use Correct format!");

      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.url,
    image_url: newRecipe.image,
    cooking_time: +newRecipe.prep,
    servings: +newRecipe.servings,
    publisher: newRecipe.publisher,
    ingredients,
    bookmarked: false,
  };
  const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
  state.recipe = generateRecipeObject(data);
  addBookmark(state.recipe);

  try {
  } catch (e) {}
};
