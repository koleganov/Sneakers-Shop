import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import API from './security'

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);


  React.useEffect(() => {
      axios.get(API.ITEMS).then(res => {
        setItems(res.data)
      });
      axios.get("https://63beb15cf5cfc0949b5e5d43.mockapi.io/cart").then(res => {
        setCartItems(res.data)
    })
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://63beb15cf5cfc0949b5e5d43.mockapi.io/cart", obj)
    setCartItems([...cartItems, obj]);
  };

  const onAddToFavorite = (obj) => {
    axios.post('https://62fcbac16e617f88de9cdd45.mockapi.io/favorites', obj)
    setFavorites((prev) => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://63beb15cf5cfc0949b5e5d43.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>
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
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
