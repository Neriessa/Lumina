import React from 'react';
import { Eye, Shield, Award, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Services: React.FC = () => {
  const services = [
    {
      title: "Examen de la Vista",
      desc: "Evaluación clínica completa realizada por optometristas certificados.",
      benefits: ["Detección temprana", "Diagnóstico preciso", "Atención profesional"],
      icon: <Eye className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
    },
    {
      title: "Adaptación de Lentes",
      desc: "Pruebas de lentes de contacto y armazones personalizados.",
      benefits: ["Mayor comodidad", "Ajuste perfecto", "Asesoría personalizada"],
      icon: <Award className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67"
    },
    {
      title: "Protección Visual",
      desc: "Tratamientos de luz azul, antirreflejantes y micas de seguridad.",
      benefits: ["Menos fatiga visual", "Protección diaria", "Mayor durabilidad"],
      icon: <Shield className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    },
    {
      title: "Mantenimiento",
      desc: "Ajuste y limpieza profesional para tus armazones de por vida.",
      benefits: ["Mayor vida útil", "Mejor ajuste", "Cuidado continuo"],
      icon: <Clock className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-cyan-50 dark:from-zinc-900 dark:to-zinc-950">

      {/* decoraciones fondo */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">

        {/* encabezado */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestros Servicios
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg">
            En <span className="text-cyan-500 font-semibold">Lúmina</span> combinamos
            tecnología, experiencia clínica y estilo para tu salud visual.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((s, index) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-md hover:shadow-2xl transition-all duration-300"
            >

              {/* imagen */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* icono */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-3 left-3 w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  {s.icon}
                </motion.div>

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">
                    {s.title}
                  </h3>
                </div>
              </div>

              {/* contenido */}
              <div className="p-5">

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {s.desc}
                </p>

                <ul className="space-y-2 mb-4">
                  {s.benefits.map((b, i) => (
                    <li key={i} className="text-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="flex items-center gap-2 text-sm font-medium text-cyan-600 hover:gap-3 transition-all">
                  Ver más <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};