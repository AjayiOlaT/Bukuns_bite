import { motion } from 'framer-motion'
import ProductViewer from './components/ProductViewer'
import Cart from './components/Cart'
import { useState } from 'react'
import { useStore } from './store/useStore'

const products = [
  {
    id: 1,
    name: "Kulikuli - Small Bag (Plain)",
    price: 5.00,
    description: "Our classic crunchy Kulikuli in a convenient small bag. Perfect for a quick snack.",
    image: "/images/kulikuli-small-plain.jpg"
  },
  {
    id: 2,
    name: "Kulikuli - Large Bag (Plain)",
    price: 9.00,
    description: "More of the classic crunch! A larger bag perfect for sharing or satisfying a bigger craving.",
    image: "/images/kulikuli-large-plain.jpg"
  },
  {
    id: 3,
    name: "Kulikuli - Small Bag (Spicy)",
    price: 5.50,
    description: "Our classic Kulikuli with a delicious spicy kick! Small bag for a fiery snack.",
    image: "/images/kulikuli-small-spicy.jpg"
  },
  {
    id: 4,
    name: "Kulikuli - Large Bag (Spicy)",
    price: 9.50,
    description: "More of the spicy goodness! Get our large bag of spicy Kulikuli.",
    image: "/images/kulikuli-large-spicy.jpg"
  }
]

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { addToCart } = useStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary text-white py-8 text-center"
      >
        <motion.img
          src="/images/logo.png"
          alt="Kulikuli Corner Logo"
          className="w-20 h-20 mx-auto mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <h1 className="text-4xl font-bold mb-2">Kulikuli Corner</h1>
        <p className="text-lg">Delicious Roasted Groundnut Snacks</p>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ProductViewer product={selectedProduct || products[0]} />
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="card cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-gray-600">${product.price.toFixed(2)}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="btn btn-primary mt-2"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <Cart />
          </div>
        </div>
      </main>
    </div>
  )
}