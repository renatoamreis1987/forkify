import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it! ;) ';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // resultsView.js and bookmarksView.js, both share the previewView.js to avoid duplicated code on return HTML code
  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
