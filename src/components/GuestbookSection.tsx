"use client";

import { useState, FormEvent, useEffect } from "react";
import { Send, Heart, Loader2, MessageSquareHeart, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useGuestbook, GuestMessage } from "@/hooks/useGuestbook";
import { Timestamp } from "firebase/firestore";

// ─── Seed messages shown when Firestore is empty or not yet connected ────────
const SEED_MESSAGES: GuestMessage[] = [
  {
    id: "seed-1",
    name: "Ana Beatriz Santos",
    message:
      "Dona Maria Clara sempre teve um sorriso caloroso e uma palavra gentil para todos. Sua presença será eternamente sentida pela nossa família. Que Deus a tenha em sua glória.",
    createdAt: Timestamp.fromDate(new Date("2023-11-10T14:32:00")),
  },
  {
    id: "seed-2",
    name: "Carlos Eduardo Lima",
    message:
      "Trabalhei ao lado dela por tantos anos. Uma mulher de força, bondade e sabedoria imensas. O vazio que ela deixa é imenso, mas as memórias são eternas.",
    createdAt: Timestamp.fromDate(new Date("2023-11-09T09:15:00")),
  },
  {
    id: "seed-3",
    name: "Família Rodrigues",
    message:
      "Querida Maria Clara, a saudade que sentimos não tem tamanho. Obrigada por tudo que nos ensinou. Descanse em paz, com amor eterno.",
    createdAt: Timestamp.fromDate(new Date("2023-11-08T18:00:00")),
  },
];

// ─── Format date helper ──────────────────────────────────────────────────────
function formatDate(ts: Timestamp | null): string {
  if (!ts) return "";
  const date = ts.toDate();
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Single message card ─────────────────────────────────────────────────────
function MessageCard({
  msg,
  index,
  isAuthor,
  onUpdate,
  onDelete,
}: {
  msg: GuestMessage;
  index: number;
  isAuthor: boolean;
  onUpdate: (id: string, text: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(msg.message);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    if (!editText.trim() || editText === msg.message) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onUpdate(msg.id, editText);
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta homenagem?")) return;
    setDeleting(true);
    try {
      await onDelete(msg.id);
    } catch (err) {
      console.error("Erro ao excluir:", err);
      setDeleting(false);
    }
  };

  if (deleting) return null; // Optimistic hide

  return (
    <article
      className="message-card"
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-label={`Mensagem de ${msg.name}`}
    >
      {/* Author row */}
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar initial */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{
            background: "linear-gradient(135deg, var(--sage-light), var(--parchment))",
            color: "var(--sage-dark)",
            fontFamily: "var(--font-sans)",
          }}
          aria-hidden="true"
        >
          {msg.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col min-w-0">
          <span
            className="font-medium truncate"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--text-primary)",
            }}
          >
            {msg.name}
          </span>
          {msg.createdAt && (
            <time
              dateTime={msg.createdAt.toDate().toISOString()}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                letterSpacing: "0.02em",
              }}
            >
              {formatDate(msg.createdAt)}
            </time>
          )}
        </div>

        <Heart
          size={14}
          className="ml-auto flex-shrink-0"
          style={{ color: "var(--sage-light)", fill: "var(--sage-light)" }}
          aria-hidden="true"
        />
      </div>

      {/* Message body / Edit mode */}
      {isEditing ? (
        <div className="mt-2">
          <textarea
            className="memorial-input mb-3"
            rows={3}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            disabled={saving}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--sage)] text-white hover:bg-[var(--sage-dark)] transition-colors disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
            <button
              onClick={() => {
                setEditText(msg.message);
                setIsEditing(false);
              }}
              disabled={saving}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--parchment)] text-[var(--text-secondary)] hover:bg-[var(--stone-light)] transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {msg.message}
          </p>

          {/* Action buttons for author */}
          {isAuthor && (
            <div className="flex gap-3 mt-4 pt-3 border-t border-[var(--cream-dark)]">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--stone)] hover:text-[var(--sage-dark)] transition-colors"
                aria-label="Editar mensagem"
              >
                <Pencil size={13} /> Editar
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--stone)] hover:text-red-500 transition-colors"
                aria-label="Excluir mensagem"
              >
                <Trash2 size={13} /> Excluir
              </button>
            </div>
          )}
        </>
      )}
    </article>
  );
}

