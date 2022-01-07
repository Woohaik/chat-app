import { createLogger } from "winston";

import devLogger from "./development.logger";
import prodLogger from "./production.logger";
import { Environments } from "./../Environments";

export const Logger = createLogger(Environments.__ISPROD__ ? prodLogger : devLogger);

