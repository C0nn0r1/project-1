import { LitElement, html, css } from 'lit';
import { WiredButton } from 'wired-elements/lib/wired-button.js';
import { WiredInput } from 'wired-elements/lib/wired-input.js';
import { WiredCheckbox } from 'wired-elements/lib/wired-checkbox.js';
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

class CounterApp extends LitElement {
  static properties = {
    hat: { type: String },
    base: { type: Number },
    face: { type: Number },
    faceItem: { type: Number },
    hair: { type: Number },
    pants: { type: Number },
    shirt: { type: Number },
    skin: { type: Number },
    hatColor: { type: Number },
    fire: { type: Boolean },
    walking: { type: Boolean },
    circle: { type: Boolean },
    seed: { type: String }
  };

  constructor() {
    super();
    this.hat = "none";
    this.base = 1;
    this.face = 0;
    this.faceItem = 0;
    this.hair = 0;
    this.pants = 0;
    this.shirt = 0;
    this.skin = 0;
    this.hatColor = 0;
    this.fire = false;
    this.walking = false;
    this.circle = false;
    this.seed = this.getSeedFromURL();
  }

  getSeedFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('seed') || null;
  }

  generateSeed() {
    return [
      this.base,
      this.face,
      this.faceItem,
      this.hair,
      this.pants,
      this.shirt,
      this.skin,
      this.hatColor,
      this.hat === 'none' ? 0 : 1, 
      this.fire ? 1 : 0, 
      this.walking ? 1 : 0, 
      this.circle ? 1 : 0  
    ].join('');
  }

  updateSeed() {
    this.seed = this.generateSeed();
    // Update the URL without reloading the page
    const url = `${window.location.origin}${window.location.pathname}?seed=${this.seed}`;
    window.history.replaceState(null, '', url);
  }

  handleHatChange(e) {
    this.hat = e.target.value;
    this.updateSeed();
  }

  handleBaseChange(e) {
    this.base = Number(e.target.value);
    this.updateSeed();
  }

  handleFaceChange(e) {
    this.face = Number(e.target.value);
    this.updateSeed();
  }

  handleFaceItemChange(e) {
    this.faceItem = Number(e.target.value);
    this.updateSeed();
  }

  handleHairChange(e) {
    this.hair = Number(e.target.value);
    this.updateSeed();
  }

  handlePantsChange(e) {
    this.pants = Number(e.target.value);
    this.updateSeed();
  }

  handleShirtChange(e) {
    this.shirt = Number(e.target.value);
    this.updateSeed();
  }

  handleSkinChange(e) {
    this.skin = Number(e.target.value);
    this.updateSeed();
  }

  handleHatColorChange(e) {
    this.hatColor = Number(e.target.value);
    this.updateSeed();
  }

  handleFireChange(e) {
    this.fire = e.target.checked;
    this.updateSeed();
  }

  handleWalkingChange(e) {
    this.walking = e.target.checked;
    this.updateSeed();
  }

  handleCircleChange(e) {
    this.circle = e.target.checked;
    this.updateSeed();
  }

  handleShareClick() {
    const url = `${window.location.origin}${window.location.pathname}?seed=${this.seed}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        alert('Failed to copy link: ' + err);
      });
  }

  render() {
    return html`
      <div class="container">
        <div class="character-area">
          <rpg-character
            seed="${this.seed}"
            hat="${this.hat}"
            base="${this.base}"
            face="${this.face}"
            faceitem="${this.faceItem}"
            hair="${this.hair}"
            pants="${this.pants}"
            shirt="${this.shirt}"
            skin="${this.skin}"
            hatcolor="${this.hatColor}"
            ?fire="${this.fire}"
            ?walking="${this.walking}"
            ?circle="${this.circle}"
          ></rpg-character>
        </div>
        <div class="controls-area">
          <h2>Customize Character</h2>
          <wired-input 
            placeholder="Base (1 or 5)" 
            type="number" 
            min="1" 
            max="5"
            .value="${this.base}"
            @input="${this.handleBaseChange}"
          ></wired-input>
          <wired-input 
            placeholder="Face (0-5)" 
            type="number" 
            min="0" 
            max="5"
            .value="${this.face}"
            @input="${this.handleFaceChange}"
          ></wired-input>
          <wired-input 
            placeholder="Face Item (0-9)" 
            type="number" 
            min="0" 
            max="9"
            .value="${this.faceItem}"
            @input="${this.handleFaceItemChange}"
          ></wired-input>
          <wired-input 
            placeholder="Hair (0-9)" 
            type="number" 
            min="0" 
            max="9"
            .value="${this.hair}"
            @input="${this.handleHairChange}"
          ></wired-input>
          <wired-input 
            placeholder="Pants (0-9)" 
            type="number" 
            min="0" 
            max="9"
            .value="${this.pants}"
            @input="${this.handlePantsChange}"
          ></wired-input>
          <wired-input 
            placeholder="Shirt (0-9)" 
            type="number" 
            min="0" 
            max="9"
            .value="${this.shirt}"
            @input="${this.handleShirtChange}"
          ></wired-input>
          <wired-input 
            placeholder="Skin (0-9)" 
            type="number" 
            min="0" 
            max="9"
            .value="${this.skin}"
            @input="${this.handleSkinChange}"
          ></wired-input>
          <wired-input 
            placeholder="Hat Color (0-9)" 
            type="number" 
            min="0" 
            max="9"
            .value="${this.hatColor}"
            @input="${this.handleHatColorChange}"
          ></wired-input>
          <label for="hat">Hat</label>
          <select id="hat" .value="${this.hat}" @change="${this.handleHatChange}">
            <option value="none">None</option>
            <option value="bunny">Bunny</option>
            <option value="coffee">Coffee</option>
            <option value="construction">Construction</option>
            <option value="cowboy">Cowboy</option>
            <option value="education">Education</option>
            <option value="knight">Knight</option>
            <option value="ninja">Ninja</option>
            <option value="party">Party</option>
            <option value="pirate">Pirate</option>
            <option value="watermelon">Watermelon</option>
          </select>
          <wired-checkbox 
            ?checked="${this.fire}"
            @change="${this.handleFireChange}"
          >Fire</wired-checkbox>
          <wired-checkbox 
            ?checked="${this.walking}"
            @change="${this.handleWalkingChange}"
          >Walking</wired-checkbox>
          <wired-checkbox 
            ?checked="${this.circle}"
            @change="${this.handleCircleChange}"
          >Circle</wired-checkbox>

          <wired-button @click="${this.handleShareClick}">
            Share
          </wired-button>
          <p>Copy the link to share your character!</p>
        </div>
      </div>
    `;
  }
}

customElements.define('counter-app', CounterApp);
