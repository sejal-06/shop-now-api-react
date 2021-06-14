/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
function Orders() {
  const [ordersarr, setordersarr] = useState([]);
  useEffect(async () => {
    const tokenStr =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlamFsQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYmJjMGNkNGI1MmNjMjJhMGEzYzhiMCIsImlhdCI6MTYyMzY2NDUwOCwiZXhwIjoxNjIzNzA3NzA4fQ.QidUuaEkV8z-Tl2EH40_5uFnHK2bcNWBLJDbZjgcITA";
    var allorders = await axios.get(
      `http://192.168.100.94:5000/shop/allorders`,
      { headers: { Authorization: `Bearer ${tokenStr}` } }
    );

    setordersarr(allorders.data.orders);
    console.log(allorders.data.orders);
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default Orders;
