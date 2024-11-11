import { LitElement, html, css } from 'lit';
import '@haxtheweb/simple-icon';

class CounterApp extends LitElement {
  static properties = {
    siteData: { type: Object },
    pageData: { type: Array },
    url: { type: String },
    searchTerm: { type: String }
  };

  constructor() {
    super();
    this.siteData = {
      name: "HaxTheWeb Poster Page",
      description: "Join us at haxtheweb.org",
      logo: "https://avatars.githubusercontent.com/u/12715666?s=200&v=4",
      theme: "HAX",
      created: "11/3/2024",
      lastUpdated: "11/3/2024",
      color: "Red"
    };
    this.pageData = [
      {
        title: "HaxTheWeb",
        lastUpdated: "11/10/2024",
        description: "Main page of Hax The Web allowing you to get involved too!",
        contentLink: "https://haxtheweb.org/",
        sourceLink: "source.html"
      },
      {
        title: "What do we do?",
        lastUpdated: "11/10/2024",
        description: "Hax fully integrates design capabilities with what someone is creating. More information can be found at the site offered below.",
        contentLink: "https://haxtheweb.org/welcome/why-hax",
        sourceLink: "source.html"
      },
      {
        title: "Get involved!",
        lastUpdated: "11/10/2024",
        description: "Join us at our monthly meet-up for core developers and contributing groups as well as a bi-monthly meet-up for our end users. We als offer HAX Camp, a chance to learn and develop web components for the HAX ecosystem.",
        contentLink: "https://haxtheweb.org/community",
        sourceLink: "source.html"
      },
      {
        title: "Hax Lab",
        lastUpdated: "11/10/2024",
        description: "Hax Lab is the group responsible for educating student contributors along with the upkeep of HAX. ",
        contentLink: "https://haxtheweb.org/hax-lab",
        sourceLink: "source.html"
      },
      {
        title: "Use Hax yourself!",
        lastUpdated: "11/10/2024",
        description: "We can quickly get you started  with our CLI tools no cost. We are focused on low tech implementations to empower as many voices as possible.",
        contentLink: "https://haxtheweb.org/documentation/hax-frontend-devs",
        sourceLink: "source.html"
      },
      {
        title: "Catch up to speed on terminology!",
        lastUpdated: "11/10/2024",
        description: "This site contaitns a list of common buzzwords and terminology descriptions to aid in the understanding of the rest of our work.",
        contentLink: "https://haxtheweb.org/welcome/terminology",
        sourceLink: "source.html"
      }
    ];
    this.searchTerm = '';
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
      margin-bottom: 20px;
      background-color: white; 
      color: black; 
    }
    .search-bar {
      margin-bottom: 20px;
      text-align: center;
    }
    .search-bar input {
      padding: 8px;
      width: 80%;
      max-width: 300px;
      font-size: 1em;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    .card {
      padding: 15px;
      background-color: white; 
      color: black; 
      border: 1px solid black; 
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .card:hover {
      background-color: red; 
      color: white;
    }
    .card h2 {
      font-size: 1.2em;
      margin: 0 0 10px;
      color: blue;
      text-decoration: underline;
      cursor: pointer;
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

  updateSearchTerm(e) {
    this.searchTerm = e.target.value.toLowerCase();
  }

  openCardInNewWindow(page) {
    const newWindow = window.open('', '_blank', 'width=400,height=300');
    newWindow.document.write(`
      <html>
        <head>
          <title>${page.title}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: white; }
            h1 { color: black; }
            p { color: black; }
            a { color: blue; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>${page.title}</h1>
          <p>${page.description}</p>
          <a href="${page.contentLink}" target="_blank">Visit Site</a>
        </body>
      </html>
    `);
    newWindow.document.close();
  }
  async analyzeSite() {
    const url = this.searchTerm.trim();
    if (!url) {
      alert('Please enter a valid URL.');
      return;
    }
  
    const siteJsonUrl = url.endsWith('site.json') ? url : `${url}/site.json`;
  
    try {
      const response = await fetch(siteJsonUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch site.json');
      }
  
      const data = await response.json();
      this.validateSiteData(data);
  
      // Once validated, update siteData and pageData
      this.siteData = data;
      this.pageData = data.items || []; // Assuming items is an array in site.json
    } catch (error) {
      console.error(error);
      alert('Error fetching site data or invalid site.json');
    }
  }
  
  validateSiteData(data) {
    const requiredFields = ['name', 'description', 'logo', 'theme', 'created', 'lastUpdated', 'color', 'items'];
    for (let field of requiredFields) {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }

  render() {
    const filteredPages = this.pageData.filter(page =>
      page.title.toLowerCase().includes(this.searchTerm) ||
      page.description.toLowerCase().includes(this.searchTerm)
    );

    return html`
      <div class="site-header">
        <img src="${this.siteData.logo}" alt="Logo">
        <h1>${this.siteData.name}</h1>
        <p>Description: ${this.siteData.description}</p>
        <p>Theme: ${this.siteData.theme}</p>
        <p>Created: ${this.siteData.created}</p>
        <p>Last Updated: ${this.siteData.lastUpdated}</p>
        <p>Color: ${this.siteData.color}</p>
      </div>

      <div class="search-bar">
  <input
    type="text"
    placeholder="Enter site URL..."
    @input="${this.updateSearchTerm}"
  />
  <button @click="${this.analyzeSite}">Analyze</button>
</div>


      <div class="search-bar">
        <input
          type="text"
          placeholder="Search..."
          @input="${this.updateSearchTerm}"
        />
      </div>

      <div class="grid-container">
        ${filteredPages.map(page => html`
          <div class="card" @click="${() => this.openCardInNewWindow(page)}">
            <img src="https://avatars.githubusercontent.com/u/170651362?s=200&v=4" alt="Page icon">
            <h2>${page.title}</h2>
            <p>Last updated: ${page.lastUpdated}</p>
            <p>${page.description}</p>
            <a href="${page.contentLink}" target="_blank">Link to Site</a>
            <p>JOIN US AT HAXTHEWEB.ORG TO DESIGN AND DEVELOP YOUR OWN WEBPAGE!!</p>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('counter-app', CounterApp);