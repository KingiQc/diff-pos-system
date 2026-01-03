import { useState } from 'react';
import { Save, Store, Percent, Building2, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Settings = () => {
  const [storeSettings, setStoreSettings] = useState({
    name: 'Diff',
    address: '123 Fashion Street, Lekki, Lagos',
    phone: '+234 801 234 5678',
    email: 'contact@diff.ng',
    taxRate: 7.5,
    defaultDiscount: 0,
    currency: 'NGN',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlert: true,
    dailyReport: true,
    newSaleNotification: false,
  });

  const handleSaveStore = () => {
    toast.success('Store settings saved successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store configuration
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="bg-muted rounded-xl p-1">
          <TabsTrigger value="store" className="rounded-lg gap-2">
            <Store className="h-4 w-4" />
            Store
          </TabsTrigger>
          <TabsTrigger value="tax" className="rounded-lg gap-2">
            <Percent className="h-4 w-4" />
            Tax & Discounts
          </TabsTrigger>
          <TabsTrigger value="branches" className="rounded-lg gap-2">
            <Building2 className="h-4 w-4" />
            Branches
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Store Information
            </h2>
            <div className="grid grid-cols-2 gap-6 max-w-2xl">
              <div>
                <Label>Store Name</Label>
                <Input
                  value={storeSettings.name}
                  onChange={(e) =>
                    setStoreSettings({ ...storeSettings, name: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={storeSettings.email}
                  onChange={(e) =>
                    setStoreSettings({ ...storeSettings, email: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={storeSettings.phone}
                  onChange={(e) =>
                    setStoreSettings({ ...storeSettings, phone: e.target.value })
                  }
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <Label>Currency</Label>
                <Input
                  value={storeSettings.currency}
                  disabled
                  className="mt-1 rounded-xl bg-muted"
                />
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input
                  value={storeSettings.address}
                  onChange={(e) =>
                    setStoreSettings({
                      ...storeSettings,
                      address: e.target.value,
                    })
                  }
                  className="mt-1 rounded-xl"
                />
              </div>
            </div>
            <Button onClick={handleSaveStore} className="mt-6 rounded-xl gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Tax & Discounts */}
        <TabsContent value="tax">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Tax & Discount Settings
            </h2>
            <div className="grid grid-cols-2 gap-6 max-w-xl">
              <div>
                <Label>VAT Rate (%)</Label>
                <Input
                  type="number"
                  value={storeSettings.taxRate}
                  onChange={(e) =>
                    setStoreSettings({
                      ...storeSettings,
                      taxRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-1 rounded-xl"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Nigerian standard VAT is 7.5%
                </p>
              </div>
              <div>
                <Label>Default Discount (%)</Label>
                <Input
                  type="number"
                  value={storeSettings.defaultDiscount}
                  onChange={(e) =>
                    setStoreSettings({
                      ...storeSettings,
                      defaultDiscount: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-1 rounded-xl"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Applied to all new sales
                </p>
              </div>
            </div>
            <Button onClick={handleSaveStore} className="mt-6 rounded-xl gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Branches */}
        <TabsContent value="branches">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Branch Management
            </h2>
            <div className="space-y-4">
              {[
                { id: '1', name: 'Diff Lagos - Lekki', address: '123 Fashion Street, Lekki', isMain: true },
                { id: '2', name: 'Diff Lagos - VI', address: '45 Admiralty Way, Victoria Island', isMain: false },
                { id: '3', name: 'Diff Abuja - Wuse', address: '78 Aminu Kano Crescent, Wuse 2', isMain: false },
              ].map((branch) => (
                <div
                  key={branch.id}
                  className="flex items-center justify-between rounded-xl border border-border p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{branch.name}</p>
                      {branch.isMain && (
                        <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          Main
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {branch.address}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
            <Button className="mt-6 rounded-xl">Add New Branch</Button>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Notification Preferences
            </h2>
            <div className="space-y-6 max-w-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when products are running low
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.lowStockAlert}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      lowStockAlert: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Daily Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Receive daily sales summary via email
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.dailyReport}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      dailyReport: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    Sale Notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Get notified for every new sale
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.newSaleNotification}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      newSaleNotification: checked,
                    })
                  }
                />
              </div>
            </div>
            <Button
              onClick={handleSaveNotifications}
              className="mt-6 rounded-xl gap-2"
            >
              <Save className="h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Security Settings
            </h2>
            <div className="space-y-6 max-w-xl">
              <div>
                <Label>Change Password</Label>
                <div className="mt-2 space-y-3">
                  <Input
                    type="password"
                    placeholder="Current password"
                    className="rounded-xl"
                  />
                  <Input
                    type="password"
                    placeholder="New password"
                    className="rounded-xl"
                  />
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <Button className="rounded-xl">Update Password</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
