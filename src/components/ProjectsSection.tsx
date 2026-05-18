import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Platform e-commerce modern yang ada di HP bisa digunakan untuk belanja online.',
    tags: ['Shopee', 'TikTok Shop', 'Lazada', 'Tokopedia'],
    image: '🛒',
    color: 'from-blue-500/20 to-cyan-500/20',
    github: 'https://github.com/fawwazdwi-arch/fawwaz-third.git',
    demo: 'https://www.tokopedia.com/',
  },
  {
    title: 'Learning Platform',
    description: 'Platform pembelajaran online yang mempermudah kamu dalam belajar.',
    tags: ['Ruang Guru', 'Zenius', 'Duolingo', 'Quipper'],
    image: '📚',
    color: 'from-purple-500/20 to-pink-500/20',
    github: 'https://github.com/fawwazdwi-arch/fawwaz-third.git',
    demo: 'https://app.ruangguru.com/',
  },
  {
    title: 'Social Media Platform',
    description: 'Platform yang sangat berguna untuk social media dan sharing-sharing.',
    tags: ['WhatsApp', 'TikTok', 'Instagram', 'Facebook'],
    image: '📊',
    color: 'from-orange-500/20 to-red-500/20',
    github: 'https://github.com/fawwazdwi-arch/fawwaz-third.git',
    demo: 'https://www.tiktok.com/id-ID/',
  },
  {
    title: 'AI Platform',
    description: 'Situs atau APK berbasis AI untuk mempermudah mencari informasi.',
    tags: ['ChatGPT', 'Gemini', 'Google AI', 'Meta AI'],
    image: '🤖',
    color: 'from-green-500/20 to-teal-500/20',
    github: 'https://github.com/fawwazdwi-arch/fawwaz-third.git',
    demo: 'https://chatgpt.com/',
  },
  {
    title: 'Video Editing Tutorial',
    description: 'Video tutorial yang sudah tersebar di banyak platform yang dapat mempermudah pengerjaan suatu tugas.',
    tags: ['TikTok', 'Instagram', 'YouTube'],
    image: '🎬',
    color: 'from-red-500/20 to-orange-500/20',
    isContent: true,
    youtube: 'https://www.youtube.com/',
  },
  {
    title: 'Coding Tips & Tricks',
    description: 'Konten tips & tricks dalam melakukan proggaming atau coding.',
    tags: ['Instagram', 'TikTok', 'YouTube'],
    image: '💡',
    color: 'from-cyan-500/20 to-blue-500/20',
    isContent: true,
    youtube: 'https://www.youtube.com/',
  },
];

// Varian animasi kemunculan grid (Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Varian awal saat kartu pertama kali masuk viewport
const cardEntranceVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 12 }
  }
};

// Komponen Pembungkus Kartu untuk menangkap pergerakan Mouse (Parallax 3D Effect)
function ProjectCard({ project }) {
  // Nilai koordinat X dan Y mouse relatif terhadap kartu
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mengubah posisi mouse menjadi efek rotasi derajat (3D Tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Batas kemiringan atas-bawah (15 derajat)
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]); // Batas kemiringan kiri-kanan (15 derajat)

  function handleMouseMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const width = bounds.width;
    const height = bounds.height;
    const mouseXFromCenter = event.clientX - bounds.left - width / 2;
    const mouseYFromCenter = event.clientY - bounds.top - height / 2;
    
    // Normalisasi nilai ke antara -0.5 sampai 0.5
    mouseX.set(mouseXFromCenter / width);
    mouseY.set(mouseYFromCenter / height);
  }

  function handleMouseLeave() {
    // Kembalikan posisi kotak ke semula saat mouse keluar dari area kartu
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      variants={cardEntranceVariants}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d", // Mengaktifkan efek kedalaman 3D
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer rounded-2xl perspective-1000"
    >
      <div 
        className="h-full p-6 glass rounded-2xl shadow-card hover:shadow-2xl transition-shadow duration-300 bg-background/50 backdrop-blur-sm border border-foreground/5"
        style={{ transform: "translateZ(20px)" }} // Membuat isi konten terlihat sedikit "mengambang" di atas base kartu
      >
        
        {/* Bagian Media / Kotak Gradient */}
        <div className={`aspect-video rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${project.color} overflow-hidden relative`}>
          {/* Animasi Emojinya Bergerak Naik Turun secara konstan */}
          <motion.span 
            animate={{
              y: [0, -12, 0], // Naik sejauh -12px lalu kembali ke 0
            }}
            transition={{
              duration: 2.5, // Durasi satu siklus naik-turun (2.5 detik)
              repeat: Infinity, // Mengulang selamanya
              ease: "easeInOut" // Gerakan halus di awal dan akhir
            }}
            className="text-6xl select-none block"
            style={{ transform: "translateZ(40px)" }} // Membuat emoji tampak paling depan secara 3D
          >
            {project.image}
          </motion.span>
        </div>
        
        {/* Bagian Teks & Informasi */}
        <div className="space-y-3" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-2">
            {project.isContent && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium animate-pulse">
                Content
              </span>
            )}
            <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-2 pt-2">
            {project.github && (
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button size="sm" className="rounded-full" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Demo
                </a>
              </Button>
            )}
            {project.youtube && (
              <Button size="sm" className="rounded-full" asChild>
                <a href={project.youtube} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 mr-1 fill-current" />
                  Watch
                </a>
              </Button>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block tracking-wider uppercase text-xs">
            Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Projects &amp; Karya
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-primary mx-auto rounded-full" 
          />
        </motion.div>

        {/* Grid Area */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}