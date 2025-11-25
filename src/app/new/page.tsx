"use client"

export const dynamic = "force-dynamic"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import {
  ArrowLeft,
  Loader2,
  Rocket,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Upload,
  Wrench,
  Film,
  Image,
  Video,
  Mic,
  Subtitles,
  Clock,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileDropzone } from "@/components/upload/file-dropzone"
import { FileList } from "@/components/upload/file-list"
import { submitVideoRequest } from "@/lib/api"
import { uploadFile } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/i18n"
import { getFileType, cn } from "@/lib/utils"
import {
  type BaseType,
  type ProductionOptions,
  type UploadedFile,
  type VideoRequest,
  getVideoTypeFromOptions,
} from "@/types/video"

const defaultProductionOptions: ProductionOptions = {
  motion_design: false,
  ai_slides: true,
  b_rolls: true,
  voice_ai: true,
  subtitles: true,
  long_format: false,
}

export default function NewVideoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useTranslation()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Form state
  const [baseType, setBaseType] = useState<BaseType>("generation")
  const [productionOptions, setProductionOptions] = useState<ProductionOptions>(defaultProductionOptions)
  const [titre, setTitre] = useState("")
  const [script, setScript] = useState("")
  const [instructions, setInstructions] = useState("")
  const [dureeCible, setDureeCible] = useState("3min")
  const [langue, setLangue] = useState<"fr" | "en">("fr")
  const [voixType, setVoixType] = useState<"female" | "male">("female")
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9")
  const [email, setEmail] = useState("")
  const [route, setRoute] = useState<"A" | "B" | "hybrid">("A")
  const [improvementMode, setImprovementMode] = useState<"auto" | "semi" | "rebuild">("auto")

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (titre.length < 3) {
      newErrors.titre = t("title") + " must be at least 3 characters"
    }
    if (script.length < 50) {
      newErrors.script = t("script") + " must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const toggleProductionOption = (key: keyof ProductionOptions) => {
    setProductionOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const submitMutation = useMutation({
    mutationFn: async () => {
      // Upload files first if any
      let assetsPath = ""
      if (files.length > 0) {
        assetsPath = files
          .filter((f) => f.url)
          .map((f) => f.url)
          .join(",")
      }

      // Convert base type + options to VideoType for N8N
      const videoType = getVideoTypeFromOptions(baseType, productionOptions)

      const requestData: VideoRequest = {
        titre,
        script,
        instructions: instructions || undefined,
        duree_cible: dureeCible,
        type: videoType,
        production_options: productionOptions,
        langue,
        voix_type: voixType,
        aspect_ratio: aspectRatio,
        email: email || undefined,
        route: productionOptions.motion_design ? route : undefined,
        improvement_mode: baseType === "improvement" ? improvementMode : undefined,
        assets_path: assetsPath || undefined,
      }

      return submitVideoRequest(requestData)
    },
    onSuccess: (result) => {
      if (result.success) {
        toast({
          title: t("videoRequestSubmitted"),
          description: t("videoBeingProcessed"),
          variant: "success",
        })
        router.push(result.video_id ? `/video/${result.video_id}` : "/videos")
      } else {
        toast({
          title: t("error"),
          description: result.message || t("failedToSubmit"),
          variant: "destructive",
        })
      }
    },
    onError: (error) => {
      toast({
        title: t("error"),
        description: error instanceof Error ? error.message : t("somethingWentWrong"),
        variant: "destructive",
      })
    },
  })

  const handleFilesAdded = useCallback(async (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: getFileType(file.name),
      progress: 0,
      status: "uploading",
    }))

    setFiles((prev) => [...prev, ...uploadedFiles])

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      const uploadedFile = uploadedFiles[i]

      try {
        const progressInterval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id && f.progress < 90
                ? { ...f, progress: f.progress + 10 }
                : f
            )
          )
        }, 200)

        const result = await uploadFile(file, `upload-${Date.now()}`)
        clearInterval(progressInterval)

        if (result) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id
                ? { ...f, status: "completed", progress: 100, url: result.url, path: result.path }
                : f
            )
          )
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id ? { ...f, status: "error", progress: 0 } : f
            )
          )
        }
      } catch {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id ? { ...f, status: "error", progress: 0 } : f
          )
        )
      }
    }
  }, [])

  const handleFileRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      submitMutation.mutate()
    }
  }

  const baseTypeOptions = [
    {
      id: "generation" as BaseType,
      icon: Sparkles,
      name: t("generation"),
      description: t("generationDesc"),
    },
    {
      id: "assets-provided" as BaseType,
      icon: Upload,
      name: t("assetsProvided"),
      description: t("assetsProvidedDesc"),
    },
    {
      id: "improvement" as BaseType,
      icon: Wrench,
      name: t("improvement"),
      description: t("improvementDesc"),
    },
  ]

  const productionOptionsList = [
    {
      key: "motion_design" as keyof ProductionOptions,
      icon: Film,
      name: t("motionDesign"),
      description: t("motionDesignDesc"),
    },
    {
      key: "ai_slides" as keyof ProductionOptions,
      icon: Image,
      name: t("aiSlides"),
      description: t("aiSlidesDesc"),
    },
    {
      key: "b_rolls" as keyof ProductionOptions,
      icon: Video,
      name: t("bRolls"),
      description: t("bRollsDesc"),
    },
    {
      key: "voice_ai" as keyof ProductionOptions,
      icon: Mic,
      name: t("voiceAI"),
      description: t("voiceAIDesc"),
    },
    {
      key: "subtitles" as keyof ProductionOptions,
      icon: Subtitles,
      name: t("subtitles"),
      description: t("subtitlesDesc"),
    },
    {
      key: "long_format" as keyof ProductionOptions,
      icon: Clock,
      name: t("longFormat"),
      description: t("longFormatDesc"),
    },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-deep-sea">
            {t("createNewVideo")}
          </h1>
          <p className="text-gray-500">{t("createNewVideoDescription")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Base Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>{t("baseType")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {baseTypeOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setBaseType(option.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all",
                    baseType === option.id
                      ? "border-turquoise bg-turquoise/5"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <option.icon
                    className={cn(
                      "h-8 w-8",
                      baseType === option.id ? "text-turquoise" : "text-gray-500"
                    )}
                  />
                  <span className="text-sm font-medium text-deep-sea">{option.name}</span>
                  <span className="text-xs text-gray-500">{option.description}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Production Options */}
        <Card>
          <CardHeader>
            <CardTitle>{t("productionOptions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {productionOptionsList.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => toggleProductionOption(option.key)}
                  className={cn(
                    "relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 text-center transition-all",
                    productionOptions[option.key]
                      ? "border-turquoise bg-turquoise/5"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  {productionOptions[option.key] && (
                    <div className="absolute -right-1 -top-1 rounded-full bg-turquoise p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <option.icon
                    className={cn(
                      "h-6 w-6",
                      productionOptions[option.key] ? "text-turquoise" : "text-gray-500"
                    )}
                  />
                  <span className="text-xs font-medium text-deep-sea">{option.name}</span>
                  <span className="text-[10px] text-gray-500">{option.description}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t("basicInformation")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titre">{t("title")} *</Label>
              <Input
                id="titre"
                placeholder={t("titlePlaceholder")}
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
              {errors.titre && <p className="text-sm text-coral">{errors.titre}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="script">{t("script")} *</Label>
              <Textarea
                id="script"
                placeholder={t("scriptPlaceholder")}
                rows={6}
                value={script}
                onChange={(e) => setScript(e.target.value)}
              />
              {errors.script && <p className="text-sm text-coral">{errors.script}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">{t("instructions")}</Label>
              <Textarea
                id="instructions"
                placeholder={t("instructionsPlaceholder")}
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
              <p className="text-xs text-gray-500">{t("instructionsHelp")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="duree_cible">{t("duration")}</Label>
                <Select value={dureeCible} onValueChange={setDureeCible}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1min">1 {t("minute")}</SelectItem>
                    <SelectItem value="2min">2 {t("minutes")}</SelectItem>
                    <SelectItem value="3min">3 {t("minutes")}</SelectItem>
                    <SelectItem value="5min">5 {t("minutes")}</SelectItem>
                    <SelectItem value="10min">10 {t("minutes")}</SelectItem>
                    <SelectItem value="15min">15 {t("minutes")}</SelectItem>
                    <SelectItem value="20min">20 {t("minutes")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="langue">{t("language")}</Label>
                <Select value={langue} onValueChange={(v) => setLangue(v as "fr" | "en")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">{t("french")}</SelectItem>
                    <SelectItem value="en">{t("english")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voix_type">{t("voice")}</Label>
                <Select value={voixType} onValueChange={(v) => setVoixType(v as "female" | "male")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">{t("female")}</SelectItem>
                    <SelectItem value="male">{t("male")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>{t("uploadAssetsOptional")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileDropzone onFilesAdded={handleFilesAdded} />
            <FileList files={files} onRemove={handleFileRemove} />
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Card>
          <CardHeader>
            <button
              type="button"
              className="flex w-full items-center justify-between"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <CardTitle>{t("advancedOptions")}</CardTitle>
              {showAdvanced ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </CardHeader>
          {showAdvanced && (
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="aspect_ratio">{t("aspectRatio")}</Label>
                  <Select
                    value={aspectRatio}
                    onValueChange={(v) => setAspectRatio(v as "16:9" | "9:16" | "1:1")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:9">16:9 ({t("landscape")})</SelectItem>
                      <SelectItem value="9:16">9:16 ({t("portrait")})</SelectItem>
                      <SelectItem value="1:1">1:1 ({t("square")})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("notificationEmail")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {productionOptions.motion_design && (
                  <div className="space-y-2">
                    <Label htmlFor="route">{t("route")}</Label>
                    <Select value={route} onValueChange={(v) => setRoute(v as "A" | "B" | "hybrid")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Route A</SelectItem>
                        <SelectItem value="B">Route B</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {baseType === "improvement" && (
                  <div className="space-y-2">
                    <Label htmlFor="improvement_mode">{t("improvementMode")}</Label>
                    <Select
                      value={improvementMode}
                      onValueChange={(v) => setImprovementMode(v as "auto" | "semi" | "rebuild")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">{t("auto")}</SelectItem>
                        <SelectItem value="semi">{t("semiAuto")}</SelectItem>
                        <SelectItem value="rebuild">{t("rebuild")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Link href="/">
            <Button type="button" variant="outline">
              {t("cancel")}
            </Button>
          </Link>
          <Button type="submit" disabled={submitMutation.isPending} className="gap-2">
            {submitMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                {t("generateVideo")}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
