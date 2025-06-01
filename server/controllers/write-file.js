const fs = require("fs/promises");
const path = require("path");
const settlements = require("./citiesData");

// console.log(settlements);

const requesData = {
  apiKey: process.env.REACT_APP_NOVA_API_KEY,
  modelName: "AddressGeneral",
  calledMethod: "getSettlements",
  methodProperties: {
    Page: "36",
    Limit: "750",
  },
};

const fetchData = async () => {
  const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requesData),
  });

  const data = await res.json();
  //   console.log(data);

  data.data.map((obj) => {
    delete obj.RadiusDrop;
    delete obj.Delivery1;
    delete obj.Delivery2;
    delete obj.Delivery3;
    delete obj.Delivery4;
    delete obj.Delivery5;
    delete obj.Delivery6;
    delete obj.Delivery7;
    delete obj.SpecialCashCheck;
    delete obj.RadiusHomeDelivery;
    delete obj.RadiusExpressPickUp;
    delete obj.Warehouse;
    delete obj.AddressDeliveryAllowed;
    delete obj.SettlementTypeDescriptionRu;
    delete obj.SettlementTypeDescriptionTranslit;
    delete obj.RegionsDescriptionRu;
    delete obj.IndexCOATSU1;
    settlements.push(obj);
  });

  console.log("SETTLEMENTS", settlements);

  const formattedData = JSON.stringify(settlements, null, 2);

  try {
    await fs.appendFile("data.js", formattedData);
    console.log("DONE!");
  } catch (error) {
    console.log(error.message);
  }
};

fetchData();
