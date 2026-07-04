import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  // On crée ou récupère le stockage nommé "liste-courses"
  const store = getStore("liste-courses");
  
  // On récupère la liste actuelle (vide par défaut si elle n'existe pas)
  const rawData = await store.get("items");
  let items = rawData ? JSON.parse(rawData) : [];

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
        items.push(body.item);
        await store.set("items", JSON.stringify(items));
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
      // Si un index est fourni, on supprime l'article en question
      const index = parseInt(indexParam, 10);
      if (!isNaN(index) && index >= 0 && index < items.length) {
        items.splice(index, 1);
      }
    } else {
      // Si pas d'index, on vide complètement la liste
      items = [];
    }
    
    await store.set("items", JSON.stringify(items));
    return Response.json({ items });
  }

  return new Response("Méthode non autorisée", { status: 405 });
};
