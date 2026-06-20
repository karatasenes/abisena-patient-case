type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <p className="rounded-xl bg-white px-6 py-4 text-sm font-medium text-red-600 shadow-sm">
        {message}
      </p>
    </div>
  );
}