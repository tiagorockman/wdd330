const baseURL = import.meta.env.VITE_SERVER_URL;
//

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {

  constructor(category){
    this.category = category;
  }

  // constructor(category) {
  //   this.category = category;
  //   //this.path = `../json/${this.category}.json`;
  //   this.path = `../public/json/${this.category}.json`; //for debug
  // }
  
  async getData() {
    const response = await fetch(`${baseURL}products/search/${this.category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}
