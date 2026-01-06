import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { profileApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import { Languages, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export default function SettingsPage() {
  const { user, profile, refreshProfile } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleLanguageChange = async (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage);
    
    if (user && profile) {
      try {
        await profileApi.updateProfile(user.id, { language: newLanguage });
        await refreshProfile();
        toast({
          title: t('common.success'),
          description: 'Language preference saved',
        });
      } catch (error) {
        console.error('Error updating language:', error);
      }
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    toast({
      title: t('common.success'),
      description: `Theme changed to ${newTheme} mode`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground mt-2">
          Manage your preferences and account settings
        </p>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            {t('settings.language')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Language</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية (Arabic)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose your preferred language for the interface
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {t('settings.theme')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Theme</Label>
            <div className="flex gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('light')}
                className="flex-1"
              >
                <Sun className="h-4 w-4 me-2" />
                {t('settings.lightMode')}
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('dark')}
                className="flex-1"
              >
                <Moon className="h-4 w-4 me-2" />
                {t('settings.darkMode')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* University Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.university')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current University</Label>
            <Select value={profile?.universityId || 'default-university'} disabled>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default-university">Default University</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              University grading rules are automatically applied
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Username</Label>
            <div className="p-3 bg-muted rounded-md">
              {profile?.username || 'Not set'}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <div className="p-3 bg-muted rounded-md capitalize">
              {profile?.role || 'user'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
