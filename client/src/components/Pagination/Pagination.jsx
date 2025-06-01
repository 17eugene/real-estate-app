import styles from "./Pagination.module.scss";

const Pagination = ({ pages, currentPage, changePage }) => {
  return (
    <div className={styles.pagination}>
      {pages?.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => changePage(page)}
          className={
            currentPage === page
              ? `${styles.pageButton} ${styles.active}`
              : styles.pageButton
          }
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
