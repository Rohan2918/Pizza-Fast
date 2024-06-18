import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { addItem, getCurrentQunatityById } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import DeleteItem from '../../features/cart/DeleteItem';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQunatity = useSelector(getCurrentQunatityById(id));
  const isInCart = currentQunatity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ' '}`}
      />
      <div className="flrx grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="itallic text-sm capitalize text-stone-500">
          {ingredients.join(' ,')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="items-centergap-3 flex sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQunatity={currentQunatity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
