import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <ThreeScene />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Layout flex row pada layar besar (lg:) dan rata kiri */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 text-center lg:text-left">
          
          {/* ======================================================== */}
          {/* FOTO PROFIL (SEBELAH KIRI PADA LAYAR BESAR) */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-shrink-0"
          >
            {/* Menggunakan tag motion.img lengkap dengan atribut src */}
            <motion.img 
              src="/fotofawas.jpg" // <-- GANTI DENGAN NAMA FILE FOTOMU DI FOLDER PUBLIC
              alt="Fawas Dwi Kuswandar"
              className="w-40 h-40 md:w-56 md:h-56 rounded-3xl object-cover border-2 border-primary/20 shadow-glow"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          {/* ======================================================== */}

          {/* KONTEN TEKS DAN TOMBOL */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                👋 Welcome To My Portofolio
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Hi I'm
              <br />
              <span className="text-gradient">Fawas Dwi Kuswandar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 lg:mx-0"
            >
              Saya adalah seorang murid dari MAN 1 Banda Aceh yang saat ini
              sedang menempuh pendidikan di kelas X-11, ini adalah portofolio saya
              yang berisi tentang projek-projek yang telah saya buat selama ini.
            </motion.p>

            {/* Tombol Aksi (Rata kiri pada layar besar) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 shadow-glow w-full sm:w-auto"
                onClick={() => {
                  const element = document.querySelector('#projects');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Lihat Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 w-full sm:w-auto"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Hubungi Saya
              </Button>
            </motion.div>

            {/* Sosial Media Icons (Rata kiri pada layar besar) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              {[
                { icon: Github, href: 'https://github.com/fawwazdwi-arch/fawwaz-third.git', label: 'GitHub' },
                { icon: Youtube, href: 'https://www.youtube.com/', label: 'YouTube' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="p-3 rounded-full glass hover:shadow-glow transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-foreground" />
                </motion.a>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full glass animate-float cursor-pointer"
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to About"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>
    </section>
  );
}