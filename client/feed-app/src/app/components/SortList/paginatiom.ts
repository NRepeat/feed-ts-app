export const paginate = (items:Post[], pageNumber:number, pageSize:number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
 };