import { LitElement, html, css } from 'lit';
import { WiredButton } from 'wired-elements/lib/wired-button.js';
import { WiredInput } from 'wired-elements/lib/wired-input.js';

class CounterApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 20px;
      background-color: #f5f5f5;
      color: #333;
    }
    .site-header {
      text-align: center;
      padding: 20px;
      margin-bottom: 20px;
      background-color: #333;
      color: white;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .character-area {
      flex: 1 1 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
      border: 2px dashed #ccc;
      height: 400px;
    }
    .controls-area {
      flex: 1 1 35%;
      background-color: #fff;
      border: 2px solid #ccc;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    wired-button,
    wired-input,
    wired-checkbox {
      display: block;
      margin-bottom: 15px;
    }
    h2 {
      text-align: center;
      margin-top: 0;
    }
  `;

  render() {
    return html`
      <div class="site-header">
        <h1>Character Creator!</h1>
      </div>
      <div class="container">
        <!-- Character Display Area -->
        <div class="character-area">
          <p>Character placeholder</p>
        </div>

        <div class="controls-area">
          <h2>Customize Character</h2>
          <wired-input placeholder="Accessory (0-9)"></wired-input>
          <wired-input placeholder="Base (1 or 5)"></wired-input>
          <wired-input placeholder="Face (0-5)"></wired-input>
          <wired-input placeholder="Face Item (0-9)"></wired-input>
          <wired-input placeholder="Hair (0-9)"></wired-input>
          <wired-input placeholder="Pants (0-9)"></wired-input>
          <wired-input placeholder="Shirt (0-9)"></wired-input>
          <wired-input placeholder="Skin (0-9)"></wired-input>
          <wired-checkbox>Fire</wired-checkbox>
          <wired-checkbox>Walking</wired-checkbox>
          <wired-checkbox>Circle</wired-checkbox>
          <wired-button>Share</wired-button>
        </div>
      </div>
    `;
  }
}

customElements.define('counter-app', CounterApp);
