import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: any;
}

interface UIState {
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Modals
  modal: ModalState;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;

  // Loading states
  isLoading: boolean;
  loadingMessage?: string;
  setLoading: (loading: boolean, message?: string) => void;

  // Sidebar/Drawer states
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Notifications
  notifications: [],
  addNotification: (notification) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };

    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }));

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, notification.duration || 5000);
    }
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),

  clearNotifications: () => set({ notifications: [] }),

  // Modals
  modal: { isOpen: false },
  openModal: (type, data) => set({
    modal: { isOpen: true, type, data }
  }),
  closeModal: () => set({
    modal: { isOpen: false, type: undefined, data: undefined }
  }),

  // Loading states
  isLoading: false,
  loadingMessage: undefined,
  setLoading: (loading, message) => set({
    isLoading: loading,
    loadingMessage: message
  }),

  // Sidebar states
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),
  setSidebarOpen: (open) => set({ sidebarOpen: open })
}));

