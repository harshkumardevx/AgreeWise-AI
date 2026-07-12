import TimelineItem from "./TimelineItem";

export default function Timeline({ activities }) {
  return (
    <section className="rounded-[30px] border border-[#2A2A2A] bg-[#0B0B0B] p-8">

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">
          Activity Timeline
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Every important action on your agreements is recorded here.
        </p>
      </div>

      <div className="space-y-1">
        {activities.map((activity, index) => (
          <TimelineItem
            key={activity.id}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>

    </section>
  );
}