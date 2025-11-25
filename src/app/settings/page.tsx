"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Key, Bell, Palette, Languages } from "lucide-react"
import { useTranslation, type SupportedLanguage } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { t, lang, setLanguage } = useTranslation()
  const { toast } = useToast()

  // General Settings
  const [defaultLanguage, setDefaultLanguage] = useState("fr")
  const [defaultVoice, setDefaultVoice] = useState("female")
  const [defaultAspectRatio, setDefaultAspectRatio] = useState("16:9")
  const [defaultDuration, setDefaultDuration] = useState("3min")
  const [dashboardLang, setDashboardLang] = useState<SupportedLanguage>(lang)

  // API Settings
  const [supabaseUrl, setSupabaseUrl] = useState("https://lamdfdcognsyipjjrbww.supabase.co")
  const [supabaseAnonKey, setSupabaseAnonKey] = useState("")
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState("https://n8n.srv989411.hstgr.cloud/webhook/video-request")
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("")

  // Notification Settings
  const [notificationEmail, setNotificationEmail] = useState("")

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDefaultLanguage(localStorage.getItem("default_language") || "fr")
      setDefaultVoice(localStorage.getItem("default_voice") || "female")
      setDefaultAspectRatio(localStorage.getItem("default_aspect_ratio") || "16:9")
      setDefaultDuration(localStorage.getItem("default_duration") || "3min")
      setDashboardLang((localStorage.getItem("dashboardLang") as SupportedLanguage) || "en")

      setSupabaseUrl(localStorage.getItem("supabase_url") || "https://lamdfdcognsyipjjrbww.supabase.co")
      setSupabaseAnonKey(localStorage.getItem("supabase_anon_key") || "")
      setN8nWebhookUrl(localStorage.getItem("n8n_webhook_url") || "https://n8n.srv989411.hstgr.cloud/webhook/video-request")
      setElevenLabsApiKey(localStorage.getItem("elevenlabs_api_key") || "")

      setNotificationEmail(localStorage.getItem("notification_email") || "")
    }
  }, [])

  const handleSaveGeneralSettings = () => {
    localStorage.setItem("default_language", defaultLanguage)
    localStorage.setItem("default_voice", defaultVoice)
    localStorage.setItem("default_aspect_ratio", defaultAspectRatio)
    localStorage.setItem("default_duration", defaultDuration)
    setLanguage(dashboardLang)

    toast({
      title: t("settingsSaved"),
      variant: "success",
    })
  }

  const handleSaveApiKeys = () => {
    localStorage.setItem("supabase_url", supabaseUrl)
    localStorage.setItem("supabase_anon_key", supabaseAnonKey)
    localStorage.setItem("n8n_webhook_url", n8nWebhookUrl)
    localStorage.setItem("elevenlabs_api_key", elevenLabsApiKey)

    toast({
      title: t("apiKeysSaved"),
      variant: "success",
    })
  }

  const handleSaveNotificationSettings = () => {
    localStorage.setItem("notification_email", notificationEmail)

    toast({
      title: t("settingsSaved"),
      variant: "success",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-deep-sea">
          {t("settingsTitle")}
        </h1>
        <p className="text-gray-500">{t("settingsDescription")}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Palette className="h-4 w-4" />
            {t("general")}
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="h-4 w-4" />
            {t("apiKeys")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            {t("notifications")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t("generalSettings")}</CardTitle>
              <CardDescription>{t("generalSettingsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dashboard Language */}
              <div className="rounded-lg border border-turquoise/30 bg-turquoise/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Languages className="h-5 w-5 text-turquoise" />
                  <Label className="text-base font-semibold">{t("dashboardLanguage")}</Label>
                </div>
                <Select
                  value={dashboardLang}
                  onValueChange={(v) => setDashboardLang(v as SupportedLanguage)}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Francais</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-2">
                  {t("dashboardLanguageDesc")}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-language">{t("defaultLanguage")}</Label>
                  <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                    <SelectTrigger id="default-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">{t("french")}</SelectItem>
                      <SelectItem value="en">{t("english")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-voice">{t("defaultVoice")}</Label>
                  <Select value={defaultVoice} onValueChange={setDefaultVoice}>
                    <SelectTrigger id="default-voice">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">{t("female")}</SelectItem>
                      <SelectItem value="male">{t("male")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-aspect">{t("defaultAspectRatio")}</Label>
                  <Select value={defaultAspectRatio} onValueChange={setDefaultAspectRatio}>
                    <SelectTrigger id="default-aspect">
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
                  <Label htmlFor="default-duration">{t("defaultDuration")}</Label>
                  <Select value={defaultDuration} onValueChange={setDefaultDuration}>
                    <SelectTrigger id="default-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1min">1 {t("minute")}</SelectItem>
                      <SelectItem value="2min">2 {t("minutes")}</SelectItem>
                      <SelectItem value="3min">3 {t("minutes")}</SelectItem>
                      <SelectItem value="5min">5 {t("minutes")}</SelectItem>
                      <SelectItem value="10min">10 {t("minutes")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="gap-2" onClick={handleSaveGeneralSettings}>
                <Save className="h-4 w-4" />
                {t("saveChanges")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>{t("apiConfiguration")}</CardTitle>
              <CardDescription>{t("apiConfigurationDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="supabase-url">{t("supabaseUrl")}</Label>
                <Input
                  id="supabase-url"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabase-key">{t("supabaseAnonKey")}</Label>
                <Input
                  id="supabase-key"
                  type="password"
                  placeholder="Enter your Supabase anon key"
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="n8n-webhook">{t("n8nWebhookUrl")}</Label>
                <Input
                  id="n8n-webhook"
                  value={n8nWebhookUrl}
                  onChange={(e) => setN8nWebhookUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="elevenlabs-key">{t("elevenLabsApiKey")}</Label>
                <Input
                  id="elevenlabs-key"
                  type="password"
                  placeholder="Enter your ElevenLabs API key"
                  value={elevenLabsApiKey}
                  onChange={(e) => setElevenLabsApiKey(e.target.value)}
                />
              </div>

              <Button className="gap-2" onClick={handleSaveApiKeys}>
                <Save className="h-4 w-4" />
                {t("saveApiKeys")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("notificationSettings")}</CardTitle>
              <CardDescription>{t("notificationSettingsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="notification-email">{t("notificationEmail")}</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="your@email.com"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  {t("notificationEmailDesc")}
                </p>
              </div>

              <Button className="gap-2" onClick={handleSaveNotificationSettings}>
                <Save className="h-4 w-4" />
                {t("saveNotificationSettings")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
