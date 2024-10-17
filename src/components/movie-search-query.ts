import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { debouncedMethod } from "../utils/helpers";

declare global {
  interface HTMLElementTagNameMap {
    "movie-search-query": MovieSearchQuery;
  }
}

@customElement("movie-search-query")
export class MovieSearchQuery extends LitElement {
  @query("input#query")
  private inputElm!: HTMLInputElement;

  #sendQueryEvent = (query: string) => {
    this.dispatchEvent(new CustomEvent("change", { detail: { query } }));
  };
  #handleInputChange = () => {
    debouncedMethod(() => this.#sendQueryEvent(this.inputElm.value));
    // this.#sendQueryEvent(ev.target.value)
  };

  render() {
    return html` q:<input id="query" @input=${this.#handleInputChange} /> `;
  }
}
