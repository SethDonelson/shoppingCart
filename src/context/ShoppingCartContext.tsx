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

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])


    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart= () => setIsOpen(true)
    const closeCart= ( ) => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find( (item:any) => item.id === id)?.quantity || 0
    }

    // add new item, increment if current
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

    function removeFromCart(id: number){
        setCartItems( (currentItems:any) => {
            return currentItems.filter((item:any) => item.id !== id)
        })
    }

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