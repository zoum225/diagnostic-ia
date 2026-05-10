import React, { useMemo, useRef, useState } from "react";

const ADMIN_WHATSAPP = "2250720191176";

const initialForm = {
  nom: "",
  whatsapp: "",
  email: "",
  ville: "",
  profil: "",
  metier: "",
  domaine: "",
  problemeTravail: "",
  niveauIA: "",
  outils: [],
  blocages: [],
  priorites: [],
  besoinPrincipal: "",
  objectifs: [],
  resultatAttendu: "",
  usage: "",
  taches: [],
  format: "",
  rythme: "",
  moments: [],
  duree: "",
  budget: "",
  certificat: "",
  contact: "",
  remarque: "",
};

const options = {
  profils: ["Élève", "Étudiant", "Travailleur salarié", "Entrepreneur", "Commerçant", "Dirigeant / Responsable", "Enseignant / Formateur", "Professionnel indépendant", "Parent", "Autre"],
  niveauxIA: ["Débutant complet", "Débutant avec quelques notions", "Niveau intermédiaire", "Niveau avancé", "Je ne sais pas évaluer mon niveau"],
  outils: ["ChatGPT", "Gemini", "Copilot", "Canva IA", "CapCut IA", "Gamma", "Perplexity", "Leonardo AI", "Runway", "Notion AI", "Aucun"],
  blocages: ["Je ne sais pas quoi demander à l’IA", "Je ne sais pas écrire de bons prompts", "Je ne sais pas vérifier les réponses", "Je ne connais pas les bons outils", "Je ne sais pas utiliser l’IA dans mon travail", "Je manque de pratique", "Je veux des cas concrets"],
  priorites: ["Bien utiliser ChatGPT", "Rédiger des textes professionnels", "Créer des présentations", "Créer des images", "Créer des vidéos publicitaires", "Créer des flyers", "Mettre en valeur un produit", "Créer un assistant IA", "Automatiser des tâches", "Utiliser l’IA avec Excel", "Analyser des données", "Apprendre le codage avec l’IA", "Utiliser l’IA pour le marketing", "Utiliser l’IA pour les études"],
  objectifs: ["Gagner du temps", "Trouver un emploi", "Améliorer mon travail actuel", "Développer mon business", "Créer du contenu", "Mieux vendre mes produits ou services", "Accompagner mes enfants", "Apprendre une compétence d’avenir", "Me reconvertir"],
  usages: ["Études", "Travail", "Business", "Création de contenu", "Marketing / Vente", "Gestion administrative", "Enseignement / Formation", "Recherche d’emploi", "Projet personnel"],
  taches: ["Rédiger des documents", "Résumer des textes", "Préparer des cours", "Préparer des présentations", "Créer des visuels", "Créer des vidéos", "Répondre aux clients", "Organiser mes idées", "Faire des analyses", "Créer des tableaux Excel", "Trouver des idées de business", "Préparer des publications réseaux sociaux", "Créer des scripts de vidéo", "Générer des emails professionnels"],
  formats: ["En ligne", "Présentiel", "Hybride", "Peu importe si c’est pratique"],
  rythmes: ["1 séance par semaine", "2 séances par semaine", "3 séances par semaine", "Formation intensive", "Sur 1 mois", "Sur 2 mois"],
  moments: ["Matin", "Après-midi", "Soir", "Samedi", "Dimanche", "En semaine", "Pendant les vacances"],
  durees: ["30 minutes", "1 heure", "1h30", "2 heures", "Plus de 2 heures"],
  budgets: ["Moins de 25 000 FCFA", "25 000 à 50 000 FCFA", "50 000 à 100 000 FCFA", "100 000 à 150 000 FCFA", "Plus de 150 000 FCFA", "Je veux d’abord connaître le programme"],
  certificats: ["Oui, absolument", "Oui, si le contenu est pratique", "Peut-être", "Non, pas forcément"],
  contacts: ["Oui", "Non", "Peut-être plus tard"],
  problemTags: ["Je perds trop de temps", "Je manque d’idées", "Je communique mal", "Je vends difficilement", "Je gère mal mes documents", "Je ne sais pas analyser mes données", "Je veux créer du contenu", "Je veux automatiser", "Je veux mieux apprendre", "Je veux améliorer mon service client"],
};

