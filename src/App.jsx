import { useCallback, useEffect, useState } from "react";
import Fog from "./components/Fog";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cemetery from "./components/Cemetery";
import Statistics from "./components/Statistics";
import About from "./components/About";
import Footer from "./components/Footer";
import BurialModal from "./components/BurialModal";
import ResurrectionModal from "./components/ResurrectionModal";
import DeathCertificate from "./components/DeathCertificate";
import Modal from "./components/Modal";
import { useGraves } from "./hooks/useGraves";
import { loadSoundPreference, saveSoundPreference } from "./utils/storage";
import { playSound } from "./utils/sound";

export default function App() {
  const {
    graves,
    buryIdea,
    resurrectGrave,
    registerView,
    stats,
    rapidSubmissionNotice,
    clearRapidSubmissionNotice,
  } = useGraves();

  const [soundEnabled, setSoundEnabled] = useState(() => loadSoundPreference());
  const [isBurialOpen, setBurialOpen] = useState(false);
  const [viewingGrave, setViewingGrave] = useState(null);
  const [resurrectionTarget, setResurrectionTarget] = useState(null);

  useEffect(() => {
    saveSoundPreference(soundEnabled);
  }, [soundEnabled]);

  const handleToggleSound = () => {
    setSoundEnabled((v) => !v);
    playSound("click", true);
  };

  const handleNavigate = (id) => {
    playSound("click", soundEnabled);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openBurialModal = () => {
    playSound("graveOpen", soundEnabled);
    setBurialOpen(true);
  };

  const closeBurialModal = () => {
    setBurialOpen(false);
    clearRapidSubmissionNotice();
  };

  const handleBury = useCallback(
    ({ title, description }) => {
      const grave = buryIdea({ title, description });
      playSound("burial", soundEnabled);
      return grave;
    },
    [buryIdea, soundEnabled]
  );

  const handleFinishBurial = () => {
    setBurialOpen(false);
    clearRapidSubmissionNotice();
    document.getElementById("cemetery")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenGrave = (grave) => {
    playSound("graveOpen", soundEnabled);
    registerView(grave.id);
    setViewingGrave(grave);
  };

  const handleResurrectClick = () => {
    const deadGraves = graves.filter((g) => g.status === "dead");
    if (deadGraves.length === 0) return;
    const pick = deadGraves[Math.floor(Math.random() * deadGraves.length)];
    setResurrectionTarget(pick);
  };

  const handleConfirmResurrection = (id) => {
    resurrectGrave(id);
    playSound("resurrection", soundEnabled);
  };

  return (
    <div className="relative min-h-screen">
      <Fog />
      <Navbar
        onBuryClick={openBurialModal}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onNavigate={handleNavigate}
      />

      <main>
        <Hero onBuryClick={openBurialModal} totalBuried={stats.totalRegrets} />
        <Cemetery
          graves={graves}
          onOpenGrave={handleOpenGrave}
          onBuryClick={openBurialModal}
          onResurrectClick={handleResurrectClick}
        />
        <Statistics stats={stats} />
        <About />
      </main>

      <Footer />

      {isBurialOpen && (
        <BurialModal
          onClose={closeBurialModal}
          onBury={handleBury}
          onFinish={handleFinishBurial}
          rapidSubmissionNotice={rapidSubmissionNotice}
        />
      )}

      {viewingGrave && (
        <Modal onClose={() => setViewingGrave(null)} labelledBy="death-certificate-title">
          <DeathCertificate
            mode="view"
            grave={viewingGrave}
            onClose={() => setViewingGrave(null)}
          />
        </Modal>
      )}

      {resurrectionTarget && (
        <ResurrectionModal
          grave={resurrectionTarget}
          onClose={() => setResurrectionTarget(null)}
          onResurrect={handleConfirmResurrection}
        />
      )}
    </div>
  );
}
