type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}