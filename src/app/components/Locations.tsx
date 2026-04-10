import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Info } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitud: number;
  longitud: number;
  distance: number;
}

// rango máximo de búsqueda
const MAX_DISTANCE_KM = 10;

export const Locations: React.FC = () => {

  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // formula de distancia entre dos coordenadas
  const getDistance = (
    lat1:number,
    lon1:number,
    lat2:number,
    lon2:number
  ) => {

    const R = 6371;
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLon = (lon2-lon1) * Math.PI/180;

    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI/180) *
      Math.cos(lat2 * Math.PI/180) *
      Math.sin(dLon/2) *
      Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // traer sucursales
  const fetchStores = async () => {

    const { data, error } = await supabase
      .from('sucursales')
      .select('*');

    if(error){
      console.error(error);
      return;
    }

    if(!userLocation){

      setStores(data.map((s:any)=>({
        id: s.id,
        name: s.nombre,
        address: s.direccion,
        phone: s.telefono,
        latitud: s.latitud,
        longitud: s.longitud,
        distance: 0
      })));

      return;
    }

    const mapped: Store[] = data.map((s:any)=>{

      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        s.latitud,
        s.longitud
      );

      return{
        id: s.id,
        name: s.nombre,
        address: s.direccion,
        phone: s.telefono,
        latitud: s.latitud,
        longitud: s.longitud,
        distance: Number(distance.toFixed(2))
      };

    })
    .filter((store:Store)=> store.distance <= MAX_DISTANCE_KM);

    mapped.sort((a: Store, b: Store) => a.distance - b.distance);

    setStores(mapped);

  };

  useEffect(()=>{
    fetchStores();
  },[userLocation]);

  const requestLocation = () => {

    setLoading(true);

    if ("geolocation" in navigator) {

      navigator.geolocation.getCurrentPosition(

        (position) => {

          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });

          setLoading(false);
        },

        () => {

          setLoading(false);
          alert("No pudimos obtener tu ubicación.");

        }

      );

    } else {

      setLoading(false);

    }

  };

  return (
    <div className="container mx-auto px-4 py-12">

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Sucursales Cercanas
          </h2>

          <p className="text-gray-500 text-sm">
            Encuentra tu óptica Lúmina más cercana.
          </p>
        </div>

        <button
          onClick={requestLocation}
          disabled={loading}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-bold transition-all disabled:bg-gray-300"
        >
          <Navigation className="w-4 h-4" />
          {loading ? 'Buscando...' : 'Usar mi GPS'}
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {stores.map((store)=>(
          <div
            key={store.id}
            className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col justify-between hover:border-cyan-200 transition-all"
          >

            <div>

              <div className="flex justify-between items-start mb-4">

                <div className="p-2 bg-cyan-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-cyan-500"/>
                </div>

                {store.distance > 0 &&
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                    {store.distance} km
                  </span>
                }

              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {store.name}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {store.address}
              </p>

            </div>

            <div className="space-y-3">

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4"/>
                {store.phone}
              </div>

              <div className="flex gap-2">

                <a
                  href={`https://www.google.com/maps?q=${store.latitud},${store.longitud}`}
                  target="_blank"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-bold transition-colors text-center"
                >
                  Cómo llegar
                </a>

                <button className="p-2 bg-gray-50 hover:bg-gray-100 text-cyan-600 rounded-lg">
                  <Info className="w-5 h-5"/>
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

      {stores.length === 0 && userLocation && (
        <p className="text-center text-gray-500 mt-8">
          No hay sucursales dentro de {MAX_DISTANCE_KM} km de tu ubicación.
        </p>
      )}

    </div>
  );
};