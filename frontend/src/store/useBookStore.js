import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const useBookStore = create((set) => ({
  books: [],
  isBooksLoading: false,
  book: null,
  isBookLoading: FinalizationRegistry,

  getAllBooks: async () => {
    set({ isBooksLoading: true });
    try {
      const res = await axiosInstance.get("/books");
      console.log("Books inside of useBookStore: ", res);
      set({ books: res.data.allBooks });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error fetching books", error);
      toast.error("Error fetching books");
    } finally {
      set({ isBooksLoading: false });
    }
  },

  getBookDetails: async (id) => {
    set({ isBookLoading: true });
    try {
      const res = await axiosInstance.get(`/books/${id}`);
      set({ book: res.data.bookDetail });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error fetching book details!");
    } finally {
      set({ isBookLoading: false });
    }
  },
}));

export default useBookStore;
