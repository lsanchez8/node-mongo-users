import * as express from "express";
import ApiRouter from "./api";
let router = express.Router({ mergeParams: true });

router.use("/api/v1", ApiRouter.Router);
router.use("/api", ApiRouter.Router);

export let DefaultRouter = router;

