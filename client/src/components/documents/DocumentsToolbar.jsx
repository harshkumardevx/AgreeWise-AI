import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function DocumentsToolbar({
  search,
  setSearch,
  status,
  setStatus,
  risk,
  setRisk,
  sort,
  setSort,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111]">
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-1 flex-col gap-5">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Search & Filter
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Quickly find contracts using filters and sorting.
            </p>
          </div>

          {/* Search */}

          <div className="relative max-w-xl">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search contracts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                h-12
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#181818]
                pl-11
                pr-4
                text-sm
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all
                focus:border-[#D4AF37]
                focus:ring-2
                focus:ring-[#D4AF37]/20
              "
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">

          {/* Label */}

          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-[#181818] px-4 py-3 lg:flex">
            <SlidersHorizontal
              size={16}
              className="text-[#D4AF37]"
            />

            <span className="text-sm text-zinc-400">
              Filters
            </span>
          </div>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              h-12
              rounded-xl
              border
              border-white/10
              bg-[#181818]
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-[#D4AF37]
            "
          >
            <option value="all">All Status</option>
            <option value="uploaded">Uploaded</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>

          {/* Risk */}

          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="
              h-12
              rounded-xl
              border
              border-white/10
              bg-[#181818]
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-[#D4AF37]
            "
          >
            <option value="all">All Risk</option>
            <option value="pending">Pending Analysis</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
              h-12
              rounded-xl
              border
              border-white/10
              bg-[#181818]
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-[#D4AF37]
            "
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
            <option value="risk">Risk</option>
          </select>

        </div>

      </div>
    </section>
  );
}