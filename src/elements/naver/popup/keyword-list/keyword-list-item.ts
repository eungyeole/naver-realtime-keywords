import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Ranking } from "../../../../apis/types";

@customElement("naver-popup-keyword-list-item")
export class NaverPopupKeywordListItem extends LitElement {
  @property({ type: Object }) ranking!: Ranking;

  render() {
    return html`
      <div class="container">
        <a href="${this.ranking.keyword}">
          <span class="rank">${this.ranking.rank}</span>
          <span class="keyword">${this.ranking.keyword}</span>
        </a>
      </div>
    `;
  }

  static styles = [
    css`
      .rank {
        color: var(--color_caption1);
        font-weight: 500;
        font-size: 1.5rem;
        margin-right: 10px;
        width: 16px;
        text-align: right;
      }

      .keyword {
        color: var(--color_caption1);
        font-size: 1.5rem;
        width: 100%;
        text-align: left;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "naver-popup-keyword-list-item": NaverPopupKeywordListItem;
  }
}
