import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Loader from "../Loader/Loader";
import Paginate from "../Pagination/Pagination";

function App() {
  const [page, setPage] = useState<number>(1);
  const PER_PAGE = 12;

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}

        {totalPages >= 1 && (
          <Paginate
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        )}
        <button className={css.button}>Create note +</button>
      </header>
      {isLoading && <Loader />}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default App;
