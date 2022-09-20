const URL = "http://makeup-api.herokuapp.com/api/v1/products.json";
const DEFAULT_IMAGE =
  "https://static.insales-cdn.com/files/1/660/10781332/original/PHOTO-2019-12-09-19-44-18-2.jpg";

const cards = document.querySelector(".container_cards");

const selectType = document.querySelector(".form-select");
console.log(selectType.options);

selectType.addEventListener("input", (e) => {
  const type = selectType.value;
  console.log(type);
  fetchDate(type);
});

function fetchDate(type) {
  let url = URL;
  if (type !== "All") {
    url += `?product_type=${type}`;
  }
  console.log(url);
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createCards(data);
    });
}

function createCards(data) {
  const frarment = document.createDocumentFragment();

  data.forEach((el) => {
    console.log(el);
    console.log(el.name);
    console.log(el.image_link);
    console.log(el.product_type);

    console.log(el.brand);
    console.log(el.price);
    console.log(el.currency);

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    if (el.api_featured_image) {
      img.setAttribute("src", `https://${el.api_featured_image}`);
    } else {
      img.setAttribute("src", DEFAULT_IMAGE);
    }

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = el.brand;

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = el.name;

    const ul = document.createElement("ul");
    ul.classList.add("list-group", "list-group-flush");

    const productType = document.createElement("li");
    productType.classList.add("list-group-item");
	productType.textContent = el.product_type;


    const price = document.createElement("li");
    price.classList.add("list-group-item");
	
	if (el.currency) {
		price.textContent = `${el.price}${el.currency}`;
	} else {
		price.textContent = el.price;
	}

    const descr = document.createElement("li");
    descr.classList.add("list-group-item");

    const cardBodyBottom = document.createElement("div");
    cardBodyBottom.classList.add("card-body");

    const linkProduct = document.createElement("a");
    linkProduct.classList.add("card-link");
	linkProduct.textContent = 'Magazin'
    linkProduct.setAttribute("href", el.website_link);


    cardBodyBottom.appendChild(linkProduct);
    ul.appendChild(productType);
    ul.appendChild(price);
    ul.appendChild(descr);

    cardBody.appendChild(h5);
    cardBody.appendChild(p);

    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(ul);
    card.appendChild(cardBodyBottom);

    frarment.appendChild(card);
  });

  cards.innerHTML = "";
  cards.appendChild(frarment);
}
