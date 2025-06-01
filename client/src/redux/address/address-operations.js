import { createAsyncThunk } from "@reduxjs/toolkit";

const getRegionList = createAsyncThunk(
  "address/getAllRegions",
  async (_, { rejectWithValue }) => {
    const requestData = {
      apiKey: "ffc02cf091762c49bf33444520724911",
      modelName: "AddressGeneral",
      calledMethod: "getSettlementAreas",
      methodProperties: {},
    };

    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.success === "false") {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

const getCitiesByRegion = createAsyncThunk(
  "address/getCitiesByRegion",
  async ({ regionId }, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:2222/api/location/getSettlements/${regionId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const data = rejectWithValue(await response.json());
      return data;
    }

    const data = await response.json();
    return data;
  }
);

export const addressOperations = {
  getRegionList,
  getCitiesByRegion,
};
