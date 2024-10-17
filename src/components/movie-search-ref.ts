import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

import { debouncedMethod } from "../utils/helpers";

declare global {
  interface HTMLElementTagNameMap {
    "movie-search-ref": MovieSearchRef;
  }
}

@customElement("movie-search-ref")
export class MovieSearchRef extends LitElement {
  inputRef = createRef<HTMLInputElement>();

  #sendQueryEvent = (query: string) => {
    this.dispatchEvent(new CustomEvent("change", { detail: { query } }));
  };
  #handleInputChange = () => {
    debouncedMethod(() =>
      this.#sendQueryEvent(this.inputRef.value?.value as string)
    );
    // this.#sendQueryEvent(ev.target.value)
  };

  render() {
    return html`
      r:<input ${ref(this.inputRef)} @input=${this.#handleInputChange} />
    `;
  }
}
