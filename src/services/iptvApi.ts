import axios from 'axios';
import { Channel, Playlist } from '@/types';

const API_BASE = import.meta.env.VITE_IPTV_ORG_API || 'https://iptv-org.github.io/api';

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const iptvApi = {
  // Get all channels
  async getChannels(): Promise<Channel[]> {
    try {
      const response = await client.get('/channels.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  },

  // Get channels by country
  async getChannelsByCountry(countryCode: string): Promise<Channel[]> {
    try {
      const response = await client.get(`/channels/${countryCode}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching channels for ${countryCode}:`, error);
      throw error;
    }
  },

  // Get all countries
  async getCountries(): Promise<any[]> {
    try {
      const response = await client.get('/countries.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },

  // Get all categories/groups
  async getCategories(): Promise<any[]> {
    try {
      const response = await client.get('/categories.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get all languages
  async getLanguages(): Promise<any[]> {
    try {
      const response = await client.get('/languages.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error;
    }
  },

  // Get channels by category
  async getChannelsByCategory(categoryId: string): Promise<Channel[]> {
    try {
      const response = await client.get(`/channels/${categoryId}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching channels for category ${categoryId}:`, error);
      throw error;
    }
  },

  // Search channels
  searchChannels(channels: Channel[], query: string): Channel[] {
    const lowerQuery = query.toLowerCase();
    return channels.filter(
      (channel) =>
        channel.name.toLowerCase().includes(lowerQuery) ||
        channel.country?.some((c) => c.toLowerCase().includes(lowerQuery)) ||
        channel.language?.some((l) => l.toLowerCase().includes(lowerQuery))
    );
  },
};