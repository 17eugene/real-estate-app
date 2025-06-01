import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export const useStoreImages = (values) => {
  const [imgUploading, setImgUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isFilesUpdated, setIsFilesUpdated] = useState(false);
  const [tempFilesFromStorage, setTempFilesFromStorage] = useState([]);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + `_${file?.name}`;
      const storageRef = ref(
        values.storage,
        `${values.userData._id}/listings/${values.sequenceNumber}/${fileName}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress < 100) {
            setImgUploading(true);
          }
        },
        (error) => {
          reject(error);
          setImgUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
            setUploadedImages((prev) => [
              ...prev,
              { url: downloadUrl, _id: uuidv4() },
            ]);
            setImgUploading(false);
          });
        }
      );
    });
  };

  const getAllImagesFromStorage = useCallback(async () => {
    setIsFilesUpdated(false);

    const listRef = ref(
      values.storage,
      `${values.userData._id}/listings/${values.sequenceNumber}`
    );

    try {
      const res = await listAll(listRef);

      const imgList = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      ).then((values) =>
        values.map((value) => ({ url: value, _id: uuidv4() }))
      );

      setUploadedImages(imgList);
      setTempFilesFromStorage(imgList);
    } catch (error) {
      console.log("Error while loading files");
    }
  }, [values.sequenceNumber, values.storage, values.userData._id]);

  return {
    storeImage,
    getAllImagesFromStorage,
    uploadedImages,
    setUploadedImages,
    imgUploading,
    isFilesUpdated,
    setIsFilesUpdated,
    tempFilesFromStorage,
    setTempFilesFromStorage,
  };
};
