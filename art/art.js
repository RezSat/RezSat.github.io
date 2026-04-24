const artItems = [
  {
    title: "Aurelian Monolith",
    image: "https://kyoko.openprocessing.org/thumbnails/visualThumbnail2925485@2x.jpg?hash=20260424210409",
    url: "https://openprocessing.org/sketch/2925485",
    description: "Credits: Port of Phosphor by Xor; modified to a Cubic SDF to impose structural geometric constraints on the underlying sinusoidal turbulence."
  },
  {
    title: "Neon Flux Field",
    image: "https://kyoko.openprocessing.org/thumbnails/visualThumbnail2920611@2x.jpg?hash=20260419185031",
    url: "https://openprocessing.org/sketch/2920611",
    description: "A multi-layered neon grid system distorted through triple-iterative domain warping and a time-varying sinusoidal flow field, rendered with an exponential tone-mapped glow."
  },
  {
    title: "Golden Mist",
    image: "https://kyoko.openprocessing.org/thumbnails/visualThumbnail2920638@2x.jpg?hash=20260419194439",
    url: "https://openprocessing.org/sketch/2920638",
    description: "A volumetric raymarching study utilizing nested trigonometric feedback loops and spiral-warped coordinate systems to simulate high-density gold-leaf particulate motion."
  },
];


const fallbackImage = "/assets/images/art/placeholder.svg";

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderArtGrid() {
  const grid = document.querySelector("[data-art-grid]");

  if (!grid) return;

  if (!artItems.length) {
    grid.innerHTML = `
      <div class="art-empty">
        Add your first sketch inside <strong>/art/art.js</strong>.
      </div>
    `;
    return;
  }

  grid.innerHTML = artItems.map((item) => {
    const title = escapeHTML(item.title);
    const description = escapeHTML(item.description || "Open the live sketch.");
    const image = escapeHTML(item.image || fallbackImage);
    const url = escapeHTML(item.url);

    return `
      <a class="art-card" href="${url}" target="_blank" rel="noopener noreferrer">
        <span class="art-card__image-wrap">
          <img class="art-card__image" src="${image}" alt="${title}" loading="lazy">
        </span>
        <span class="art-card__content">
          <span class="art-card__title">${title}</span>
          <span class="art-card__description">${description}</span>
          <span class="art-card__button">View sketch</span>
        </span>
      </a>
    `;
  }).join("");
}

function initCursor() {
  const cursor = document.querySelector(".cursor");

  if (!cursor) return;

  document.addEventListener("mousemove", (event) => {
    cursor.style.transform = `translate(${event.clientX - 10}px, ${event.clientY - 10}px)`;
  });
}

renderArtGrid();
initCursor();
