import React, { useMemo, useState } from "react";

const ADMIN_WHATSAPP = "2250720191176";

const initialForm = {
  nom: "",
  whatsapp: "",
  email: "",
  ville: "",
  profil: "",
  domaine: "",
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

const steps = [
  { id: 1, title: "Identité", code: "ID", subtitle: "Profil" },
  { id: 2, title: "Niveau IA", code: "IA", subtitle: "Point de départ" },
  { id: 3, title: "Besoins", code: "BT", subtitle: "Priorités" },
  { id: 4, title: "Usage", code: "US", subtitle: "Quotidien" },
  { id: 5, title: "Formation", code: "FO", subtitle: "Format" },
  { id: 6, title: "Résultat", code: "OK", subtitle: "Conseil" },
];

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
};

const tracks = [
  {
    id: "business",
    label: "IA Business & Marketing",
    short: "Vendre mieux avec l’IA",
    color: "from-orange-400 to-amber-500",
    keywords: ["Business", "Marketing / Vente", "Développer mon business", "Mieux vendre mes produits ou services", "Mettre en valeur un produit", "Créer des flyers", "Créer des vidéos publicitaires", "Répondre aux clients", "Trouver des idées de business", "Entrepreneur", "Commerçant"],
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
    keywords: ["Travail", "Travailleur salarié", "Gagner du temps", "Améliorer mon travail actuel", "Automatiser des tâches", "Rédiger des documents", "Générer des emails professionnels", "Organiser mes idées", "Créer un assistant IA"],
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
    keywords: ["Création de contenu", "Créer du contenu", "Créer des images", "Créer des vidéos", "Créer des visuels", "Créer des scripts de vidéo", "Préparer des publications réseaux sociaux", "Canva IA", "CapCut IA", "Leonardo AI", "Runway"],
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
    keywords: ["Études", "Étudiant", "Élève", "Trouver un emploi", "Utiliser l’IA pour les études", "Préparer des présentations", "Résumer des textes", "Apprendre une compétence d’avenir", "Recherche d’emploi"],
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
    keywords: ["Utiliser l’IA avec Excel", "Analyser des données", "Apprendre le codage avec l’IA", "Créer des tableaux Excel", "Faire des analyses", "Codage", "Excel", "Data"],
    modules: ["IA avec Excel", "Analyse de données assistée", "Initiation au code avec IA", "Tableaux automatisés", "Mini-projet data"],
    gains: ["Comprendre plus vite des tableaux et indicateurs", "Créer des formules et analyser des données avec l’IA", "Commencer le codage avec un assistant", "Automatiser certaines tâches Excel", "Produire des analyses plus propres"],
    livrables: ["1 fichier Excel amélioré avec IA", "1 mini-analyse de données", "10 prompts Excel/Data", "1 mini-script assisté par IA"],
    promesse: "Vous utilisez l’IA comme accélérateur d’analyse, pas comme machine à inventer des résultats.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toggleArray(form, setForm, key, value) {
  const current = form[key] || [];
  const exists = current.includes(value);
  setForm({ ...form, [key]: exists ? current.filter((item) => item !== value) : [...current, value] });
}

function clean(value, fallback = "Non renseigné") {
  if (Array.isArray(value)) return value.length ? value.join(", ") : fallback;
  return value || fallback;
}

function computeProfile(form) {
  const bag = [form.profil, form.domaine, form.usage, form.besoinPrincipal, ...form.outils, ...form.blocages, ...form.priorites, ...form.objectifs, ...form.taches].join(" ").toLowerCase();
  const scored = tracks.map((track) => ({ ...track, score: track.keywords.reduce((acc, keyword) => (bag.includes(keyword.toLowerCase()) ? acc + 1 : acc), 0) }));
  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  const second = scored[1];
  const total = scored.reduce((sum, item) => sum + item.score, 0) || 1;
  const confidence = Math.min(98, Math.max(45, Math.round((top.score / total) * 100 + 35)));
  let urgence = "Besoin à structurer";
  if (form.niveauIA === "Débutant complet") urgence = "Commencer par les bases pratiques";
  if (form.priorites.length >= 4 || form.taches.length >= 5) urgence = "Besoin large : parcours complet recommandé";
  if (form.besoinPrincipal.length > 20) urgence = "Besoin clair : formation orientée résultat";
  return { top, second, scored, confidence, urgence };
}

function getPlan(form, profile) {
  const niveau = form.niveauIA || "Niveau non précisé";
  const format = form.format || "Format à confirmer";
  const rythme = form.rythme || "Rythme à confirmer";
  const duree = form.duree || "Durée à confirmer";
  const firstStep = niveau.includes("Débutant") || niveau.includes("Je ne sais pas") ? "Démarrer par une prise en main guidée de ChatGPT et des bons réflexes de prompt." : "Démarrer par des cas pratiques directement liés à votre activité.";
  return {
    firstStep,
    formatLine: `${format} · ${rythme} · séance de ${duree}`,
    targetLine: form.resultatAttendu || profile.top.promesse,
    nextAction: form.contact === "Oui" ? "Votre profil est prêt pour un échange d’orientation." : "Vous pouvez garder ce diagnostic et demander le programme détaillé plus tard.",
  };
}

function buildSummary(form, profile, plan) {
  const lines = [
    "DIAGNOSTIC BESOINS IA",
    "",
    "IDENTITÉ",
    `Nom : ${clean(form.nom)}`,
    `WhatsApp : ${clean(form.whatsapp)}`,
    `Email : ${clean(form.email)}`,
    `Ville : ${clean(form.ville)}`,
    `Profil : ${clean(form.profil)}`,
    `Domaine : ${clean(form.domaine)}`,
    "",
    "NIVEAU ET BLOCAGES",
    `Niveau IA : ${clean(form.niveauIA)}`,
    `Outils connus : ${clean(form.outils)}`,
    `Blocages : ${clean(form.blocages)}`,
    "",
    "BESOINS",
    `Priorités : ${clean(form.priorites)}`,
    `Besoin principal : ${clean(form.besoinPrincipal)}`,
    `Objectifs : ${clean(form.objectifs)}`,
    `Résultat attendu : ${clean(form.resultatAttendu)}`,
    "",
    "USAGE",
    `Usage prévu : ${clean(form.usage)}`,
    `Tâches attendues : ${clean(form.taches)}`,
    "",
    "FORMAT",
    `Format souhaité : ${clean(form.format)}`,
    `Rythme : ${clean(form.rythme)}`,
    `Moment : ${clean(form.moments)}`,
    `Durée : ${clean(form.duree)}`,
    `Budget : ${clean(form.budget)}`,
    `Certificat : ${clean(form.certificat)}`,
    `Souhaite être contacté : ${clean(form.contact)}`,
    "",
    "RECOMMANDATION AUTOMATIQUE",
    `Parcours recommandé : ${profile.top.label}`,
    `Orientation : ${profile.top.short}`,
    `Cohérence du diagnostic : ${profile.confidence}%`,
    `Priorité : ${profile.urgence}`,
    `Première étape conseillée : ${plan.firstStep}`,
    `Format conseillé : ${plan.formatLine}`,
    `Modules conseillés : ${profile.top.modules.join(" | ")}`,
    `Livrables possibles : ${profile.top.livrables.join(" | ")}`,
    "",
    "CE QUE LA PERSONNE PEUT GAGNER",
    ...profile.top.gains.map((gain) => `- ${gain}`),
    "",
    `Remarque : ${clean(form.remarque, "Aucune")}`,
  ];
  return lines.join(String.fromCharCode(10));
}

function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-[48px] rounded-2xl border px-4 py-3 text-left text-[15px] leading-snug transition active:scale-[0.98] sm:text-sm",
        selected ? "border-cyan-400 bg-cyan-400/10 text-cyan-100 shadow-lg shadow-cyan-500/10" : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, children, hint }) {
  return (
    <div className="space-y-2">
      <label className="block text-[15px] font-semibold text-slate-100 sm:text-sm">{label}</label>
      {children}
      {hint && <p className="text-xs leading-relaxed text-slate-400">{hint}</p>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full min-h-[52px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10 sm:text-sm" />;
}

function TextArea({ value, onChange, placeholder }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/10 sm:text-sm" />;
}

function Header({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300 sm:mb-3 sm:tracking-[0.35em]">{eyebrow}</p>
      <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-5xl">{title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:mt-4 sm:text-base">{description}</p>
    </div>
  );
}

function StepIdentity({ form, setForm }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Header eyebrow="Étape 01" title="Commençons par identifier le participant" description="Ces informations permettent de relancer les personnes intéressées et d’analyser les besoins par profil." />
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <Field label="Nom et prénom"><Input value={form.nom} onChange={(v) => setForm({ ...form, nom: v })} placeholder="Ex : Kouamé Jean" /></Field>
        <Field label="Contact WhatsApp"><Input value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} placeholder="Ex : +225 07 00 00 00 00" /></Field>
        <Field label="Adresse email"><Input type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="exemple@email.com" /></Field>
        <Field label="Ville ou commune"><Input value={form.ville} onChange={(v) => setForm({ ...form, ville: v })} placeholder="Ex : Cocody, Yopougon..." /></Field>
      </div>
      <Field label="Profil actuel"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.profils.map((item) => <Chip key={item} selected={form.profil === item} onClick={() => setForm({ ...form, profil: item })}>{item}</Chip>)}</div></Field>
      <Field label="Domaine d’activité ou d’étude"><Input value={form.domaine} onChange={(v) => setForm({ ...form, domaine: v })} placeholder="Commerce, santé, finance, RH..." /></Field>
    </div>
  );
}

