import * as TaskManager from "expo-task-manager";
import Data from "./API/Data";

export const LOCATION_TASK_NAME = "RASTREIO_LOCATION_TASK";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
	if (error) {
		console.error(error);
		return;
	}
	if (data) {
		Data.sendEvent("Localização atualizada (background)");
	}
});
