import { ref, watchEffect } from 'vue';

// Firebase imports
import { firestoreDb } from '@/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const getDocument = (collectionName, documentId) => {
  // Use 'doc' function to get a reference to the document
  const documentRef = doc(firestoreDb, collectionName, documentId);

  const document = ref(null);
  const error = ref(null);

  // Subscribe to document changes using 'onSnapshot'
  const unsubscribe = onSnapshot(
    documentRef,
    (snapshot) => {
      if (snapshot.exists()) {
        // If the document exists, update the 'document' ref
        document.value = { ...snapshot.data(), id: snapshot.id };
        error.value = null; // Reset error on successful snapshot
      } else {
        // If the document does not exist, set an error
        console.error('Document does not exist');
        error.value = 'Document not found';
      }
    },
    (err) => {
      // Handle errors during document fetching
      console.error('Error fetching document:', err.message);
      error.value = err.message;
    }
  );

  // Use 'watchEffect' to automatically unsubscribe when the component is unmounted
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  // Return the 'document' ref and 'error' ref for use in the component
  return { document, error };
};

export default getDocument;
