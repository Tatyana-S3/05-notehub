import type { CreateNote, Note } from "../types/note";
import axios from "axios";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
interface FetchNotesParams {
  searchText?: string;
  page?: number;
  perPage?: number;
}

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${NOTEHUB_TOKEN}`;

const NOTEHUB_ENDPOINT = `/notes`;

export const fetchNotes = async ({
  searchText = "",
  page = 1,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params = {
    page,
    perPage,
    ...(searchText.trim() && { search: searchText.trim() }),
  };

  const response = await axios.get<FetchNotesResponse>(NOTEHUB_ENDPOINT, {
    params,
  });

  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const res = await axios.post<Note>(NOTEHUB_ENDPOINT, payload);
  return res.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const response = await axios.delete(`${NOTEHUB_ENDPOINT}/${noteId}`);
  return response.data;
};
