import React from "react";
import AppContext from "../context";

const Info = ({  title, image, description }) => {
    
    const {setCartOpened} = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex mb-10">
      <img width={120} height={120} src={image} alt="" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened()} className="greenButton">
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
