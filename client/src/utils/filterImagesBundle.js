export function filterImagesBundle(bundle, removedImg) {
  return bundle.filter((image) => image._id !== removedImg._id);
}
