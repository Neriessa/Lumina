import React from 'react';
import { Eye, Shield, Award, Clock } from 'lucide-react';

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
    <section className="bg-gradient-to-b from-white to-cyan-50 py-20">
      <div className="container mx-auto px-4">

        {/* Encabezado */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 text-lg">
            En <span className="font-semibold text-cyan-600">Lúmina</span> combinamos
            tecnología, experiencia clínica y estilo para ofrecerte el mejor cuidado visual.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >

              {/* BLOQUE SUPERIOR (imagen) */}
              <div className="relative h-40">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* contenido encima */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">

                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-500 mb-2">
                    {s.icon}
                  </div>

                  <h3 className="font-semibold text-lg">
                    {s.title}
                  </h3>

                </div>
              </div>

              {/* BLOQUE INFERIOR (info) */}
              <div className="bg-white p-5">

                <p className="text-sm text-gray-600 mb-4">
                  {s.desc}
                </p>

                {/* beneficios */}
                <ul className="space-y-1">
                  {s.benefits.map((b, i) => (
                    <li key={i} className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      {b}
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};