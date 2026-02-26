const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

const db = admin.firestore();

module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const snap = await db.collection('gestor-legal').doc('datos').get();
      if (snap.exists && snap.data() && snap.data().registros) {
        return res.json({ registros: snap.data().registros });
      }
      return res.json({ registros: [] });
    }

    if (req.method === 'POST') {
      const { registros } = req.body;
      await db.collection('gestor-legal').doc('datos').set({
        registros: registros,
        updated:   Date.now()
      });
      return res.json({ ok: true });
    }

    res.status(405).json({ error: 'Método no permitido' });

  } catch(e) {
    console.error('Error registros:', e.message);
    res.status(500).json({ error: e.message });
  }
};