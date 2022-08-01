import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      tap: false,
      user: null
    }
  },
  getters: {
  },
  actions: {
    toggleTap () {
      this.tap = !this.tap
    },
    setUser (payload: any) {
      this.user = payload
    }
  },
  persist: {
    enabled: true
  }
})
