import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50 py-16 md:py-24 border-b border-gray-100">

      {/* Fondo más dinámico */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-cyan-200/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -bottom-32 -left-32 w-[350px] h-[350px] bg-cyan-100/60 rounded-full blur-3xl"
      />

      <div className="relative container mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">

        {/* TEXTO (igual que el tuyo) */}
        <div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
          >
            Lentes que definen{" "}
            <span className="text-cyan-600 relative">
              tu mirada
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-cyan-200 rounded-full -z-10" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8 max-w-xl"
          >
            Descubre armazones modernos y servicios ópticos profesionales en
            <span className="font-semibold text-cyan-600"> Lúmina</span>.
            Tecnología, estilo y salud visual en un solo lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >

            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-200 hover:scale-[1.03]"
            >
              Ver Armazones
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('locations')}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold border border-gray-200 shadow-sm"
            >
              <MapPin className="w-5 h-5 text-cyan-500" />
              Sucursales Cercanas
            </button>

          </motion.div>

        </div>

        {/* IMAGEN MEJORADA */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          {/* Glow más elegante */}
          <div className="absolute inset-0 bg-cyan-200/40 blur-2xl rounded-[40px] scale-105" />

          <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-gray-100">

            <ImageWithFallback
              src="https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1400"
              alt="Lentes"
              className="w-full h-[320px] md:h-[420px] object-cover hover:scale-105 transition duration-700"
            />

            {/* overlay sutil para contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

          </div>

        </motion.div>

      </div>
    </section>
  );
};