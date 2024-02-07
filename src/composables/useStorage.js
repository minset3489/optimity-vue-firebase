import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuthStore } from '@/stores/authStore';
import { ref as vueRef } from 'vue';

const storage = getStorage();

const useStorage = () => {
  const error = vueRef(null);
  const url = vueRef(null);
  const filePath = vueRef(null);
  const auth = useAuthStore();

  const uploadImage = (file, folderName) => {
    return new Promise(async (resolve, reject) => {

      filePath.value = `${folderName}/${file.name}`;

      const storageRef = ref(storage, filePath.value);

      const metadata = {
        contentType: file.type,
      };

      try {
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.error('Error during upload:', error.message);
            error.value = error;
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(
                uploadTask.snapshot.ref
              );
              console.log('File available at', downloadURL);
              url.value = downloadURL;
              console.log('url.value', url.value);
              resolve(); // Resolve the promise after the URL is set
            } catch (err) {
              console.error('Error getting download URL:', err.message);
              error.value = err;
              reject(err);
            }
          }
        );
      } catch (err) {
        console.error('Error during upload:', err.message);
        error.value = err;
        reject(err);
      }
    });
  };

  const deleteImage = async (path) => {
    const storageRef = ref(storage, path);

    try {
      await deleteObject(storageRef);
    } catch (err) {
      console.error('Error during deletion:', err.message);
      error.value = err;
    }
  };

  return { uploadImage, deleteImage, url, filePath, error };
};

export default useStorage;
