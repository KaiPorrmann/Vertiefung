//State Management
import create from "zustand";
import {persist} from "zustand/middleware";



const useStore = create(persist(set=>({
    //User
    user: null,
    setUser: (user) => set({user}),
    resetUser: () => set({ user:null })

}),{
    name: "userstate"
}
));

export default useStore;