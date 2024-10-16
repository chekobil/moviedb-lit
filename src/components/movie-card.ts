import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFullImagePath } from "../utils/image";

@customElement("movie-card")
export class MovieCard extends LitElement {
  @property({ type: Object })
  movie: MovieDetailType = {};

  #hadleEmitMovieId = (movieId: number) => {
    this.dispatchEvent(
      new CustomEvent("change-movie", { detail: { id: movieId } })
    );
  };

  render() {
    const movie = this.movie as MovieFullDetail;
    const rating = parseFloat(movie.vote_average.toFixed(1));
    return html`
      <div
        class="movie-card"
        @click="${() => this.#hadleEmitMovieId(movie.id)}"
      >
        <img src="${getFullImagePath(movie.poster_path)}" />
        <div class="movie-title">
          <span class="title">${movie.title}</span>
          <span class="rating">${rating}</span>
        </div>
      </div>
    `;
  }

  static globalStyles = css`
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
  static styles = [MovieCard.globalStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "movie-card": MovieCard;
  }
}
