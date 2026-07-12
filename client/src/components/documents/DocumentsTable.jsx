import {
  FileText,
  ShieldAlert,
  Activity,
  CalendarDays,
  Settings2,
} from "lucide-react";

import DocumentRow from "./DocumentRow";

export default function DocumentsTable({
  documents,
  onDelete,
  onAnalyze,
  analyzingId,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">

      {/* Table */}

      <div className="max-h-162.5 overflow-auto">

        <table className="min-w-full border-collapse">

          {/* Header */}

          <thead className="sticky top-0 z-10 bg-[#171717]/95 backdrop-blur">

            <tr className="border-b border-white/10">

              <th className="px-6 py-5 text-left">

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-300">

                  <FileText
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  Contract

                </div>

              </th>

              <th className="px-6 py-5 text-left">

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-300">

                  <ShieldAlert
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  Risk

                </div>

              </th>

              <th className="px-6 py-5 text-left">

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-300">

                  <Activity
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  Status

                </div>

              </th>

              <th className="px-6 py-5 text-left">

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-300">

                  <CalendarDays
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  Uploaded

                </div>

              </th>

              <th className="px-6 py-5 text-right">

                <div className="flex items-center justify-end gap-2 text-sm font-semibold tracking-wide text-zinc-300">

                  <Settings2
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  Actions

                </div>

              </th>

            </tr>

          </thead>

          {/* Body */}

          <tbody className="divide-y divide-white/5">

            {documents.map((document) => (
              <DocumentRow
                key={document.id}
                document={document}
                onDelete={onDelete}
                onAnalyze={onAnalyze}
                analyzing={analyzingId === document.id}
              />
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}