function StepLevel({ form, setForm }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Header eyebrow="Étape 02" title="Mesurons le vrai niveau IA" description="Le but n’est pas de faire joli. On cherche le niveau réel pour proposer une formation utile." />
      <Field label="Niveau actuel en intelligence artificielle"><div className="grid gap-3 sm:grid-cols-2">{options.niveauxIA.map((item) => <Chip key={item} selected={form.niveauIA === item} onClick={() => setForm({ ...form, niveauIA: item })}>{item}</Chip>)}</div></Field>
      <Field label="Outils connus ou déjà utilisés"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.outils.map((item) => <Chip key={item} selected={form.outils.includes(item)} onClick={() => toggleArray(form, setForm, "outils", item)}>{item}</Chip>)}</div></Field>
      <Field label="Ce qui bloque le plus aujourd’hui"><div className="grid gap-3 sm:grid-cols-2">{options.blocages.map((item) => <Chip key={item} selected={form.blocages.includes(item)} onClick={() => toggleArray(form, setForm, "blocages", item)}>{item}</Chip>)}</div></Field>
    </div>
  );
}

function StepNeeds({ form, setForm }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Header eyebrow="Étape 03" title="Ce que la personne veut réellement apprendre" description="Ici, on identifie le vrai besoin. C’est cette partie qui permet de construire une formation adaptée." />
      <Field label="Compétences IA souhaitées"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.priorites.map((item) => <Chip key={item} selected={form.priorites.includes(item)} onClick={() => toggleArray(form, setForm, "priorites", item)}>{item}</Chip>)}</div></Field>
      <Field label="Besoin numéro 1"><Input value={form.besoinPrincipal} onChange={(v) => setForm({ ...form, besoinPrincipal: v })} placeholder="Ex : créer des vidéos publicitaires" /></Field>
      <Field label="Pourquoi apprendre l’IA ?"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.objectifs.map((item) => <Chip key={item} selected={form.objectifs.includes(item)} onClick={() => toggleArray(form, setForm, "objectifs", item)}>{item}</Chip>)}</div></Field>
      <Field label="Résultat concret attendu après la formation"><TextArea value={form.resultatAttendu} onChange={(v) => setForm({ ...form, resultatAttendu: v })} placeholder="Ex : créer mes visuels, vidéos et publications sans dépendre de quelqu’un." /></Field>
    </div>
  );
}

