import PageLayout from '../components/PageLayout';
import { Spacer } from '@nextui-org/react';
import NewAlbumReleases from '../components/NewAlbumReleases';
import FeaturedPlaylists from '../components/FeaturedPlaylists';
import CategoriesSection from '../components/CategoriesSection';

export default function Home() {
  return (
    <PageLayout title='Spotify | Homepage'>
      <NewAlbumReleases />
      <Spacer y={2} />
      <FeaturedPlaylists />
      <Spacer y={2} />
      <CategoriesSection />
      <Spacer y={2} />
    </PageLayout>
  );
}
