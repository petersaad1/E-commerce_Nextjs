"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getClientUserOrders } from "@/apis/getClientUserOrders";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order, OrderItem } from "@/types/order.type";
import Image from "next/image";
import Link from "next/link";

const AllOrders = () => {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return; // Still loading session

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await getClientUserOrders();
      setOrders(ordersData?.data || []);
    } catch (err) {
      setError("Failed to load orders. Please try logging in again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="max-w-md mx-auto my-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading orders...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="max-w-md mx-auto my-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Authentication Required
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please log in to view your orders.
        </p>
        <Link 
          href="/login"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <Button onClick={fetchOrders} className="mr-4">
          Retry
        </Button>
        <Link 
          href="/login"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Login Again
        </Link>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <p className="text-center my-10 text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">
        No orders found.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-5">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order: Order) => (
          <Card
            key={order._id}
            className="shadow-md rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  Order #{order.id}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.isPaid
                      ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-400"
                  } transition-colors duration-300`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="font-medium text-lg text-green-600 dark:text-green-400 mb-3 transition-colors duration-300">
                Total: {order.totalOrderPrice}EGP
              </p>

              <div className="space-y-2">
                {order.cartItems.map((item: OrderItem) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        width={250}
                        height={250}
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium text-green-600 dark:text-green-400 transition-colors duration-300">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                          {item.count} × {item.price}EGP
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-300">
                      {item.count * item.price}EGP
                    </p>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="bg-transparent border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 hover:bg-transparent hover:text-green-600 dark:hover:text-green-300 transform hover:scale-105 transition-all duration-300 cursor-pointer mt-5"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
