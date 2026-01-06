import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { profileApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Profile } from '@/types/types';

export default function AdminPage() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role === 'admin') {
      loadProfiles();
    }
  }, [profile]);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const data = await profileApi.getAllProfiles();
      setProfiles(data);
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast({
        title: t('common.error'),
        description: 'Failed to load user profiles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      await profileApi.updateProfile(userId, { role: newRole });
      toast({
        title: t('common.success'),
        description: 'User role updated successfully',
      });
      loadProfiles();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: t('common.error'),
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    }
  };

  if (profile?.role !== 'admin') {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground">
              You do not have permission to access this page
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 bg-muted" />
        <Skeleton className="h-96 bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('nav.admin')}</h1>
        <p className="text-muted-foreground mt-2">
          Manage users and system settings
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="text-3xl font-bold">{profiles.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div className="text-3xl font-bold">
                {profiles.filter(p => p.role === 'admin').length}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Regular Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="text-3xl font-bold">
                {profiles.filter(p => p.role === 'user').length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.username}</TableCell>
                    <TableCell>{p.email || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {p.language === 'ar' ? 'العربية' : 'English'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          p.role === 'admin'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }
                      >
                        {p.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell className="text-end">
                      <Select
                        value={p.role}
                        onValueChange={(value) => handleRoleChange(p.id, value as 'user' | 'admin')}
                        disabled={p.id === profile.id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
