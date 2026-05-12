import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FontAwesome } from "@expo/vector-icons";

// 1. Criamos o cliente do React Query fora do componente
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    // 2. Envolvemos todo o app com o Provider
    <QueryClientProvider client={queryClient}>
      <Tabs screenOptions={{ tabBarActiveTintColor: "#FF6B6B" }}>
        
        {/* Aba de Tarefas */}
        <Tabs.Screen
          name="tarefas/index"
          options={{
            title: "Tarefas",
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="list" color={color} />,
          }}
        />

        {/* Aba Gosto / Não Gosto */}
        <Tabs.Screen
          name="gostoNaoGosto"
          options={{
            title: "Gosto/Não Gosto",
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="thumbs-up" color={color} />,
          }}
        />

        {/* Aba Home (Opcional, se quiser manter) */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
          }}
        />
        
      </Tabs>
    </QueryClientProvider>
  );
}