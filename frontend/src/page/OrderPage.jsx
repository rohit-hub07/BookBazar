import React, { useEffect } from 'react'
import useOrderStore from '../store/useOrderStore'
import { Book, DollarSign, Hash } from 'lucide-react'

const OrderPage = () => {
  const { orders, allOrders, isAllOrdersLoading } = useOrderStore()

  useEffect(() => {
    allOrders()
  }, [allOrders])

  if (isAllOrdersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Book className="w-12 h-12 animate-spin text-blue-500" />
        <span className="ml-2 text-lg text-gray-600">Loading orders...</span>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orders.map((e, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {e.bookDetail.BookImage && (
            <img
              src={e.bookDetail.BookImage}
              alt={e.bookDetail.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-800">
              <Book className="w-5 h-5 mr-2 text-gray-600 stroke-2" />
              {e.bookDetail.title}
            </h3>
            <div className="flex items-center text-gray-700 mt-2">
              <DollarSign className="w-4 h-4 mr-1 text-green-600 stroke-2" />
              <span>₹{e.bookDetail.price}</span>
            </div>
            <div className="flex items-center text-gray-700 mt-1">
              <Hash className="w-4 h-4 mr-1 text-blue-600 stroke-2" />
              <span>Qty: {e.quantity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderPage
