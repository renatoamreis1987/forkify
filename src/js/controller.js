import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable'; //polyfilling everything else
import 'regenerator-runtime/runtime'; //polyfilling async await
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// Not real JS, related with Parcel - To avoid to reload the page on every change
if (module.hot) {
  module.hot.accept();
}

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1 - get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2 - Load search results
    await model.loadSearchResults(query);

    // 3 - Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

//EVENT HANDLING IN MVC: PUBLISHER-SUBSCRIBER PATTERN
const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
