import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginateProps {
  totalPages: number;
  page: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}

function Paginate({ totalPages, page, handlePageChange }: PaginateProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      forcePage={page - 1}
      previousLabel="←"
      nextLabel="→"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}

export default Paginate;
