import App from "./infra/App";
import EnvironmentConfig from "./infra/config/Environment.config";

const app = new App(new EnvironmentConfig());

app.start();