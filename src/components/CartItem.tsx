import { useShoppingCart } from "../context/shoppingCartContext"
import storeItems from "../data/items.json"
import { Stack } from "rsuite"
import { formatCurrency } from "../utilities/formatCurrency"
import { Button } from "react-bootstrap"

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem ({ id, quantity }: CartItemProps){
    const { removeFromCart} =  useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center justify-content-around mb-2">
            <img src={item.imgUrl} style={{ width: "125px", height: "100px", objectFit: "cover"}} />
            <div className="me-auto">
                <div>
                    {item.name}{' '} 
                    {quantity > 1 && (
                    <span  className="text-muted"  style={{fontSize: "0.65rem"}}> 
                        x{quantity}
                    </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem"}}> {formatCurrency(item.price)}
                </div>
            </div>
            <div className="ml-5"> {formatCurrency(item.price * quantity)}</div>
            <Button className="ml-5" variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )
}