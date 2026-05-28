
import { API_WP } from '/config'
const WP_BASE = API_WP 
/**
 * Transforme un post WordPress brut en objet utilisable dans le template
 */
function mapPost(post) {
  // _embedded contient l'image et les termes de taxonomie (catégories)
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const terms  = post._embedded?.['wp:term']?.[0] ?? []

  // On prend le premier terme de la catégorie native WP
  // Assure-toi que tes catégories WP s'appellent exactement Design / Dev / Couleur / Autre
  const category = terms[0]?.name ?? 'Autre'

  return {
    slug:      post.slug,
    title:     post.title.rendered,
    excerpt:   post.excerpt.rendered,
    content:   post.content.rendered,
    date:      post.date,
    imageUrl:  media?.source_url ?? null,
    category,
  }
}

export async function fetchArticles() {
  // ?_embed : inclut image + catégories en une seule requête
  // per_page=100 : adapte selon ton volume
  const res = await fetch(`${WP_BASE}/posts?_embed&per_page=100`)

  if (!res.ok) throw new Error(`Erreur API WordPress : ${res.status}`)

  const data = await res.json()
  return data.map(mapPost)
}

export async function fetchArticleBySlug(slug) {
  const res = await fetch(`${WP_BASE}/posts?slug=${slug}&_embed`)

  if (!res.ok) throw new Error(`Erreur API WordPress : ${res.status}`)

  const data = await res.json()
  if (!data.length) throw new Error('Article introuvable')

  return mapPost(data[0])
}


export async function fetchCategories() {
  const res = await fetch(`${WP_BASE}/categories`)

  if (!res.ok) throw new Error(`Erreur API WordPress : ${res.status}`)

  const data = await res.json()
  return data
}