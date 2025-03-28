import { create } from "zustand";

const useUserStore = create((set, get) => ({
  users: [],
  user: {},
  loading: false,
  error: null,
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch("/api/users");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch users");
      }

      set({ users: data.users, loading: false });
      return data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  getOneUser: async (id) => {
    const user = get().users.find((user) => user.id == id);
    set({ user: user });
  },
}));

export default useUserStore;
