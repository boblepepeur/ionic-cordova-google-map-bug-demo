
export type IRouteEvent = {
    type: IRouteEventType;
    message: string;
    data: any;
};

export type ICurrentCarData = {
    position: Position,
    engineStatus: number, // 1 engine start, 0 engine off
    odometer: number // in meter
};

export enum IRouteEventType {
    InjectionStarted = 'injection.started',
    InjectionStopped = 'injection.stopped',
    EngineStatusON = 'engine.status.1',
    EngineStatusOFF = 'engine.status.0',
    PositionSent = 'position.sent',
    PositionNew = 'position.new',
    RoutePositionSent = 'routePosition.sent'
}