function StepUsage({ form, setForm }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Header eyebrow="Étape 04" title="Relions l’IA au quotidien réel" description="Une bonne formation IA doit produire des usages concrets : documents, contenus, ventes, automatisation, apprentissage." />
      <Field label="Cadre principal d’utilisation"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.usages.map((item) => <Chip key={item} selected={form.usage === item} onClick={() => setForm({ ...form, usage: item })}>{item}</Chip>)}</div></Field>
      <Field label="Tâches que la personne aimerait confier à l’IA"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{options.taches.map((item) => <Chip key={item} selected={form.taches.includes(item)} onClick={() => toggleArray(form, setForm, "taches", item)}>{item}</Chip>)}</div></Field>
    </div>
  );
}

function StepTraining({ form, setForm }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Header eyebrow="Étape 05" title="Adaptation du format de formation" description="Ici, on transforme la demande en offre vendable : format, rythme, budget, certificat et disponibilité." />
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8"><Field label="Format préféré"><div className="grid gap-3">{options.formats.map((item) => <Chip key={item} selected={form.format === item} onClick={() => setForm({ ...form, format: item })}>{item}</Chip>)}</div></Field><Field label="Rythme souhaité"><div className="grid gap-3">{options.rythmes.map((item) => <Chip key={item} selected={form.rythme === item} onClick={() => setForm({ ...form, rythme: item })}>{item}</Chip>)}</div></Field></div>
      <Field label="Moments disponibles"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{options.moments.map((item) => <Chip key={item} selected={form.moments.includes(item)} onClick={() => toggleArray(form, setForm, "moments", item)}>{item}</Chip>)}</div></Field>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8"><Field label="Durée idéale d’une séance"><div className="grid gap-3">{options.durees.map((item) => <Chip key={item} selected={form.duree === item} onClick={() => setForm({ ...form, duree: item })}>{item}</Chip>)}</div></Field><Field label="Budget envisageable"><div className="grid gap-3">{options.budgets.map((item) => <Chip key={item} selected={form.budget === item} onClick={() => setForm({ ...form, budget: item })}>{item}</Chip>)}</div></Field></div>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8"><Field label="Intérêt pour certificat + mini-projet final"><div className="grid gap-3">{options.certificats.map((item) => <Chip key={item} selected={form.certificat === item} onClick={() => setForm({ ...form, certificat: item })}>{item}</Chip>)}</div></Field><Field label="Souhaite être contacté ?"><div className="grid gap-3">{options.contacts.map((item) => <Chip key={item} selected={form.contact === item} onClick={() => setForm({ ...form, contact: item })}>{item}</Chip>)}</div></Field></div>
      <Field label="Remarque ou attente particulière"><TextArea value={form.remarque} onChange={(v) => setForm({ ...form, remarque: v })} placeholder="Ajoutez ici une précision importante." /></Field>
    </div>
  );
}