const tracks = [
  {
    id: "business",
    label: "IA Business & Marketing",
    short: "Vendre mieux avec l’IA",
    color: "from-orange-400 to-amber-500",
    keywords: ["business", "marketing", "vente", "vendre", "client", "produit", "commerce", "commerçant", "entrepreneur", "prospect", "publicité", "flyer", "vidéo", "réseaux sociaux", "whatsapp", "boutique"],
    modules: ["Prompting commercial", "Création de contenus de vente", "Flyers & visuels IA", "Vidéos publicitaires IA", "Assistant IA client/prospect"],
    gains: ["Créer des visuels et messages commerciaux sans dépendre d’un graphiste", "Présenter ses produits de façon plus professionnelle", "Produire plus vite des contenus pour WhatsApp, Facebook, TikTok ou Instagram", "Gagner en crédibilité face aux clients", "Structurer une communication qui vend au lieu de publier au hasard"],
    livrables: ["3 visuels commerciaux", "1 script vidéo publicitaire", "1 mini-assistant IA de vente", "1 plan de contenu sur 7 jours"],
    promesse: "Vous repartez avec des supports commerciaux prêts à utiliser, pas avec une théorie floue.",
  },
  {
    id: "productivite",
    label: "IA Productivité professionnelle",
    short: "Travailler plus vite et mieux",
    color: "from-cyan-400 to-blue-500",
    keywords: ["travail", "salarié", "rapport", "email", "compte rendu", "administration", "bureau", "documents", "organisation", "réunion", "manager", "rh", "secrétaire", "assistant", "direction"],
    modules: ["ChatGPT au travail", "Rédaction professionnelle", "Emails & comptes rendus", "Automatisation légère", "Assistant IA personnel"],
    gains: ["Rédiger plus rapidement des documents professionnels", "Gagner du temps sur les emails, comptes rendus et rapports", "Mieux organiser ses tâches", "Réduire les blocages devant une page blanche", "Créer un assistant IA personnel pour les tâches répétitives"],
    livrables: ["1 assistant IA personnel", "5 modèles de prompts professionnels", "1 modèle de compte rendu", "1 workflow de productivité"],
    promesse: "Vous transformez l’IA en assistant de travail, pas en gadget de curiosité.",
  },
  {
    id: "creation",
    label: "IA Créative & contenu digital",
    short: "Créer du contenu qui attire",
    color: "from-fuchsia-400 to-violet-600",
    keywords: ["contenu", "création", "image", "vidéo", "visuel", "montage", "designer", "communication", "community", "réseaux", "canva", "capcut", "leonardo", "runway", "poster", "affiche"],
    modules: ["Images IA", "Scripts vidéo", "Montage avec IA", "Posts réseaux sociaux", "Storytelling visuel"],
    gains: ["Créer des images plus belles et cohérentes", "Produire des scripts vidéo plus captivants", "Gagner du temps dans la création de contenus", "Améliorer l’apparence de sa marque", "Passer de simples idées à des contenus prêts à publier"],
    livrables: ["5 prompts visuels", "2 concepts vidéo", "1 mini-calendrier éditorial", "3 publications prêtes à publier"],
    promesse: "Vous apprenez à créer du contenu avec une vraie direction visuelle.",
  },
  {
    id: "etudes",
    label: "IA pour études & apprentissage",
    short: "Apprendre avec méthode",
    color: "from-emerald-400 to-teal-500",
    keywords: ["études", "étudiant", "élève", "école", "université", "cours", "exposé", "mémoire", "formation", "apprendre", "cv", "emploi", "recherche"],
    modules: ["Recherche intelligente", "Exposés & présentations", "Résumés efficaces", "CV & lettres", "Méthode d’apprentissage avec IA"],
    gains: ["Mieux comprendre les cours difficiles", "Préparer des exposés plus structurés", "Utiliser l’IA sans copier bêtement", "Gagner du temps dans les recherches", "Construire un profil plus sérieux pour les études ou l’emploi"],
    livrables: ["1 méthode de recherche IA", "1 exposé structuré", "1 CV amélioré", "1 plan d’apprentissage personnel"],
    promesse: "L’objectif est d’utiliser l’IA pour apprendre mieux, pas pour devenir paresseux.",
  },
  {
    id: "data",
    label: "IA Data, Excel & Codage",
    short: "Analyser et automatiser",
    color: "from-slate-500 to-slate-800",
    keywords: ["excel", "données", "data", "tableau", "analyse", "statistique", "bi", "power bi", "code", "codage", "python", "automatiser", "reporting", "indicateur"],
    modules: ["IA avec Excel", "Analyse de données assistée", "Initiation au code avec IA", "Tableaux automatisés", "Mini-projet data"],
    gains: ["Comprendre plus vite des tableaux et indicateurs", "Créer des formules et analyser des données avec l’IA", "Commencer le codage avec un assistant", "Automatiser certaines tâches Excel", "Produire des analyses plus propres"],
    livrables: ["1 fichier Excel amélioré avec IA", "1 mini-analyse de données", "10 prompts Excel/Data", "1 mini-script assisté par IA"],
    promesse: "Vous utilisez l’IA comme accélérateur d’analyse, pas comme machine à inventer des résultats.",
  },
];

