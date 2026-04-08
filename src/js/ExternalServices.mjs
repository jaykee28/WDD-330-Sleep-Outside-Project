const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await response.json();
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await response.json();
    return data.Result;
  }
 
  async checkout(order) {
    const response = await fetch(`${baseURL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer wdd330',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Checkout failed');
    }

    return await response.json();
  }
}