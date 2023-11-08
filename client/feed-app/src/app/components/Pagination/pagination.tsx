import styles from './style.module.css'


interface IPagination {
  items: number,
  pageSize: number,
  currentPage: number,
  onPageChange: (page: number) => void
}

const Pagination = ({ items, pageSize, currentPage, onPageChange }:IPagination) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <ul className={styles.pagination}>
        {pages.map((page, i) => (
          <li
            key={i}
            className={
              page === currentPage ? styles.pageItemActive : styles.pageItem
            }
          >
            <a className={styles.pageLink} onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;