import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "./header";
import "./keyword-list";

@customElement("naver-popup")
export class NaverPopup extends LitElement {
  render() {
    return html`
      <div class="container">
        <naver-popup-header></naver-popup-header>
        <naver-popup-keyword-list .rankigns=${[]}></naver-popup-keyword-list>
      </div>
    `;
  }

  static styles = [
    css`
      .container {
        width: 100%;
        z-index: 1000;
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background: var(--color_block_bg);
        animation: popup 0.15s ease-in-out;
        box-shadow: 0 0 0 1px var(--color_border_out),
          0 4px 8px 0 rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
      }

      .container::before {
        content: "";
        display: block;
        position: absolute;
        top: -13px;
        right: 13px;
        background-image: url(https://pm.pstatic.net/resources/asset/sp_main.30918f90.png);
        background-size: 422px 405px;
        background-position: -165px -114px;
        background-repeat: no-repeat;
        width: 22px;
        height: 13px;
      }

      html[data-dark="true"] .container::before {
        background-position: -142px -114px;
      }
      html[data-dark="true"] .container {
        box-shadow: 0 0 0 1px #383c3c, 0 4px 12px 0 rgba(0, 0, 0, 0.5);
      }
    `,
  ];
}
