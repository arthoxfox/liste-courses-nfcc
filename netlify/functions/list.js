import { getStore } from "@netlify/blobs";

// Les 4 listes indépendantes. Chacune est stockée sous sa propre clé,
// donc modifier/vider l'une n'a aucun effet sur les autres.
const STORES = ["lidl", "costco", "grand-frais", "carrefour"];

export default async (req, context) => {
  const url = new URL(req.url);
  const storeId = url.searchParams.get("store");

  if (!STORES.includes(storeId)) {
    return new Response("Magasin inconnu", { status: 400 });
  }

  const blobStore = getStore({ name: "liste-courses" });

  let items = [];
  try {
    const raw = await blobStore.get(storeId, { consistency: "strong" });
    if (raw) items = JSON.parse(raw);
  } catch (e) {
    items = [];
  }

  const method = req.method;

  // Charger la liste de ce magasin
  if (method === "GET") {
    return Response.json({ items });
  }

  // Ajouter un article
  if (method === "POST") {
    try {
      const body = await req.json();
      if (body && body.item && body.item.trim()) {
        items.push(body.item.trim());
        await blobStore.set(storeId, JSON.stringify(items));
      }
      return Response.json({ items });
    } catch (err) {
      return new Response("JSON invalide", { status: 400 });
    }
  }

  // Enregistrer un nouvel ordre (utilisé après un glisser-déposer)
  if (method === "PUT") {
    try {
      const body = await req.json();
      if (Array.isArray(body.items)) {
        items = body.items;
        await blobStore.set(storeId, JSON.stringify(items));
      }
      return Response.json({ items });
    } catch (err) {
      return new Response("JSON invalide", { status: 400 });
    }
  }

  // Supprimer un article précis (?index=N) ou vider toute la liste (sans paramètre)
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

    await blobStore.set(storeId, JSON.stringify(items));
    return Response.json({ items });
  }

  return new Response("Méthode non autorisée", { status: 405 });
};
