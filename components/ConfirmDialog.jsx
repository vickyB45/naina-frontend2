import { X, AlertTriangle } from "lucide-react";

export default function ConfirmActionModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-700 p-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="text-red-600 dark:text-red-400" />
          </div>

          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {description}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium
              bg-slate-100 hover:bg-slate-200
              dark:bg-slate-800 dark:hover:bg-slate-700
              text-slate-700 dark:text-slate-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium
              bg-red-600 hover:bg-red-700
              dark:bg-red-500 dark:hover:bg-red-600
              text-white disabled:opacity-60"
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
