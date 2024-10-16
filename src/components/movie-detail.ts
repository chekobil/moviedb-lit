import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFullImagePath } from "../utils/image";

@customElement("movie-detail")
export class MovieDetail extends LitElement {
  @property({ type: Object })
  movie: MovieDetailType = {};

  #handleEmitClose = () => {
    this.dispatchEvent(new Event("close-detail"));
  };

  render() {
    if ("title" in this.movie) {
      const movie = this.movie as MovieFullDetail;
      return html`
        <div class="movie-detail-container">
          <div
            class="movie-content-backdrop"
            style="--backdrop-image:url('${getFullImagePath(
              movie.backdrop_path
            )}');"
          ></div>
          <button class="movie-content-close" @click="${this.#handleEmitClose}">
            Close
          </button>
          <div class="movie-content">
            <div class="movie-content-poster">
              <img src="${getFullImagePath(movie.poster_path)}" />
            </div>
            <div class="movie-content-credits">
              <h1>${movie.title}</h1>
            </div>
          </div>
        </div>
      `;
    } else {
      return html``;
    }
  }

  static globalStyles = css`
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
        filter: grayscale(50%);
      }
      > .movie-content-close {
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
        z-index: 9;
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
  `;
  static styles = [MovieDetail.globalStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "movie-detail": MovieDetail;
  }
}
