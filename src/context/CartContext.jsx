import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()


function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.find((item) => item.id === action.payload.id)
            if (existingItem) {
                return state.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...state, { ...action.payload, quantity: 1 }]
        }

        case 'REMOVE_FROM_CART':
            return state.filter((item) => item.id !== action.payload)

        case 'INCREASE_QUANTITY':
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )

        case 'DECREASE_QUANTITY':
            return state.map((item) =>
                item.id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )

        default:
            return state
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}