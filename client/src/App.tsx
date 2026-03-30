import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppLayout from "./components/AppLayout";
import TripPage from "./pages/TripPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import PreCheckPage from "./pages/PreCheckPage";
import InspectionPage from "./pages/InspectionPage";
import AccidentPage from "./pages/AccidentPage";
import BreakdownPage from "./pages/BreakdownPage";
import FinePage from "./pages/FinePage";
import SOSPage from "./pages/SOSPage";
import DocumentDetailPage from "./pages/DocumentDetailPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import ExpenseDetailPage from "./pages/ExpenseDetailPage";
import SettingsPage from "./pages/SettingsPage";
import FleetInfoPage from "./pages/FleetInfoPage";
import ArrivalPage from "./pages/ArrivalPage";
import NearbyServicesPage from "./pages/NearbyServicesPage";
import RouteSelectPage from "./pages/RouteSelectPage";
import FuelRecordPage from "./pages/FuelRecordPage";
import MaintenancePage from "./pages/MaintenancePage";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/pre-check" component={PreCheckPage} />
      <Route path="/sos" component={SOSPage} />
      <Route path="/arrival" component={ArrivalPage} />
      <Route path="/">
        <AppLayout>
          <TripPage />
        </AppLayout>
      </Route>
      <Route path="/events">
        <AppLayout>
          <EventsPage />
        </AppLayout>
      </Route>
      <Route path="/profile">
        <AppLayout>
          <ProfilePage />
        </AppLayout>
      </Route>
      <Route path="/inspection" component={InspectionPage} />
      <Route path="/accident" component={AccidentPage} />
      <Route path="/breakdown" component={BreakdownPage} />
      <Route path="/fine" component={FinePage} />
      <Route path="/documents" component={DocumentDetailPage} />
      <Route path="/vehicle" component={VehicleDetailPage} />
      <Route path="/expenses" component={ExpenseDetailPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/fleet" component={FleetInfoPage} />
      <Route path="/nearby" component={NearbyServicesPage} />
      <Route path="/routes" component={RouteSelectPage} />
      <Route path="/fuel-record" component={FuelRecordPage} />
      <Route path="/maintenance" component={MaintenancePage} />
      <Route>
        <AppLayout>
          <TripPage />
        </AppLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
