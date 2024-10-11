import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import litLogo from "./assets/lit.svg";

import { getMovieList } from "./movies.ts";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Array })
  movieList: Movie[] = [];

  protected async firstUpdated(
    _changedProperties: PropertyValues
  ): Promise<void> {
    const response: MovieResponse = await getMovieList();
    this.movieList = response.results;
  }

  getImagePath = (path: string) => {
    const basePath = "https://image.tmdb.org/t/p/w1280";
    return basePath + path;
  };

  getMovieCard = (movie: Movie) => {
    return html`
      <div class="movie-card">
        <img src="${this.getImagePath(movie.poster_path)}" />
        <div class="movie-title">${movie.title}</div>
      </div>
    `;
  };

  render() {
    return html`
      <div>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <p class="read-the-docs">movies:${this.movieList?.length ?? 0}</p>
      <ul class="movie-list-container">
        ${this.movieList.map((movie) => this.getMovieCard(movie))}
      </ul>
    `;
  }

  static movieStyles = css`
    .movie-list-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.2rem;
    }
    .movie-card {
      border: 2px solid green;
      border-radius: 12px;
      max-width: 260px;
      overflow: hidden;
    }
    .movie-card > img {
      width: 100%;
      height: auto;
    }
  `;
  static globalStyles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
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
  static styles = [MyElement.globalStyles, MyElement.movieStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
