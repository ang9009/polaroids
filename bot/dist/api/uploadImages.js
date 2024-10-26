const destinationFolderPath = "Alvin and HS Friends";
/**
 * Uploads a given array of images to PhotoStation.
 * @param imgs the array of images to be uploaded
 * @throws Error if API credentials are missing
 */
const uploadImages = async (imgs) => {
    const { PS_API_URL } = process.env;
    if (!PS_API_URL) {
        throw new Error("Missing API credentials in environment variables.");
    }
    const fileUploadRoute = "/file.php?api=SYNO.PhotoStation.File";
    for (const img of imgs) {
        const params = new URLSearchParams({
            method: "uploadphoto",
            version: "1",
            dest_folder_path: destinationFolderPath,
            duplicate: "overwrite",
            filename: img.id,
            mtime: img.date.getTime().toString(),
        });
        // TODO: Create a helper function for this
        // const url = `${PS_API_URL}${fileUploadRoute}${params}`;
    }
};
export default uploadImages;
//# sourceMappingURL=uploadImages.js.map