const jobUseCases = [
  { match: ["enseignant", "formateur", "professeur", "éducation", "ecole"], title: "Enseignement & formation", intro: "L’IA peut vous aider à préparer des cours plus vite, créer des exercices, corriger des copies et personnaliser l’apprentissage.", uses: ["Créer des fiches de cours adaptées au niveau des apprenants", "Générer des exercices et corrigés détaillés", "Préparer des supports PowerPoint plus professionnels", "Transformer un cours long en résumé clair"] },
  { match: ["commerçant", "commerce", "boutique", "vendeur", "entrepreneur", "business", "restauration", "maquis", "restaurant"], title: "Commerce, vente & entrepreneuriat", intro: "L’IA peut vous aider à mieux présenter vos produits, écrire des messages qui vendent et créer des visuels publicitaires sans perdre du temps.", uses: ["Créer des descriptions de produits plus convaincantes", "Produire des flyers et vidéos publicitaires", "Répondre plus vite aux clients", "Préparer un calendrier de publications pour vendre régulièrement"] },
  { match: ["rh", "ressources humaines", "recrutement", "administration", "assistant", "secrétaire"], title: "Administration & ressources humaines", intro: "L’IA peut réduire fortement le temps passé sur les documents, les comptes rendus, les emails et les procédures internes.", uses: ["Rédiger des emails professionnels plus vite", "Préparer des fiches de poste et annonces de recrutement", "Synthétiser des réunions", "Créer des modèles de documents administratifs"] },
  { match: ["finance", "comptable", "banque", "gestion", "audit", "contrôle"], title: "Finance, comptabilité & gestion", intro: "L’IA peut aider à expliquer les chiffres, préparer des synthèses, détecter des anomalies et automatiser une partie du reporting.", uses: ["Résumer des tableaux financiers", "Préparer des commentaires de gestion", "Créer des formules Excel", "Identifier des incohérences dans les données"] },
  { match: ["santé", "médecin", "infirmier", "pharmacie", "ong", "social", "projet"], title: "Santé, ONG & projets sociaux", intro: "L’IA peut soutenir la rédaction de rapports, la collecte d’informations, l’analyse de données et la communication autour des projets.", uses: ["Rédiger des rapports d’activité", "Analyser des données de terrain", "Préparer des questionnaires", "Résumer des documents techniques"] },
  { match: ["communication", "marketing", "community", "graphiste", "créateur", "influenceur"], title: "Communication & contenu digital", intro: "L’IA peut vous aider à trouver des idées, produire des visuels, écrire des scripts et publier plus régulièrement.", uses: ["Créer des posts LinkedIn/Facebook/TikTok", "Générer des scripts vidéo", "Concevoir des visuels publicitaires", "Construire une ligne éditoriale"] },
  { match: ["data", "statistique", "analyste", "informaticien", "développeur", "excel", "power bi"], title: "Data, informatique & reporting", intro: "L’IA peut accélérer l’analyse, expliquer du code, générer des formules, nettoyer des données et produire des tableaux de bord plus vite.", uses: ["Créer des formules Excel avancées", "Comprendre et corriger du code", "Analyser des fichiers de données", "Préparer des tableaux de bord et commentaires"] },
];

const problemSolutions = [
  { match: ["temps", "lent", "retard", "beaucoup", "surcharg", "débord"], problem: "Vous perdez du temps sur des tâches répétitives", solution: "L’IA peut vous aider à automatiser des brouillons, résumer des documents, préparer des modèles et accélérer les tâches récurrentes." },
  { match: ["client", "répondre", "message", "service", "prospect"], problem: "La relation client vous prend trop d’énergie", solution: "L’IA peut préparer des réponses professionnelles, créer des scripts commerciaux, classer les demandes et améliorer votre suivi client." },
  { match: ["vente", "vendre", "chiffre", "produit", "publicité", "marketing"], problem: "Vos ventes ou votre communication ne sont pas assez fortes", solution: "L’IA peut transformer vos produits en contenus plus attractifs : textes de vente, visuels, vidéos, offres et argumentaires." },
  { match: ["document", "rapport", "email", "compte rendu", "courrier", "rédaction"], problem: "Les documents professionnels vous ralentissent", solution: "L’IA peut structurer, corriger, reformuler et améliorer vos rapports, emails, notes, comptes rendus et présentations." },
  { match: ["donnée", "excel", "tableau", "analyse", "chiffre", "reporting"], problem: "Vous avez du mal à exploiter vos données", solution: "L’IA peut vous aider à comprendre vos tableaux, créer des formules, interpréter des indicateurs et préparer des analyses plus propres." },
  { match: ["idée", "contenu", "poster", "vidéo", "image", "publication"], problem: "Vous manquez d’idées ou de contenus réguliers", solution: "L’IA peut générer des idées, scripts, visuels, calendriers éditoriaux et contenus prêts à publier." },
  { match: ["apprendre", "cours", "comprendre", "étude", "exposé", "mémoire"], problem: "Vous voulez apprendre ou expliquer plus efficacement", solution: "L’IA peut simplifier les notions difficiles, créer des plans d’étude, produire des résumés, des quiz et des exemples concrets." },
];

