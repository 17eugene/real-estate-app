import { useState } from "react";
import FormInput from "../ui/FormInput/FormInput";
import styles from "./Autocomplete.module.scss";

const Autocomplete = ({
  settlementList,
  setValue,
  register,
  disabled,
  setSelectedSettlementArea,
  setDefaultCoordinates,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      setSuggestions([]);
      setIsVisible(false);
      return;
    }

    const matches = settlementList.filter((item) =>
      item.Description.toLowerCase().startsWith(query)
    );

    setSuggestions(matches);
    setIsVisible(matches.length > 0);
  };

  const handleCitySelect = (settlementData) => {
    console.log(settlementData);
    setValue("settlement", settlementData.settlement);
    setSelectedSettlementArea(settlementData?.area);
    setDefaultCoordinates(settlementData?.coords);
    setSuggestions([]);
    setIsVisible(false);
  };

  return (
    <div className={styles.autocompleteWrapper}>
      <>
        <FormInput
          placeholder="Settlement*"
          type="text"
          name="settlement"
          {...register("settlement")}
          onChange={handleInputChange}
          onFocus={() => setIsVisible(suggestions.length > 0)}
          disabled={disabled}
        />
      </>
      {isVisible ? (
        <div className={styles.suggestionsWrapper}>
          <ul>
            {suggestions.map((suggestion) => (
              <li
                onClick={() =>
                  handleCitySelect({
                    settlement: suggestion.Description,
                    area: suggestion.RegionsDescription,
                    coords: {
                      lat: suggestion?.Latitude,
                      lng: suggestion?.Longitude,
                    },
                  })
                }
                key={suggestion.Ref}
              >
                <span>{suggestion.Description}</span>
                {suggestion.RegionsDescription && (
                  <span>, {suggestion.RegionsDescription} р-н</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Autocomplete;
