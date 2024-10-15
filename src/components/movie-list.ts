import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import litLogo from "../assets/lit.svg";

import { fetchMovieList } from "../models/movies.ts";
import { fetchMovieDetails } from "../models/movie.ts";

@customElement("movie-list")
export class MovieList extends LitElement {
  @property({ type: Array })
  movieList: Movie[] = [];

  @property({ type: Boolean })
  _openDetail: Boolean = false;

  @property({
    type: Object,
  })
  movieDetail: MovieDetail = [];

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("movieDetail")) {
      if ("id" in this.movieDetail) {
        this._openDetail = true;
      } else {
        this._openDetail = false;
      }
    }
  }
  _handleCloseDetail = () => {
    this.movieDetail = [];
  };

  protected async firstUpdated(
    _changedProperties: PropertyValues
  ): Promise<void> {
    const response: MoviesResponse = await fetchMovieList();
    if ("results" in response) this.movieList = response.results;
  }

  getImagePath = (path: string) => {
    const basePath = "https://image.tmdb.org/t/p/w1280";
    return basePath + path;
  };

  async #getMovieDetails(movieId: number) {
    const response: MovieDetail = await fetchMovieDetails(movieId);
    if ("id" in response) this.movieDetail = response;
  }

  getMovieCard = (movie: Movie) => {
    const rating = parseFloat(movie.vote_average.toFixed(1));
    return html`
      <div class="movie-card" @click="${() => this.#getMovieDetails(movie.id)}">
        <img src="${this.getImagePath(movie.poster_path)}" />
        <div class="movie-title">
          <span class="title">${movie.title}</span>
          <span class="rating">${rating}</span>
        </div>
      </div>
    `;
  };

  getMovieDetailHtml = () => {
    const movie = this.movieDetail as MovieFullDetail;
    return html`
      <div class="movie-detail-container">
        <div
          class="movie-content-backdrop"
          style="--backdrop-image:url('${this.getImagePath(
            movie.backdrop_path
          )}');"
        ></div>
        <div class="movie-content">
          <div class="movie-content-poster">
            <img src="${this.getImagePath(movie.poster_path)}" />
          </div>
          <div class="movie-content-credits">
            <h1>${movie.title}</h1>
          </div>
        </div>
      </div>
    `;
  };

  render() {
    return html`
      <div class="movie-list-container">
        <div class="side-bar">
          <a href="https://lit.dev" target="_blank">
            <img src=${litLogo} class="logo lit" alt="Lit logo" />
          </a>
        </div>
        <div
          class="${this._openDetail
            ? "movie-detail-wrapper open"
            : "movie-detail-wrapper"}"
        >
          ${this.getMovieDetailHtml()}
          <button @click="${this._handleCloseDetail}">Close</button>
        </div>
        <ul class="movie-list">
          ${this.movieList.map((movie) => this.getMovieCard(movie))}
        </ul>
      </div>
    `;
  }

  static movieStyles = css`
    :host {
      --sidebar-width: 200px;
    }
    .movie-list-container {
      display: flex;
      justify-content: center;
      gap: 1rem;
      position: relative;
      margin: 1rem 0;
      max-height: calc(100vh - 2rem);
      overflow: hidden;
    }
    .movie-detail-wrapper {
      display: none;
      position: fixed;
      z-index: 3;
      top: 0;
      left: calc(var(--sidebar-width) + 1rem);
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.99);
      &.open {
        display: block;
      }
      .movie-detail-container {
        position: relative;
        > .movie-content-backdrop {
          position: absolute;
          min-width: 100%;
          min-height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-image: var(--backdrop-image);
          opacity: 0.2;
          filter: grayscale(80%);
        }
        > .movie-content {
          position: relative;
          display: flex;
          gap: 2rem;
          padding: 3rem 2rem;
          > .movie-content-poster {
            min-width: 330px;
            flex: 0;
            > img {
              background-color: #fff;
              max-width: 100%;
              border-radius: 14px;
              overflow: hidden;
            }
          }
          > .movie-content-credits {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }
        }
      }
    }
    .side-bar {
      padding-right: 1rem;
      min-width: var(--sidebar-width);
      max-width: var(--sidebar-width);
    }
    .movie-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.4rem;
      max-height: 100vh;
      overflow-y: auto;
    }
    .movie-card {
      border: 1px solid #dbdbdb;
      border-radius: 12px;
      max-width: 200px;
      overflow: hidden;
      position: relative;
      z-index: 2;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
        > img {
          transform: scale(106%);
        }
      }
      > img {
        transition: transform 300ms ease-in-out;
        width: 100%;
        height: auto;
      }
      > .movie-title {
        line-height: 1.1;
        padding: 0.8rem 1rem 1.6rem 1rem;
        display: flex;
        justify-content: space-between;
        > .title {
          font-size: 0.8rem;
          font-weight: 600;
        }
        > .rating {
          font-weight: 900;
          font-size: 0.8rem;
        }
      }
    }
  `;
  static globalStyles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
  static styles = [MovieList.globalStyles, MovieList.movieStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "movie-list": MovieList;
  }
}
