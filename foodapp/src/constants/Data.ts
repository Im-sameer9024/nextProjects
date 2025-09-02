import Pizzas from "../../assets/pizza.jpg";
import Pastas from "../../assets/pasta.jpg";
import Burgers from "../../assets/burger.jpg";
import { StaticImageData } from "next/image";

interface linksProps {
  id: number;
  text: string;
  path: string;
}

export const links: linksProps[] = [
  {
    id: 1,
    text: "Home",
    path: "/",
  },
  {
    id: 2,
    text: "Menu",
    path: "/menu",
  },
  {
    id: 3,
    text: "Contact",
    path: "/contact",
  },
];

interface menuProps {
  id: number;
  slug: string;
  title: string;
  description?: string;
  img?: StaticImageData;
}

export const menu: menuProps[] = [
  {
    id: 1,
    slug: "pastas",
    title: "Italian Pasta",
    description: "Savor the flavors of Italy with our delicious pasta dishes.",
    img: Pastas,
  },
  {
    id: 2,
    slug: "pizzas",
    title: "Cheesy Pizzas",
    description: "Indulge in our cheesy pizzas with a variety of toppings.",
    img: Pizzas,
  },
  {
    id: 3,
    slug: "burgers",
    title: "Juicy Burgers",
    description:
      "Sink your teeth into our juicy burgers made with the finest ingredients.",
    img: Burgers,
  },
];


