declare namespace Foli {
  interface Stop {
    [key: string]: { stop_name: string };
  }
  interface Stops {
    stop_arr: Stop[];
  }
  interface StopPrediction {
    sys: string;
    status: string;
    servertime: number;
    result: Result[];
  }

  interface Result {
    recordedattime: number;
    lineref: string;
    dataframeref: string;
    datedvehiclejourneyref: string;
    directionname: string;
    originref: string;
    destinationref: string;
    originaimeddeparturetime: number;
    destinationaimedarrivaltime: number;
    monitored: boolean;
    incongestion: boolean;
    longitude: number;
    latitude: number;
    blockref: string;
    vehicleref: string;
    visitnumber: number;
    vehicleatstop: boolean;
    destinationdisplay: string;
    aimedarrivaltime: number;
    expectedarrivaltime: number;
    aimeddeparturetime: number;
    expecteddeparturetime: number;
    destinationdisplay_sv: string;
    __tripref: string;
    __routeref: string;
    __directionid: string;
  }
}

interface Message {
  message: string;
}