const chatFlow = [
  { key: "nom", type: "text", ask: "Bonjour. Je suis votre conseiller IA. Pour commencer, quel est votre nom et prénom ?", placeholder: "Ex : Kouamé Jean", after: (f) => `Enchanté ${f.nom || "à vous"}. Je vais vous aider à voir comment l’IA peut vous servir concrètement.` },
  { key: "whatsapp", type: "text", ask: "Quel est votre numéro WhatsApp pour recevoir votre diagnostic personnalisé ?", placeholder: "Ex : +225 07 20 19 11 76", after: () => "Merci. À la fin, votre diagnostic pourra être envoyé directement au formateur." },
  { key: "profil", type: "choice", ask: "Votre profil actuel correspond le plus à quelle catégorie ?", choices: options.profils, after: (f) => `Très bien. Votre profil est : ${f.profil}. Maintenant, je veux comprendre votre activité réelle.` },
  { key: "metier", type: "text", ask: "Quel est votre métier, poste ou activité principale ?", placeholder: "Ex : commerçant, enseignant, RH, étudiant, comptable...", after: (f) => `${getJobInsight(f).title} : ${getJobInsight(f).intro}` },
  { key: "problemeTravail", type: "textarea", ask: "Dans votre travail, vos études ou votre activité, quel problème aimeriez-vous résoudre en priorité ?", placeholder: "Ex : je perds du temps à répondre aux clients, je n’arrive pas à créer des visuels, je ne sais pas analyser mes données...", after: (f) => `${getProblemInsight(f).problem}. ${getProblemInsight(f).solution}` },
  { key: "niveauIA", type: "choice", ask: "Aujourd’hui, quel est votre vrai niveau en intelligence artificielle ?", choices: options.niveauxIA, after: (f) => f.niveauIA.includes("Débutant") || f.niveauIA.includes("Je ne sais") ? "C’est justement là qu’une bonne formation peut faire la différence : partir des bases et aller vers des cas pratiques." : "Parfait. On peut donc aller rapidement vers des cas d’usage liés à votre métier." },
  { key: "outils", type: "multi", ask: "Quels outils IA connaissez-vous ou avez-vous déjà utilisés ?", choices: options.outils, after: (f) => `Outils sélectionnés : ${clean(f.outils)}. Le vrai enjeu maintenant, c’est de savoir les utiliser pour produire un résultat utile.` },
  { key: "priorites", type: "multi", ask: "Qu’aimeriez-vous apprendre en priorité avec l’IA ?", choices: options.priorites, after: (f) => `Je vois. Vos priorités indiquent déjà une orientation vers : ${computeProfile(f).top.label}.` },
  { key: "objectifs", type: "multi", ask: "Pourquoi voulez-vous apprendre l’IA ?", choices: options.objectifs, after: () => "C’est clair. Une formation doit donc viser un résultat concret, pas seulement des explications générales." },
  { key: "usage", type: "choice", ask: "Dans quel cadre voulez-vous utiliser l’IA principalement ?", choices: options.usages, after: (f) => `Usage principal : ${f.usage}. Je vais adapter la recommandation finale à ce contexte.` },
  { key: "taches", type: "multi", ask: "Quelles tâches aimeriez-vous confier à l’IA ?", choices: options.taches, after: () => "Ces tâches sont exactement le genre de choses qu’on peut transformer en exercices pratiques pendant la formation." },
  { key: "format", type: "choice", ask: "Quel format de formation préférez-vous ?", choices: options.formats, after: (f) => `Format choisi : ${f.format}. On va maintenant préciser votre disponibilité.` },
  { key: "rythme", type: "choice", ask: "Quel rythme vous convient le mieux ?", choices: options.rythmes, after: (f) => `Rythme retenu : ${f.rythme}.` },
  { key: "budget", type: "choice", ask: "Quel budget seriez-vous prêt à investir dans une formation IA pratique et adaptée à votre besoin ?", choices: options.budgets, after: () => "Merci. Le budget aide à proposer une formation réaliste, adaptée et exploitable." },
  { key: "contact", type: "choice", ask: "Souhaitez-vous être contacté pour recevoir votre programme personnalisé ?", choices: options.contacts, after: () => "Très bien. Je prépare maintenant votre diagnostic complet." },
];

