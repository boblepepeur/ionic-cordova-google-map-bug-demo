//
//  routePosition.model.ts
//  ProvaThermo
//
//  Created by David Kieffer on 16.10.20.
//  Copyright © 2020 Provatis. All rights reserved.
//

import { Deserializable } from './deserializable.model';

export class RoutePosition implements Deserializable {

    position: Position;
    measures: IMeasures;
    odometer: number;

    constructor(position: Position, measures: IMeasures, odometer: number) {
        this.position = position;
        this.measures = measures;
        this.odometer = odometer;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
