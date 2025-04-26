export interface FakeApiPost {
    id: number;
    userId: number;
    title: string;
    body: string;
  }
  
  export interface FakeApiPagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
  }
  
  export interface FakeApiResponse {
    data: FakeApiPost[];
    pagination: FakeApiPagination;
  }