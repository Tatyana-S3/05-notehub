import type { Note } from "../types/note";
import axios from "axios";

interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}
interface FetchNotesParams {
  page: number;
  perPage?: number;
}

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const BASE_URL = "https://notehub-public.goit.study/api";
const NOTEHUB_ENDPOINT = `${BASE_URL}/notes`;

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params = {
    page,
    perPage,
  };

  const response = await axios.get<FetchNotesResponse>(NOTEHUB_ENDPOINT, {
    params: params,
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};
