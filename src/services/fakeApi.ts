import axios from 'axios';
import { FakeApiPost, FakeApiResponse } from '../types/FakeApiData';

const POSTS_PER_PAGE = 10;
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fakeApi = {
  // Получение постов
  getPosts: async (page: number = 1): Promise<FakeApiResponse> => {
    try {
      // таймаут
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Получаем все посты для имитации пагинации
      const response = await axios.get<FakeApiPost[]>(API_URL);
      const allPosts = response.data;
      const totalCount = allPosts.length;
      
      const startIndex = (page - 1) * POSTS_PER_PAGE;
      const endIndex = Math.min(startIndex + POSTS_PER_PAGE, totalCount);
      const paginatedPosts = allPosts.slice(startIndex, endIndex);
      
      return {
        data: paginatedPosts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / POSTS_PER_PAGE),
          pageSize: POSTS_PER_PAGE,
          totalCount
        }
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          pageSize: POSTS_PER_PAGE,
          totalCount: 0
        }
      };
    }
  }
};