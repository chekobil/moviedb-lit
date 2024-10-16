import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import litLogo from "../assets/lit.svg";

import { fetchMovieList } from "../models/movies.ts";
import { fetchMovieDetails } from "../models/movie.ts";

import "./movie-card.ts";
import "./movie-detail.ts";

@customElement("movie-list")
export class MovieList extends LitElement {
  @property({ type: Array })
  movieList: Movie[] = [];

  @property({ type: Object })
  movieDetailData: MovieDetailType = [];

  @state()
  _openDetail: Boolean = false;

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("movieDetailData")) {
      if ("id" in this.movieDetailData) {
        this._openDetail = true;
      } else {
        this._openDetail = false;
      }
    }
  }
  #handleCloseDetail = () => {
    this.movieDetailData = [];
  };

  #handleChangeMovie = async (event: CustomEvent) => {
    const movieId = event.detail.id;
    const response: MovieDetailType = await fetchMovieDetails(movieId);
    if ("id" in response) this.movieDetailData = response;
  };

  protected async firstUpdated(
    _changedProperties: PropertyValues
  ): Promise<void> {
    const response: MoviesResponse = await fetchMovieList();
    if ("results" in response) this.movieList = response.results;
  }

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
          <movie-detail
            .movie="${this.movieDetailData}"
            @close-detail=${this.#handleCloseDetail}
          >
          </movie-detail>
        </div>

        <ul class="movie-list">
          ${this.movieList.map(
            (movie) => html`
              <movie-card
                .movie=${movie}
                @change-movie=${this.#handleChangeMovie}
              ></movie-card>
            `
          )}
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
  `;
  static styles = [MovieList.globalStyles, MovieList.movieStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "movie-list": MovieList;
  }
}
