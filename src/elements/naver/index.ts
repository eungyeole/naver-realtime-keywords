import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getRankingApi } from "../../apis/get-ranking-api";
import { GetRankingResponse } from "../../apis/types";
import "./popup";

@customElement("naver-realtime-keywords")
export class RealtimeKeywords extends LitElement {
  @property({
    type: Object,
  })
  data: GetRankingResponse = {
    rankings: [],
    createdAt: "",
  };

  @property({ type: Boolean }) isOpen: boolean = false;

  async getRanking() {
    const response = await getRankingApi();
    this.data = response;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getRanking();
  }

  render() {
    return html`
      <div class="container">
        ${this.isOpen
          ? html`<naver-popup .rankigns=${this.data.rankings}></naver-popup>`
          : null}
      </div>
    `;
  }

  static styles = [
    css`
      .container {
        position: relative;
        width: 100%;
        height: 52px;
        background-color: var(--color_block_bg);
        margin-bottom: 16px;
        box-shadow: 0 0 0 1px var(--color_border_out),
          0 1px 2px 0 rgba(0, 0, 0, 0.04);
        border-radius: 8px;
        padding: 0 18px 0px 18px;
        box-sizing: border-box;
      }

      html[data-dark="true"] .container {
        box-shadow: none;
      }
    `,
  ];
}
