import { Check } from "lucide-react";
import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COMPARISON_ROWS } from "@/data/marketing";

function Cell({ ok }: { ok: boolean }) {
  return ok ? (
    <Check className="size-3.5 text-primary" aria-label="Included" />
  ) : (
    <span className="text-muted">—</span>
  );
}

export function ComparisonTable() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <MarketingContainer>
        <SectionHeading
          align="center"
          eyebrow="Audience"
          title="Built for founders and VCs"
          description="Pitch preparation and deal screening share the same math. BurnCalc fits both workflows."
        />
        <div className="mt-10 overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Capability</TableHead>
                <TableHead>Founder</TableHead>
                <TableHead>VC</TableHead>
                <TableHead>Operator</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARISON_ROWS.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium text-text">{row.label}</TableCell>
                  <TableCell><Cell ok={row.founder} /></TableCell>
                  <TableCell><Cell ok={row.vc} /></TableCell>
                  <TableCell><Cell ok={row.operator} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </MarketingContainer>
    </section>
  );
}
