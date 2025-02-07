"use client"

import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import RouteProtection from "@/app/components/RouteProtection";
import { urlFor } from "@/sanity/lib/image";

interface Order {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    contact: number
    address: string;
    zip: number;
    country: string;
    province: string;
    city: string;
    total: number;
    discount: number;
    status: string | null;
    orderDate: string;
    cartItems: {
        title : string, productImage : string
}[];
}

export default function AdminDashboard () {
    const [orders, setOrders] = useState<Order[]>([])
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        client.fetch(`*[_type == 'order']{
            _id,
            firstname,
            lastname,
            email,
            contact,
            address,
            zip,
            country,
            province,
            city,
            total,
            discount,
            status,
            orderDate,
            cartItems[] -> {
                title,
                productImage}
                }` )

         .then((data) => setOrders(data))
         
         .catch((error) => console.error("Error Fetching Products" ,error))
    }, [])

    const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.status === filter)

    const toggleOrderDetails = (orderId : string) => {
        setSelectedOrderId((prev) => (prev === orderId ? null : orderId))

        const handleDlt = async (orderId : string) => {
            const result = await Swal.fire({
                title: 'Are you sure you want to delete this order?',
                text: 'YOU WILL LOSE THIS ORDER!!.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#737373',
                confirmButtonText: 'Delete',
            });
            if (!result.isConfirmed) return;

            try {
                await client.delete(orderId)
                setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId))
                Swal.fire("Deleted", "Order has been deleted successfully.", "success")
            } catch (error){
                Swal.fire("Error", "OOPs! Something went wrong.", "error")
            }

            const  handleStatusChange = async (orderId: string, newStatus : string) => {
                try{
                    await client
                    .patch(orderId)
                    .set({status: newStatus})
                    .commit()

                    setOrders((prevOrders) => prevOrders.map((order) => order._id === orderId ? {
                        ...order,
                        status: newStatus,
                    } : order
                )
            )

            if (newStatus === "dispatch") {
                Swal.fire("Order Dispatched", "Your Order Has Been Dispatched", "success")
            } else if (newStatus === "success") {
                Swal.fire("Congrats!", "Your Order Has Been Completed", "success")
            }
               
            } catch (error) {
                console.error("Error Updating Order Status", error)
                Swal.fire("Error", "Failed to change status", "error")
             }
           };
        }
    }
  function handleStatusChange(_id: string, value: string): void {
    throw new Error("Function not implemented.");
  }

  function handleDlt(_id: string) {
    throw new Error("Function not implemented.");
  }

    return(
      <RouteProtection>
          <div className="flex flex-col h-screen bg-gray-100">
{/* Navbar */}
<nav className="bg-[#252b42] text-white p-4 shadow-lg flex justify-between">
<h2 className="text-2xl font-bold">Admin Dashboard</h2>
<div className="flex space-x-4">
  {["All", "pending", "dispatch", "success"].map((status) => (
    <button
      key={status}
      className={`px-4 py-2 rounded-lg transition-all ${
        filter === status ? "bg-white text-[#252b42] font-bold" : "text-white"
      }`}
      onClick={() => setFilter(status)}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
  ))}
</div>
</nav>

{/* Orders Table */}
<div className="flex-1 p-6 overflow-y-auto">
<h2 className="text-2xl font-bold mb-4 text-center">Orders</h2>
<div className="overflow-x-auto bg-white shadow-md rounded-lg">
  <table className="min-w-full divide-y divide-gray-200 text-sm lg:text-base">
    <thead className="bg-gray-50 text-[#252b42]">
      <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Address</th>
        <th>Date</th>
        <th>Total</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {filteredOrders.map((order) => (
        <React.Fragment key={order._id}>
          <tr
            className="cursor-pointer hover:bg-blue-100 transition-all "
            onClick={() => toggleOrderDetails(order._id)}
          >
            <td>{order._id}</td>
            <td>{order.firstname} {order.lastname}</td>
            <td>{order.address}</td>
            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
            <td>${order.total}</td>
            <td>
              <select
                value={order.status || ""}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="bg-gray-100 p-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="dispatch">Dispatch</option>
                <option value="success">Completed</option>
              </select>
            </td>
            <td className="px-6 py-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDlt(order._id);
                }}
                className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </td>
          </tr>
          {selectedOrderId === order._id && (
            <tr>
              <td colSpan={7} className="bg-gray-50 p-4 transition-all animate-fadeIn">
                <h3 className="font-bold">Order Details</h3>
                <p><strong>Phone:</strong> {order.contact}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>City:</strong> {order.city}</p>
                <ul>
                  {order.cartItems.map((item , index) => (
                      <li key={`${order._id}-${index}`} className="flex items-center gap-2">
                          {item.title}
                          {item.productImage && (
                              <img
                              src={urlFor(item.productImage).url()}
                              alt={item.title}
                              width={100}
                              height={100} />
                          )}
                      </li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div>
</div>
</div>
          
</RouteProtection>
  )

}