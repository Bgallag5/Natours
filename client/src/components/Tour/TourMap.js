import React from 'react';

export default function TourMap() {
  return (
    <section className="section-map">
    <div
      id="map"
      data-locations='[{"type":"Point","coordinates":[-116.214531,51.417611],"_id":"5c88fa8cf4afda39709c2954","description":"Banff National Park"},{"type":"Point","coordinates":[-118.076152,52.875223],"_id":"5c88fa8cf4afda39709c2953","description":"Jasper National Park"},{"type":"Point","coordinates":[-117.490309,51.261937],"_id":"5c88fa8cf4afda39709c2952","description":"Glacier National Park of Canada"}]'
      className="mapboxgl-map"
    >
      <div className="mapboxgl-canary" style={{}}></div>
      <div
        className="
          mapboxgl-canvas-container
          mapboxgl-interactive
          mapboxgl-touch-drag-pan
          mapboxgl-touch-zoom-rotate
        "
      >
        <canvas
          className="mapboxgl-canvas"
          tabIndex="0"
          aria-label="Map"
          role="region"
          width="1728"
          height="1300"
          style={{width: "864px", height: "650px"}}
        ></canvas>
        <div
          className="marker mapboxgl-marker mapboxgl-marker-anchor-bottom"
          style={{transform: "translate(-50%, -100%) translate(538px, 472px)rotateX(0deg) rotateZ(0deg)"}}
        ></div>
        <div
          className="marker mapboxgl-marker mapboxgl-marker-anchor-bottom"
          style={{transform: "translate(-50%, -100%) translate(326px, 200px)rotateX(0deg) rotateZ(0deg)"}}
        ></div>
        <div
          className="marker mapboxgl-marker mapboxgl-marker-anchor-bottom"
          style={{transform: "translate(-50%, -100%) translate(393px, 500px)rotateX(0deg) rotateZ(0deg)"}}
        ></div>
      </div>
      <div className="mapboxgl-control-container">
        <div className="mapboxgl-ctrl-top-left"></div>
        <div className="mapboxgl-ctrl-top-right"></div>
        <div className="mapboxgl-ctrl-bottom-left">
          <div className="mapboxgl-ctrl" style={{display: "block"}}>
            <a
              className="mapboxgl-ctrl-logo"
              target="_blank"
              rel="noopener nofollow"
              href="https://www.mapbox.com/"
              aria-label="Mapbox logo"
              rel='noreferrer'
            ></a>
          </div>
        </div>
        <div className="mapboxgl-ctrl-bottom-right">
          <div className="mapboxgl-ctrl mapboxgl-ctrl-attrib">
            <button
              className="mapboxgl-ctrl-attrib-button"
              title="Toggle attribution"
              aria-label="Toggle attribution"
            ></button>
            <div className="mapboxgl-ctrl-attrib-inner" role="list">
              <a
                href="https://www.mapbox.com/about/maps/"
                target="_blank"
                title="Mapbox"
                aria-label="Mapbox"
                role="listitem"
                >© Mapbox</a
              >
              <a
                href="https://www.openstreetmap.org/about/"
                target="_blank"
                title="OpenStreetMap"
                aria-label="OpenStreetMap"
                role="listitem"
                >© OpenStreetMap</a
              >
              <a
                className="mapbox-improve-map"
                href="https://apps.mapbox.com/feedback/?owner=nachiketa-dhal&amp;id=ckjxvq1nu26io17moxyww3acv&amp;access_token=pk.eyJ1IjoibmFjaGlrZXRhLWRoYWwiLCJhIjoiY2tqeHY3YnM3MDQxaTJwbXE1czVuYTJ3YyJ9.RrYbOpBmYzvacTxj-iIBBw"
                target="_blank"
                title="Map feedback"
                aria-label="Map feedback"
                role="listitem"
                rel="noopener nofollow"
                >Improve this map</a
              >
            </div>
          </div>
        </div>
      </div>
      <div
        className="mapboxgl-popup mapboxgl-popup-anchor-bottom"
        style={{maxWidth: "240px", transform: "translate(-50%, -100%) translate(538px, 442px)"}}
      >
        <div className="mapboxgl-popup-tip"></div>
        <div className="mapboxgl-popup-content">
          <p>Day undefined: Banff National Park</p>
          <button
            className="mapboxgl-popup-close-button"
            type="button"
            aria-label="Close popup"
          >
            ×
          </button>
        </div>
      </div>
      <div
        className="mapboxgl-popup mapboxgl-popup-anchor-bottom"
        style={{maxWidth: "240px", transform: "translate(-50%, -100%) translate(326px, 170px)"}}
      >
        <div className="mapboxgl-popup-tip"></div>
        <div className="mapboxgl-popup-content">
          <p>Day undefined: Jasper National Park</p>
          <button
            className="mapboxgl-popup-close-button"
            type="button"
            aria-label="Close popup"
          >
            ×
          </button>
        </div>
      </div>
      <div
        className="mapboxgl-popup mapboxgl-popup-anchor-bottom"
        style={{maxWidth: "240px", transform: "translate(-50%, -100%) translate(393px, 470px)"}}
          >
        <div className="mapboxgl-popup-tip"></div>
        <div className="mapboxgl-popup-content">
          <p>Day undefined: Glacier National Park of Canada</p>
          <button
            className="mapboxgl-popup-close-button"
            type="button"
            aria-label="Close popup"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </section>
  );
}
