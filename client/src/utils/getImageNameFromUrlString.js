export function getImageNameFromUrlString(urlString) {
  if (typeof urlString !== "string" || !urlString || urlString.length === 0)
    return;

  let encodedStr = decodeURIComponent(urlString);

  let splitted = encodedStr.split("/");

  return splitted[splitted.length - 1].split("?")[0];
}
