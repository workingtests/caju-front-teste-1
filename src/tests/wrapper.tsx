import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { HashRouter, Switch } from "react-router-dom";

const queryClient = new QueryClient();

export const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <HashRouter>
      <Switch>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Switch>
    </HashRouter>
  );
};
