self.onmessage = async (event) => {
  console.log(event);
  const response = await fetch("http://localhost:3000/api/v1/orders");
  const results = await response.json();
  console.log(results);
  results.orders.forEach((res) => {
    self.postMessage(res);
  });
};
