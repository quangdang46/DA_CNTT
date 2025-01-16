import { checkAuthentication } from "@/shared/middlewares/auth";
import { stackMiddlewares } from "@/shared/middlewares/stackHandler";

const middlewares = [checkAuthentication];
export default stackMiddlewares(middlewares);
