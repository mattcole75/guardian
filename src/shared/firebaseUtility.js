import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../configuration/firebase/firebase';

export const loadDocument = async (uid, fileName) => {
    
    // set the document location reference
    const docRef = ref(storage, `access_request_documents/${uid}/${fileName}`);
    //query firebase
    await getDownloadURL(docRef)
        .then((url) => {
            window.open(url, '_blank', 'noreferrer');
        })
        .catch(err => {
            console.log(err);
            return(err);
        });
}