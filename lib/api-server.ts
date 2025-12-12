import axios from 'axios';
import type { Sector, Product } from '@/api/sectors';

// API Configuration for server-side requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Server-side API helper for fetching data in server components
 * Creates a fresh axios instance for each request (no interceptors needed)
 */
const createServerClient = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const apiServer = {
  async getSectors(): Promise<Sector[]> {
    try {
      const client = createServerClient();
      const response = await client.get('/sectors');
      return response.data;
    } catch (error) {
      console.error('Error fetching sectors:', error);
      return [];
    }
  },

  async getSectorBySlug(slug: string): Promise<Sector | null> {
    try {
      const client = createServerClient();
      const response = await client.get(`/sectors/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sector by slug:', error);
      return null;
    }
  },

  async getProductsBySectorId(sectorId: number): Promise<Product[]> {
    try {
      const client = createServerClient();
      const response = await client.get(`/products/sectors/${sectorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by sector:', error);
      return [];
    }
  },
};

