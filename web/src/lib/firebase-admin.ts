import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert("../web/src/firebase-admin-key.json"),
  });
}

export const adminDb = getFirestore();
