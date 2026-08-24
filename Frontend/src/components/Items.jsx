import img1 from "../images/Clothes.jpg";
import img2 from "../images/Glasses.jpg";
import img3 from "../images/Footwear.jpg";
import img4 from "../images/Watches.jpg";
import img5 from "../images/Handbags.jpg";
import img6 from "../images/Makeup.jpg";
import img7 from "../images/Jewellery.jpg";
import img8 from "../images/Wallets.jpg";

const items = [
  { img: img1, name: "Clothes" },
  { img: img2, name: "Glasses" },
  { img: img3, name: "Footwear" },
  { img: img4, name: "Watches" },
  { img: img5, name: "Handbags" },
  { img: img6, name: "Makeup" },
  { img: img7, name: "Jewellery" },
  { img: img8, name: "Wallets" },
];

export default function Items() {
  return (
    <div className="items2-container">
        {items.map((item) => (
        <div className="items2-card" key={item.name}>
            <div className="items2-img-wrapper">
            <img src={item.img} alt={item.name} className="items2-img" />
            </div>
            <p className="items2-name">{item.name}</p>
        </div>
        ))}
    </div>
  );
}