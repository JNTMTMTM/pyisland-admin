/**
 * @file MessageDialog.tsx
 * @description 通用消息弹窗组件。
 * @description 支持成功/失败状态展示与自动关闭。
 * @author 鸡哥
 */

import { useEffect } from "react";

interface MessageDialogProps {
  visible: boolean;
  type: "ok" | "err";
  message: string;
  onClose: () => void;
  duration?: number;
}

/**
 * 消息弹窗组件。
 * @param props - 组件入参。
 * @returns 可见时渲染弹窗，不可见时返回 null。
 */
export default function MessageDialog({
  visible,
  type,
  message,
  onClose,
  duration = 2000,
}: MessageDialogProps) {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--apple-surface-1)",
          borderRadius: 12,
          padding: "28px 32px",
          width: 360,
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: type === "ok" ? "var(--apple-blue)" : "#ff453a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 22,
            color: "#fff",
          }}
        >
          {type === "ok" ? "✓" : "✕"}
        </div>
        <p
          style={{
            fontSize: 17,
            fontWeight: 600,
            lineHeight: 1.47,
            color: "#ffffff",
            margin: "0 0 20px",
          }}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="cursor-pointer"
          style={{
            padding: "8px 28px",
            backgroundColor: "var(--apple-surface-2)",
            color: "rgba(255,255,255,0.8)",
            borderRadius: 980,
            border: "none",
            fontSize: 14,
          }}
        >
          确定
        </button>
      </div>
    </div>
  );
}
