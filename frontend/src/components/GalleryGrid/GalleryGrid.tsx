import { useEffect } from "react";
import { useGetMedia } from "../../hooks/useGetMedia";

/**
 *
 */
const GalleryGrid = () => {
  const { isPending, data, error } = useGetMedia(20);
  useEffect(() => {
    console.log(data);
  }, [data, isPending, error]);

  return <div>PhotoGrid</div>;
};

export default GalleryGrid;
