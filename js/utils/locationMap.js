import { ContactInformation } from "../Data/userId.js";

export default async function callMapLocation() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ'
    const map = new mapboxgl.Map({

        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.56394774481696,-33.40761357832481],
        // projection: 'globe',
        zoom:15,
    });
    
    let data = ContactInformation.map;
    
    const promiseMap = new Promise(
        (resolve)=>{
        data.map(data => {

                if(data.LngLat === null )return;

                const LngLat= data.LngLat.replace('{','').replace('}','').replace(',', '').replace('Lat', "").split(':');


                const propiedad = [parseFloat(LngLat[1]) , parseFloat(LngLat[2])];

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <span>${data.title}</span>`)

                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';


                new mapboxgl.Marker({
                    color: '#000',
                    scale: .8
                })
                    .setLngLat(propiedad)
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);
            })
            resolve()
        }
    )
    promiseMap.then(()=>{

        map.on('load', function () {
            map.resize();
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style

        });
    })


}


