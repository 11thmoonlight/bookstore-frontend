// import { useState, useEffect, useCallback } from "react";
// import {
//   getWishList,
//   addToWishList,
//   removeFromWishList,
// } from "@/app/api/wishlist/wishlistServices";

// interface UseWishlist {
//   wishlist: WhishListItems[] | null;
//   loading: boolean;
//   error: string | null;
//   fetchWishlist: () => void;
//   addProductToWishlist: (
//     wishListId: string,
//     productId: string
//   ) => Promise<void>;
//   removeProductFromWishlist: (
//     wishListId: string,
//     productId: string
//   ) => Promise<void>;
// }

// export const useWishlist = (): UseWishlist => {
//   const [wishlist, setWishlist] = useState<WhishListItems[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch wishlist
//   const fetchWishlist = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     const response = await getWishList();

//     if (!response.ok) {
//       setError("Failed to fetch wishlist");
//       setWishlist(null);
//       setLoading(false);
//       return;
//     }

//     setWishlist(response.data);
//     setLoading(false);
//   }, []);

//   // Add product to wishlist
//   const addProductToWishlist = useCallback(
//     async (wishListId: string, productId: string) => {
//       setLoading(true);
//       try {
//         await addToWishList(wishListId, productId);
//         await fetchWishlist(); // Refresh the wishlist
//       } catch (err) {
//         setError("Failed to add product to wishlist");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [fetchWishlist]
//   );

//   // Remove product from wishlist
//   const removeProductFromWishlist = useCallback(
//     async (wishListId: string, productId: string) => {
//       setLoading(true);
//       try {
//         await removeFromWishList(wishListId, productId);
//         await fetchWishlist(); // Refresh the wishlist
//       } catch (err) {
//         setError("Failed to remove product from wishlist");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [fetchWishlist]
//   );

//   // Initial fetch
//   useEffect(() => {
//     fetchWishlist();
//   }, [fetchWishlist]);

//   return {
//     wishlist,
//     loading,
//     error,
//     fetchWishlist,
//     addProductToWishlist,
//     removeProductFromWishlist,
//   };
// };

import { useState, useEffect, useCallback } from "react";
import {
  getWishList,
  getWhishListById,
  addToWishList,
  removeFromWishList,
} from "@/app/api/wishlist/wishlistServices";

interface UseWishlist {
  wishlist: WhishListItems[] | null;
  selectedWishlist: WhishListItems | null;
  loading: boolean;
  error: string | null;
  fetchWishlist: () => void;
  fetchWishlistById: (wishlistId: string) => Promise<void>;
  addProductToWishlist: (
    wishListId: string,
    productId: string
  ) => Promise<void>;
  removeProductFromWishlist: (
    wishListId: string,
    productId: string
  ) => Promise<void>;
}

export const useWishlist = (): UseWishlist => {
  const [wishlist, setWishlist] = useState<WhishListItems[] | null>(null);
  const [selectedWishlist, setSelectedWishlist] =
    useState<WhishListItems | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all wishlists
  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await getWishList();

    if (!response.ok) {
      setError("Failed to fetch wishlist");
      setWishlist(null);
      setLoading(false);
      return;
    }

    setWishlist(response.data);
    setLoading(false);
  }, []);

  // Fetch a single wishlist by ID
  const fetchWishlistById = useCallback(async (wishlistId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWhishListById(wishlistId);
      if (!data) {
        setError("Wishlist not found");
        setSelectedWishlist(null);
        return;
      }
      setSelectedWishlist(DataTransferItem);
    } catch (err) {
      setError("Failed to fetch wishlist by ID");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add product to wishlist
  const addProductToWishlist = useCallback(
    async (wishListId: string, productId: string) => {
      setLoading(true);
      try {
        await addToWishList(wishListId, productId);
        await fetchWishlist(); // Refresh the wishlist
      } catch (err) {
        setError("Failed to add product to wishlist");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchWishlist]
  );

  // Remove product from wishlist
  const removeProductFromWishlist = useCallback(
    async (wishListId: string, productId: string) => {
      setLoading(true);
      try {
        await removeFromWishList(wishListId, productId);
        await fetchWishlist(); // Refresh the wishlist
      } catch (err) {
        setError("Failed to remove product from wishlist");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchWishlist]
  );

  return {
    wishlist,
    selectedWishlist,
    loading,
    error,
    fetchWishlist,
    fetchWishlistById,
    addProductToWishlist,
    removeProductFromWishlist,
  };
};
