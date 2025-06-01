import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useStoreImages } from "../../hooks/useStoreImages";
import { useNotifications } from "../../hooks/useNotifications";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { addressOperations } from "../../redux/address/address-operations";
import { listingOperations } from "../../redux/listing/listing-operations";
import { listingSchema } from "../../utils/formValidationSchema";
import { getAddressString } from "../../utils/getAddressString";
import { filterImagesBundle } from "../../utils/filterImagesBundle";
import { zodResolver } from "@hookform/resolvers/zod";
import { getImageNameFromUrlString } from "../../utils/getImageNameFromUrlString";
import { typeOptions, checkboxOptions } from "../../utils/listingOptions";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../../firebase";
import FormInput from "../../components/ui/FormInput/FormInput";
import Button from "../../components/ui/Button/Button";
import Loader from "../../components/ui/Loader/Loader";
import Autocomplete from "../../components/Autocomplete/Autocomplete";
import Notification from "../../components/ui/Notification/Notification";
import styles from "./CreateListing.module.scss";

const CreateListing = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [uploadFilesWarning, setUploadFilesWarning] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);
  const [selectedSettlementArea, setSelectedSettlementArea] = useState(null);
  const [defaultCoordinates, setDefaultCoordinates] = useState(null);

  const dispatch = useDispatch();

  const sequenceRef = useRef();

  const { userData, userListings } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.listing);
  const { regionList, settlementList } = useSelector(
    (state) => state.locationsData
  );

  const storage = getStorage(app);

  sequenceRef.current =
    userListings[userListings.length - 1]?.sequenceNumber + 1;

  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);

  const {
    imgUploading,
    uploadedImages,
    setUploadedImages,
    isFilesUpdated,
    setIsFilesUpdated,
    storeImage,
    getAllImagesFromStorage,
  } = useStoreImages({
    userData,
    sequenceNumber: sequenceRef.current,
    storage,
  });

  const {
    showNotificationByStatusCode,
    isActiveNotification,
    notificationStatusInfo,
  } = useNotifications();

  useEffect(() => {
    getAllImagesFromStorage();
  }, [getAllImagesFromStorage, isFilesUpdated]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      region: "",
      settlement: "",
      street: "",
      houseNumber: "",
      coordinates: null,
      description: "",
      type: "",
      furnished: false,
      petsAllowed: false,
      parking: false,
      gatedCommunity: false,
      squareMeters: 20,
      floor: 0,
      bedrooms: 0,
      price: 0,
      photos: [],
    },
  });

  useEffect(() => {
    dispatch(listingOperations.getOwnListings(userData?._id));
  }, [dispatch, userData?._id]);

  useEffect(() => {
    dispatch(addressOperations.getRegionList());
  }, [dispatch]);

  const selectedRegion = regionList?.find(
    (region) => region.Description === watch("region")
  );

  useEffect(() => {
    if (selectedRegion) {
      dispatch(
        addressOperations.getCitiesByRegion({ regionId: selectedRegion.Ref })
      );
    }
  }, [dispatch, selectedRegion]);

  const onMultipleChange = (e) => {
    const files = Array.from(e.target.files);
    const additionalFiles = [...selectedFiles, ...files];
    const validFiles = [];
    const filesDataURL = [];

    if (uploadedImages?.concat(additionalFiles)?.length > 6) {
      additionalFiles.length = 6 - uploadedImages?.length;
      setUploadFilesWarning("Maximum 6 photos allowed");
      setTimeout(() => {
        setUploadFilesWarning(null);
      }, 3000);
    }

    for (let i = 0; i < additionalFiles.length; i++) {
      if (additionalFiles[i].size > 1_500_000) {
        setUploadFilesWarning(`File larger than 1.5 MB cannot be added.`);
        setTimeout(() => {
          setUploadFilesWarning(null);
        }, 3000);
      } else {
        validFiles.push(additionalFiles[i]);
      }
    }

    setSelectedFiles(validFiles);

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        filesDataURL.push({
          url: reader.result,
          _id: uuidv4(),
          name: file.name,
        });
        if (filesDataURL.length === validFiles.length) {
          setPreviewData(filesDataURL);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadFilesHandler = async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      await storeImage(selectedFiles[i]);
    }

    if (filesToRemove.length > 0) {
      for (const file of filesToRemove) {
        if (!file.hasOwnProperty("name")) {
          const fileName = getImageNameFromUrlString(file.url);
          const storageRef = ref(
            storage,
            `${userData._id}/listings/${sequenceRef.current}/${fileName}`
          );

          await deleteObject(storageRef)
            .then((data) => console.log(data))
            .catch((err) => {
              setFirebaseError(`Error: ${String(err).split(":")[2]}`);
            });
        }
      }
    }
    setIsFilesUpdated(true);
    setSelectedFiles([]);
    setPreviewData([]);
    setFilesToRemove([]);
  };

  const deleteFileHandler = (fileId) => {
    const removedFile = uploadedImages
      .concat(previewData)
      .find((image) => image._id === fileId);

    setFilesToRemove([...filesToRemove, removedFile]);

    if (!removedFile.hasOwnProperty("name")) {
      setUploadedImages(filterImagesBundle(uploadedImages, removedFile));
    } else {
      setPreviewData(filterImagesBundle(previewData, removedFile));
      const selectedFilesUpdated = selectedFiles.filter(
        (file) => removedFile.name !== file.name
      );
      setSelectedFiles(selectedFilesUpdated);
    }
  };

  const onFormSubmit = async (data) => {
    data.photos = uploadedImages;
    const addressDetails = {
      houseNumber: data.houseNumber,
      streetName: data.street,
      settlementName: data.settlement,
      areaName: selectedSettlementArea,
      regionName: data.region,
    };
    const result = await getGeocode({
      address: getAddressString(addressDetails),
    });
    const coords = getLatLng(result[0]);

    if (coords) {
      data.coordinates = coords;
    } else {
      data.coordinates = defaultCoordinates;
    }

    const res = await dispatch(
      listingOperations.create({ ...data, sequenceNumber: sequenceRef.current })
    );
    showNotificationByStatusCode({ result: res, offerType: data.type });
  };

  return (
    <div className={styles.formWrapper}>
      {isActiveNotification && (
        <Notification
          content={notificationStatusInfo?.message}
          status={notificationStatusInfo?.statusCode}
        />
      )}
      <h1 className={styles.title}>Create a Listing</h1>

      <form className={styles.createFrom} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.left}>
          <div className={styles.inputWrapper}>
            <select disabled={loading} name="region" {...register("region")}>
              <option disabled value="">
                Select the region*
              </option>
              {regionList.length > 0 &&
                regionList.map((region) => (
                  <option key={region.AreasCenter} value={region.Description}>
                    {region.Description}
                  </option>
                ))}
            </select>

            {errors.region && (
              <p className={styles.validationError}>{errors.region.message}</p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <Autocomplete
              errors={errors}
              settlementList={settlementList}
              setValue={setValue}
              register={register}
              disabled={!selectedRegion || loading}
              setSelectedSettlementArea={setSelectedSettlementArea}
              setDefaultCoordinates={setDefaultCoordinates}
            />
            {errors.settlement && (
              <p className={styles.validationError}>
                {errors?.settlement?.message}
              </p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <FormInput
              ref={inputRef}
              placeholder="Street"
              type="text"
              name="street"
              {...register("street")}
              disabled={loading}
            />
          </div>

          <div className={styles.inputWrapper}>
            <FormInput
              ref={inputRef}
              placeholder="House"
              type="text"
              name="houseNumber"
              {...register("houseNumber")}
              disabled={loading}
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description*"
              className={styles.description}
              {...register("description")}
              disabled={loading}
            />
            {errors.description && (
              <p className={styles.validationError}>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className={styles.optionsWrapper}>
            {checkboxOptions.map((option, index) => (
              <div className={styles.checkboxContainer} key={index}>
                <input
                  {...register(option.name)}
                  type="checkbox"
                  name={option.name}
                  id={option.name}
                  label={option.label}
                  disabled={loading}
                />

                <label htmlFor={option.name}>
                  {option.label}
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            ))}
          </div>

          <div className={styles.selectWrapper}>
            <select {...register("type")} name="type" disabled={loading}>
              <option disabled value="">
                Select the type*
              </option>
              {typeOptions.length > 0 &&
                typeOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.value}
                  </option>
                ))}
            </select>

            {errors.type && (
              <p className={styles.validationError}>{errors.type.message}</p>
            )}
          </div>

          <div className={styles.inputNumberWrapper}>
            <FormInput
              ref={inputRef}
              {...register("bedrooms", { valueAsNumber: true })}
              name="bedrooms"
              type="number"
              min={0}
              max={20}
              disabled={loading}
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
              {...register("floor", { valueAsNumber: true })}
              name="floor"
              type="number"
              disabled={loading}
            />
            <p>Floor</p>
            {errors.floor && (
              <p className={styles.validationError}>{errors.floor.message}</p>
            )}
          </div>

          <div className={styles.inputNumberWrapper}>
            <FormInput
              ref={inputRef}
              {...register("squareMeters", { valueAsNumber: true })}
              name="squareMeters"
              type="number"
              disabled={loading}
            />
            <p>Square meters</p>
            {errors.squareMeters && (
              <p className={styles.validationError}>
                {errors.squareMeters.message}
              </p>
            )}
          </div>

          <div className={styles.inputNumberWrapper}>
            <FormInput
              ref={inputRef}
              {...register("price", { valueAsNumber: true })}
              name="price"
              type="number"
              disabled={loading}
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
            <div className={styles.customInput}>Select file(s)</div>
            <input
              {...register("photos")}
              type="file"
              accept="image/*"
              id="photos"
              name="photos"
              multiple
              onChange={onMultipleChange}
              ref={fileInputRef}
              disabled={loading}
            />
          </div>

          {errors.photos && <p>{errors.photos.message}</p>}

          {uploadFilesWarning ? <p>{uploadFilesWarning}</p> : null}

          {imgUploading ? (
            <div className={styles.loaderWrapper}>
              <Loader width={100} height={30} radius={2} />
            </div>
          ) : (
            <div className={styles.uploadedImagesWrapper}>
              {previewData?.length || uploadedImages.length
                ? previewData.concat(uploadedImages).map((image) => (
                    <div key={image._id}>
                      <img
                        ref={previewRef}
                        src={image.url}
                        alt=""
                        width="75px"
                        height="40px"
                      />
                      <button
                        onClick={() => deleteFileHandler(image._id)}
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
            text="Upload files"
            type="button"
            loading={imgUploading}
            disabled={!selectedFiles.length && !filesToRemove.length}
            onClick={uploadFilesHandler}
          />

          <Button
            text="Create"
            type="submit"
            loading={loading}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
