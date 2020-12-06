//
//  deserializable.model.ts
//  ProvaThermo
//
//  Created by David Kieffer on 16.10.20.
//  Copyright © 2020 Provatis. All rights reserved.
//

export interface Deserializable {
    deserialize(input: any): this;
}
