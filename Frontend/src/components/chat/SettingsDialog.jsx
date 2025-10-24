'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Palette,
  Moon,
  Sun,
  LogOut,
  User,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { usersAPI } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

const themeColors = [
  { name: 'آبی', value: 'blue', class: 'bg-blue-500' },
  { name: 'سبز', value: 'green', class: 'bg-green-500' },
  { name: 'بنفش', value: 'purple', class: 'bg-purple-500' },
  { name: 'قرمز', value: 'red', class: 'bg-red-500' },
  { name: 'نارنجی', value: 'orange', class: 'bg-orange-500' },
  { name: 'صورتی', value: 'pink', class: 'bg-pink-500' },
  { name: 'آبی آسمانی', value: 'sky', class: 'bg-sky-500' },
  { name: 'زرد', value: 'yellow', class: 'bg-yellow-500' },
]

export default function SettingsDialog({ 
  open, 
  onOpenChange, 
  userSettings, 
  onSettingsChange 
}) {
  const { theme, toggleTheme } = useTheme()
  const { logout, user } = useAuth()
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState(userSettings)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setSettings(userSettings)
  }, [userSettings])

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      await usersAPI.updateSettings(settings)
      onSettingsChange(settings)
      localStorage.setItem('userSettings', JSON.stringify(settings))
      
      toast({
        title: "تنظیمات ذخیره شد",
        description: "تنظیمات با موفقیت به‌روزرسانی شد",
      })
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ذخیره تنظیمات",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleThemeColorChange = (color) => {
    // Apply theme color to CSS variables
    document.documentElement.style.setProperty('--primary', `hsl(var(--${color}))`)
    handleSettingChange('themeColor', color)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-right">تنظیمات</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">عمومی</TabsTrigger>
            <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
            <TabsTrigger value="appearance">ظاهر</TabsTrigger>
            <TabsTrigger value="privacy">حریم خصوصی</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">حساب کاربری</h3>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">{user?.fullName}</p>
                  <p className="text-sm text-muted-foreground">@{user?.username}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">تنظیمات عمومی</h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="language">زبان</Label>
                <select
                  id="language"
                  value={settings.language || 'fa'}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="fa">فارسی</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="timezone">منطقه زمانی</Label>
                <select
                  id="timezone"
                  value={settings.timezone || 'Asia/Tehran'}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Asia/Tehran">تهران (GMT+3:30)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">اعلان‌ها</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {settings.notifications ? (
                    <Bell className="w-5 h-5 text-primary" />
                  ) : (
                    <BellOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <Label htmlFor="notifications">اعلان‌های پیام</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {settings.sounds ? (
                    <Volume2 className="w-5 h-5 text-primary" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-muted-foreground" />
                  )}
                  <Label htmlFor="sounds">صداهای اعلان</Label>
                </div>
                <Switch
                  id="sounds"
                  checked={settings.sounds}
                  onCheckedChange={(checked) => handleSettingChange('sounds', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Bell className="w-5 h-5 text-primary" />
                  <Label htmlFor="desktopNotifications">اعلان‌های دسکتاپ</Label>
                </div>
                <Switch
                  id="desktopNotifications"
                  checked={settings.desktopNotifications || false}
                  onCheckedChange={(checked) => handleSettingChange('desktopNotifications', checked)}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">ظاهر</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-primary" />
                  ) : (
                    <Sun className="w-5 h-5 text-primary" />
                  )}
                  <Label htmlFor="theme">حالت تیره</Label>
                </div>
                <Switch
                  id="theme"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">رنگ تم</Label>
                <div className="grid grid-cols-4 gap-3">
                  {themeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleThemeColorChange(color.value)}
                      className={`w-12 h-12 rounded-full ${color.class} ${
                        settings.themeColor === color.value ? 'ring-2 ring-offset-2 ring-primary' : ''
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="fontSize">اندازه فونت</Label>
                <select
                  id="fontSize"
                  value={settings.fontSize || 'medium'}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="small">کوچک</option>
                  <option value="medium">متوسط</option>
                  <option value="large">بزرگ</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">حریم خصوصی</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Shield className="w-5 h-5 text-primary" />
                  <Label htmlFor="onlineStatus">نمایش وضعیت آنلاین</Label>
                </div>
                <Switch
                  id="onlineStatus"
                  checked={settings.showOnlineStatus !== false}
                  onCheckedChange={(checked) => handleSettingChange('showOnlineStatus', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Eye className="w-5 h-5 text-primary" />
                  <Label htmlFor="readReceipts">تأیید خواندن پیام</Label>
                </div>
                <Switch
                  id="readReceipts"
                  checked={settings.readReceipts !== false}
                  onCheckedChange={(checked) => handleSettingChange('readReceipts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <EyeOff className="w-5 h-5 text-primary" />
                  <Label htmlFor="typingIndicator">نمایش وضعیت تایپ</Label>
                </div>
                <Switch
                  id="typingIndicator"
                  checked={settings.typingIndicator !== false}
                  onCheckedChange={(checked) => handleSettingChange('typingIndicator', checked)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-destructive">حساب کاربری</h3>
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 ml-2" />
                خروج از حساب
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex space-x-2 space-x-reverse pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            لغو
          </Button>
          <Button 
            onClick={handleSaveSettings} 
            className="flex-1"
            disabled={isSaving}
          >
            {isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