// ─── Main Guestbook Section ──────────────────────────────────────────────────
export default function GuestbookSection() {
  const { messages, loading, error, currentUser, addMessage, updateMessage, deleteMessage } = useGuestbook();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Decide which messages to display: live Firestore or seeds as fallback
  const sourceMessages =
    !loading && !error && messages.length > 0 ? messages : SEED_MESSAGES;

  const totalPages = Math.max(1, Math.ceil(sourceMessages.length / ITEMS_PER_PAGE));
  const displayMessages = sourceMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await addMessage(name, message);
      setName("");
      setMessage("");
      setCurrentPage(1); // Go back to first page to see the new message
      showToast();
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Success toast */}
      {toast && (
        <div className="toast" role="status" aria-live="polite">
          ✦ Sua homenagem foi enviada com carinho
        </div>
      )}

      <section
        id="mensagens"
        className="py-16 sm:py-20 flex flex-col items-center w-full"
        style={{ background: "var(--cream)" }}
      >
        <div className="w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center">
          {/* Section header */}
          <div className="text-center mb-10">
            <div className="section-divider">
            <MessageSquareHeart
              size={16}
              style={{ color: "var(--stone-light)" }}
              aria-hidden="true"
            />
          </div>
          <h2
            className="font-serif"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              letterSpacing: "0.02em",
            }}
          >
            Mural de Mensagens
          </h2>
          <p
            className="mt-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--text-muted)",
            }}
          >
            Deixe uma palavra de carinho e lembrança
          </p>
        </div>

        <div className="w-full max-w-lg">
          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit}
            id="form-homenagem"
            aria-label="Formulário de homenagem"
            className="mb-12"
            style={{
              background: "#ffffff",
              border: "1px solid var(--parchment)",
              borderRadius: "1.5rem",
              padding: "1.75rem",
              marginBottom: "3rem",
              boxShadow: "0 4px 24px -8px rgba(58, 51, 48, 0.1)",
            }}
          >
            <p
              className="mb-5"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: "var(--stone)",
                textAlign: "center",
              }}
            >
              Deixe sua homenagem
            </p>

            {/* Name input */}
            <div className="mb-4">
              <label
                htmlFor="guestbook-name"
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Seu Nome
              </label>
              <input
                id="guestbook-name"
                type="text"
                className="memorial-input"
                placeholder="Como você gostaria de ser lembrado(a)?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                maxLength={80}
              />
            </div>

            {/* Message textarea */}
            <div className="mb-6">
              <label
                htmlFor="guestbook-message"
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Sua Mensagem
              </label>
              <textarea
                id="guestbook-message"
                className="memorial-input"
                placeholder="Compartilhe uma memória, uma palavra de carinho ou uma prece..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                maxLength={600}
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                id="btn-enviar-homenagem"
                type="submit"
                className="btn-primary"
                disabled={submitting}
                aria-label="Enviar homenagem"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {submitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>

          {/* ── Messages list ── */}
          <div
            className="flex flex-col gap-4"
            aria-label="Mensagens de visitantes"
            aria-live="polite"
          >
            {loading && (
              <div className="flex justify-center py-8">
                <Loader2
                  size={28}
                  className="animate-spin"
                  style={{ color: "var(--sage-light)" }}
                  aria-label="Carregando mensagens..."
                />
              </div>
            )}

            {!loading && error && (
              <p
                className="text-center py-4"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                }}
              >
                {error}
              </p>
            )}

            {!loading &&
              displayMessages.map((msg, idx) => (
                <MessageCard
                  key={msg.id}
                  msg={msg}
                  index={idx}
                  isAuthor={msg.authorUid === currentUser?.uid && !!currentUser}
                  onUpdate={updateMessage}
                  onDelete={deleteMessage}
                />
              ))}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--parchment)]">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 text-[0.85rem] font-medium text-[var(--stone)] hover:text-[var(--sage-dark)] transition-colors disabled:opacity-30 disabled:hover:text-[var(--stone)]"
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={16} /> Anterior
                </button>
                
                <span className="text-[0.8rem] font-medium text-[var(--text-muted)] tracking-wider">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 text-[0.85rem] font-medium text-[var(--stone)] hover:text-[var(--sage-dark)] transition-colors disabled:opacity-30 disabled:hover:text-[var(--stone)]"
                  aria-label="Próxima página"
                >
                  Próxima <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
