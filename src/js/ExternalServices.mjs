
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const text = await res.text();

  try {
    const data = JSON.parse(text);

    if (res.ok) {
      return data;
    } else {
      throw {
        name: 'servicesError',
        message: data,
      };
    }

  } catch (e) {
    console.error ('RAW SERVER RESPONSE:', text);
    throw {
      name: 'servicesError',
      message: { message: 'Server returned invalid response' },
    };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result || data;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result || data;
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

    return convertToJson(response); // correct error handling
  }
}