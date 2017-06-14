/* eslint jsx-a11y/href-no-hash: "off" */

import React, { Component } from 'react';

class About extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <div className="about">
          <div className="container-fluid">
            <div className="header">
              <h1 className="header-title">A propos</h1>
            </div>
          </div>
          <div className="container-fluid">
            <div className="explain">
              <div className="explain-content">
                <h1 className="explain-content-title">Nous, WorkEat</h1>
                <hr className="divider" />
                <p className="explain-content-text">Chez WorkEat nous vous proposons chaques jours une large gamme de mets livrés à proximité de votre entreprise. Cela vous permet de déguster le meilleur de la gastronomie tout en restant au travail.</p>
              </div>
              <div className="explain-image explain-image--concept" />
            </div>
          </div>
          <div className="container-fluid">
            <div className="explain">
              <div className="explain-image explain-image--produits" />
              <div className="explain-content">
                <h1 className="explain-content-title">Des produits de qualité</h1>
                <hr className="divider" />
                <p className="explain-content-text">Nos produits sont soigneusement sélectionnés par nos experts afin de vous proposer des mets de qualités. Nos produits sont achetés au près de producteurs locaux afin de favoriser l'économie local et réduire notre impact environnemental. </p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="explain">
              <div className="explain-content">
                <h1 className="explain-content-title">Gastronomique et économique</h1>
                <hr className="divider" />
                <p className="explain-content-text">Nous selectionons nos produits en fonction de leurs qualités gustatives tout en essayant de maintenir nos prix les plus abordable possible.</p>
              </div>
              <div className="explain-image explain-image--gastronomie" />
            </div>
          </div>
          <div className="container-fluid">
            <div className="explain">
              <div className="explain-image explain-image--livraison" />
              <div className="explain-content">
                <h1 className="explain-content-title">Livré où vous voulez</h1>
                <hr className="divider" />
                <p className="explain-content-text">L'ensemble de nos plats sont livrés au point de livraison de votre choix afin d'en profiter où vous le voulez. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
