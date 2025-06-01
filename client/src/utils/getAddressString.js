export function getAddressString(addressDetails) {
  let addressInfo;

  if (!addressDetails.streetName) {
    addressInfo = `${addressDetails.settlementName} ${addressDetails.areaName}`;
  } else if (!addressDetails.areaName) {
    addressInfo = `${addressDetails.houseNumber} ${addressDetails.streetName} ${addressDetails.settlementName} ${addressDetails.regionName}`;
  } else if (!addressDetails.areaName && !addressDetails.streetName) {
    addressInfo = `${addressDetails.settlementName} ${addressDetails.regionName}`;
  } else {
    addressInfo = ` ${addressDetails.houseNumber} ${addressDetails.streetName} ${addressDetails.settlementName} ${addressDetails.areaName} район`;
  }

  return addressInfo;
}
