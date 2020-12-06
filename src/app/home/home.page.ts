import { MapType } from '@angular/compiler';
import { Component } from '@angular/core';
import { CameraPosition, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, HtmlInfoWindow, ILatLng, LatLng, Polyline } from '@ionic-native/google-maps';
import { RoutePosition } from 'src/shared/routePosition.model';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    map: GoogleMap;
    segmentPolyline = new Map<string, RoutePosition[]>();

    ranges: IMeasureRanges = {
        rangeGood: { color: 'green', name: 'rangeGood' },
        rangeIce: { color: 'red', name: 'rangeIce' },
        rangeToMonitor: { color: '#c623f7', name: 'rangeToMonitor' },
        error: { errorRange: [-1000, -1], color: 'black', name: 'error' }
    };

    constructor() { }

    ionViewDidEnter() {
        this.prepare();
    }

    async prepare() {
        const mapOptions: GoogleMapOptions = {
        };

        // init map with styles
        this.map = GoogleMaps.create('map_canvas', mapOptions);
        await this.map.one(GoogleMapsEvent.MAP_READY);

        this.load();
    }

    async load() {
        const routePositions = new Array<RoutePosition>();
        const res = await fetch('../../assets/data.json');
        const segments = await res.json();

        for (const val of Object.entries(segments)) {
            const rangeName = val[0];
            const segRoutePositions = val[1] as RoutePosition[];

            const range = this.ranges[rangeName.split('_')[0]];
            await this.draw(range, segRoutePositions);

            segRoutePositions.forEach(r => {
                routePositions.push(r);
            });
        }

        await this.fitBounds(
            routePositions.map(coord => new LatLng(coord.position.coords.latitude, coord.position.coords.longitude))
        );
    }

    async draw(range: IMeasureRange, routePositions: RoutePosition[]) {
        const points = routePositions.map(coord => new LatLng(coord.position.coords.latitude, coord.position.coords.longitude));
        // draw traject
        await this.map.addPolyline({
            points,
            color: '#a2ddfa',
            width: 8,
            geodesic: false,
            zIndex: 1
        });

        if (!range || range.name === 'rangeGood') { // we dont draw segment for good ground temp
            return;
        }

        // draw range
        const p: Polyline = await this.map.addPolyline({
            points,
            color: range.color,
            width: 5,
            geodesic: false,
            zIndex: 2,
            clickable: true
        });

        this.segmentPolyline.set(p.getId(), routePositions);

        p.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe(data => {
            const position = data[0];
            const polyline = data[1] as Polyline;
            const uid = polyline.getId();

            console.log(polyline, uid, position)

            const segRoutePositions = this.segmentPolyline.get(uid);

            console.log(segRoutePositions.length)

            const popup = new HtmlInfoWindow();
            popup.setContent('yop');

            const marker = this.map.addMarkerSync({ position });
            const obs = this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(() => {
                marker.remove();
                obs.unsubscribe();
            });
            popup.open(marker);
            marker.showInfoWindow();
        });
    }

    async fitBounds(targets: LatLng[]) {
        console.log('MapRoute.fitBounds()');
        const cameraPos: CameraPosition<ILatLng[]> = {
            target: targets,
            zoom: 8
        };
        await this.map.moveCamera(cameraPos);
    }

}
