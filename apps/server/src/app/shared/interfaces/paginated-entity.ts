export default interface PaginationEntityInterface<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}
