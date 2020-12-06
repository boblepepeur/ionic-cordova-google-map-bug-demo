//
//  MeasureRange.model.ts
//  ProvaThermo
//
//  Created by David Kieffer on 16.10.20.
//  Copyright © 2020 Provatis. All rights reserved.
//

interface IMeasureRange {
    range?: Array<number>;
    errorRange?: Array<number>;
    color: string;
    name: string;
}

interface IMeasureRanges {
    rangeGood: IMeasureRange;
    rangeIce: IMeasureRange;
    rangeToMonitor: IMeasureRange;
    error: IMeasureRange;
}
