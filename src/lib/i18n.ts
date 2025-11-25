"use client"

import { useState, useEffect, useCallback } from "react"

export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    newVideo: "New Video",
    allVideos: "All Videos",
    projects: "Projects",
    settings: "Settings",
    videoAgent: "Video Agent",

    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardDescription: "Overview of your video production pipeline",
    totalVideos: "Total Videos",
    pending: "Pending",
    processing: "Processing",
    completed: "Completed",
    recentVideos: "Recent Videos",
    viewAll: "View All",
    noVideosYet: "No videos yet",
    createFirstVideo: "Create your first video",

    // New Video Form
    createNewVideo: "Create New Video",
    createNewVideoDescription: "Configure and submit a new video generation request",
    backToHome: "Back",

    // Base Type Section
    baseType: "Base Type",
    generation: "Full Generation",
    generationDesc: "AI generates everything from script",
    assetsProvided: "Assets Provided",
    assetsProvidedDesc: "Use your own audio/slides",
    improvement: "Improve Existing",
    improvementDesc: "Enhance an existing video",

    // Production Options
    productionOptions: "Production Options",
    motionDesign: "Motion Design",
    motionDesignDesc: "Remotion animations",
    aiSlides: "AI Slides",
    aiSlidesDesc: "Imagen 3 generated slides",
    bRolls: "B-Rolls",
    bRollsDesc: "VEO3 video inserts",
    voiceAI: "AI Voice",
    voiceAIDesc: "Eleven Labs voiceover",
    subtitles: "Subtitles",
    subtitlesDesc: "Creatomate captions",
    longFormat: "Long Format",
    longFormatDesc: "Videos over 10 minutes",

    // Form Fields
    basicInformation: "Basic Information",
    title: "Title",
    titlePlaceholder: "Module 1 - Why Caribbean Now?",
    script: "Script",
    scriptPlaceholder: "Write your video script here...",
    instructions: "Instructions",
    instructionsPlaceholder: "Creative directives: desired tone, key moments for B-rolls, visual style, points of attention...",
    instructionsHelp: "Indicate your creative directives that are not part of the narrative script.",
    duration: "Duration",
    language: "Language",
    voice: "Voice",
    french: "French",
    english: "English",
    female: "Female",
    male: "Male",

    // Upload
    uploadAssets: "Upload Assets",
    uploadAssetsOptional: "Upload Assets (Optional)",
    dropFilesHere: "Drop files here or click to upload",
    audioFiles: "Audio (WAV, MP3)",
    imageFiles: "Images (PNG, JPG)",
    videoFiles: "Video (MP4, MOV)",
    maxFileSize: "Max 500MB per file",
    uploadedFiles: "Uploaded Files",

    // Advanced Options
    advancedOptions: "Advanced Options",
    aspectRatio: "Aspect Ratio",
    landscape: "Landscape",
    portrait: "Portrait",
    square: "Square",
    notificationEmail: "Notification Email",
    route: "Route",
    improvementMode: "Improvement Mode",
    auto: "Auto",
    semiAuto: "Semi-Auto",
    rebuild: "Rebuild",

    // Actions
    cancel: "Cancel",
    generateVideo: "Generate Video",
    submitting: "Submitting...",
    download: "Download",
    downloadVideo: "Download Video",
    delete: "Delete",
    copy: "Copy",
    edit: "Edit",
    save: "Save",
    saveChanges: "Save Changes",

    // Videos List
    allVideosTitle: "All Videos",
    allVideosDescription: "Manage and monitor your video generation pipeline",
    searchVideos: "Search videos...",
    allTypes: "All Types",
    allStatus: "All Status",
    noVideosFound: "No videos found",
    tryAdjustingFilters: "Try adjusting your filters",
    createVideo: "Create Video",

    // Video Detail
    details: "Details",
    created: "Created",
    status: "Status",
    type: "Type",
    errorDetails: "Error Details",
    videoNotFound: "Video not found",
    videoNotFoundDesc: "The video you're looking for doesn't exist or has been deleted.",
    backToVideos: "Back to Videos",
    processingVideo: "Processing your video...",
    processingDesc: "This may take a few minutes",
    waitingInQueue: "Waiting in queue",
    waitingDesc: "Your video will be processed soon",
    generationFailed: "Generation failed",
    previewUnavailable: "Video preview unavailable",

    // Projects
    projectsTitle: "Projects",
    projectsDescription: "Organize your videos into projects",
    newProject: "New Project",
    noProjectsYet: "No projects yet",
    noProjectsDesc: "Projects help you organize related videos together. This feature is coming soon!",
    viewAllVideos: "View All Videos",

    // Settings
    settingsTitle: "Settings",
    settingsDescription: "Configure your dashboard preferences",
    general: "General",
    apiKeys: "API Keys",
    notifications: "Notifications",

    // General Settings
    generalSettings: "General Settings",
    generalSettingsDesc: "Configure default values for video generation",
    defaultLanguage: "Default Language",
    defaultVoice: "Default Voice",
    defaultAspectRatio: "Default Aspect Ratio",
    defaultDuration: "Default Duration",
    dashboardLanguage: "Dashboard Language",
    dashboardLanguageDesc: "Choose the language for the dashboard interface",

    // API Settings
    apiConfiguration: "API Configuration",
    apiConfigurationDesc: "Configure external service connections",
    supabaseUrl: "Supabase URL",
    supabaseAnonKey: "Supabase Anon Key",
    n8nWebhookUrl: "N8N Webhook URL",
    elevenLabsApiKey: "ElevenLabs API Key (Optional)",
    saveApiKeys: "Save API Keys",

    // Notification Settings
    notificationSettings: "Notification Settings",
    notificationSettingsDesc: "Configure how you receive updates about your videos",
    notificationEmailDesc: "Receive email notifications when videos are completed",
    saveNotificationSettings: "Save Notification Settings",

    // Toasts
    videoRequestSubmitted: "Video request submitted!",
    videoBeingProcessed: "Your video is now being processed.",
    error: "Error",
    failedToSubmit: "Failed to submit video request",
    somethingWentWrong: "Something went wrong",
    videoDeleted: "Video deleted",
    videoRemoved: "The video has been removed.",
    failedToDelete: "Failed to delete video.",
    copied: "Copied!",
    scriptCopied: "Script copied to clipboard.",
    videoCompleted: "Video completed!",
    videoReadyToDownload: "Your video is ready to download.",
    apiKeysSaved: "API Keys saved successfully",
    settingsSaved: "Settings saved successfully",

    // Durations
    minute: "minute",
    minutes: "minutes",

    // Misc
    version: "Version",
    videoAgentDashboard: "Video Agent Dashboard",
    justNow: "Just now",
    mAgo: "m ago",
    hAgo: "h ago",
    dAgo: "d ago",
  },
  fr: {
    // Navigation
    dashboard: "Tableau de bord",
    newVideo: "Nouvelle vidéo",
    allVideos: "Toutes les vidéos",
    projects: "Projets",
    settings: "Paramètres",
    videoAgent: "Agent Vidéo",

    // Dashboard
    dashboardTitle: "Tableau de bord",
    dashboardDescription: "Aperçu de votre pipeline de production vidéo",
    totalVideos: "Total vidéos",
    pending: "En attente",
    processing: "En cours",
    completed: "Terminées",
    recentVideos: "Vidéos récentes",
    viewAll: "Voir tout",
    noVideosYet: "Aucune vidéo",
    createFirstVideo: "Créez votre première vidéo",

    // New Video Form
    createNewVideo: "Créer une nouvelle vidéo",
    createNewVideoDescription: "Configurez et soumettez une demande de génération vidéo",
    backToHome: "Retour",

    // Base Type Section
    baseType: "Type de base",
    generation: "Génération complète",
    generationDesc: "L'IA génère tout à partir du script",
    assetsProvided: "Assets fournis",
    assetsProvidedDesc: "Utilisez vos propres audio/slides",
    improvement: "Améliorer existant",
    improvementDesc: "Améliorer une vidéo existante",

    // Production Options
    productionOptions: "Options de production",
    motionDesign: "Motion Design",
    motionDesignDesc: "Animations Remotion",
    aiSlides: "Slides IA",
    aiSlidesDesc: "Slides générés par Imagen 3",
    bRolls: "B-Rolls",
    bRollsDesc: "Inserts vidéo VEO3",
    voiceAI: "Voix IA",
    voiceAIDesc: "Voix off Eleven Labs",
    subtitles: "Sous-titres",
    subtitlesDesc: "Sous-titres Creatomate",
    longFormat: "Long format",
    longFormatDesc: "Vidéos de plus de 10 minutes",

    // Form Fields
    basicInformation: "Informations de base",
    title: "Titre",
    titlePlaceholder: "Module 1 - Pourquoi les Caraïbes maintenant ?",
    script: "Script",
    scriptPlaceholder: "Écrivez le script de votre vidéo ici...",
    instructions: "Instructions",
    instructionsPlaceholder: "Directives créatives : ton souhaité, moments clés pour B-rolls, style visuel, points d'attention...",
    instructionsHelp: "Indiquez ici vos directives créatives qui ne font pas partie du script narratif.",
    duration: "Durée",
    language: "Langue",
    voice: "Voix",
    french: "Français",
    english: "Anglais",
    female: "Féminine",
    male: "Masculine",

    // Upload
    uploadAssets: "Téléverser des fichiers",
    uploadAssetsOptional: "Téléverser des fichiers (Optionnel)",
    dropFilesHere: "Déposez les fichiers ici ou cliquez pour téléverser",
    audioFiles: "Audio (WAV, MP3)",
    imageFiles: "Images (PNG, JPG)",
    videoFiles: "Vidéo (MP4, MOV)",
    maxFileSize: "Max 500 Mo par fichier",
    uploadedFiles: "Fichiers téléversés",

    // Advanced Options
    advancedOptions: "Options avancées",
    aspectRatio: "Format d'image",
    landscape: "Paysage",
    portrait: "Portrait",
    square: "Carré",
    notificationEmail: "Email de notification",
    route: "Route",
    improvementMode: "Mode d'amélioration",
    auto: "Auto",
    semiAuto: "Semi-Auto",
    rebuild: "Reconstruction",

    // Actions
    cancel: "Annuler",
    generateVideo: "Générer la vidéo",
    submitting: "Envoi en cours...",
    download: "Télécharger",
    downloadVideo: "Télécharger la vidéo",
    delete: "Supprimer",
    copy: "Copier",
    edit: "Modifier",
    save: "Enregistrer",
    saveChanges: "Sauvegarder",

    // Videos List
    allVideosTitle: "Toutes les vidéos",
    allVideosDescription: "Gérez et surveillez votre pipeline de production vidéo",
    searchVideos: "Rechercher des vidéos...",
    allTypes: "Tous les types",
    allStatus: "Tous les statuts",
    noVideosFound: "Aucune vidéo trouvée",
    tryAdjustingFilters: "Essayez d'ajuster vos filtres",
    createVideo: "Créer une vidéo",

    // Video Detail
    details: "Détails",
    created: "Créée le",
    status: "Statut",
    type: "Type",
    errorDetails: "Détails de l'erreur",
    videoNotFound: "Vidéo introuvable",
    videoNotFoundDesc: "La vidéo que vous recherchez n'existe pas ou a été supprimée.",
    backToVideos: "Retour aux vidéos",
    processingVideo: "Traitement de votre vidéo...",
    processingDesc: "Cela peut prendre quelques minutes",
    waitingInQueue: "En attente dans la file",
    waitingDesc: "Votre vidéo sera traitée bientôt",
    generationFailed: "Génération échouée",
    previewUnavailable: "Aperçu vidéo non disponible",

    // Projects
    projectsTitle: "Projets",
    projectsDescription: "Organisez vos vidéos en projets",
    newProject: "Nouveau projet",
    noProjectsYet: "Aucun projet",
    noProjectsDesc: "Les projets vous aident à organiser vos vidéos. Cette fonctionnalité arrive bientôt !",
    viewAllVideos: "Voir toutes les vidéos",

    // Settings
    settingsTitle: "Paramètres",
    settingsDescription: "Configurez vos préférences de tableau de bord",
    general: "Général",
    apiKeys: "Clés API",
    notifications: "Notifications",

    // General Settings
    generalSettings: "Paramètres généraux",
    generalSettingsDesc: "Configurez les valeurs par défaut pour la génération vidéo",
    defaultLanguage: "Langue par défaut",
    defaultVoice: "Voix par défaut",
    defaultAspectRatio: "Format par défaut",
    defaultDuration: "Durée par défaut",
    dashboardLanguage: "Langue du tableau de bord",
    dashboardLanguageDesc: "Choisissez la langue de l'interface du tableau de bord",

    // API Settings
    apiConfiguration: "Configuration API",
    apiConfigurationDesc: "Configurez les connexions aux services externes",
    supabaseUrl: "URL Supabase",
    supabaseAnonKey: "Clé Anon Supabase",
    n8nWebhookUrl: "URL Webhook N8N",
    elevenLabsApiKey: "Clé API ElevenLabs (Optionnel)",
    saveApiKeys: "Enregistrer les clés API",

    // Notification Settings
    notificationSettings: "Paramètres de notification",
    notificationSettingsDesc: "Configurez la façon dont vous recevez les mises à jour sur vos vidéos",
    notificationEmailDesc: "Recevez des notifications par email lorsque les vidéos sont terminées",
    saveNotificationSettings: "Enregistrer les paramètres de notification",

    // Toasts
    videoRequestSubmitted: "Demande de vidéo soumise !",
    videoBeingProcessed: "Votre vidéo est en cours de traitement.",
    error: "Erreur",
    failedToSubmit: "Échec de la soumission de la demande vidéo",
    somethingWentWrong: "Une erreur s'est produite",
    videoDeleted: "Vidéo supprimée",
    videoRemoved: "La vidéo a été supprimée.",
    failedToDelete: "Échec de la suppression de la vidéo.",
    copied: "Copié !",
    scriptCopied: "Script copié dans le presse-papiers.",
    videoCompleted: "Vidéo terminée !",
    videoReadyToDownload: "Votre vidéo est prête à télécharger.",
    apiKeysSaved: "Clés API enregistrées avec succès",
    settingsSaved: "Paramètres enregistrés avec succès",

    // Durations
    minute: "minute",
    minutes: "minutes",

    // Misc
    version: "Version",
    videoAgentDashboard: "Tableau de bord Agent Vidéo",
    justNow: "À l'instant",
    mAgo: "min",
    hAgo: "h",
    dAgo: "j",
  },
} as const

export type TranslationKey = keyof typeof translations.en
export type SupportedLanguage = keyof typeof translations

export function useTranslation() {
  const [lang, setLang] = useState<SupportedLanguage>("en")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dashboardLang") as SupportedLanguage | null
      if (stored && (stored === "en" || stored === "fr")) {
        setLang(stored)
      }
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang][key] || translations.en[key] || key
    },
    [lang]
  )

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLang(newLang)
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardLang", newLang)
    }
  }, [])

  return { t, lang, setLanguage }
}

// For server components or static content
export function getTranslation(lang: SupportedLanguage, key: TranslationKey): string {
  return translations[lang][key] || translations.en[key] || key
}
