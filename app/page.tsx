// app/page.tsx
import dynamic from "next/dynamic";

const ClientApp = dynamic(() => import("../components/App"), {
  ssr: false,
});

export default function Page() {
  return <ClientApp />;
}
