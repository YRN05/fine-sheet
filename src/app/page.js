"use client";
import { DUMMY_DATA } from "@/constant/dummy";
import Image from "next/image";
import { startTransition, useOptimistic, useRef, useState } from "react";

export default function Home() {
  const [optimisticData, addOptimisticData] = useOptimistic(
    [...DUMMY_DATA],
    (currentState, action) => {
      switch (action.type) {
        case "ADD":
          return [...currentState, action.payload];
        default:
          return currentState;
      }
    }
  );

  const formRef = useRef(null);

  console.log(optimisticData);

  const handleAdd = (formData) => {
    const newData = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
    };

    if (!newData.name || !newData.email || !newData.address) {
      alert("Please fill all fields");
      return;
    }

    startTransition(() => {
      addOptimisticData({ type: "ADD", payload: newData });
      formRef.current.reset();
    });
  };

  const handleDelete = (id) => {
    startTransition(() => {});
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="flex justify-center">CRUD</h1>

      <form action={handleAdd} className="space-x-1" ref={formRef}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="border border-black px-4 py-2 rounded-2xl"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          className="border border-black px-4 py-2 rounded-2xl"
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          className="border border-black px-4 py-2 rounded-2xl"
        />

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded-2xl "
        >
          Add
        </button>
      </form>
      {/* clue for todo: form pake useOptimistic */}

      <table className="table-auto border border-white border-collapse w-full text-left">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">Name</th>
            <th className="border border-black px-4 py-2">Email</th>
            <th className="border border-black px-4 py-2">Address</th>
            <th className="border border-black px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {optimisticData.map((item, index) => (
            <tr key={index}>
              <td className="border border-black px-4 py-2">{item.name}</td>
              <td className="border border-black px-4 py-2">{item.email}</td>
              <td className="border border-black px-4 py-2">{item.address}</td>
              <td className="border border-black px-4 py-2">
                <div className="flex gap-2">
                  <button className="bg-white text-black px-4 py-2 cursor-pointer rounded-2xl">
                    Edit
                  </button>
                  <button
                    className="bg-red-400 text-white px-4 py-2 cursor-pointer rounded-2xl"
                    onClick={handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
