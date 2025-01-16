import axios from "axios";
import { API_ENDPOINTS } from "./apiEndPoints";

const ALEGRA_BASE_URL = `https://api.alegra.com/api/v1`;

const alegraAPI = axios.create({
  baseURL: ALEGRA_BASE_URL,
  headers: {
    accept: "application/json",
    authorization: `Basic ${process.env.VUE_APP_ALEGRA_AUTH}`
  }
});

export const getSellers = async (callback) => {
  try {
    const response = await alegraAPI.get(API_ENDPOINTS.ALEGRA.SELLERS);
    if (callback) callback(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener vendedores:", error);
    throw error;
  }
};

export const getContacts = async (callback) => {
  try {
    const response = await alegraAPI.get(API_ENDPOINTS.ALEGRA.CONTACTS);
    if (callback) callback(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener vendedores:", error);
    throw error;
  }
};
export const getInvoices = async (id, callback) => {
  try{
    const response = await alegraAPI.get(API_ENDPOINTS.ALEGRA.INVOICES);
    if (callback) callback(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener vendedor con ID ${id}:`, error);
    throw error;
  }
}

export const getSellerById = async (id, callback) => {
  try {
    const response = await alegraAPI.get(API_ENDPOINTS.ALEGRA.SELLER_BY_ID(id));
    if (callback) callback(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener vendedor con ID ${id}:`, error);
    throw error;
  }
};

export const createSeller = async (sellerData, callback) => {
  try {
    const response = await alegraAPI.post(
      API_ENDPOINTS.ALEGRA.SELLERS,
      sellerData
    );
    if (callback) callback(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear vendedor:", error);
    throw error;
  }
};

export const createContact = async (contactData, callback) => {
  try {
    const response = await alegraAPI.post(
      API_ENDPOINTS.ALEGRA.CONTACTS,
      contactData
    );
    if (callback) callback(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear contacto:", error);
    throw error;
  }
};

export const deleteSeller = async (id, callback) => {
  try {
    const response = await alegraAPI.delete(
      API_ENDPOINTS.ALEGRA.SELLER_BY_ID(id)
    );
    if (callback) callback(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar vendedor con ID ${id}:`, error);
    throw error;
  }
};

export const createInvoice = async (invoiceData, callback) => {
  try {
    const response = await alegraAPI.post(
      API_ENDPOINTS.ALEGRA.INVOICES,
      invoiceData
    );
    if (callback) callback(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la factura:", error);
    throw error;
  }

};
