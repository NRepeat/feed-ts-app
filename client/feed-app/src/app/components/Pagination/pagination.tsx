import styles from './style.module.css'

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); 
 
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
 
   return (
    <div>
      <ul className={styles.pagination}>
        {pages.map((page,i) => (
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