import { LitElement, html, css } from 'lit';

class CounterApp extends LitElement {
  static properties = {
    siteData: { type: Object },
    pageData: { type: Array },
  };

  constructor() {
    super();
    this.siteData = {
      name: "Name",
      description: "blah blah",
      logo: "https://via.placeholder.com/100",
      theme: "idk",
      created: "11/3/2024",
      lastUpdated: "11/3/2024",
      color: "Orange"
    };
    this.pageData = [
      {
        title: "Page 1 Title",
        lastUpdated: "11/3/2024",
        description: "blah blah",
        contentLink: "index.html",
        sourceLink: "source.html"
      },
      {
        title: "Page Title 2",
        lastUpdated: "11/3/2024",
        description: "blah",
        contentLink: "index.html",
        sourceLink: "source.html"
      },
      {
        title: "Page Title 3",
        lastUpdated: "11/3/2024",
        description: "blah",
        contentLink: "index.html",
        sourceLink: "source.html"
      },
      {
        title: "Page Title 4",
        lastUpdated: "11/3/2024",
        description: "blah",
        contentLink: "index.html",
        sourceLink: "source.html"
      },
      {
        title: "Page Title 5",
        lastUpdated: "11/3/2024",
        description: "blah",
        contentLink: "index.html",
        sourceLink: "source.html"
      },
      {
        title: "Page Title 6",
        lastUpdated: "11/3/2024",
        description: "blah",
        contentLink: "index.html",
        sourceLink: "source.html"
      }
    ];
  }

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 20px;
      background-color: black; 
      color: white; 
    }
    .site-header {
      text-align: center;
      padding: 20px;
      border: 1px solid black; /* Added semicolon here */
      margin-bottom: 20px;
      background-color: white; 
      color: black; /* Set text color to black for visibility */
    }
    .site-header img {
      width: 100px;
      height: auto;
      margin-bottom: 10px;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .card {
      padding: 15px;
      background-color: white; 
      color: black; 
      border: 1px solid black; 
      border-radius: 5px;
      text-align: center;
    }
    .card img {
      width: 100%;
      max-width: 100px;
      height: auto;
      margin-bottom: 10px;
    }
    .card h2 {
      font-size: 1.2em;
      margin: 0 0 10px;
    }
    .card p {
      margin: 5px 0;
      font-size: 0.9em;
    }
    .card a {
      color: blue; 
      text-decoration: none;
      font-size: 0.9em;
    }
    .card a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <div class="site-header">
        <img src="${this.siteData.logo}" alt="Logo">
        <h1>${this.siteData.name}</h1>
        <p>Description: ${this.siteData.description}</p>
        <p>Theme: ${this.siteData.theme}</p>
        <p>Created: ${this.siteData.created}</p>
        <p>Last Updated: ${this.siteData.lastUpdated}</p>
        <p>Color: ${this.siteData.color}</p>
        <p>blah blah</p>
      </div>

      <div class="grid-container">
        ${this.pageData.map(page => html`
          <div class="card">
            <img src="https://via.placeholder.com/100" alt="Page icon">
            <h2>${page.title}</h2>
            <p>Last updated: ${page.lastUpdated}</p>
            <p>${page.description}</p>
            <a href="${page.contentLink}" target="_blank">content</a> |
            <a href="${page.sourceLink}" target="_blank">source</a>
            <p>Additional ability to make meaning</p>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('counter-app', CounterApp);
