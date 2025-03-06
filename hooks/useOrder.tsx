import {
  createOrder,
  getDeliveredOrders,
  getOrder,
} from "@/data/services/order-services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useFetchOrder(orderId: string) {
  const [order, setOrder] = useState<OrderItems | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const result = await getOrder(orderId);
        if (result.ok) {
          setOrder(result.data.data);
          setError(null);
        } else {
          setError(result.error?.message || "Failed to fetch order.");
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return { order, loading, error };
}

export function useCreateOrder() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createNewOrder = async (
    orderData: OrderProps,
    stripePaymentId: string
  ) => {
    setLoading(true);
    try {
      const result = await createOrder(orderData, stripePaymentId);
      if (result.ok) {
        toast.success("Order created successfully!");
        setError(null);
      } else {
        setError(result.error?.message || "Failed to create order.");
        toast.error("Something went wrong while creating the order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  return { createNewOrder, loading, setLoading, error };
}

export function useFetchDelivered(userId: number) {
  const [order, setOrder] = useState<OrderItems[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const result = await getDeliveredOrders(userId);
        if (result.ok) {
          setOrder(result.data.data);
          setError(null);
        } else {
          setError(result.error?.message || "Failed to fetch order.");
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userId]);

  return { order, loading, error };
}
