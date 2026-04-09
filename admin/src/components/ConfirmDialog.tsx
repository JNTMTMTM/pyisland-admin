/**
 * @file ConfirmDialog.tsx
 * @description 通用确认弹窗组件。
 * @description 用于二次确认敏感操作并返回用户决策。
 * @author 鸡哥
 */

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 确认弹窗组件。
 * @param props - 组件入参。
 * @returns 可见时渲染弹窗，不可见时返回 null。
 */
export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = "确认",
  cancelText = "取消",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--apple-surface-1)",
          borderRadius: 12,
          padding: "28px 32px",
          width: 400,
          maxWidth: "90vw",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 21,
            fontWeight: 600,
            lineHeight: 1.19,
            color: "#ffffff",
            margin: "0 0 8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.43,
            letterSpacing: "-0.224px",
            color: "rgba(255,255,255,0.64)",
            margin: "0 0 24px",
          }}
        >
          {message}
        </p>
        <div className="flex justify-end" style={{ gap: 10 }}>
          <button
            onClick={onCancel}
            className="cursor-pointer"
            style={{
              padding: "8px 20px",
              backgroundColor: "var(--apple-surface-2)",
              color: "rgba(255,255,255,0.8)",
              borderRadius: 980,
              border: "none",
              fontSize: 14,
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer"
            style={{
              padding: "8px 20px",
              backgroundColor: danger ? "#ff453a" : "var(--apple-blue)",
              color: "#ffffff",
              borderRadius: 980,
              border: "none",
              fontSize: 14,
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
