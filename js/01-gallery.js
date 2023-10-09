import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const renderList = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", renderList);

gallery.addEventListener("click", clickImg);

function clickImg(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `
    <img src="${target.dataset.source}">
`,
    {
      onShow: () => {
        document.addEventListener("keydown", closeEsc);
      },
      onClose: () => {
        document.removeEventListener("keydown", closeEsc);
      },
    }
  );

  instance.show();

  function closeEsc(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
