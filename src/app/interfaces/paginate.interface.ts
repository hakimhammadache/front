
export interface IPaginationState {
    sortBy?: [string, string][];
    search?: string;
    itemsPerPage: number,
    totalItems: number,
    currentPage: number,
    totalPages: number,
}