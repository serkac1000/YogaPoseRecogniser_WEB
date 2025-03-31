import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Settings from "@/pages/settings";
import AppPage from "@/pages/app";
import { useEffect } from "react";

function RedirectToSettings() {
  const [, setLocation] = useLocation();
  
  // Use effect to redirect
  useEffect(() => {
    setLocation('/settings');
  }, [setLocation]);
  
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={RedirectToSettings} />
      <Route path="/settings" component={Settings} />
      <Route path="/app" component={AppPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