function ResultStep({ profile, plan, summary, copied, copySummary, sendToWhatsapp }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Header eyebrow="Recommandation personnalisée" title="Voici le parcours IA qui vous correspond" description="Le diagnostic transforme vos réponses en recommandation claire : quoi apprendre, pourquoi le faire, et ce que cela peut changer concrètement." />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl sm:rounded-[2rem] sm:p-6">
        <div className={cn("absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-r opacity-20 blur-3xl", profile.top.color)} />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div><div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">Diagnostic IA</div><h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{profile.top.label}</h2><p className="mt-3 text-base font-semibold text-slate-200 sm:text-lg">{profile.top.short}</p><p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:mt-5 sm:text-base">{profile.top.promesse}</p></div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 sm:rounded-[2rem]"><p className="text-sm text-slate-400">Cohérence du diagnostic</p><div className="mt-2 flex items-end gap-2"><span className="text-4xl font-black text-white sm:text-5xl">{profile.confidence}%</span><span className="pb-1 text-xs text-slate-400 sm:pb-2 sm:text-sm">aligné</span></div><div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10"><div className={cn("h-full rounded-full bg-gradient-to-r", profile.top.color)} style={{ width: `${profile.confidence}%` }} /></div><p className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-sm font-semibold text-cyan-100">{profile.urgence}</p></div>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-3 xl:gap-6"><InfoPanel title="À apprendre en priorité" tone="cyan">{profile.top.modules.map((module, index) => <MiniCard key={module} number={index + 1} text={module} />)}</InfoPanel><InfoPanel title="Ce que vous pouvez gagner" tone="emerald">{profile.top.gains.map((gain) => <GainCard key={gain} text={gain} />)}</InfoPanel><InfoPanel title="Livrables possibles" tone="amber">{profile.top.livrables.map((item) => <DeliverableCard key={item} text={item} />)}</InfoPanel></div>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6"><div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:rounded-[2rem] sm:p-6"><h3 className="text-xl font-black">Plan conseillé</h3><div className="mt-5 space-y-3 sm:space-y-4"><PlanLine label="Première étape" value={plan.firstStep} /><PlanLine label="Format suggéré" value={plan.formatLine} /><PlanLine label="Objectif à viser" value={plan.targetLine} /><PlanLine label="Prochaine action" value={plan.nextAction} /></div></div><div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:rounded-[2rem] sm:p-6"><h3 className="text-xl font-black">Carte des besoins détectés</h3><p className="mt-2 text-sm text-slate-400">Plus le score est élevé, plus le parcours correspond aux réponses.</p><div className="mt-5 space-y-4">{profile.scored.map((track) => { const width = Math.min(100, Math.max(8, track.score * 18)); return <div key={track.id}><div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="font-semibold text-slate-200">{track.label}</span><span className="text-slate-400">{track.score}</span></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className={cn("h-full rounded-full bg-gradient-to-r", track.color)} style={{ width: `${width}%` }} /></div></div>; })}</div></div></div>
      <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 sm:rounded-[2rem] sm:p-6"><div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center"><div><h3 className="text-xl font-black text-emerald-50 sm:text-2xl">Envoyer le diagnostic</h3><p className="mt-2 text-sm leading-relaxed text-emerald-100/90">WhatsApp s’ouvrira avec toutes les réponses déjà préparées. Il suffira d’appuyer sur envoyer.</p></div><button type="button" onClick={sendToWhatsapp} className="min-h-[52px] rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 active:scale-[0.98]">Envoyer sur WhatsApp</button></div></div>
      <div className="grid gap-3 md:grid-cols-2"><button type="button" onClick={copySummary} className="min-h-[52px] rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold text-slate-100 transition hover:bg-white/10 active:scale-[0.98]">{copied ? "Diagnostic copié" : "Copier le diagnostic"}</button><button type="button" onClick={sendToWhatsapp} className="min-h-[52px] rounded-3xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-4 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/20 active:scale-[0.98]">Finaliser et transmettre</button></div>
      <details className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:rounded-[2rem]"><summary className="cursor-pointer text-base font-black sm:text-lg">Voir le résumé complet envoyé</summary><pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-3xl bg-slate-950/70 p-4 text-xs leading-relaxed text-slate-300">{summary}</pre></details>
    </div>
  );
}

