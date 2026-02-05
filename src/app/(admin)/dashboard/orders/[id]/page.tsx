// "use client"

import { orders } from "@/services/endpoints";
// import { useRouter } from "next/navigation";

interface PageProps {
  params: { id: string } | Promise<{ id: string }>; // params might be a Promise
}
export default async function OrderDetailsPage(props: PageProps) {
  const { params } = props;
  const unwrappedParams = await params;
  const orderId = Number(unwrappedParams.id);
  const { data: order, error } = await orders.orderDetails(orderId);

//   const router = useRouter();

  if (error) return <div className="text-red-500">{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
      <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-sm">
         
           <div className="w-full flex gap-4">
            <div className="columns-3xl border-e border-gray-300 ">
              { order.title &&  <h2 className="text-xl font-semibold">{order.title}</h2> }
               <p className="mt-4 text-sm text-gray-500">{order.description}</p>
            </div>
            <div className="columns-3xs">
              

             { order.order_id && <p>
                <strong>Gigs ID:</strong> {order.order_id}
            </p> }
            <p>
                <strong>Order ID:</strong> {order.id}
            </p>
             <div className="my-2">
              <div>
                <strong>Email</strong> 
              </div>
              <div className="text-sm text-gray-500">
                {order.email}
              </div>

            </div>
             <div className="my-2">
              <div>
                <strong>phone</strong> 
              </div>
              <div className="text-sm text-gray-500">
                {order.phone}
              </div>
            </div>

             <div className="my-2">
              <div>
                <strong>Duration</strong> 
              </div>
              <div className="text-sm text-gray-500">
                {order.duration_value} { order.duration_unit}
              </div>
            </div>

            <div className="my-2">
              <div>
                <strong>Status</strong> 
              </div>
              <div className="text-sm text-gray-500">
                { order.status}
              </div>
            </div>

            <div className="my-2">
              <div>
                <strong>Budget</strong> 
              </div>
              <div className="text-sm text-gray-500">
               ${order.budget}
              </div>
            </div>

            <div className="mt-4">
                <div className="flex gap-2">
                <div>
                  Create at:
                </div>
                <div className="text-sm text-gray-500">
                   {new Date(order.created_at).toLocaleDateString()}
                </div>
                </div>
              </div>
            </div>
           </div>
        </div>
  );
}

{/* <pre>{JSON.stringify(order, null, 2)}</pre> */}

// "use client";

// import { Order } from "@/app/types/order";
// import { orders } from "@/services/endpoints";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// interface PageProps {
//     params: { id: string }
// }

// export default async function OrderDetailsPage({ params }: PageProps) {
//     // const { id } = params;
//     // const orderId = params.id;
//     const [order, setOrder] = useState<Order | null>(null);
//     // const [error, setError] = useState<string | null>(null);
//     const router = useRouter();
    
//     const orderId = Number(params.id); 
//     // const { data, error } = await orders.orderDetails(orderId);

//     // const fetchOrder = async () => {
        
//     //     const { data, error } = await orders.orderDetails(11);
//     //     if (error) {
//     //         setError(error);
//     //         setOrder(null);
//     //     } else {
//     //         setOrder(data);
//     //         setError(null);
//     //     }
//     // };
//     // useEffect(() => {
//     //      console.log(orderId)
//     //     // if (orderId)
//     //     fetchOrder();
//     // }, [orderId]);


//     if (error) return <div className="text-red-500">{error}</div>;
//     if (!order) return <div className="p-6">Loading...</div>;

//     return (
//         <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
//             <button
//                 onClick={() => router.back()}
//                 className="mb-4 text-blue-500 hover:underline"
//             >
//                 ← Back {orderId}
//             </button>

//             <h2 className="text-xl font-semibold mb-4">{order.taskName}</h2>
//             <p>
//                 <strong>Order ID:</strong> {order.id}
//             </p>
//             <p>
//                 <strong>Status:</strong> {order.status}
//             </p>
//             <p>
//                 <strong>Budget:</strong> ${order.budget}
//             </p>
//             <p className="mt-4">{order.description}</p>
//         </div>
//     );
// }


