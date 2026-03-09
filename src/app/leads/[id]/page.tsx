import { leads, getLeadById } from "@/lib/mock-data";
import { LeadHeader } from "@/components/leads/lead-header";
import { LeadTimeline } from "@/components/leads/lead-timeline";
import { LeadTranscript } from "@/components/leads/lead-transcript";
import { LeadFacts } from "@/components/leads/lead-facts";

export function generateStaticParams() {
  return leads.map((lead) => ({ id: lead.id }));
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = getLeadById(id);

  if (!lead) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider">
            LEAD NOT FOUND
          </h1>
          <p className="mt-2 text-muted-foreground">
            The lead you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <LeadHeader lead={lead} />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {lead.transcript && <LeadTranscript transcript={lead.transcript} />}
          <LeadFacts lead={lead} />
        </div>
        <LeadTimeline timeline={lead.timeline} />
      </div>
    </div>
  );
}
