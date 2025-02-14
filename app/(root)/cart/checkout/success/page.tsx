// 'use client'

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function Success() {
//   const searchParams = useSearchParams();
//   const session_id = searchParams.get('session_id');

//   console.log('id', session_id)

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!session_id) return;

//     (async () => {
//       const res = await fetch(`/api/confirm-payment?session_id=${session_id}`);
//       const data = await res.json();

//       if (data.success) {
//         localStorage.removeItem('cart');
//         alert('پرداخت با موفقیت انجام شد!');
//       } else {
//         alert('پرداخت ناموفق بود!');
//       }

//       setLoading(false);
//     })();
//   }, [session_id]);

//   return loading ? <p className='mt-[160px]'>در حال پردازش...</p> : <p className='mt-[160px]'>پرداخت انجام شد!</p>;
// }

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartManager } from '@/hooks/useCartManager';
import { createOrder } from '@/data/services/order-services';

export default function Success() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

    const { totalPrice } = useCartManager();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session_id) return;
  
    (async () => {
      const cart =JSON.parse(localStorage.getItem("cart") || "{}");
      const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo") || "{}");

      console.log(shippingInfo, 'shipping')
  
      if (cart && shippingInfo.address) {
        const res = await createOrder(
          {
            address: shippingInfo.address,
            phoneNumber: Number(shippingInfo.phoneNumber),
            postalCode: Number(shippingInfo.postalCode),
            emailAddress: shippingInfo.emailAddress
          },
         cart.documentId,
          session_id,
          Number(totalPrice)
        );
  
        if (res?.error) {
          console.error("Order creation error:", res.error);
          alert("پرداخت ناموفق بود!");
        } else {
          localStorage.removeItem("cart");
          localStorage.removeItem("shippingInfo");
          alert("پرداخت با موفقیت انجام شد!");
        }
      } else {
        alert("اطلاعات ناقص است!");
      }
  
      setLoading(false);
    })();
  }, [session_id]);

  return loading ? <p className='mt-[160px]'>در حال پردازش...</p> : <p className='mt-[160px]'>پرداخت انجام شد!</p>;
}