import { v4 as uuidv4 } from "uuid";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStoreImages } from "../../hooks/useStoreImages";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { listingOperations } from "../../redux/listing/listing-operations";
import { addressOperations } from "../../redux/address/address-operations";
import { useForm } from "react-hook-form";
import { useNotifications } from "../../hooks/useNotifications";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { typeOptions, checkboxOptions } from "../../utils/listingOptions";
import { getAddressString } from "../../utils/getAddressString";
import { listingSchema } from "../../utils/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getImageNameFromUrlString } from "../../utils/getImageNameFromUrlString";
import { filterImagesBundle } from "../../utils/filterImagesBundle";
import FormInput from "../../components/ui/FormInput/FormInput";
import Autocomplete from "../../components/Autocomplete/Autocomplete";
import Button from "../../components/ui/Button/Button";
import Loader from "../../components/ui/Loader/Loader";
import Notification from "../../components/ui/Notification/Notification";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../../firebase";
import styles from "../CreateListing/CreateListing.module.scss";

/*--------------------------------------------------------------------------------------*/

const EditListing = () => {
  const [uploadFilesWarning, setUploadFilesWarning] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [defaultCoordinates, setDefaultCoordinates] = useState(null);
  const [selectedSettlementArea, setSelectedSettlementArea] = useState(null);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [sequenceNumber, setSequenceNumber] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { listingId } = useParams();

  const { userData } = useSelector((state) => state.user);
  const { currentListing, loading, error } = useSelector(
    (state) => state.listing.listingData
  );

  const { regionList, settlementList } = useSelector(
    (state) => state.locationsData
  );

  const storage = getStorage(app);

  const {
    imgUploading,
    uploadedImages,
    tempFilesFromStorage,
    setTempFilesFromStorage,
    isFilesUpdated,
    setIsFilesUpdated,
    storeImage,
    getAllImagesFromStorage,
  } = useStoreImages({
    userData,
    sequenceNumber,
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

  useEffect(() => {
    dispatch(addressOperations.getRegionList());
  }, [dispatch]);

  useEffect(() => {
    const getCurrentListing = () => {
      dispatch(listingOperations.getListing(listingId));
    };

    getCurrentListing();
  }, [dispatch, listingId]);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(listingSchema),
    values: {
      region: capitalizeFirstLetter(currentListing?.region),
      settlement: currentListing?.settlement,
      street: currentListing?.street,
      houseNumber: currentListing?.houseNumber,
      coordinates: currentListing?.coordinates,
      description: currentListing?.description,
      type: currentListing?.type,
      furnished: currentListing?.furnished,
      petsAllowed: currentListing?.petsAlowed,
      parking: currentListing?.parking,
      gatedCommunity: currentListing?.gatedCommunity,
      squareMeters: currentListing?.squareMeters,
      floor: currentListing?.floor,
      bedrooms: currentListing?.bedrooms,
      price: currentListing?.price,
      photos: currentListing?.photos,
    },
    defaultValues: {
      // region: capitalizeFirstLetter(currentListing?.region),
      // settlement: currentListing?.settlement,
      // street: currentListing?.street,
      // houseNumber: currentListing?.houseNumber,
      // coordinates: currentListing?.coordinates,
      // description: currentListing?.description,
      // type: currentListing?.type,
      // furnished: currentListing?.furnished,
      // petsAllowed: currentListing?.petsAlowed,
      // parking: currentListing?.parking,
      // gatedCommunity: currentListing?.gatedCommunity,
      // squareMeters: currentListing?.squareMeters,
      // floor: currentListing?.floor,
      // bedrooms: currentListing?.bedrooms,
      // price: currentListing?.price,
      // photos: currentListing?.photos,
    },
  });

  useEffect(() => {
    setSequenceNumber(currentListing?.sequenceNumber);
  }, [currentListing?.sequenceNumber]);

  const selectedRegion = regionList?.find(
    (region) => region?.Description === watch("region")
  );

  useEffect(() => {
    if (selectedRegion) {
      dispatch(
        addressOperations.getCitiesByRegion({ regionId: selectedRegion.Ref })
      );
    }
  }, [dispatch, selectedRegion]);

  useEffect(() => {
    if (settlementList.length > 0) {
      if (settlementList[0]?.Area !== selectedRegion?.Ref) {
        setValue("settlement", "");
        setValue("street", "");
        setValue("houseNumber", "");
      }
    }
  }, [selectedRegion?.Ref, setValue, settlementList]);

  const inputRef = useRef(null);

  const onMultipleChange = async (e) => {
    const files = Array.from(e.target.files);
    let additionalFiles = [...selectedFiles, ...files];
    let validFiles = [];
    let filesDataURL = [];

    if (tempFilesFromStorage?.concat(additionalFiles)?.length > 6) {
      additionalFiles.length = 6 - tempFilesFromStorage?.length;
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

  const deleteImage = (fileId) => {
    setFirebaseError(null);
    const removedFile = tempFilesFromStorage
      .concat(previewData)
      .find((image) => image._id === fileId);

    setFilesToRemove([...filesToRemove, removedFile]);

    if (!removedFile.hasOwnProperty("name")) {
      setTempFilesFromStorage(
        filterImagesBundle(tempFilesFromStorage, removedFile)
      );
    } else {
      setPreviewData(filterImagesBundle(previewData, removedFile));
      const selectedFilesUpdated = selectedFiles.filter(
        (file) => removedFile.name !== file.name
      );
      setSelectedFiles(selectedFilesUpdated);
    }
  };

  const updateFileStorageHandler = async () => {
    const map = {};
    const sharedStorage = [...filesToRemove, ...uploadedImages];
    for (let i = 0; i < sharedStorage.length; i++) {
      if (map[sharedStorage[i].url]) {
        map[sharedStorage[i].url] += 1;
      } else {
        map[sharedStorage[i].url] = 1;
      }
    }

    for (let url in map) {
      if (map[url] === 2) {
        const fileName = getImageNameFromUrlString(url);
        const storageRef = ref(
          storage,
          `${userData._id}/listings/${sequenceNumber}/${fileName}`
        );
        await deleteObject(storageRef)
          .then((data) => console.log(data))
          .catch((err) => {
            setFirebaseError(`Error: ${String(err).split(":")[2]}`);
          });
      }
    }

    setFilesToRemove([]);

    if (selectedFiles.length) {
      for (const file of selectedFiles) {
        await storeImage(file);
        setSelectedFiles([]);
        setPreviewData([]);
        setFilesToRemove([]);
      }
    }

    setIsFilesUpdated(true);
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
      listingOperations.updateListing({ id: listingId, values: data })
    );
    showNotificationByStatusCode({ result: res, offerType: data.type });

    if (!error && !loading) {
      navigate(location.state.from, { replace: true });
    }
  };

  return (
    <>
      <div className={styles.formWrapper}>
        {isActiveNotification && (
          <Notification
            content={notificationStatusInfo?.message}
            status={notificationStatusInfo?.statusCode}
          />
        )}
        <h1 className={styles.title}>Edit the listing</h1>
        <form
          className={styles.createFrom}
          onSubmit={handleSubmit(onFormSubmit)}
        >
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
                <p className={styles.validationError}>
                  {errors.region.message}
                </p>
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
                defaultValue={currentListing?.description}
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
                    defaultChecked={
                      currentListing && currentListing[option?.name]
                    }
                  />

                  <label htmlFor={option.name}>
                    {option.label}
                    <p className={styles.checkmark}></p>
                  </label>
                </div>
              ))}
            </div>

            <select
              defaultValue="Select the type*"
              name="type"
              {...register("type")}
            >
              <option disabled>Select the type*</option>
              {typeOptions.map((option) => (
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
                defaultValue={currentListing?.bedrooms}
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
                defaultValue={currentListing?.price}
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
              />
            </div>

            {errors.photos && <p>{errors.photos.message}</p>}

            {uploadFilesWarning ? <p>{uploadFilesWarning}</p> : null}

            {/* UPLOADED IMAGES */}
            {imgUploading ? (
              <div className={styles.loaderWrapper}>
                <Loader width={100} height={30} radius={2} />
              </div>
            ) : (
              <div className={styles.uploadedImagesWrapper}>
                {tempFilesFromStorage?.length || previewData?.length
                  ? tempFilesFromStorage.concat(previewData).map((image) => (
                      <div key={image._id}>
                        <img
                          src={image.url}
                          alt=""
                          width="75px"
                          height="40px"
                        />
                        <button
                          onClick={() => deleteImage(image._id)}
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
              text="Update files"
              type="button"
              loading={imgUploading}
              disabled={!filesToRemove.length && !previewData.length}
              onClick={updateFileStorageHandler}
            />

            <Button
              text="Confirm"
              type="submit"
              loading={loading || imgUploading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditListing;
