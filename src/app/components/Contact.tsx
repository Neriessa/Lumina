import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export const Contact: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-cyan-50 to-white py-20">
      <div className="container mx-auto px-4">

        {/* Encabezado */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contacto
          </h2>
          <p className="text-gray-600 text-lg">
            Estamos aquí para ayudarte con cualquier duda sobre nuestros servicios
            o para agendar tu examen visual en <span className="font-semibold text-cyan-600">Lúmina</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Información de contacto */}
          <div className="space-y-6">

            <div className="flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100">
                <Phone className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Teléfono</p>
                <p className="text-gray-600">(686) 000 0000</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100">
                <Mail className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Correo</p>
                <p className="text-gray-600">contacto@luminaoptica.com</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dirección</p>
                <p className="text-gray-600">Mexicali, Baja California</p>
              </div>
            </div>

          </div>

          {/* Formulario */}
          <form className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-5">

            <h3 className="text-xl font-semibold text-gray-900">
              Envíanos un mensaje
            </h3>

            <div>
              <label className="text-sm text-gray-700">Nombre</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Correo</label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Mensaje</label>
              <textarea
                className="w-full mt-1 p-3 border border-gray-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                placeholder="Escribe tu mensaje..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition shadow-sm"
            >
              Enviar mensaje
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};