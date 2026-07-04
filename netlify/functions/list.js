import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  // Correction ici : on configure correctement le stockage avec un objet
  const store = getStore({ name: "liste-courses" });
  
  // On récupère proprement la liste existante
  let items = [];
  try {
    const rawData = await store.get("items");
    if (rawData) {
      items = JSON.parse(rawData);
    }
  } catch (e) {
    items = [];
  }

  const url = new URL(req.url);
  const method = req.method;

  // 1. Charger la liste (GET)
  if (method === "GET") {
    return Response.json({ items });
  }

  // 2. Ajouter un article (POST)
  if (method === "POST") {
    try {
      const body = await req.json();
      if (body && body.item) {
        items.push(body.item); // On ajoute le nouvel article à la liste existante
        await store.set("items", JSON.stringify(items)); // On sauvegarde l'ensemble
      }
      return Response.json({ items });
    } catch (err) {
      return new Response("JSON invalide", { status: 400 });
    }
  }

  // 3. Supprimer un article ou vider la liste (DELETE)
  if (method === "DELETE") {
    const indexParam = url.searchParams.get("index");
    
    if (indexParam !== null) {
      const index = parseInt(indexParam, 10);
      if (!isNaN(index) && index >= 0 && index < items.length) {
        items.splice(index, 1);
      }
    } else {
      items = [];
    }
    
    await store.set("items", JSON.stringify(items));
    return Response.json({ items });
  }

  return new Response("Méthode non autorisée", { status: 405 });
};
