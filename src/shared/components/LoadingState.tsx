type LoadingStateProps = {
  message: string;
};

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}