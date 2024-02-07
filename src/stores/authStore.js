// authStore.js
import { defineStore } from 'pinia'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { onUnmounted } from 'vue';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
    userInitialized: false, // Added state to track user initialization
    isPending : false,
  }),

  actions: {

    // Mutation to set userInitialized state to true
    setUserInitialized() {
      this.userInitialized = true
    },

    async initAuthState() {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        // console.log('User state change. Current user is:', user);
        this.user = user;
  
        // Set userInitialized to true once user is initially set
        if (user !== null) {
          this.setUserInitialized();
        }
      });
  
      // Call unsubscribe when the component is unmounted
      onUnmounted(unsubscribe);
    },

    async signUp(email, password, displayName) {
      this.error = null
      this.isPending = true
      
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
          throw new Error('Could not complete signup')
        }
        // Update display name using updateProfile
        await updateProfile(auth.currentUser, { displayName });

        this.error = null
      } catch (err) {
        console.error(err.message)
        this.error = err.message
      } finally{
        this.isPending = false
      }
    },

    async logIn(email, password) {
      this.error = null
      this.isPending = true
      // console.log(this.isPending)
      try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        
        if (!res) {
          throw new Error('Could not login')
        }
        this.error = null
      } catch (err) {
        console.error(err.message)
        this.error = err.message
      } finally{
        this.isPending = false
        console.log('Pinia Logged In as')
      }
    },

    async signOut() {
      try {
        await signOut(auth)
        console.log('Pinia Signed Out')
      } catch (err) {
        console.error('Error signing out:', err.message)
      }
    },
    
    
  },
})
