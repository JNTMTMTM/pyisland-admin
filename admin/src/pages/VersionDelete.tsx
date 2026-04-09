import { useState, useEffect } from "react";
import { version, type AppVersion } from "../api";

const cardStyle: React.CSSProperties = {
  backgroundColor: "var(--apple-surface-1)",
  borderRadius: 12,
  padding: "20px 24px",
  cursor: "pointer",
  transition: "all 0.15s",
};

const cardSelectedStyle: React.CSSProperties = {
  ...cardStyle,
  outline: "2px solid #ff453a",
};

export default function VersionDelete() {
  const [versions, setVersions] = useState<AppVersion[]>([]);
  const [selected, setSelected] = useState<AppVersion | null>(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"ok" | "err">("ok");
  const [loading, setLoading] = useState(true);

  const showMsg = (text: string, type: "ok" | "err" = "ok") => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(""), 3000);
  };

  const fetchVersions = async () => {
    try {
      const res = await version.list();
      if (res.code === 200 && res.data) setVersions(res.data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  const handleDelete = async () => {
    if (!selected) return;
    if (!confirm(`确定删除 ${selected.appName} 吗？`)) return;
    try {
      const res = await version.delete(selected.appName);
      if (res.code === 200) {
        showMsg("删除成功");
        setSelected(null);
        fetchVersions();
      } else {
        showMsg(res.message, "err");
      }
    } catch {
      showMsg("删除失败", "err");
    }
  };

  return (
    <div style={{ padding: "48px 48px" }}>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.1,
          color: "#ffffff",
          margin: "0 0 8px",
        }}
      >
        删除版本
      </h1>
      <p
        style={{
          fontSize: 21,
          fontWeight: 400,
          lineHeight: 1.19,
          letterSpacing: "0.231px",
          color: "rgba(255,255,255,0.56)",
          marginBottom: 40,
        }}
      >
        选择要删除的应用版本
      </p>

      {msg && (
        <div
          className="fixed z-50"
          style={{
            top: 24,
            right: 24,
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 14,
            color: "#ffffff",
            backgroundColor: msgType === "ok" ? "var(--apple-blue)" : "#ff453a",
          }}
        >
          {msg}
        </div>
      )}

      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 14 }}>加载中...</p>
      ) : versions.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 14 }}>暂无版本数据</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {versions.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelected(v)}
              style={
                selected?.id === v.id ? cardSelectedStyle : cardStyle
              }
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: 6,
                }}
              >
                {v.appName}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.64)",
                  marginBottom: 4,
                }}
              >
                版本：{v.version}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {v.description || "无描述"} · {v.updatedAt}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          style={{
            backgroundColor: "var(--apple-surface-1)",
            borderRadius: 12,
            padding: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>
              {selected.appName}
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.56)", marginTop: 4 }}>
              版本 {selected.version} · {selected.description || "无描述"}
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="cursor-pointer"
            style={{
              padding: "8px 20px",
              backgroundColor: "transparent",
              color: "#ff453a",
              borderRadius: 980,
              border: "1px solid #ff453a",
              fontSize: 14,
              lineHeight: 1.43,
              letterSpacing: "-0.224px",
              whiteSpace: "nowrap",
            }}
          >
            确认删除
          </button>
        </div>
      )}
    </div>
  );
}
