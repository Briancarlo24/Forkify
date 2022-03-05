import View from './View.js';
import icons from '../../img/icons.svg'; // Parcel 1

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const nextButton = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>;
    `;

    const prevButton = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    `;

    //   Page 1, Other pages
    if (curPage === 1 && numPages > 1) {
      return `${nextButton}`;
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return `${prevButton}`;
    }
    // Other Page
    if (curPage < numPages) {
      return `
        ${prevButton} ${nextButton}`;
    }

    //  Page 1, No Other Pages
    return '';
  }
}

export default new PaginationView();
