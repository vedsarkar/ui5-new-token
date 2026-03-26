import { AXIS_TICK_LABEL_SIZE } from "../../constants";
import { measureText } from "../../helpers";

export const calculateTicksWidth = (ticks: number[]) =>
	ticks.reduce(
		(maxWidth, tick) =>
			Math.max(maxWidth, measureText(String(tick), AXIS_TICK_LABEL_SIZE)),
		0,
	);
