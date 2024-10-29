"use client";
import React, { useOptimistic, useState } from "react";

export default function TestPage() {
  const [message, setMessage] = useState("");

  const handlesubmit = (formData) => {
    let newMessage = formData.get("message");
    addOptimisticMessage("试试看");
    setMessage(newMessage);
  };

  const [optimisticMessage, addOptimisticMessage] = useOptimistic(
    message,
    (state, newMessage) => [...state, newMessage]
  );

  console.log("乐观更新"+optimisticMessage+"是否返回新值");

  return (
    <div>
      <div>
        <span>{optimisticMessage}</span>
      </div>
      <form id="1" action={handlesubmit}>
        <input type="text" name="message" placeholder="enter your message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
