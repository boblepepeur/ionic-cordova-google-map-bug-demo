//
//  routePosition.model.ts
//  ProvaThermo
//
//  Created by David Kieffer on 20.10.20.
//  Copyright © 2020 Provatis. All rights reserved.
//

/**
 * error code
 * -1 ?
 * -2, no sensor connected
 */

interface IMeasures {

    tAir: number;
    tGround: number;
    dewPoint: number;
    airHumidity: number;

    /** return < 0 is an error code */
    tAirErr: number;
    /** return < 0 is an error code */
    tGroundErr: number;
    /** return < 0 is an error code */
    dewPointErr: number;
    /** return < 0 is an error code */
    airHumidityErr: number;
}
