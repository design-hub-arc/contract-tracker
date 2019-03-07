var gcp = false;
if (process.env["GOOGLE_CLOUD_PROJECT"]) gcp = true;
exports.isDeployedOnGCP = () => gcp;
