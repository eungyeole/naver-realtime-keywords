import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { koreandateFormat } from "../../../utils/korean-date-format";

@customElement("naver-popup-header")
export class NaverPopupHeader extends LitElement {
  render() {
    return html`
      <div class="header">
        <h1 class="title">급상승 검색어</h1>
        <span class="update"> ${koreandateFormat()} </span>
      </div>
    `;
  }

  static styles = [
    css`
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 18px;
        border-bottom: 1px solid var(--color_border_out);
      }

      .title {
        margin: 0;
        font-size: 1.5rem;
        color: var(--color_title);
        font-weight: 700;
      }

      .update {
        font-size: 1.3rem;
        color: var(--color_caption2);
        font-weight: 500;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "naver-popup-header": NaverPopupHeader;
  }
}
