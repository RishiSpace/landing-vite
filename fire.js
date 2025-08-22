import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
    appId: import.meta.env.VITE_APPID
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);

  async function logVisitorInfo() {
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const locationRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationRes.json();

      const visitorRef = ref(db, 'visitors');
      const newVisitor = push(visitorRef);
      
      await set(newVisitor, {
        ip,
        city: locationData.city,
        region: locationData.region,
        country: locationData.country_name,
        org: locationData.org,
        timestamp: new Date().toISOString()
      });

      console.log("VL: 1");
    } catch (err) {
      console.error("VL err: ", err);
    }
  }

  logVisitorInfo();