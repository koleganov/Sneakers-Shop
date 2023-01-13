import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
      axios.get("https://63beb15cf5cfc0949b5e5d43.mockapi.io/items").then(res => {
        setItems(res.data)
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://63beb15cf5cfc0949b5e5d43.mockapi.io/cart", obj)
    setCartItems([...cartItems, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searchValue
              ? `Поиск по запросу: '${searchValue}'`
              : "Все кроссовки"}
          </h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search-icon" />
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="sneakers d-flex flex-wrap">
          {items
            .filter((item) => item.name.toLowerCase().includes(searchValue))
            .map((item, index) => (
              <Card
                key={index}
                title={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log("Нажали сердце")}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