function MiniCard({ number, text }) {
  return <div className="mb-3 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15 text-xs font-black text-cyan-200">{number}</span><p className="text-sm font-semibold text-slate-100">{text}</p></div>;
}

function GainCard({ text }) {
  return <div className="mb-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm leading-relaxed text-emerald-50">{text}</div>;
}

function DeliverableCard({ text }) {
  return <div className="mb-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm font-semibold text-amber-50">{text}</div>;
}

function InfoPanel({ title, children, tone }) {
  const styles = { cyan: "border-cyan-400/20 bg-cyan-400/5", emerald: "border-emerald-400/20 bg-emerald-400/5", amber: "border-amber-400/20 bg-amber-400/5" };
  return <div className={cn("rounded-3xl border p-4 sm:rounded-[2rem] sm:p-5", styles[tone])}><h3 className="mb-4 text-lg font-black">{title}</h3>{children}</div>;
}

function PlanLine({ label, value }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"><p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300 sm:text-xs sm:tracking-[0.2em]">{label}</p><p className="mt-2 text-sm leading-relaxed text-slate-200">{value}</p></div>;
}

function MobileStepBar({ step, setStep, progress }) {
  return (
    <div className="lg:hidden">
      <div className="mb-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between text-xs"><span className="font-bold text-slate-300">Étape {step} sur {steps.length}</span><span className="font-black text-cyan-200">{progress}%</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="-mx-4 mb-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2">
          {steps.map((item) => {
            const active = item.id === step;
            const done = item.id < step;
            return <button key={item.id} type="button" onClick={() => setStep(item.id)} className={cn("flex items-center gap-2 rounded-2xl border px-3 py-2 text-left transition active:scale-[0.98]", active ? "border-cyan-400 bg-cyan-400/15" : done ? "border-emerald-400/20 bg-emerald-400/10" : "border-white/10 bg-white/5")}><span className={cn("flex h-8 w-8 items-center justify-center rounded-xl text-[11px] font-black", active ? "bg-cyan-400 text-slate-950" : done ? "bg-emerald-400/20 text-emerald-100" : "bg-white/10 text-slate-300")}>{done ? "OK" : item.code}</span><span><span className="block text-xs font-black text-white">{item.title}</span><span className="block text-[11px] text-slate-400">{item.subtitle}</span></span></button>;
          })}
        </div>
      </div>
    </div>
  );
}

