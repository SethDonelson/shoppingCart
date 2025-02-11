import { Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { Button } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"



type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

// quantity is dynamically set
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()

    const quantity = getItemQuantity(id)

    // image setup with bootstrap card
    return <Card className="h-100">
        <Card.Img variant='top' src={imgUrl} height="200px" style={{ objectFit: "contain"}}    
        />

        {/* add name and price to the card with import for currency*/}
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline  mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>

             {/* if 0, add to cart button with call to shoppingCartContext for adding */}
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
                    // else display + - and cart value with event listener to ShoppingCartContext functions
                ) : <div className="d-flex align-items-center flex-column" style={{ gap: "0.5rem"}}>
                    <div className="d-flex align-items-center justify-content-center" style={{ gap: "0.5rem"}}>
                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div>
                        <span className="fs-3">{quantity}</span>
                        In Cart
                        </div>
                        <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        <div>
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                        </div>
                    </div>
                    
                </div>}
            </div>
        </Card.Body>
    </Card>
}

