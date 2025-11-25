"use client"

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
import { Save, Key, Bell, Palette } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-deep-sea">
          Settings
        </h1>
        <p className="text-gray-500">
          Configure your dashboard preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Palette className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure default values for video generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger id="default-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-voice">Default Voice</Label>
                  <Select defaultValue="female">
                    <SelectTrigger id="default-voice">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-aspect">Default Aspect Ratio</Label>
                  <Select defaultValue="16:9">
                    <SelectTrigger id="default-aspect">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                      <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                      <SelectItem value="1:1">1:1 (Square)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-duration">Default Duration</Label>
                  <Select defaultValue="3min">
                    <SelectTrigger id="default-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1min">1 minute</SelectItem>
                      <SelectItem value="2min">2 minutes</SelectItem>
                      <SelectItem value="3min">3 minutes</SelectItem>
                      <SelectItem value="5min">5 minutes</SelectItem>
                      <SelectItem value="10min">10 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure external service connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="supabase-url">Supabase URL</Label>
                <Input
                  id="supabase-url"
                  defaultValue="https://lamdfdcognsyipjjrbww.supabase.co"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                <Input
                  id="supabase-key"
                  type="password"
                  placeholder="Enter your Supabase anon key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="n8n-webhook">N8N Webhook URL</Label>
                <Input
                  id="n8n-webhook"
                  defaultValue="https://n8n.srv989411.hstgr.cloud/webhook/video-request"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="elevenlabs-key">ElevenLabs API Key (Optional)</Label>
                <Input
                  id="elevenlabs-key"
                  type="password"
                  placeholder="Enter your ElevenLabs API key"
                />
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save API Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive updates about your videos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="your@email.com"
                />
                <p className="text-sm text-gray-500">
                  Receive email notifications when videos are completed
                </p>
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
