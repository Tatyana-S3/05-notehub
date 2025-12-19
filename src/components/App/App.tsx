import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createNote, fetchNotes } from "../../services/noteService";
import Loader from "../Loader/Loader";
import Paginate from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const PER_PAGE = 12;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, searchQuery],
    queryFn: () =>
      fetchNotes({ searchText: searchQuery, page, perPage: PER_PAGE }),
    placeholderData: keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsOpenModal(false);
    },
    onError: (error) => {
      alert("Ошибка при создании заметки. Попробуйте позже.");
      console.error(error);
    },
  });

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const totalPages = data?.totalPages ?? 0;

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={updateSearchQuery} value={searchQuery} />

        {totalPages > 1 && (
          <Paginate
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && (
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      )}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} createMutation={createMutation} />
        </Modal>
      )}
    </div>
  );
}

export default App;