function cn(...classes) { return classes.filter(Boolean).join(" "); }
function normalize(text) { return (text || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
function hasMatch(text, words) { const t = normalize(text); return words.some((word) => t.includes(normalize(word))); }
function clean(value, fallback = "Non renseigné") { if (Array.isArray(value)) return value.length ? value.join(", ") : fallback; return value || fallback; }
function getJobInsight(form) { const source = `${form.metier} ${form.domaine} ${form.profil} ${form.usage}`; return jobUseCases.find((item) => hasMatch(source, item.match)) || { title: "Usage IA personnalisé", intro: "Même si l’utilité de l’IA n’est pas encore claire pour vous, elle peut devenir un outil pratique pour mieux écrire, mieux organiser, mieux chercher, mieux vendre et mieux décider.", uses: ["Clarifier vos idées et vos priorités", "Rédiger des documents plus rapidement", "Créer des contenus ou supports professionnels", "Trouver des solutions concrètes à vos problèmes de travail"] }; }
function getProblemInsight(form) { const source = `${form.problemeTravail} ${form.besoinPrincipal} ${form.blocages.join(" ")} ${form.taches.join(" ")}`; return problemSolutions.find((item) => hasMatch(source, item.match)) || { problem: "Votre besoin mérite d’être clarifié et structuré", solution: "Une bonne formation IA peut vous aider à transformer votre situation actuelle en méthode de travail claire : bons prompts, bons outils, bons cas pratiques et résultats concrets." }; }
function computeProfile(form) { const bag = [form.profil, form.metier, form.domaine, form.usage, form.problemeTravail, form.besoinPrincipal, ...form.outils, ...form.blocages, ...form.priorites, ...form.objectifs, ...form.taches].join(" ").toLowerCase(); const scored = tracks.map((track) => ({ ...track, score: track.keywords.reduce((acc, keyword) => (bag.includes(keyword.toLowerCase()) ? acc + 1 : acc), 0) })); scored.sort((a, b) => b.score - a.score); const top = scored[0]; const second = scored[1]; const total = scored.reduce((sum, item) => sum + item.score, 0) || 1; const confidence = Math.min(98, Math.max(45, Math.round((top.score / total) * 100 + 35))); let urgence = "Besoin à structurer"; if (form.niveauIA === "Débutant complet" || form.niveauIA === "Je ne sais pas évaluer mon niveau") urgence = "Commencer par les bases pratiques"; if (form.priorites.length >= 4 || form.taches.length >= 5) urgence = "Besoin large : parcours complet recommandé"; if (form.problemeTravail.length > 20 || form.besoinPrincipal.length > 20) urgence = "Besoin clair : formation orientée résultat"; return { top, second, scored, confidence, urgence }; }
function getProspectLevel(form) { let score = 0; if (form.whatsapp) score += 2; if (form.problemeTravail.length > 20) score += 3; if (form.priorites.length >= 2) score += 2; if (form.contact === "Oui") score += 3; if (["50 000 à 100 000 FCFA", "100 000 à 150 000 FCFA", "Plus de 150 000 FCFA"].includes(form.budget)) score += 2; if (score >= 9) return { label: "Prospect chaud", color: "text-emerald-200", bg: "bg-emerald-400/10 border-emerald-400/20", action: "À appeler rapidement : la personne a un besoin clair et une intention forte." }; if (score >= 5) return { label: "Prospect tiède", color: "text-amber-200", bg: "bg-amber-400/10 border-amber-400/20", action: "À relancer avec un programme clair et des exemples liés à son métier." }; return { label: "Prospect à éduquer", color: "text-cyan-200", bg: "bg-cyan-400/10 border-cyan-400/20", action: "À nourrir avec une démonstration simple de l’utilité de l’IA dans son domaine." }; }
function getMaturityScore(form) { let score = 10; if (form.niveauIA === "Débutant avec quelques notions") score += 15; if (form.niveauIA === "Niveau intermédiaire") score += 35; if (form.niveauIA === "Niveau avancé") score += 60; if (form.outils.length > 0 && !form.outils.includes("Aucun")) score += Math.min(15, form.outils.length * 3); if (form.priorites.length >= 3) score += 8; if (form.problemeTravail.length > 20) score += 7; return Math.min(100, score); }
function getPlan(form, profile) { const niveau = form.niveauIA || "Niveau non précisé"; const format = form.format || "Format à confirmer"; const rythme = form.rythme || "Rythme à confirmer"; const firstStep = niveau.includes("Débutant") || niveau.includes("Je ne sais pas") ? "Démarrer par une prise en main guidée de ChatGPT et des bons réflexes de prompt." : "Démarrer par des cas pratiques directement liés à votre activité."; return { firstStep, formatLine: `${format} · ${rythme}`, targetLine: form.resultatAttendu || profile.top.promesse, nextAction: "Contactez le formateur pour transformer ce diagnostic en parcours pratique adapté à votre métier." }; }
function buildSummary(form, profile, plan, jobInsight, problemInsight, prospect, maturity) { const lines = ["DIAGNOSTIC BESOINS IA", "", "IDENTITÉ", `Nom : ${clean(form.nom)}`, `WhatsApp : ${clean(form.whatsapp)}`, `Email : ${clean(form.email)}`, `Ville : ${clean(form.ville)}`, `Profil : ${clean(form.profil)}`, `Métier/Poste : ${clean(form.metier)}`, `Domaine : ${clean(form.domaine)}`, "", "PROBLÈME EXPRIMÉ", `Problème : ${clean(form.problemeTravail)}`, "", "NIVEAU ET BESOINS", `Maturité IA : ${maturity}/100`, `Niveau IA : ${clean(form.niveauIA)}`, `Outils connus : ${clean(form.outils)}`, `Priorités : ${clean(form.priorites)}`, `Objectifs : ${clean(form.objectifs)}`, "", "USAGE ET FORMAT", `Usage prévu : ${clean(form.usage)}`, `Tâches attendues : ${clean(form.taches)}`, `Format souhaité : ${clean(form.format)}`, `Rythme : ${clean(form.rythme)}`, `Budget : ${clean(form.budget)}`, `Souhaite être contacté : ${clean(form.contact)}`, "", "RECOMMANDATION AUTOMATIQUE", `Parcours recommandé : ${profile.top.label}`, `Orientation : ${profile.top.short}`, `Cohérence : ${profile.confidence}%`, `Priorité : ${profile.urgence}`,  "", "UTILITÉ DE L’IA DANS SON MÉTIER", `${jobInsight.title} : ${jobInsight.intro}`, ...jobInsight.uses.map((use) => `- ${use}`), "", "PROBLÈME ET SOLUTION IA", `${problemInsight.problem}`, `${problemInsight.solution}`, "", "PLAN CONSEILLÉ", `Première étape : ${plan.firstStep}`, `Format conseillé : ${plan.formatLine}`, `Modules : ${profile.top.modules.join(" | ")}`, `Livrables : ${profile.top.livrables.join(" | ")}`, "", "CE QUE LA PERSONNE PEUT GAGNER", ...profile.top.gains.map((gain) => `- ${gain}`)]; return lines.join(String.fromCharCode(10)); }

function speak(text) { if (!("speechSynthesis" in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "fr-FR"; utterance.rate = 0.95; window.speechSynthesis.speak(utterance); }

function Landing({ onStart }) { return <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white"><Bg /><main className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8"><div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"><section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10"><div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-200">Conseiller IA interactif</div><h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Parlez avec un expert IA et découvrez votre parcours de formation</h1><p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">L’application vous pose les bonnes questions, comprend votre métier, analyse votre problème et vous oriente vers une formation IA réellement utile.</p><div className="mt-7 grid gap-3 sm:grid-cols-3"><ValueCard title="Échange" text="Un diagnostic comme une conversation" /><ValueCard title="Métier" text="Des usages IA liés à votre activité" /><ValueCard title="Action" text="Un programme à recevoir sur WhatsApp" /></div><button type="button" onClick={onStart} className="mt-8 min-h-[56px] w-full rounded-2xl bg-cyan-400 px-6 py-4 text-base font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300 active:scale-[0.98] sm:w-auto">Commencer l’échange</button></section><section className="space-y-4"><LandingPoint title="Plus humain qu’un formulaire" text="Le prospect avance comme dans une discussion avec un conseiller." /><LandingPoint title="Plus convaincant commercialement" text="Il comprend que son problème peut être traité par une bonne formation IA." /><LandingPoint title="Plus fort pour WhatsApp" text="Le message final contient son métier, son problème, son score et son parcours recommandé." /></section></div></main></div>; }
function Bg() { return <div className="pointer-events-none fixed inset-0 overflow-hidden"><div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" /><div className="absolute right-0 top-24 h-[30rem] w-[30rem] rounded-full bg-violet-600/20 blur-3xl" /><div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" /></div>; }
function ValueCard({ title, text }) { return <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm font-black text-cyan-200">{title}</p><p className="mt-1 text-sm leading-relaxed text-slate-300">{text}</p></div>; }
function LandingPoint({ title, text }) { return <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"><p className="font-black text-white">{title}</p><p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p></div>; }
function ChatBubble({ role, text }) {
  const isBot = role === "bot";
  return (
    <div className={cn("flex gap-3", isBot ? "justify-start" : "justify-end")}>
      <div className={cn("max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-lg sm:max-w-[75%]", isBot ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-50" : "border border-white/10 bg-white/10 text-white")}>
        <p>{text}</p>
        {isBot && (
          <button
            type="button"
            onClick={() => speak(text)}
            className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-300/20 bg-slate-950/30 px-3 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-400/10 active:scale-[0.98]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/20 text-[10px]">▶</span>
            Écouter
          </button>
        )}
      </div>
    </div>
  );
}

function ChoiceButton({ selected, children, onClick }) { return <button type="button" onClick={onClick} className={cn("min-h-[48px] rounded-2xl border px-4 py-3 text-left text-sm transition active:scale-[0.98]", selected ? "border-cyan-400 bg-cyan-400/15 text-cyan-100" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10")}>{children}</button>; }

function ChatScreen({ form, setForm, onFinish }) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [multi, setMulti] = useState([]);
  const [messages, setMessages] = useState([{ role: "bot", text: chatFlow[0].ask }]);
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const boxRef = useRef(null);
  const current = chatFlow[index];
  const progress = Math.round(((index + 1) / chatFlow.length) * 100);

  function scrollBottom() {
    setTimeout(() => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" }), 80);
  }

  function startVoiceInput() {
    setVoiceError("");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError("Votre navigateur ne prend pas en charge la réponse vocale. Vous pouvez écrire votre réponse.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      setVoiceError("Je n’ai pas bien capté votre voix. Réessayez ou écrivez simplement votre réponse.");
    };
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setInput((previous) => `${previous ? previous + " " : ""}${transcript}`.trim());
      setVoiceError("");
    };

    recognition.start();
  }

  function pushMessages(userText, updatedForm) {
    const afterText = current.after ? current.after(updatedForm) : "Merci, je continue le diagnostic.";
    const nextIndex = index + 1;
    const nextQuestion = chatFlow[nextIndex]?.ask;
    const nextMessages = [...messages, { role: "user", text: userText }, { role: "bot", text: afterText }];
    if (nextQuestion) nextMessages.push({ role: "bot", text: nextQuestion });
    setMessages(nextMessages);
    scrollBottom();
    if (nextIndex >= chatFlow.length) {
      onFinish(updatedForm);
      return;
    }
    setIndex(nextIndex);
    setInput("");
    setMulti([]);
  }

  function submitText() {
    const value = input.trim();
    if (!value) return;
    const updatedForm = { ...form, [current.key]: value };
    setForm(updatedForm);
    pushMessages(value, updatedForm);
  }

  function submitChoice(value) {
    const updatedForm = { ...form, [current.key]: value };
    setForm(updatedForm);
    pushMessages(value, updatedForm);
  }

  function submitMulti() {
    if (!multi.length) return;
    const updatedForm = { ...form, [current.key]: multi };
    setForm(updatedForm);
    pushMessages(multi.join(", "), updatedForm);
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <Bg />
      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-3 py-3 pb-[16rem] sm:px-6 sm:py-6 sm:pb-6">
        <header className="mb-3 rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl sm:mb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">Conseiller IA</p>
              <h1 className="mt-1 text-lg font-black sm:text-2xl">Diagnostic interactif</h1>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">Mode vocal</p>
              <p className="text-[11px] text-cyan-50">Écouter + répondre</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-400">Question {index + 1} sur {chatFlow.length}</p>
        </header>

        <section ref={boxRef} className="flex-1 space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.06] p-4 pb-8 backdrop-blur-xl sm:min-h-[55vh] sm:p-5">
          {messages.map((message, i) => <ChatBubble key={`${message.role}-${i}`} role={message.role} text={message.text} />)}
        </section>

        <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl sm:static sm:mt-4 sm:rounded-3xl sm:border sm:bg-white/[0.06] sm:p-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">Question actuelle</p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-cyan-50">{current.ask}</p>
            </div>

            {current.type === "text" || current.type === "textarea" ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <textarea
                    rows={current.type === "textarea" ? 3 : 1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={current.placeholder}
                    className="min-h-[52px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 sm:text-sm"
                    onFocus={scrollBottom}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && current.type !== "textarea") {
                        e.preventDefault();
                        submitText();
                      }
                    }}
                  />
                  <button type="button" onClick={submitText} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 active:scale-[0.98]">Envoyer</button>
                </div>

                <button
                  type="button"
                  onClick={startVoiceInput}
                  className={cn("min-h-[48px] w-full rounded-2xl border px-4 py-3 text-sm font-black transition active:scale-[0.98]", listening ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-100" : "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10")}
                >
                  {listening ? "Écoute en cours... parlez maintenant" : "Répondre par vocal"}
                </button>

                {voiceError && <p className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-xs leading-relaxed text-amber-100">{voiceError}</p>}
              </div>
            ) : null}

            {current.type === "choice" ? (
              <div className="grid max-h-[32vh] gap-2 overflow-y-auto pr-1 sm:max-h-[40vh] sm:grid-cols-2">
                {current.choices.map((choice) => <ChoiceButton key={choice} onClick={() => submitChoice(choice)}>{choice}</ChoiceButton>)}
              </div>
            ) : null}

            {current.type === "multi" ? (
              <div className="space-y-3">
                <div className="grid max-h-[30vh] gap-2 overflow-y-auto pr-1 sm:max-h-[36vh] sm:grid-cols-2">
                  {current.choices.map((choice) => {
                    const selected = multi.includes(choice);
                    return <ChoiceButton key={choice} selected={selected} onClick={() => setMulti(selected ? multi.filter((item) => item !== choice) : [...multi, choice])}>{choice}</ChoiceButton>;
                  })}
                </div>
                <button type="button" onClick={submitMulti} className="min-h-[50px] w-full rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 disabled:opacity-40" disabled={!multi.length}>Valider ma sélection</button>
              </div>
            ) : null}
          </div>
        </footer>
      </main>
    </div>
  );
}

function InfoPanel({ title, children, tone }) { const styles = { cyan: "border-cyan-400/20 bg-cyan-400/5", emerald: "border-emerald-400/20 bg-emerald-400/5", amber: "border-amber-400/20 bg-amber-400/5" }; return <div className={cn("rounded-3xl border p-4 sm:rounded-[2rem] sm:p-5", styles[tone])}><h3 className="mb-4 text-lg font-black">{title}</h3>{children}</div>; }
function CardLine({ text }) { return <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-relaxed text-slate-100">{text}</div>; }
function PlanLine({ label, value }) { return <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"><p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300 sm:text-xs sm:tracking-[0.2em]">{label}</p><p className="mt-2 text-sm leading-relaxed text-slate-200">{value}</p></div>; }

function ResultScreen({ form, onRestart }) {
  const [copied, setCopied] = useState(false);
  const profile = useMemo(() => computeProfile(form), [form]);
  const jobInsight = useMemo(() => getJobInsight(form), [form]);
  const problemInsight = useMemo(() => getProblemInsight(form), [form]);
  const prospect = useMemo(() => getProspectLevel(form), [form]);
  const maturity = useMemo(() => getMaturityScore(form), [form]);
  const plan = useMemo(() => getPlan(form, profile), [form, profile]);
  const summary = useMemo(() => buildSummary(form, profile, plan, jobInsight, problemInsight, prospect, maturity), [form, profile, plan, jobInsight, problemInsight, prospect, maturity]);
  const whatsappLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(summary)}`;
  const copySummary = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); } };
  const sendToWhatsapp = () => window.open(whatsappLink, "_blank", "noopener,noreferrer");

  return <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white"><Bg /><main className="relative mx-auto max-w-7xl px-4 py-4 pb-24 sm:px-6 sm:py-6 lg:px-8"><section className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:rounded-[2rem] sm:p-8"><div className="mb-8"><p className="mb-2 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300">Diagnostic final</p><h1 className="text-3xl font-black tracking-tight sm:text-5xl">Votre parcours IA personnalisé</h1><p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">Voici ce que l’IA peut changer dans votre métier, le problème prioritaire à traiter et le parcours de formation recommandé.</p></div><div className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-5 sm:p-6"><div className={cn("absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-r opacity-20 blur-3xl", profile.top.color)} /><div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><div><div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">Parcours recommandé</div><h2 className="text-3xl font-black tracking-tight sm:text-5xl">{profile.top.label}</h2><p className="mt-3 text-lg font-semibold text-slate-200">{profile.top.short}</p><p className="mt-4 text-base leading-relaxed text-slate-300">{profile.top.promesse}</p></div><div className="grid gap-4"><ScoreCard label="Maturité IA" value={`${maturity}/100`} helper="Votre niveau actuel d’usage IA" /><ScoreCard label="Cohérence" value={`${profile.confidence}%`} helper={profile.urgence} /></div></div></div><div className="grid gap-4 lg:grid-cols-2"><InfoPanel title={`IA dans votre métier : ${jobInsight.title}`} tone="cyan"><p className="mb-3 text-sm leading-relaxed text-slate-200">{jobInsight.intro}</p>{jobInsight.uses.map((use) => <CardLine key={use} text={use} />)}</InfoPanel><InfoPanel title="Votre problème → Solution IA" tone="emerald"><p className="mb-3 text-sm font-black text-emerald-100">{problemInsight.problem}</p><CardLine text={problemInsight.solution} /></InfoPanel></div><div className="mt-4 grid gap-4 xl:grid-cols-3"><InfoPanel title="À apprendre en priorité" tone="cyan">{profile.top.modules.map((module, index) => <CardLine key={module} text={`${index + 1}. ${module}`} />)}</InfoPanel><InfoPanel title="Ce que vous pouvez gagner" tone="emerald">{profile.top.gains.map((gain) => <CardLine key={gain} text={gain} />)}</InfoPanel><InfoPanel title="Livrables possibles" tone="amber">{profile.top.livrables.map((item) => <CardLine key={item} text={item} />)}</InfoPanel></div><div className="mt-4 grid gap-4 lg:grid-cols-2"><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><h3 className="text-xl font-black">Plan conseillé</h3><div className="mt-5 space-y-3"><PlanLine label="Première étape" value={plan.firstStep} /><PlanLine label="Format suggéré" value={plan.formatLine} /><PlanLine label="Objectif à viser" value={plan.targetLine} /><PlanLine label="Prochaine action" value={plan.nextAction} /></div></div><div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5"><h3 className="text-xl font-black">Pourquoi agir maintenant ?</h3><p className="mt-3 text-sm leading-relaxed text-slate-100">Votre diagnostic montre que l’IA peut répondre à un besoin concret dans votre activité. Plus vous attendez, plus vous continuez à perdre du temps sur des tâches que vous pourriez apprendre à accélérer avec une bonne méthode.</p><p className="mt-3 text-sm font-bold text-cyan-100">La prochaine étape logique : recevoir un programme adapté à votre métier et à votre problème réel.</p></div></div><div className="mt-4 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5"><div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center"><div><h3 className="text-xl font-black text-emerald-50 sm:text-2xl">Recevoir mon programme personnalisé</h3><p className="mt-2 text-sm leading-relaxed text-emerald-100/90">WhatsApp s’ouvrira avec votre diagnostic déjà préparé. Le formateur pourra ensuite vous proposer une formation adaptée à vos vrais besoins.</p></div><button type="button" onClick={sendToWhatsapp} className="min-h-[52px] rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 active:scale-[0.98]">Recevoir sur WhatsApp</button></div></div><div className="mt-4 grid gap-3 md:grid-cols-3"><button type="button" onClick={copySummary} className="min-h-[52px] rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold text-slate-100 transition hover:bg-white/10 active:scale-[0.98]">{copied ? "Diagnostic copié" : "Copier le diagnostic"}</button><button type="button" onClick={onRestart} className="min-h-[52px] rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold text-slate-100 transition hover:bg-white/10 active:scale-[0.98]">Recommencer</button><button type="button" onClick={sendToWhatsapp} className="min-h-[52px] rounded-3xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-4 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/20 active:scale-[0.98]">Contacter le formateur</button></div><details className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5"><summary className="cursor-pointer text-base font-black sm:text-lg">Voir le résumé complet envoyé</summary><pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-3xl bg-slate-950/70 p-4 text-xs leading-relaxed text-slate-300">{summary}</pre></details></section></main></div>;
}
function ScoreCard({ label, value, helper }) { return <div className="rounded-3xl border border-white/10 bg-white/10 p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-4xl font-black text-white">{value}</p><p className="mt-2 text-sm leading-relaxed text-slate-300">{helper}</p></div>; }

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [form, setForm] = useState(initialForm);
  if (screen === "landing") return <Landing onStart={() => setScreen("chat")} />;
  if (screen === "result") return <ResultScreen form={form} onRestart={() => { setForm(initialForm); setScreen("landing"); }} />;
  return <ChatScreen form={form} setForm={setForm} onFinish={(finalForm) => { setForm(finalForm); setScreen("result"); }} />;
}
