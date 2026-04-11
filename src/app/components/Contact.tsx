import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";

export const Contact: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-cyan-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-20 overflow-hidden">

      <div className="container mx-auto px-4">

        {/* CTA superior */}
        <div className="mb-12 p-6 bg-cyan-500 text-white rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold">
              Agenda tu examen visual hoy mismo
            </h3>
            <p className="text-sm opacity-90">
              Atención rápida en Tijuana
            </p>
          </div>

          <a
            href="https://wa.me/526640000000"
            className="px-5 py-3 bg-white text-cyan-600 rounded-lg font-medium hover:scale-105 transition"
          >
            Agendar por WhatsApp
          </a>
        </div>

        {/* Encabezado */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contacto
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Estamos aquí para ayudarte con cualquier duda o para agendar tu examen visual en{" "}
            <span className="font-semibold text-cyan-600">Lúmina</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* INFO */}
          <div className="space-y-6">

            {/* Teléfono */}
            <motion.div whileHover={{ scale: 1.03 }} className="p-5 bg-white dark:bg-zinc-900 rounded-xl shadow border border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100">
                  <Phone className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Teléfono</p>
                  <p className="text-gray-600 dark:text-gray-300">(686) 000 0000</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <a href="tel:6640000000" className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm">
                  Llamar
                </a>
                <a href="https://wa.me/526640000000" className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Correo */}
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-5 p-5 bg-white dark:bg-zinc-900 rounded-xl shadow border border-gray-100 dark:border-zinc-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100">
                <Mail className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Correo</p>
                <p className="text-gray-600 dark:text-gray-300">contacto@luminaoptica.com</p>
              </div>
            </motion.div>

            {/* Dirección */}
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-5 p-5 bg-white dark:bg-zinc-900 rounded-xl shadow border border-gray-100 dark:border-zinc-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Dirección</p>
                <p className="text-gray-600 dark:text-gray-300">Tijuana, Baja California</p>
              </div>
            </motion.div>

            {/* Horario */}
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-5 p-5 bg-white dark:bg-zinc-900 rounded-xl shadow border border-gray-100 dark:border-zinc-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100">
                <Clock className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Horario</p>
                <p className="text-gray-600 dark:text-gray-300">Lunes a Sábado: 9:00am - 7:00pm</p>
              </div>
            </motion.div>

            {/* Mapa */}
            <div className="mt-6">
              <iframe
               src="https://www.google.com/maps?q=32.474650,-117.045897&z=15&output=embed"
               className="w-full h-[250px] rounded-xl border-0"
               loading="lazy"
              />
            </div>

          </div>

          {/* FORM */}
          <motion.form
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 space-y-5"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Envíanos un mensaje
            </h3>

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">Nombre</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">Correo</label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">Servicio</label>
              <select className="w-full mt-1 p-3 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white">
                <option>Selecciona un servicio</option>
                <option>Examen de la vista</option>
                <option>Armazones</option>
                <option>Lentes de contacto</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">Mensaje</label>
              <textarea
                className="w-full mt-1 p-3 border border-gray-200 dark:border-zinc-700 rounded-lg h-32 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Escribe tu mensaje..."
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition"
            >
              Enviar mensaje
            </motion.button>
          </motion.form>

        </div>

      </div>
    </section>
  );
};