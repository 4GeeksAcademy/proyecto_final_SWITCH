import React from 'react';
import '../../styles/martha.css';
import '../../img/LaTertulia.png'

function GroupPage() {
  return (
    <div className="group-page"> 
      <header>
        <h1 className="fw-bold text-48 dark-blue font-nunito">Grupo de Intercambio de Idiomas de Madrid “La Tertulia”</h1>
      </header>
      <div className="main-content">
        <div className="contenedores">          
          <div className="descripcion">
            <h2 className="tipoh2">Descripción:</h2>
            <p className="extradark-grey"> 
              Bienvenidos a nuestras tardes de intercambio!.
              ¡Aquí podrás conocer gente nueva para practicar tu inglés, español o cualquier otro idioma que encuentres en nuestro bar! 
              El inglés y el español son los idiomas principales, pero si tienes o quieres otro idioma, no dudes en venir, ¡nunca sabes a quién conocerás!.
              Su anfitriona es Stefanie, dueña del bar y profesora de inglés, además de productora y presentadora de televisión en Irlanda del Norte. 
              ¡Ven a conversar de forma natural divertida y aprende gramática o practica tu pronunciación! ¡Conocerás gente nueva de diferentes culturas! ¡Te esperamos!
            </p>
          </div>

          <div className="organizador">
            <h2 className="tipoh2">Organizador:</h2>
            <p className="extradark-grey">Stefanie Houston</p>
          </div>

          <div className="miembros">
            <h2 className="tipoh2">Miembros:</h2>
            <p className="extradark-grey">Lista de miembros o información relevante.</p>
          </div>

          <div className="eventos"> 
            <h2 className="tipoh2">Eventos:</h2>
            <p className="extradark-grey">Información sobre próximos eventos.</p>
          </div>
          
        </div>
        <div className="imagen-lateral">
          <img src="LaTertulia.png" alt="Imagen del Group Page" />
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
