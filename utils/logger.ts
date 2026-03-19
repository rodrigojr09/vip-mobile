type LogContext = string | undefined;

function formatMessage(scope: LogContext, message: string) {
	if (!scope) return `[VIP] ${message}`;
	return `[VIP][${scope}] ${message}`;
}

function logInfo(scope: LogContext, message: string, data?: unknown) {
	if (data !== undefined) {
		console.log(formatMessage(scope, message), data);
		return;
	}
	console.log(formatMessage(scope, message));
}

function logWarn(scope: LogContext, message: string, data?: unknown) {
	if (data !== undefined) {
		console.warn(formatMessage(scope, message), data);
		return;
	}
	console.warn(formatMessage(scope, message));
}

function logError(scope: LogContext, message: string, data?: unknown) {
	if (data !== undefined) {
		console.error(formatMessage(scope, message), data);
		return;
	}
	console.error(formatMessage(scope, message));
}

function logDebug(scope: LogContext, message: string, data?: unknown) {
	if (!__DEV__) return;
	if (data !== undefined) {
		console.debug(formatMessage(scope, message), data);
		return;
	}
	console.debug(formatMessage(scope, message));
}

export const logger = {
	info: logInfo,
	warn: logWarn,
	error: logError,
	debug: logDebug,
};
