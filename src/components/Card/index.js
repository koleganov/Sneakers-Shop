import React from 'react'
import styles from './Card.module.scss'

const Card = ({title, imageUrl, price, onFavorite, onPlus}) => {

  const [isAdded, setIsAdded] = React.useState(false);

  const onClickPlus = () => {
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded);
  }
console.log(isAdded)
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked-heart" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <span className={styles.price}>{price} руб.</span>
        </div>
        
         <img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/plus.svg'} alt="Plus" />
        
      </div>
    </div>
  )
}

export default Card