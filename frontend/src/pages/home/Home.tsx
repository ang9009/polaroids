/* eslint-disable jsdoc/require-returns */
import GalleryGrid from "../../components/GalleryGrid/GalleryGrid";

/**
 * The homepage. Displays a gallery of all photos.
 */
const Home = () => {
  return (
    <div>
      <GalleryGrid pageSize={9} />
    </div>
  );
};

export default Home;
