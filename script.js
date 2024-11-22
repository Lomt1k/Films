function handleFormSubmit(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const comment = document.querySelector('#comment').value;
  const owner = document.querySelector('input[name=radio-owner]:checked').value;

  const film = {
    title,
    comment,
    owner
  };

  addFilmToLocalStorage(film);
  resetForm();  
  renderTable();
}

function onClickRemove(film) {
  removeFilmFromLocalStorage(film);
  renderTable();
}

function addFilmToLocalStorage(film) {
  const films = JSON.parse(localStorage.getItem('films')) ?? [];
  films.push(film);
  localStorage.setItem('films', JSON.stringify(films));
}

function removeFilmFromLocalStorage(film) {
  const films = JSON.parse(localStorage.getItem('films')) ?? [];
  const newFilms = films.filter(e => !isSameFilm(e, film));
  localStorage.setItem('films', JSON.stringify(newFilms));
}

function isSameFilm(filmA, filmB) {
  return filmA.title === filmB.title;
}

function resetForm() {
  document.querySelector('.film-form__form').reset();
}

function showRandomFilm() {
  modal.classList.add('modal--active');
  const index = Math.floor(Math.random() * renderedFilms.length);
  const selectedFilm = renderedFilms[index];
  modalFilmName.textContent = selectedFilm.title;
}

function hideRandomFilm() {
  modal.classList.remove('modal--active');
}

function initFilter() {
  const filter = document.querySelector('.film-table__filter');
  filter.addEventListener('change', function(e) {
    const owner = e.target.value;
    renderTable(owner);
  });
  
  new Choices(filter, {
    searchEnabled: false,
    itemSelectText: ''
  });
}

function renderTable(filterByOwner) {
  renderedFilms = JSON.parse(localStorage.getItem('films')) ?? [];

  if (filterByOwner != null && filterByOwner != '') {
    renderedFilms = renderedFilms.filter(e => e.owner === filterByOwner);
  }

  randomBtn.toggleAttribute('disabled', renderedFilms.length == 0);

  const filmTableBody = document.querySelector('.film-table__body');
  filmTableBody.innerHTML = '';
  renderedFilms.forEach(film => {
    const row = document.createElement('tr');
    row.classList.add('film-table__row');
    row.innerHTML = `
      <td class="film-table__data">
        <span class="film-table__data-owner">${film.owner}</span>
      </td>
      <td class="film-table__data">
        <span class="film-table__data-title">${film.title}</span>
        <span class="film-table__data-comment">${film.comment}</span>
      </td>
      <td class="film-table__data">
        <button class="btn btn--action" id="remove-btn" type="button">
          <svg width="100%" height="100%">
            <use xlink:href="img/sprite.svg#icon-bin"></use>
          </svg>
        </button>
      </td>
    `;

    const ownerEl = row.querySelector('.film-table__data-owner');
    switch (film.owner) {
      case 'Ей':
        ownerEl.classList.add('film-table__data-owner--she');
        break;
      case 'Ему':
        ownerEl.classList.add('film-table__data-owner--he');
        break;
    }

    if (film.comment == '') {
      row.querySelector('.film-table__data-comment').remove();
    }

    row.querySelector('#remove-btn').addEventListener('click', () => onClickRemove(film));
    filmTableBody.appendChild(row);
  });
}

let renderedFilms = [];
const modal = document.querySelector('.modal');
const modalFilmName = document.querySelector('.modal__film-name');
const randomBtn = document.querySelector('.film-table__random-btn');
randomBtn.addEventListener('click', showRandomFilm);
document.querySelector('.film-form__form').addEventListener('submit', handleFormSubmit);
document.querySelector('.modal__ok-btn').addEventListener('click', hideRandomFilm);
initFilter();
renderTable();
