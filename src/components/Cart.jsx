import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'
import { FaWhatsapp, FaStripe } from 'react-icons/fa'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useStore()

  const handleWhatsAppCheckout = () => {
    const message = cart
      .map(item => `${item.name} x${item.quantity}`)
      .join('\n')
    
    window.open(`https://wa.me/2448138813159?text=${encodeURIComponent(message)}`)
    clearCart()
    toast.success('WhatsApp order initiated!')
  }

  const handleStripeCheckout = async () => {
    const stripe = await stripePromise
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart }),
    })

    const session = await response.json()

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      toast.error('Payment failed!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      {cart.map(item => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-between items-center mb-2"
        >
          <span>{item.name} x{item.quantity}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </motion.div>
      ))}

      <div className="mt-4 space-y-2">
        <button
          onClick={handleWhatsAppCheckout}
          className="btn btn-whatsapp w-full flex items-center justify-center gap-2"
        >
          <FaWhatsapp /> Order via WhatsApp
        </button>
        
        <button
          onClick={handleStripeCheckout}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          <FaStripe /> Pay with Stripe
        </button>
      </div>
    </motion.div>
  )
}