
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Settings, User, Lock, LogOut, Edit, Moon, Sun, Globe, Building, MapPin, Languages } from "lucide-react";
import { toast } from "sonner";

const Configuracoes = () => {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("pt");

  const accountData = {
    organization: "CallScan Solutions",
    accountId: "CS-29384",
    location: "Portugal",
    defaultLanguage: "Português"
  };

  const userData = {
    name: "João Pereira",
    email: "joao.pereira@callscan.pt"
  };

  const handleAccountEdit = () => {
    toast.info("Função de edição em desenvolvimento");
  };

  const handlePasswordChange = () => {
    toast.info("Função de alteração de password em desenvolvimento");
  };

  const handleLogoutAll = () => {
    toast.success("Sessões terminadas com sucesso");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success(`Idioma alterado para ${value === "pt" ? "Português" : "English"}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Configurações
        </h1>
        <p className="text-muted-foreground">Gerencie as preferências e configurações da sua conta</p>
      </div>
      
      {/* Dados da Conta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Dados da Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organization">Nome da Organização</Label>
              <Input id="organization" value={accountData.organization} readOnly className="bg-muted" />
            </div>
            <div>
              <Label htmlFor="accountId">ID da Conta</Label>
              <Input id="accountId" value={accountData.accountId} readOnly className="bg-muted" />
            </div>
            <div>
              <Label htmlFor="location" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Localização
              </Label>
              <Input id="location" value={accountData.location} readOnly className="bg-muted" />
            </div>
            <div>
              <Label htmlFor="defaultLanguage" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                Idioma Padrão
              </Label>
              <Input id="defaultLanguage" value={accountData.defaultLanguage} readOnly className="bg-muted" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAccountEdit} className="ml-auto">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </CardFooter>
      </Card>

      {/* Preferências do Utilizador */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Preferências do Utilizador
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userName">Nome</Label>
              <Input id="userName" value={userData.name} readOnly className="bg-muted" />
            </div>
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input id="userEmail" value={userData.email} readOnly className="bg-muted" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações</Label>
                <p className="text-sm text-muted-foreground">Receba alertas sobre eventos importantes</p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Tema</Label>
                <p className="text-sm text-muted-foreground">Escolha entre modo claro ou escuro</p>
              </div>
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 mr-2" />
                ) : (
                  <Moon className="h-4 w-4 mr-2" />
                )}
                {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-base">Idioma da Interface</Label>
              <p className="text-sm text-muted-foreground">Selecione o idioma para a interface</p>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full md:w-[240px]">
                  <SelectValue placeholder="Selecione um idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Button onClick={handlePasswordChange} variant="outline">
              Alterar Password
            </Button>
          </div>
          
          <div>
            <Button 
              onClick={handleLogoutAll} 
              variant="outline"
              className="text-destructive border-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout de Todas as Sessões
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Autenticação de Dois Fatores (2FA)</Label>
              <p className="text-sm text-muted-foreground">Aumente a segurança da sua conta</p>
            </div>
            <div className="bg-muted px-3 py-1 rounded-md text-xs">Em breve</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuracoes;
