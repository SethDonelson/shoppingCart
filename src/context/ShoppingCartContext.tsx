import { useContext, createContext, useState, ReactNode } from "react"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

const ShoppingCartContext = createContext({ } as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

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

    return ( <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}}> {children}
    </ShoppingCartContext.Provider>
    )
}