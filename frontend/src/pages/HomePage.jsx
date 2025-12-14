import { DashMenu } from '@/components/HomePageComponents/DashMenu';
import HomePageNews from '@/components/HomePageComponents/HomePageNews';
import NavigationHomePage from '@/components/NavigateHomPage';
import ShowStreak from '@/components/HomePageComponents/ShowStreak';
import TranslateTool from '@/components/TranslateTool';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import Footer from '@/components/HomePageComponents/Footer';
import ToHistPage from '@/components/HomePageComponents/ToHistPage';
import Announcement from '@/components/Announcement';

const HomePage = () => {
  const location = useLocation();
  const streak = location.state?.streak ?? 0;
  const user = location.state?.user || 'Guest';
  const langue = location.state?.langue || 'english';
  const [announcement, setAnnouncement] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === 'Guest') navigate('/');
    toast.success(`Welcome ${user} to ${langue} Home`);
  }, [user, navigate, langue]);

  return (
    <div
      onClick={() => setAnnouncement(false)}
      className="relative min-h-screen w-full text-black font-semibold overflow-x-hidden"
    >
      {/* NAVBAR */}
      <NavigationHomePage user={user} streak={streak} langue={langue} />

      {/* ANNOUNCEMENT MODAL */}
      {announcement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <Announcement userName={user} streak={streak} langue={langue} />
        </div>
      )}

      {/* FIXED ELEMENTS */}
      <div className="fixed top-4 left-4 z-40">
        <DashMenu />
      </div>

      <div className="fixed top-4 right-4 z-40">
        <ToHistPage user={user} streak={streak} langue={langue} />
      </div>

      <div className="fixed top-20 left-4 z-40">
        <ShowStreak user={user} streak={streak} />
      </div>

      {/* MAIN CONTENT */}
      <main className="mx-auto mt-32 grid max-w-7xl grid-cols-1 gap-10 px-4 lg:grid-cols-3">
        {/* NEWS */}
        <section className="lg:col-span-2 flex flex-col items-center space-y-10">
          <HomePageNews user={user} langue={langue} />
          <Footer />
        </section>

        {/* TRANSLATE TOOL */}
        <aside className="flex justify-center lg:justify-end">
          <TranslateTool langue={langue} />
        </aside>
      </main>
    </div>
  );
};

export default HomePage;
