import { useContext, createContext, useState, ReactNode } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({ } as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

// provider needs objects and children, mainly acts as a wrapper for context
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    // custom hook to store cartItem array
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

    // get total for all items in the cart
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    // 
    const openCart= () => setIsOpen(true)
    const closeCart= ( ) => setIsOpen(false)

    // get item by id, return quantity or 0 if none
    function getItemQuantity(id: number) {
        return cartItems.find( (item:any) => item.id === id)?.quantity || 0
    }

    // get item by id, add a new item to cart if no current items, if item exist, increment count by 1
    function increaseCartQuantity(id: number) {
        setCartItems((currentItems:any) => {
            if (currentItems.find((item:any) => item.id === id)== null) {
                return [...currentItems, { id, quantity: 1}]
            } else {
            return currentItems.map((item:any) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1}
                } else {
                    return item
                }
            })}
        })
    }

    // get item by id, remove item if the value is 1, else remove 1 from the total
    function decreaseCartQuantity(id: number) {
        setCartItems((currentItems:any) => {
            if (currentItems.find((item:any) => item.id === id)?.quantity === 1) {
                return currentItems.filter((item:any) => item.id !== id)
            } else{
            return currentItems.map((item:any) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1}
                } else {
                    return item
                }
            })}
        })
    }

    // remove items if not equal to the id
    function removeFromCart(id: number){
        setCartItems( (currentItems:any) => {
            return currentItems.filter((item:any) => item.id !== id)
        })
    }

    // pull and render values from called functions above 
    return ( <ShoppingCartContext.Provider 
        value={{getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart, 
        openCart, 
        closeCart, 
        cartItems, 
        cartQuantity}}
        > 
    
    {children}
    <ShoppingCart isOpen={isOpen}  />
    </ShoppingCartContext.Provider>
    )
}