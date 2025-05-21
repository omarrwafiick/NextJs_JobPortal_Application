import { create } from 'zustand';  
 
const AppStore = create((set) => ({ 
    user:null,
    setUser: (data) => set({ user: data }),  
    isAuthenticated:false,
    setIsAuthenticated: (data) => set({ isAuthenticated: data }),
    isLoading:false,    
    setIsLoading: (data) => set({ isLoading: data }), 
}));
  
export default AppStore;