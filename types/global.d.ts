declare namespace Foli {
  interface Stop {
    [key: string]: { stop_name: string };
  }
  interface Stops {
    stop_arr: Stop[];
  }
}

interface Message {
  message: string;
}