function DesktopSidebar({ step, setStep, progress }) {
  return (
    <aside className="hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl lg:sticky lg:top-6 lg:block lg:h-[calc(100vh-3rem)]">
      <div className="mb-8 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-sm font-black text-cyan-200">IA</div><div><h1 className="text-lg font-black tracking-tight">Diagnostic IA</h1><p className="text-xs text-slate-400">Collecte intelligente des besoins</p></div></div>
      <div className="mb-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4"><div className="mb-3 flex items-center justify-between text-sm"><span className="text-slate-300">Progression</span><span className="font-bold text-cyan-200">{progress}%</span></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div></div>
      <div className="space-y-3">{steps.map((item) => { const active = item.id === step; const done = item.id < step; return <button key={item.id} type="button" onClick={() => setStep(item.id)} className={cn("flex w-full items-center gap-3 rounded-3xl border p-3 text-left transition", active ? "border-cyan-400/50 bg-cyan-400/10" : done ? "border-emerald-400/20 bg-emerald-400/5" : "border-white/10 bg-white/5 hover:bg-white/10")}><div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xs font-black", active ? "bg-cyan-400 text-slate-950" : done ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-slate-300")}>{done ? "OK" : item.code}</div><div><p className="text-sm font-bold">{item.title}</p><p className="text-xs text-slate-400">{item.id === 6 ? "Résultat personnalisé" : "Diagnostic progressif"}</p></div></button>; })}</div>
      <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4"><p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Sortie intelligente</p><p className="mt-2 text-sm text-slate-200">À la fin, le client voit ce qu’il doit apprendre, pourquoi, et ce qu’il peut gagner concrètement.</p></div>
    </aside>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState(false);

  const profile = useMemo(() => computeProfile(form), [form]);
  const plan = useMemo(() => getPlan(form, profile), [form, profile]);
  const summary = useMemo(() => buildSummary(form, profile, plan), [form, profile, plan]);
  const progress = Math.round((step / steps.length) * 100);
  const whatsappLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(summary)}`;

  const next = () => setStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  const sendToWhatsapp = () => window.open(whatsappLink, "_blank", "noopener,noreferrer");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden"><div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" /><div className="absolute right-0 top-24 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-3xl" /><div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" /></div>
      <main className="relative mx-auto grid max-w-7xl gap-5 px-4 py-4 pb-24 sm:gap-6 sm:py-6 lg:grid-cols-[360px_1fr] lg:px-8 lg:pb-6">
        <DesktopSidebar step={step} setStep={setStep} progress={progress} />
        <section className="min-h-[calc(100vh-2rem)] rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:p-8 lg:min-h-[calc(100vh-3rem)]">
          <MobileStepBar step={step} setStep={setStep} progress={progress} />
          {step === 1 && <StepIdentity form={form} setForm={setForm} />}
          {step === 2 && <StepLevel form={form} setForm={setForm} />}
          {step === 3 && <StepNeeds form={form} setForm={setForm} />}
          {step === 4 && <StepUsage form={form} setForm={setForm} />}
          {step === 5 && <StepTraining form={form} setForm={setForm} />}
          {step === 6 && <ResultStep profile={profile} plan={plan} summary={summary} copied={copied} copySummary={copySummary} sendToWhatsapp={sendToWhatsapp} />}
          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/90 p-3 backdrop-blur-xl sm:static sm:mt-10 sm:border-t sm:bg-transparent sm:p-0 sm:pt-5 sm:backdrop-blur-0">
            <div className="mx-auto flex max-w-7xl gap-3 sm:items-center sm:justify-between">
              <button type="button" onClick={prev} disabled={step === 1} className="min-h-[50px] flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none">Retour</button>
              {step < steps.length ? <button type="button" onClick={next} className="min-h-[50px] flex-1 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300 active:scale-[0.98] sm:flex-none">Continuer</button> : <button type="button" onClick={sendToWhatsapp} className="min-h-[50px] flex-[1.4] rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 active:scale-[0.98] sm:flex-none">Envoyer WhatsApp</button>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
