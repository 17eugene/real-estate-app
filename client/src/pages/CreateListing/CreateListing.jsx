import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listingOperations } from "../../redux/listing/listing-operations";
import { useForm } from "react-hook-form";
import { listingSchema } from "../../utils/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/ui/FormInput/FormInput";
import Button from "../../components/ui/Button/Button";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { options, checkOptions } from "../../utils/listingOptions";
import styles from "./CreateListing.module.scss";
import Loader from "../../components/ui/Loader/Loader";

const CreateListing = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadFilesWarning, setUploadFilesWarning] = useState(false);
  const [imgUploadLoading, setImgUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.listing);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      type: "Select the type",
      furnished: false,
      "pets allowed": false,
      offer: false,
      bedrooms: 1,
      price: null,
      photos: [],
    },
  });

  const inputRef = useRef(null);

  const onFormSubmit = (data) => {
    data.photos = uploadedImages;
    console.log(data);
    dispatch(listingOperations.create(data));
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file?.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress) {
            setImgUploadLoading(true);
          }
        },
        (error) => {
          reject(error);
          setImgUploadLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
            setImgUploadLoading(false);
          });
        }
      );
    });
  };

  const onMultipleChange = (e) => {
    const bundle = Array.from(e.target.files);
    const images = [];

    if (bundle.length > 6) {
      bundle.length = 6;
    }

    if (bundle) {
      for (let i = 0; i < bundle.length; i++) {
        console.log(bundle[i].name, bundle[i]?.size);
        if (bundle[i]?.size > 2_000_000) {
          setUploadFilesWarning("Image size can't be bigger than 2MB");
        } else {
          images.push(storeImage(bundle[i]));
          setUploadFilesWarning("");
        }
      }

      Promise.all(images).then((urls) => {
        setUploadedImages((prevBundle) => prevBundle.concat(urls).slice(0, 6));
      });
    }
  };

  const handleRemoveImg = (index) => {
    const filteredUploadedImages = uploadedImages.filter(
      (_, idx) => idx !== index
    );

    setUploadedImages(filteredUploadedImages);
  };

  return (
    <>
      <h1 className={styles.title}>Create a Listing</h1>

      <form className={styles.createFrom} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.left}>
          <div className={styles.inputWrapper}>
            <FormInput
              placeholder="Name*"
              type="text"
              name="name"
              {...register("name")}
            />
            {errors.name && (
              <p className={styles.validationError}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description*"
              className={styles.description}
              {...register("description")}
            />
            {errors.description && (
              <p className={styles.validationError}>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <FormInput
              ref={inputRef}
              placeholder="Address*"
              type="text"
              name="address"
              {...register("address")}
            />
            {errors.address && (
              <p className={styles.validationError}>{errors.address.message}</p>
            )}
          </div>

          <div className={styles.optionsWrapper}>
            {checkOptions.map((option, index) => (
              <div className={styles.checkboxContainer} key={index}>
                <input
                  {...register(option.name)}
                  type="checkbox"
                  name={option.name}
                  id={option.name}
                  label={option.name}
                />

                <label htmlFor={option.name}>
                  {option.name}
                  <p className={styles.checkmark}></p>
                </label>
              </div>
            ))}
          </div>

          <select
             name="type"
             {...register("type")}
           >
             <option disabled>Select the type</option>
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>

          <div className={styles.inputNumberWrapper}>
            <FormInput
              ref={inputRef}
              {...register("bedrooms", { valueAsNumber: true })}
              name="bedrooms"
              type="number"
              min={0}
              max={50}
            />
            <p>Bedrooms*</p>
            {errors.bedrooms && (
              <p className={styles.validationError}>
                {errors.bedrooms.message}
              </p>
            )}
          </div>
          <div className={styles.inputNumberWrapper}>
            <FormInput
              ref={inputRef}
              {...register("price", { valueAsNumber: true })}
              name="price"
              type="number"
            />
            <p>Price, USD *</p>
            {errors.price && (
              <p className={styles.validationError}>{errors.price.message}</p>
            )}
          </div>
        </div>

        {/* right block */}
        <div className={styles.right}>
          <p className={styles.imgs}>
            <span>images:</span> The first images will be the cover (max 6)
          </p>
          <div className={styles.uploadImage}>
            <input
              {...register("photos")}
              type="file"
              accept="image/*"
              id="photos"
              name="photos"
              multiple
              onChange={onMultipleChange}
            />
          </div>

          {errors.photos && <p>{errors.photos.message}</p>}

          {uploadFilesWarning ? <p>{uploadFilesWarning}</p> : null}

          {/* UPLOADED IMAGES */}
          {imgUploadLoading ? (
            <div className={styles.loaderWrapper}>
              <Loader width={100} height={30} radius={2} />
            </div>
          ) : (
            <div className={styles.uploadedImagesWrapper}>
              {uploadedImages?.length
                ? uploadedImages.map((imageUrl, index) => (
                    <div key={index}>
                      <img src={imageUrl} alt="" width="75px" height="40px" />
                      <button
                        onClick={() => handleRemoveImg(index)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                : null}
            </div>
          )}

          <Button
            text="Create"
            type="submit"
            loading={loading || imgUploadLoading}
          />
        </div>
      </form>
    </>
  );
};

export default CreateListing;
