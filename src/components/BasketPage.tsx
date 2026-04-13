import { useBasket } from "./BasketContext";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export function BasketPage() {
  const { basket, addToBasket, removeFromBasket } = useBasket();

  const totalPrice = basket.reduce((sum, i) => sum + i.price * i.quantity, 0);

  //const averagePrice =  basket.length === 0 ? 0 : totalPrice / basket.length;

  const totalQuantity = basket.reduce((sum, i) => sum + i.quantity, 0);

  const averagePrice = totalQuantity === 0 ? 0 : totalPrice / totalQuantity;

  const typeCount: Record<string, number> = {};

  basket.forEach(item => {
    typeCount[item.type] = (typeCount[item.type] || 0) + item.quantity;
  });

  const mostPickedType =
    basket.length === 0
      ? "None"
      : Object.keys(typeCount).reduce((a, b) =>
          typeCount[a] > typeCount[b] ? a : b
        );

  if (basket.length === 0) {
    return <h2 style={{ textAlign: "center", color:"#e9650dfd"}}>Your basket is empty</h2>;
  }

  return (
    <div className="basket-page">
      <h2 style={{color:"#f7f33d"}}>My Basket</h2>

<div className="basket-card">
      {basket.map(item => (
          <div key={item.id} className="basket-item">
            <span className="item-name">{item.name}</span>
            
          <div className="qty-controls">
            <button onClick={() => removeFromBasket(item)}>-</button>
            <span className="qty">{item.quantity}</span>
            <button onClick={() => addToBasket(item)}>+</button>
          </div>

           <span className="item-price">
                ₹{item.price * item.quantity}
          </span>
          <button  className="remove-btn"   title="Remove item" aria-label="remove-from-basket"
                onClick={() => {
                  for (let i = 0; i < item.quantity; i++) {
                    removeFromBasket(item);
                  }
          }}>
                  <RemoveShoppingCartIcon />
          </button>
          </div>
        ))}
      
 <div className="basket-total">
          Total: ₹{totalPrice}
        </div>
      </div>

     <div className="insights-card">
        <h3 style={{color:"#be1eb1"}}>Insights & Highlights</h3>
        <p>Most picked dairy type: <strong>{mostPickedType}</strong></p>
        <p>Average item price: <strong>₹{averagePrice.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}