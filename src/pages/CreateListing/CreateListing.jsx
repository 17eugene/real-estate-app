import { useState } from "react";
import FormInput from "../../components/ui/FormInput/FormInput";
import Checkbox from "../../components/ui/Checkbox/Checkbox";
import Button from "../../components/ui/Button/Button";
import RequireMark from "../../components/ui/RequireMark/RequireMark";
import { options, checkOptions } from "../../utils/listingOptions";
import styles from "./CreateListing.module.scss";

const CreateListing = () => {
  const [listingForm, setListingForm] = useState({});
  // const [checkedFeaturesState] = useState(
  //   new Array(checkOptions.length).fill(false)
  // );

  // console.log(checkedFeaturesState);

  const changeInputHandler = (e, position) => {
    setListingForm({
      ...listingForm,
      [e.target.name]:
        e.target.type === "checkbox"
          ? (checkOptions[position].checked = e.target.checked)
          : e.target.value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(listingForm);
  };

  return (
    <>
      <h1 className={styles.title}>Create a Listing</h1>

      <form className={styles.createFrom} onSubmit={formSubmitHandler}>
        <div className={styles.left}>
          <div className={styles.inputWrapper}>
            <FormInput
              placeholder="Name*"
              type="text"
              name="name"
              onChange={changeInputHandler}
              required
            />
          </div>
          <textarea
            name="description"
            placeholder="Description*"
            className={styles.description}
            onChange={changeInputHandler}
            required
          />
          <div className={styles.inputWrapper}>
            <FormInput
              placeholder="Address*"
              type="text"
              name="address"
              onChange={changeInputHandler}
              required
            />
          </div>

          <div className={styles.optionsWrapper}>
            {checkOptions.map((option, index) => (
              <Checkbox
                onChange={(e) => changeInputHandler(e, index)}
                checked={checkOptions[index].checked}
                name={option.name}
                id={option.name}
                label={option.name}
                key={option.name}
              />
            ))}
          </div>

          <select name="type" onChange={changeInputHandler} required>
            <option disabled>Select the type (require)</option>
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>

          <div className={styles.inputNumberWrapper}>
            <FormInput
              onChange={changeInputHandler}
              name="bedrooms"
              type="number"
              min={0}
              max={10}
            />
            <p>Bedrooms*</p>
          </div>
          <div className={styles.inputNumberWrapper}>
            <FormInput
              onChange={changeInputHandler}
              name="price"
              type="number"
              min={0}
              max={10e6}
            />
            <p>Price, $/month*</p>
          </div>
        </div>

        {/* right block */}
        <div className={styles.right}>
          <p>
            <span>images:</span> The first images will be the cover (max 6)
          </p>
          <input type="file" />

          <Button text="Create" type="submit" />
        </div>
      </form>
    </>
  );
};

export default CreateListing;
