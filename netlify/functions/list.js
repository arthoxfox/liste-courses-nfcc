const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const store = getStore({ name: 'courses', consistency: 'strong' });

  try {
    // Récupérer la liste actuelle
    if (event.httpMethod === 'GET') {
      const items = (await store.get('list', { type: 'json' })) || [];
      return json(200, { items });
    }

    // Ajouter un article
    if (event.httpMethod === 'POST') {
      const { item } = JSON.parse(event.body || '{}');
      if (!item || !item.trim()) {
        return json(400, { error: 'Article vide' });
      }
      const items = (await store.get('list', { type: 'json' })) || [];
      items.push(item.trim());
      await store.setJSON('list', items);
      return json(200, { items });
    }

    // Supprimer un article précis (?index=N) ou vider toute la liste (sans paramètre)
    if (event.httpMethod === 'DELETE') {
      const indexParam = event.queryStringParameters?.index;

      if (indexParam !== undefined) {
        const items = (await store.get('list', { type: 'json' })) || [];
        const i = parseInt(indexParam, 10);
        if (!Number.isNaN(i)) items.splice(i, 1);
        await store.setJSON('list', items);
        return json(200, { items });
      }

      await store.setJSON('list', []);
      return json(200, { items: [] });
    }

    return { statusCode: 405, body: 'Method not allowed' };
  } catch (err) {
    return json(500, { error: err.message });
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
