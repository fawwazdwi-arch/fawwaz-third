import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Video, Coffee, Trophy } from 'lucide-react';

export default function AboutSection() {
  // Data kartu biografi dengan background cerah/terang, teks gelap pekat, dan inset shadow
  const cardsData = [
    {
      id: 1,
      title: "Pendidikan & Kelas",
      content: "Siswa aktif di MAN 1 Banda Aceh, menempuh pendidikan di kelas X-11 (Program Kedinasan). Fokus mempersiapkan masa depan yang disiplin dan kompetitif.",
      quote: "Disiplin adalah jembatan antara cita-cita dan pencapaian nyata.",
      // Background Hijau Mint Terang, Teks Gelap, Inset Shadow Hijau Emerald
      color: "bg-emerald-100 border-emerald-300 text-emerald-950 shadow-[inset_0_0_20px_rgba(16,185,129,0.3)]",
      icon: Trophy,
    },
    {
      id: 3,
      title: "Cita-Cita & Karir",
      content: "Memiliki impian besar untuk mengabdi sebagai anggota kepolisian/abdi negara, sekaligus mengintegrasikan keahlian IT demi kemajuan teknologi bangsa.",
      quote: "Mengabdi dengan berani, berinovasi tanpa henti untuk negeri.",
      // Background Amber/Kuning Terang, Teks Gelap, Inset Shadow Amber Gelap
      color: "bg-amber-100 border-amber-300 text-amber-950 shadow-[inset_0_0_20px_rgba(245,158,11,0.3)]",
      icon: Coffee,
    },
    {
      id: 4,
      title: "Hobi & Kreativitas",
      content: "Gemar bermain sepak bola sejak kecil untuk melatih fisik dan kerja sama tim. Di waktu senggang, aktif membuat konten tutorial coding dan editing video.",
      quote: "Keseimbangan fisik dan kreativitas adalah kunci stamina seorang kreator.",
      // Background Ungu Lavender Terang, Teks Gelap, Inset Shadow Ungu Deep
      color: "bg-purple-100 border-purple-300 text-purple-950 shadow-[inset_0_0_20px_rgba(168,85,247,0.3)]",
      icon: Video,
    }
  ];

  const [cards, setCards] = useState(cardsData);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fungsi untuk memutar kartu ke belakang
  const cycleCard = () => {
    setCards((prevCards) => {
      const updated = [...prevCards];
      const first = updated.shift();
      if (first) updated.push(first);
      return updated;
    });
    setActiveIndex((prev) => (prev + 1) % cardsData.length);
  };

  // Autoplay setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      cycleCard();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Menangani deteksi setelah kartu di-drag/geser oleh user
  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      cycleCard();
    }
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content: Split Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* KOLOM KIRI: Kata Motivasi Dinamis */}
          <div className="flex flex-col justify-center min-h-[250px] space-y-6">
            <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Motto &amp; Insight
            </span>
            <div className="relative h-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <p className="text-2xl md:text-3xl font-medium italic text-foreground font-display leading-relaxed">
                    "{cardsData[activeIndex].quote}"
                  </p>
                  <p className="text-sm mt-3 font-semibold tracking-wider uppercase text-muted-foreground">
                    — {cardsData[activeIndex].title}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* KOLOM KANAN: Stacked Cards Carousel Terang & Inset Shadow */}
          <div className="relative flex items-center justify-center h-[400px] w-full">
            <div className="relative w-full max-w-[360px] h-[340px]">
              {cards.map((card, index) => {
                const isTop = index === 0;
                const dragProps = isTop ? {
                  drag: true,
                  dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
                  onDragEnd: handleDragEnd
                } : {};

                const IconComponent = card.icon;

                return (
                  <motion.div
                    key={card.id}
                    {...dragProps}
                    style={{ cursor: isTop ? 'grab' : 'inherit' }}
                    whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
                    animate={{
                      scale: 1 - index * 0.06,
                      y: index * -18,
                      zIndex: cards.length - index,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute inset-0 w-full h-full p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${card.color}`}
                  >
                    {/* Bagian Atas Kartu */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        {/* Label atas disesuaikan dengan warna tulisan gelap redup */}
                        <span className="text-xs font-mono tracking-widest uppercase opacity-70">
                          Biography Card
                        </span>
                        {/* Kotak Icon dibuat sedikit kontras dengan background kartu */}
                        <div className="p-2 rounded-lg bg-black/5 border border-black/10">
                          <IconComponent className="h-5 w-5" />
                        </div>
                      </div>
                      
                      {/* Menggunakan text-zinc-950 agar sangat tebal dan hitam pekat di atas warna terang */}
                      <h3 className="text-2xl font-bold font-display tracking-tight mb-3 text-zinc-950">
                        {card.title}
                      </h3>
                      {/* Menggunakan text-zinc-800 agar deskripsi panjang nyaman dibaca */}
                      <p className="text-sm text-zinc-800 leading-relaxed font-normal">
                        {card.content}
                      </p>
                    </div>

                    {/* Bagian Bawah Kartu */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/10 text-zinc-700">
                      <span className="text-xs font-semibold">Fawas Dwi Kuswandar</span>
                      <span className="text-xs font-mono">0{card.id} / 04</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}