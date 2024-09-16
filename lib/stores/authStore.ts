import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    userId?: number | null
}

interface AuthActions {
    setUserId: (userId: number) => void
    clearUserId: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
          userId: undefined,
          setUserId: (userId) => set({ userId }),
          clearUserId: () =>
            set({
              userId: undefined,
            }),
        }),
        {
            name: 'auth-store',
        }
    )
)