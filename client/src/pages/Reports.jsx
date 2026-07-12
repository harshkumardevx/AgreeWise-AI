import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Search, SlidersHorizontal } from "lucide-react";

import ReportsHeader from "@/components/reports/ReportsHeader";
import ReportsGrid from "@/components/reports/ReportsGrid";

import { getReports } from "@/services/reportApi";

export default function Reports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    let data = [...reports];

    if (search) {
      data = data.filter((report) =>
        report.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      data = data.filter(
        (report) => report.riskLevel === filter
      );
    }

    setFilteredReports(data);
  }, [reports, search, filter]);

  async function fetchReports() {
    try {
      setLoading(true);

      const data = await getReports();

      setReports(data.reports || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load reports."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      <ReportsHeader />

      {/* Filter Bar */}

      {!loading && reports.length > 0 && (
        <div
          className="
            flex
            flex-col
            gap-4
            rounded-3xl
            border
            border-zinc-800
            bg-[#111111]
            p-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search reports..."
              className="
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900
                py-3
                pl-11
                pr-4
                text-white
                outline-none
                transition
                focus:border-yellow-500/40
              "
            />
          </div>

          <div className="flex items-center gap-3">

            <SlidersHorizontal
              size={18}
              className="text-zinc-500"
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900
                px-4
                py-3
                text-sm
                text-white
                outline-none
              "
            >
              <option value="all">
                All Risks
              </option>

              <option value="low">
                Low Risk
              </option>

              <option value="medium">
                Medium Risk
              </option>

              <option value="high">
                High Risk
              </option>
            </select>

          </div>
        </div>
      )}

      {/* Loading */}

      {loading && (
        <div
          className="
            flex
            h-72
            items-center
            justify-center
            rounded-3xl
            border
            border-zinc-800
            bg-[#111111]
            text-zinc-500
          "
        >
          Loading Reports...
        </div>
      )}

      {/* Empty */}

      {!loading && reports.length === 0 && (
        <div
          className="
            flex
            flex-col
            items-center
            rounded-3xl
            border
            border-dashed
            border-zinc-700
            bg-[#111111]
            px-8
            py-20
            text-center
          "
        >
          <div
            className="
              mb-6
              rounded-full
              bg-yellow-500/10
              p-5
            "
          >
            📄
          </div>

          <h2 className="text-3xl font-bold text-white">
            No Reports Yet
          </h2>

          <p className="mt-4 max-w-lg text-zinc-500">
            Upload a contract and let AgreeWise AI
            analyze it to generate your first report.
          </p>

          <button
            onClick={() =>
              navigate("/upload-contract")
            }
            className="
              mt-8
              rounded-xl
              bg-yellow-500
              px-7
              py-3
              font-semibold
              text-black
              transition
              hover:bg-yellow-400
            "
          >
            Upload Contract
          </button>
        </div>
      )}

      {/* Grid */}

      {!loading && filteredReports.length > 0 && (
        <ReportsGrid
          reports={filteredReports}
          onViewReport={(report) =>
            navigate(`/reports/${report.id}`)
          }
        />
      )}
    </div>
  );
}