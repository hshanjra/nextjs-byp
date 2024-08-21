"use server";
import axios from "axios";

export async function fetchCityAndState(zipCode: string) {
  if (!zipCode) return { error: "Please enter zip code." };
  try {
    const { data } = await axios.get(`https://api.zippopotam.us/us/${zipCode}`);

    return {
      city: data?.places[0]["place name"],
      state: data?.places[0]["state"],
      stateAbbr: data?.places[0]["state abbreviation"],
    };
  } catch (e: any) {
    console.error(`Error fetching city and state: ${e.message}`);
    return { error: "Invalid Zip Code" };
  }
}
