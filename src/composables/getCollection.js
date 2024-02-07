import { ref, watchEffect } from 'vue';

// Firebase imports
import { firestoreDb } from '@/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

const getCollection = (c) => {
  const documents = ref(null);
  const error = ref(null);

  // Collection reference
  let colRef = collection(firestoreDb, c);

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      // Update values
      documents.value = results;
      error.value = null; // Reset error on successful snapshot
    },
    (err) => {
      // Handle errors during collection fetching
      console.error('Error fetching collection:', err.message);
      error.value = err.message;
    }
  );

  // Use 'watchEffect' to automatically unsubscribe when the component is unmounted
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  // Return the 'documents' ref and 'error' ref for use in the component
  return { documents, error };
};

export default getCollection;
