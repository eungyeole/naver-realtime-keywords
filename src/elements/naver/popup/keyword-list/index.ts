import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Ranking } from "../../../../apis/types";
import "./keyword-list-item";

@customElement("naver-popup-keyword-list")
export class NaverPopupKeywordList extends LitElement {
  @property({ type: Array }) rankigns: Ranking[] = [];

  render() {
    return html`
      <div class="container">
        ${this.rankigns.map((ranking) => {
          return html`
            <naver-popup-keyword-list-item
              .ranking=${ranking}
            ></naver-popup-keyword-list-item>
          `;
        })}
      </div>
    `;
  }

  static styles = [
    css`
      .container {
        margin: 20px 0;
        padding: 0 18px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "naver-popup-keyword-list": NaverPopupKeywordList;
  }
}
