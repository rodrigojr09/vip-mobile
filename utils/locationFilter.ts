import { getDistance } from "geolib";

export type LocationPoint = {
	latitude: number;
	longitude: number;
	accuracy?: number;
	timestamp: number;
	speed?: number | null;
};

export type FilterOptions = {
	minDistance?: number;
	minAccuracy?: number;
	stopSpeed?: number;
	stopTime?: number;
	throttleTime?: number;
};

export class LocationFilter {
	private lastAccepted: LocationPoint | null = null;
	private lastRaw: LocationPoint | null = null;
	private lastSentTime = 0;
	private stoppedSince: number | null = null;

	private opts: Required<FilterOptions>;

	constructor(options?: FilterOptions) {
		this.opts = {
			minDistance: 5,
			minAccuracy: 30,
			stopSpeed: 0.5,
			stopTime: 30000,
			throttleTime: 5000,
			...options,
		};
	}

	process(point: LocationPoint): LocationPoint | null {
		if (point.accuracy && point.accuracy > this.opts.minAccuracy) {
			return null;
		}

		if (this.lastRaw) {
			point = this.smooth(point, this.lastRaw);
		}
		this.lastRaw = point;

		if (!this.lastAccepted) {
			this.lastAccepted = point;
			this.lastSentTime = Date.now();
			return point;
		}

		const distance = getDistance(this.lastAccepted, point);
		const now = Date.now();
		const speed = point.speed ?? 0;

		if (speed < this.opts.stopSpeed && distance < this.opts.minDistance) {
			if (!this.stoppedSince) {
				this.stoppedSince = now;
			}

			if (now - this.stoppedSince > this.opts.stopTime) {
				return null;
			}
		} else {
			this.stoppedSince = null;
		}

		if (distance < this.opts.minDistance) {
			return null;
		}

		if (now - this.lastSentTime < this.opts.throttleTime) {
			return null;
		}

		this.lastAccepted = point;
		this.lastSentTime = now;
		return point;
	}

	private smooth(current: LocationPoint, last: LocationPoint): LocationPoint {
		const alpha = 0.3;
		return {
			...current,
			latitude: last.latitude + alpha * (current.latitude - last.latitude),
			longitude: last.longitude + alpha * (current.longitude - last.longitude),
		};
	}
}
