import { LitElement, html, css } from 'lit';

class CounterApp extends LitElement {
  static properties = {
    counter: { type: Number },
    min: { type: Number },
    max: { type: Number },
  };

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 100;
  }

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      text-align: center;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .counter {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    button {
      padding: 5px 10px;
      font-size: 1rem;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }
  `;

  increment() {
    if (this.counter < this.max) {
      this.counter += 1;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter -= 1;
    }
  }

  getCounterColor() {
    if (this.counter === this.min || this.counter === this.max) {
      return 'red'; 
    } else if (this.counter >= 21) {
      return 'blue'; 
    } else if (this.counter >= 18) {
      return 'green'; 
    }
    return 'black';
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain(); 
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="counter">${this.counter}</div>
        <p style="color: ${this.getCounterColor()}">Counter: ${this.counter}</p>
        <button @click="${this.decrement}" ?disabled="${this.counter <= this.min}">-</button>
        <button @click="${this.increment}" ?disabled="${this.counter >= this.max}">+</button>

      </confetti-container>
    `;
  }
}

customElements.define('counter-app', CounterApp);
