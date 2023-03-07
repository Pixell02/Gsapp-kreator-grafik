const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.getCreationDate = functions.https.onCall(async (data, context) => {
  const userId = data.userId;

  try {
    const userRecord = await admin.auth().getUser(userId);
    const creationTime = userRecord.metadata.creationTime;

    return { creationTime };
  } catch (error) {
    console.log(error);
    return { error: "Could not get user data" };
  }
});