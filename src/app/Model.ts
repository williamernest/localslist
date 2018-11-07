import * as shortId from 'shortid';

class DateObject {
  timestamp: Date;

  constructor() {
    this.timestamp = new Date();
  }
}

class LatLon {
  lat: number;
  lon: number;
}

class Condition extends DateObject {
  type: string;
  order: number;
  valid_start_time: Date;
  valid_end_time: Date;
}

class Point extends DateObject {
  id: string;
  title: string;
  description: string;
  location: LatLon;
  radius = 25;
  conditions: Array<Condition> = [];
  constructor() {
    super();
    this.id = <string>shortId.generate();
  }

}

class Group extends DateObject {
  id: string;
  title = '';
  description = '';
  points: Array<Point> = [];

  constructor() {
    super();
    this.id = <string>shortId.generate();
  }
}

class Config extends DateObject {
  groups: {} = {};
}

export {Config, Group, Point, Condition, LatLon, DateObject};