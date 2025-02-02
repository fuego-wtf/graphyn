import { AgentForm } from "@/components/agents/AgentForm";

export default function CreateNewAgentPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Create New Agent</h1>
      <AgentForm />
    </div>
  );
}
