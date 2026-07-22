import { Check, Minus } from "lucide-react";
import TerminalCard from "@/components/TerminalCard";
import { sponsorTiers, tierBenefits } from "@/data/sponsorship";

/** Bronze/Silver/Gold/Platinum benefit matrix from the sponsorship packet,
 *  rendered as a scrollable terminal-window table. */
export default function SponsorTiers() {
  return (
    <TerminalCard label="pcs://sponsor/tiers" contentClassName="overflow-x-auto" corners>
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-textMuted">
              Benefit
            </th>
            {sponsorTiers.map((tier) => (
              <th key={tier.name} className="p-4 text-center">
                <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-gpu">
                  {tier.name}
                </span>
                <span className="mt-1 block font-display text-lg font-bold text-textPrimary">
                  {tier.price}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tierBenefits.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 1 ? "bg-white/[0.02]" : undefined}
            >
              <td className="border-t border-line p-4 text-sm text-textSecondary">
                {row.label}
              </td>
              {row.included.map((included, ti) => (
                <td key={ti} className="border-t border-line p-4 text-center">
                  {included ? (
                    <Check className="mx-auto h-4 w-4 text-gpu" aria-hidden />
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-line" aria-hidden />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TerminalCard>
  );
}
