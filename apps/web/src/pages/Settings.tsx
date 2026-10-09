import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { User, Shield, Bell, Palette, Database, Download, LogOut, Moon, Sun, Globe } from "lucide-react";
import { useState } from "react";

interface NotificationSettings {
  email: boolean;
  push: boolean;
  reminders: boolean;
}

type NotificationKey = keyof NotificationSettings | "assessment" | "project" | "revision";

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState<NotificationSettings>({ email: true, push: false, reminders: true });

  const handleNotificationChange = (key: NotificationKey, value: boolean) => {
    if (key in notifications) {
      setNotifications((prev) => ({ ...prev, [key as keyof NotificationSettings]: value }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, preferences, and data
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" /> Profile</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-2" /> Appearance</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" /> Notifications</TabsTrigger>
          <TabsTrigger value="data"><Database className="w-4 h-4 mr-2" /> Data</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-4 h-4 mr-2" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">JD</div>
                <div>
                  <Button variant="outline">Change Avatar</Button>
                  <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Name</label>
                  <Input defaultValue="John Doe" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <Input defaultValue="johndoe" placeholder="@username" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" defaultValue="john@example.com" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <select className="w-full px-3 py-2 border border-input bg-background rounded-lg text-sm">
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                    <option>Asia/Tokyo</option>
                  </select>
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Daily Study Goal</label>
                <select className="w-full px-3 py-2 border border-input bg-background rounded-lg text-sm">
                  <option>30 minutes</option>
                  <option selected>1 hour</option>
                  <option>1.5 hours</option>
                  <option>2 hours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Difficulty</label>
                <select className="w-full px-3 py-2 border border-input bg-background rounded-lg text-sm">
                  <option>Adaptive</option>
                  <option>Beginner</option>
                  <option selected>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="auto-advance" className="w-4 h-4" defaultChecked />
                <label htmlFor="auto-advance" className="text-sm">Auto-advance to next lesson</label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className="h-24 flex-col gap-2"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="w-8 h-8" />
                  <span>Light</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className="h-24 flex-col gap-2"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="w-8 h-8" />
                  <span>Dark</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">System preference coming soon.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
            </CardHeader>
            <CardContent>
              <select className="w-full max-w-xs px-3 py-2 border border-input bg-background rounded-lg text-sm">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationToggle label="reminders" description="Receive a reminder to study each day" checked={notifications.reminders} onChange={handleNotificationChange} />
              <NotificationToggle label="email" description="Summary of your learning progress each week" checked={notifications.email} onChange={handleNotificationChange} />
              <NotificationToggle label="assessment" description="Get notified before scheduled assessments" checked={false} onChange={handleNotificationChange} />
              <NotificationToggle label="project" description="Updates on project progress and deadlines" checked={false} onChange={handleNotificationChange} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationToggle label="push" description="Receive browser notifications for important updates" checked={notifications.push} onChange={handleNotificationChange} />
              <NotificationToggle label="revision" description="Get notified when revision items are due" checked={false} onChange={handleNotificationChange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Download your learning data in JSON format.</p>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <a href="/api/export/progress"><Download className="w-4 h-4 mr-2" /> Export Progress</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/api/export/full"><Download className="w-4 h-4 mr-2" /> Export All Data</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">These actions are irreversible.</p>
              <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg">
                <div>
                  <p className="font-medium text-destructive">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SessionItem device="Chrome on Windows" location="New York, USA" current={true} lastActive="Now" />
                <SessionItem device="Safari on iPhone" location="New York, USA" current={false} lastActive="2 days ago" />
              </div>
              <Button variant="outline" className="w-full mt-4">Log Out All Other Sessions</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationToggle({ label, description, checked, onChange }: { label: NotificationKey; description: string; checked: boolean; onChange: (key: NotificationKey, value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(label, e.target.checked)}
        className="w-5 h-5"
      />
    </div>
  );
}

function SessionItem({ device, location, current, lastActive }: { device: string; location: string; current: boolean; lastActive: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium">{device}</p>
          {current && <Badge variant="default" className="text-xs">Current</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">{location} • {lastActive}</p>
      </div>
      {!current && <Button variant="ghost" size="sm">Revoke</Button>}
    </div>
  );
}
