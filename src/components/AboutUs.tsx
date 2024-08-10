import React from "react";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container text-center">
      <h1 className="hero-title mb-5">¿Qué es PetWatch?</h1>
      <p>
        Petwatch es una aplicación diseñada para brindarle tranquilidad a dueños
        de perros al permitirles rastrear la ubicación de sus mascotas en tiempo
        real. Petwatch es creada para quienes deseamos mantener a nuestras
        mascotas seguras y bajo vigilancia constante, ofreciendo una solución
        confiable y fácil de usar para el rastreo y la protección de nuestros
        amigos peludos. Si tu mascota esta lejos de ti por que fue a colegio,
        guarderia, esta en la veterinaria o en hotel por que tuviste que viajar
        , puedes quedarte tranquilo y utilizar PetWatch para saber que tu
        mascota permanece en una zona segura y también puedes saber si esta en
        movimiento o permanece mucho tiempo quieto (encerrado). Con PetWatch,
        puedes monitorear la ubicación de tu perro desde cualquier lugar,
        gracias a un sistema de rastreo preciso y confiable. Recibe también
        notificaciones o alertas de movimientos inusuales.
      </p>
    </div>
  );
};

export default AboutUs;
