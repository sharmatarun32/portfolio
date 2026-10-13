# Portfolio – Tarun Sharma, Salesforce Developer

Static site (HTML, CSS, vanilla JS). No build step.

- `index.html` – the page
- `css/portfolio.css`, `js/portfolio.js` – the only assets the page loads
- Other files in `css/`, `js/`, `images/`, `fonts/`, `scss/`, `single.html` are leftovers from the original template and are no longer referenced.

## Run locally
`python3 -m http.server 8000` then open http://localhost:8000

## Publish on GitHub Pages
Push to GitHub → Settings → Pages → Deploy from branch → `main` / root.

## To finish
- Resume: put the PDF at `files/Tarun-Sharma-Resume.pdf`, uncomment the button in the hero.
- LinkedIn / GitHub: uncomment and fill in the lines in the Contact section.
- Education: add a card in the Education section.
- Contact form has no backend; it validates, then opens the visitor's email app.
