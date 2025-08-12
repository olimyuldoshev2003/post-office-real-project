export function usePaginate(items: any, pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}
